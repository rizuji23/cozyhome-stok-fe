import React from 'react';
import Title from './etc/Title';
import Header from './etc/Header';
import Sidebar from './etc/Sidebar';
import HelmetTitle from './etc/HelmetTitle';
import { withRouter } from './etc/withRouter';
import Stok from './module/Stok';
import System from './module/System';
import moment from 'moment';
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ModalFilter from './modal/ModalFilter';
import ModalPrintDetail from './modal/ModalPrintDetail';
const MySwal = withReactContent(Swal)

class DetailStok extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data_auth: localStorage.getItem("user-cozystok"),
            material: {},
            stok_info: {},
            data: [],
            columns: [
                {
                    name: "No",
                    selector: row => row.no,
                    sortable: true,
                    width: "70px"
                },
                {
                    name: "Stok Masuk",
                    selector: row => row.stok_in,
                    sortable: true,
                },
                {
                    name: "Stok Keluar",
                    selector: row => row.stok_out,
                    sortable: true,
                },
                {
                    name: "Stok Terakhir",
                    selector: row => row.last_stok,
                    sortable: true,
                },
                {
                    name: "Tipe",
                    selector: row => row.keterangan,
                    sortable: true,
                },
                {
                    name: "Project",
                    selector: row => row.project,
                    sortable: true,
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                    sortable: true,
                    width: "200px"
                },

            ],
            asset: {},
            stok: {},
            navigate: false,
            openFilter: false,
            btn_reset: false,
            openPrint: false,
        }
        this.getDetail = this.getDetail.bind(this);
        this.deleteStok = this.deleteStok.bind(this);
        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.handleCloseFilter = this.handleCloseFilter.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleOpenPrint = this.handleOpenPrint.bind(this);
        this.handleClosePrint = this.handleClosePrint.bind(this);
    }

    handleOpenPrint() {
        this.setState({
            openPrint: true,
        })
    }

    handleClosePrint() {
        this.setState({
            openPrint: false,
        })
    }

    handleOpenFilter() {
        this.setState({
            openFilter: true
        });
    }

    handleCloseFilter() {
        this.setState({
            openFilter: false,
        })
    }

    getDetail() {
        console.log(this.props.location.state);
        Stok.getDetail(this.props.location.state.id, this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.modified.map((el) => {
                el['no'] = no++;
                if (el.stok_out == null) {
                    el['stok_out'] = "-"
                } else if (el.stok_in == null) {
                    el['stok_in'] = "-"
                }
                if (el.keterangan === "Stok Masuk") {
                    el['keterangan'] = <div className='badge badge-primary'>{el.keterangan}</div>
                } else {
                    el['keterangan'] = <div className='badge badge-danger'>{el.keterangan}</div>
                }

                if (el?.project === undefined) {
                    el['project'] = "-"
                }

                el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss")
            });
            this.setState({
                material: result.data.data.material,
                stok_info: result.data.data.stok_info,
                data: result.data.data.modified,
                asset: result.data.data.asset,
                stok: result.data.data.stok
            })
        })
    }

    componentDidMount(): void {
        this.getDetail();
    }

    deleteStok() {
        MySwal.fire({
            title: "Apa kamu yakin?",
            html: <>
                <div className='text-left'>
                    <p>Yang akan ikut terhapus: </p>
                    <ul>
                        <li>List Stok Semua</li>
                        <li>Kebutuhan Material (Project Management)</li>
                        <li>Harga Kebutuhan Material (Project Management)</li>
                    </ul>
                </div>
            </>,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya',
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                Stok.delete(this.props.location.state.id, this.state.data_auth).then((result) => {
                    console.log(result);
                    this.setState({
                        navigate: <Navigate to={"/stok_all"} replace={true} />
                    });
                }).catch((err) => {
                    toast.error("Terjadi kesalahan Gagal terhapus!");
                })
            }
        })
    }

    handleFilter(start, end) {
        const startDate = moment(start).format("DD-MM-YYYY");
        const endDate = moment(end).format("DD-MM-YYYY");

        const filter = this.state.data.filter((el) => {
            const date_data = moment(el.created_at, 'DD-MM-YYYY').format("DD-MM-YYYY");
            console.log(date_data)
            return date_data >= startDate && date_data <= endDate;
        });

        this.setState({
            data: filter,
            btn_reset: true,
        }, () => {
            this.handleCloseFilter();
        })
        console.log("filter", filter)
        console.log(startDate, endDate);
    }

    handleReset() {
        this.setState({
            btn_reset: false,
        }, () => {
            this.getDetail()
        })

    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Detail Stok" />

                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                </div>

                {this.state.navigate}

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <Title title="Detail Stok" />

                            <div className='row'>
                                <div className='col-sm'>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="font-size-14">Total Masuk</h5>
                                                </div>
                                                <div className="avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-primary">
                                                        <span className="mdi mdi-toolbox"></span>
                                                    </span>
                                                </div>
                                            </div>
                                            <h4 className="m-0 align-self-center">{this.state.stok.in} Pcs</h4>
                                            <h4 className="m-0 align-self-center mt-3">Rp. {System.convertRupiah(this.state.asset.in || "0")}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm'>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="font-size-14">Total Keluar</h5>
                                                </div>
                                                <div className="avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-primary">
                                                        <span className="mdi mdi-toolbox"></span>
                                                    </span>
                                                </div>
                                            </div>
                                            <h4 className="m-0 align-self-center">{this.state.stok.out} Pcs</h4>
                                            <h4 className="m-0 align-self-center mt-3">Rp. {System.convertRupiah(this.state.asset.out || "0")}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='card'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <h5>Informasi Material</h5>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <ul className="list-group mb-2">
                                            <li className="list-group-item">
                                                <span>Total Stok Tersedia</span><br />
                                                <b>{this.state.stok_info.stok} Pcs</b>
                                            </li>
                                            <li className="list-group-item">
                                                <span>Total Asset</span><br />
                                                <b>Rp. {System.convertRupiah(this.state.asset.all || "0")}</b>
                                            </li>
                                        </ul>
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <b>Nama Material</b><br />
                                                <span>{this.state.material?.nama_material}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Kategori</b><br />
                                                <span>{this.state.material?.nama_kategori}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Harga</b><br />
                                                <span>Rp. {System.convertRupiah(this.state.material?.harga || 0)}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Tanggal Dibuat</b><br />
                                                <span>{moment(this.state.material?.created_at).format("DD-MM-YYYY HH:mm:ss")}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Tanggal Diupdate</b><br />
                                                <span>{moment(this.state.material?.updated_at).format("DD-MM-YYYY HH:mm:ss")}</span>
                                            </li>

                                        </ul>

                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <h5>Detail Transaksi Stok</h5>
                                        </div>
                                        <div className=''>
                                            {this.state.btn_reset === false ? <button className='btn btn-primary btn-sm' onClick={this.handleOpenFilter}>Filter</button> : <button className='btn btn-info btn-sm' onClick={this.handleReset}>Reset</button>}

                                        </div>
                                        <div className='ml-2'>
                                            <button className='btn btn-success btn-sm' onClick={this.handleOpenPrint}>Print</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <DataTable columns={this.state.columns} progressPending={this.state.loading} data={this.state.data} pagination />
                                </div>
                            </div>

                            <div className='alert alert-danger'>
                                <div className='d-flex'>
                                    <div className='flex-grow-1'>
                                        <b>Zona Berbahaya</b>
                                    </div>
                                    <div className=''>
                                        {/* <button className='btn btn-success btn-sm'>Edit Stok</button> */}
                                        <button className='btn btn-danger btn-sm ml-2' onClick={this.deleteStok}>Kosongkan Stok</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalFilter isOpen={this.state.openFilter} handleClose={this.handleCloseFilter} handleFilter={this.handleFilter} />
                <ModalPrintDetail isOpen={this.state.openPrint} handleClose={this.handleClosePrint} id={this.props.location.state.id} />
            </>
        )
    }
}

export default withRouter(DetailStok);