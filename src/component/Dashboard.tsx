import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Header from './etc/Header';
import Sidebar from './etc/Sidebar';
import Title from './etc/Title';
import InfoDashboard from './InfoDashboard';

import ReactApexChart from "react-apexcharts";
import { Link } from 'react-router-dom';
import Analisis from './module/Analisis';
import System from './module/System';

class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            chart_stok: {
                series: [{
                    name: 'Stok Masuk',
                    data: [31, 40, 28, 51, 42, 109, 100]
                }, {
                    name: 'Stok Keluar',
                    data: [11, 32, 45, 32, 34, 52, 41]
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'area'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'date',
                        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy'
                        },
                    },
                }
            },

            chart_between: {
                series: [44, 55],
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: ['Stok Masuk', 'Stok Keluar'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            },

            chart_keuangan: {
                series: [{
                    name: 'Total Asset Keseluruhan',
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                }, {
                    name: 'Total Asset Masuk',
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                }, {
                    name: 'Total Asset Keluar',
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
                }],
                options: {
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    },
                    yaxis: {
                        title: {
                            text: 'Rp (Rupiah)'
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return "Rp. " + System.convertRupiah(val)
                            }
                        }
                    }
                },
            },
            data_auth: localStorage.getItem("user-cozystok"),
        }

        this.getAnalisis = this.getAnalisis.bind(this);
    }

    componentDidMount(): void {
        this.getAnalisis();
    }

    getAnalisis() {
        Analisis.get(this.state.data_auth).then((result) => {
            console.log("analisis", result);
            const data_keuangan = Analisis.calculateKeuangan(result.data.data.keuangan);
            const data = Analisis.calculateStok(result.data.data.stok);
            const data_kategori = Analisis.calculatePerbandingan(result.data.data.perbandingan);
            this.setState(prevState => ({
                chart_keuangan: {
                    ...prevState.chart_keuangan,
                    series: data_keuangan.series,
                    options: {
                        ...prevState.options,
                        xaxis: {
                            categories: data_keuangan.categories
                        }
                    }
                },

                chart_stok: {
                    ...prevState.chart_stok,
                    series: data.series,
                    options: {
                        ...prevState.options,
                        xaxis: {
                            ...prevState.xaxis,
                            categories: data.categories
                        }
                    }
                },

                chart_between: {
                    ...prevState.chart_between,
                    series: data_kategori.series,
                }
            }))
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Dashboard" />

                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                </div>

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <Title title="Dashboard" />

                            <InfoDashboard />

                            <div className="card">
                                <div className="card-body">
                                    <div className='text-right'>
                                        <Link to={'/tambah_stok_in'} className='btn btn-primary mr-2'>Tambah Stok</Link>
                                        <Link to={'/tambah_material'} className='btn btn-success'>Tambah Material</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="header-title mb-4">Statistik Stok Masuk/Keluar</h4>
                                            {/* <div className="row justify-content-center">
                                                <div className="col-sm-4">
                                                    <div className="text-center">
                                                        <p>Total Asset Bulan Ini</p>
                                                        <h4>Rp. 30.000.000</h4>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="text-center">
                                                        <p>Total Asset Minggu Ini</p>
                                                        <h4>Rp. 15.000.000</h4>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <ReactApexChart options={this.state.chart_stok.options} series={this.state.chart_stok.series} type="area" height={350} />

                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="header-title">Statistik Perbandingan</h4>
                                            <p className='mb-4'>Data dibawah ini perbandingan anatara barang masuk & keluar.</p>
                                            <ReactApexChart options={this.state.chart_between.options} series={this.state.chart_between.series} type="pie" width={380} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title mb-4">Statistik Keuangan</h4>
                                    <ReactApexChart options={this.state.chart_keuangan.options} series={this.state.chart_keuangan.series} type="bar" height={350} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard;