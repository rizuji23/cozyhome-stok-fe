import React from "react";
import HelmetTitle from "./etc/HelmetTitle";
import Header from "./etc/Header";
import Sidebar from "./etc/Sidebar";
import Title from "./etc/Title";
import { Button } from "react-bootstrap";

class Pengaturan extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Pengaturan" />

                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                </div>

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <Title title="Pengaturan" />

                            <div className="card">
                                <div className="card-body">
                                    <h5>Ganti Password</h5>
                                    <hr />

                                    <div className="form-group">
                                        <label htmlFor="">Password Lama</label>
                                        <input type="password" className="form-control" />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label htmlFor="">Password Baru</label>
                                        <input type="password" className="form-control" />
                                    </div>

                                    <div className="text-right">
                                        <Button className="btn btn-primary">Ganti</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Pengaturan;