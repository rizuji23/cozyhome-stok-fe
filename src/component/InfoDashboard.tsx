import React from "react";
import Stok from "./module/Stok";
import System from "./module/System";

class InfoDashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data_auth: localStorage.getItem("user-cozystok"),
        }

        this.getSum = this.getSum.bind(this);
    }

    componentDidMount(): void {
        this.getSum();
    }

    getSum() {
        Stok.getSum(this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                data: result.data.data.sum,
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="row">
                    <div className="col-sm-6 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <h5 className="font-size-14">Total Asset Material</h5>
                                    </div>
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <span className="mdi mdi-currency-usd"></span>
                                        </span>
                                    </div>
                                </div>
                                <h4 className="m-0 align-self-center">Rp. {this.state.data.sum_total_asset === undefined ? 0 : System.convertRupiah(this.state.data.sum_total_asset)}</h4>

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
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <span className="mdi mdi-basket"></span>

                                        </span>
                                    </div>
                                </div>
                                <h4 className="m-0 align-self-center">{this.state.data.sum_stok_all} Pcs</h4>
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
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <span className="mdi mdi-basket-fill"></span>

                                        </span>
                                    </div>
                                </div>
                                <h4 className="m-0 align-self-center">{this.state.data.sum_stok_in} Pcs</h4>
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
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <span className="mdi mdi-basket-unfill"></span>
                                        </span>
                                    </div>
                                </div>
                                <h4 className="m-0 align-self-center">{this.state.data.sum_stok_out} Pcs</h4>
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
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <span className="mdi mdi-cash"></span>
                                        </span>
                                    </div>
                                </div>
                                <h4 className="m-0 align-self-center">Rp. {this.state.data.sum_asset_in === undefined ? 0 : System.convertRupiah(this.state.data.sum_asset_in)}</h4>

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
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <span className="mdi mdi-currency-usd-off"></span>

                                        </span>
                                    </div>
                                </div>
                                <h4 className="m-0 align-self-center">Rp. {this.state.data.sum_asset_out === undefined ? 0 : System.convertRupiah(this.state.data.sum_asset_out)}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default InfoDashboard;