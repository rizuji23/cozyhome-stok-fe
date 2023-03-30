import React from "react";
import HelmetTitle from "./etc/HelmetTitle";
import Header from "./etc/Header";
import Sidebar from "./etc/Sidebar";
import Title from "./etc/Title";
import { Link } from "react-router-dom";
import ListMaterial from "./list/ListMaterial";
import { Button } from "react-bootstrap";

class Material extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }

        this.setCount = this.setCount.bind(this);
    }

    setCount(count) {
        this.setState({
            count: count
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="List Material" />

                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                </div>

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <Title title="List Material" />

                            <div className="card">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="font-size-14">Total Material</h5>
                                        </div>
                                        <div className="avatar-xs">
                                            <span className="avatar-title rounded-circle bg-primary">
                                                <span className="mdi mdi-toolbox"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="m-0 align-self-center">{this.state.count} Pcs</h4>
                                </div>
                            </div>

                            <div className="mb-3 text-right">
                                <Link to={'/tambah_material'} className="btn btn-primary">Tambah Material</Link>
                                <Link to={'/tambah_kategori'} className="btn btn-success ml-2">List Kategori Material</Link>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <h5>Material</h5>
                                        </div>

                                    </div>
                                    <hr />

                                    <ListMaterial setCount={this.setCount} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Material;