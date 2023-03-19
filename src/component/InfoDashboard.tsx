import React from "react";

class InfoDashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
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
                                <h4 className="m-0 align-self-center">Rp. 30.000.000</h4>
                                <p className="mb-0 mt-3 text-muted">Updated 23-05-2023 10:00:21</p>

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
                                <h4 className="m-0 align-self-center">100 Pcs</h4>
                                <p className="mb-0 mt-3 text-muted">Updated 23-05-2023 05:03:33</p>
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
                                <h4 className="m-0 align-self-center">50 Pcs</h4>
                                <p className="mb-0 mt-3 text-muted">Total Asset: Rp. 30.000.000</p>
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
                                <h4 className="m-0 align-self-center">20 Pcs</h4>
                                <p className="mb-0 mt-3 text-muted">Total Asset: Rp. 10.000.000</p>
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
                                <h4 className="m-0 align-self-center">Rp. 30.000.000</h4>
                                <p className="mb-0 mt-3 text-muted">Updated 23-05-2023 10:00:21</p>

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
                                <h4 className="m-0 align-self-center">Rp. 20.000.000</h4>
                                <p className="mb-0 mt-3 text-muted">Updated 23-05-2023 05:03:33</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default InfoDashboard;