import React from "react";
import { withRouter } from "../etc/withRouter";
import System from "../module/System";
import moment from "moment";
import PrintHeader from "./PrintHeader";
import LoadingFull from "../LoadingFull";

class PrintAll extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            tanggal: "",
            data_modified: [],
            data_stok: [],
            data_in: [],
            data_out: [],
            loading: false,
        }
    }

    componentDidMount(): void {
        console.log("props", this.props.location.state);
        let tanggal = "";
        if (this.props.location.state.date.tipe_filter === "Semua") {
            tanggal = "Semua"
        } else if (this.props.location.state.date.tipe_filter === "Tanggal") {
            tanggal = `${this.props.location.state.date.start_date} - ${this.props.location.state.date.end_date}`
        } else if (this.props.location.state.date.tipe_filter === "Bulan") {
            tanggal = `${this.props.location.state.date.month}-${this.props.location.state.date.year}`
        } else if (this.props.location.state.date.tipe_filter === "Tahun") {
            tanggal = `${this.props.location.state.date.year}`
        }

        // modified stok
        var no = 1;
        var no_stok = 1;
        var no_in = 1;
        var no_out = 1;

        this.props.location.state.data.data.modified.map((el) => {
            el['no'] = no++;
            if (el.stok_out == null) {
                el['stok_out'] = "-";
            } else if (el.stok_in == null) {
                el['stok_in'] = "-";
            }

            if (el.project == null) {
                el['project'] = "-";
            }
            el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
        });

        // stok gudang
        this.props.location.state.data.data.stok.map((el) => {
            el['no'] = no_stok++;
            el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
            el['updated_at'] = moment(el.updated_at).format("DD-MM-YYYY HH:mm:ss");
        });

        // stok in
        this.props.location.state.data.data.in.map((el) => {
            el['no'] = no_in++;
            el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
            el['updated_at'] = moment(el.updated_at).format("DD-MM-YYYY HH:mm:ss");
        });

        // stok out
        this.props.location.state.data.data.out.map((el) => {
            el['no'] = no_out++;
            el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
            el['updated_at'] = moment(el.updated_at).format("DD-MM-YYYY HH:mm:ss");
        });

        this.setState({
            tanggal: tanggal,
            data_modified: this.props.location.state.data.data.modified,
            data_stok: this.props.location.state.data.data.stok,
            data_in: this.props.location.state.data.data.in,
            data_out: this.props.location.state.data.data.out,
            loading: true,
        }, () => {
            setTimeout(() => {
                this.setState({
                    loading: false
                }, () => {
                    window.print();
                });
            }, 3000)
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="container mt-5">
                    <LoadingFull display={this.state.loading} />
                    <PrintHeader title="Report Detail Laporan" date={this.state.tanggal} />
                    <div className="row">
                        <div className="col-sm-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="font-size-14">Total Asset Material</h5>
                                        </div>

                                    </div>
                                    <h4 className="m-0 align-self-center">Rp. {this.props.location.state.data.sum.sum_total_asset === undefined ? 0 : System.convertRupiah(this.props.location.state.data.sum.sum_total_asset)}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="font-size-14">Total Stok</h5>
                                        </div>

                                    </div>
                                    <h4 className="m-0 align-self-center">{this.props.location.state.data.sum.sum_stok_all} Pcs</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="font-size-14">Total Stok Masuk</h5>
                                        </div>

                                    </div>
                                    <h4 className="m-0 align-self-center">{this.props.location.state.data.sum.sum_stok_in} Pcs</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="font-size-14">Total Stok Keluar</h5>
                                        </div>

                                    </div>
                                    <h4 className="m-0 align-self-center">{this.props.location.state.data.sum.sum_stok_out} Pcs</h4>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="font-size-14">Total Asset Masuk</h5>
                                        </div>

                                    </div>
                                    <h4 className="m-0 align-self-center">Rp. {this.props.location.state.data.sum.sum_asset_in === undefined ? 0 : System.convertRupiah(this.props.location.state.data.sum.sum_asset_in)}</h4>

                                </div>
                            </div>
                        </div>

                        <div className="col-sm">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="font-size-14">Total Asset Keluar</h5>
                                        </div>

                                    </div>
                                    <h4 className="m-0 align-self-center">Rp. {this.props.location.state.data.sum.sum_asset_out === undefined ? 0 : System.convertRupiah(this.props.location.state.data.sum.sum_asset_out)}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h5>Stok Gudang</h5>
                                </div>
                            </div>

                            <hr />
                            <table className="table">
                                <tr>
                                    <th>No</th>
                                    <th>Nama Material</th>
                                    <th>Kategori Material</th>
                                    <th>Stok</th>
                                    <th>Tanggal Dibuat</th>
                                    <th>Tanggal Diupdate</th>
                                </tr>

                                {
                                    this.state.data_stok.map((el) => {
                                        return <>
                                            <tr>
                                                <td>{el.no}</td>
                                                <td>{el.nama_material}</td>
                                                <td>{el.kategori_material}</td>
                                                <td>{el.stok}</td>
                                                <td>{el.created_at}</td>
                                                <td>{el.updated_at}</td>
                                            </tr>
                                        </>
                                    })
                                }
                            </table>
                        </div>
                    </div>

                    <div style={{ breakAfter: "page" }}></div>

                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h5>Stok Masuk</h5>
                                </div>
                            </div>
                            <hr />
                            <table className="table">
                                <tr>
                                    <th>No</th>
                                    <th>Nama Material</th>
                                    <th>Kategori Material</th>
                                    <th>Stok Masuk</th>
                                    <th>Tanggal Dibuat</th>
                                    <th>Tanggal Diupdate</th>
                                </tr>

                                {
                                    this.state.data_in.map((el) => {
                                        return <>
                                            <tr>
                                                <td>{el.no}</td>
                                                <td>{el.nama_material}</td>
                                                <td>{el.kategori_material}</td>
                                                <td>{el.stok_in}</td>
                                                <td>{el.created_at}</td>
                                                <td>{el.updated_at}</td>
                                            </tr>
                                        </>
                                    })
                                }
                            </table>
                        </div>
                    </div>

                    <div style={{ breakAfter: "page" }}></div>

                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h5>Stok Keluar</h5>
                                </div>
                            </div>
                            <hr />
                            <table className="table">
                                <tr>
                                    <th>No</th>
                                    <th>Nama Material</th>
                                    <th>Kategori Material</th>
                                    <th>Stok Keluar</th>
                                    <th>Project</th>
                                    <th>Tanggal Dibuat</th>
                                    <th>Tanggal Diupdate</th>
                                </tr>

                                {
                                    this.state.data_out.map((el) => {
                                        return <>
                                            <tr>
                                                <td>{el.no}</td>
                                                <td>{el.nama_material}</td>
                                                <td>{el.kategori_material}</td>
                                                <td>{el.stok_out}</td>
                                                <td>{el.nama_project}</td>
                                                <td>{el.created_at}</td>
                                                <td>{el.updated_at}</td>
                                            </tr>
                                        </>
                                    })
                                }
                            </table>
                        </div>
                    </div>

                    <div style={{ breakAfter: "page" }}></div>

                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h5>Detail Transaksi Stok</h5>
                                </div>

                            </div>
                            <hr />
                            <table className="table">
                                <tr>
                                    <th>No</th>
                                    <th>Stok Masuk</th>
                                    <th>Stok Keluar</th>
                                    <th>Stok Terakhir</th>
                                    <th>Tipe</th>
                                    <th>Project</th>
                                    <th>Tanggal</th>
                                </tr>

                                {
                                    this.state.data_modified.map((el) => {
                                        return <tr>
                                            <td>{el.no}</td>
                                            <td>{el.stok_in}</td>
                                            <td>{el.stok_out}</td>
                                            <td>{el.last_stok}</td>
                                            <td>{el.keterangan}</td>
                                            <td>{el.project}</td>
                                            <td>{el.created_at}</td>
                                        </tr>
                                    })
                                }
                            </table>
                        </div>
                    </div>
                </div >
            </>
        )
    }
}

export default withRouter(PrintAll)