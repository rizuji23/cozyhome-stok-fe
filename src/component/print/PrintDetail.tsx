import React from "react";
import { withRouter } from "../etc/withRouter";
import System from "../module/System";
import moment from "moment";
import PrintHeader from "./PrintHeader";

class PrintDetail extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            tanggal: "",
            data: []
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

        var no = 1;
        this.props.location.state.data.modified.map((el) => {
            el['no'] = no++;
            if (el.stok_out == null) {
                el['stok_out'] = "-"
            } else if (el.stok_in == null) {
                el['stok_in'] = "-"
            }
            el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss")
        })

        this.setState({
            tanggal: tanggal,
            data: this.props.location.state.data.modified
        }, () => {
            window.print();
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="container mt-5">
                    <PrintHeader title="Report Detail Laporan" date={this.state.tanggal} />
                    <div className='row'>
                        <div className='col-sm'>
                            <div className="card">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="font-size-14">Total Masuk</h5>
                                        </div>
                                    </div>
                                    <h4 className="m-0 align-self-center">{this.props.location.state.data.stok.in} Pcs</h4>
                                    <h4 className="m-0 align-self-center mt-3">Rp. {System.convertRupiah(this.props.location.state.data.asset.in || "0")}</h4>
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
                                    </div>
                                    <h4 className="m-0 align-self-center">{this.props.location.state.data.stok.out} Pcs</h4>
                                    <h4 className="m-0 align-self-center mt-3">Rp. {System.convertRupiah(this.props.location.state.data.asset.out || "0")}</h4>
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
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <b>Nama Material</b><br />
                                        <span>{this.props.location.state.data.material?.nama_material}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Kategori</b><br />
                                        <span>{this.props.location.state.data.material?.nama_kategori}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Harga</b><br />
                                        <span>Rp. {System.convertRupiah(this.props.location.state.data.material?.harga || 0)}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Tanggal Dibuat</b><br />
                                        <span>{moment(this.props.location.state.data.material?.created_at).format("DD-MM-YYYY HH:mm:ss")}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Tanggal Diupdate</b><br />
                                        <span>{moment(this.props.location.state.data.material?.updated_at).format("DD-MM-YYYY HH:mm:ss")}</span>
                                    </li>
                                </ul>
                                <ul className="list-group mt-2">
                                    <li className="list-group-item">
                                        <span>Total Stok Tersedia</span><br />
                                        <b>{this.props.location.state.data.stok_info.stok} Pcs</b>
                                    </li>
                                    <li className="list-group-item">
                                        <span>Total Asset</span><br />
                                        <b>Rp. {System.convertRupiah(this.props.location.state.data.asset.all || "0")}</b>
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
                                    this.state.data.map((el) => {
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
                </div>
            </>
        )
    }
}

export default withRouter(PrintDetail)