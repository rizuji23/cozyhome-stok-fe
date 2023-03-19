import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Header from './etc/Header';
import Sidebar from './etc/Sidebar';
import Title from './etc/Title';
import InfoDashboard from './InfoDashboard';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListAll from './list/ListAll';
import ListMasuk from './list/ListMasuk';
import ListKeluar from './list/ListKeluar';
import ModalPrintStok from './modal/ModalPrintStok';

class ListStok extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose() {
        this.setState({
            isOpen: false,
        })
    }

    handleOpen() {
        this.setState({
            isOpen: true,
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="List Stok" />

                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                </div>

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <Title title="List Stok" />

                            <InfoDashboard />

                            <div className='text-right'>
                                <Link to={'/tambah_stok_in'} className='btn btn-primary mr-2'>Tambah Stok Masuk</Link>
                                <button className='btn btn-info' onClick={this.handleOpen}>Print Stok</button>
                            </div>
                            <hr />
                            <Tabs
                                defaultActiveKey="home"
                                id="uncontrolled-tab-example"
                                className="mb-3">
                                <Tab eventKey="home" title="Stok Semua">
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5>List Stok Semua</h5>
                                            <hr />
                                            <ListAll />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Stok Masuk">
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5>List Stok Masuk</h5>
                                            <hr />
                                            <ListMasuk />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="contact" title="Stok Keluar">
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5>List Stok Masuk</h5>
                                            <hr />
                                            <ListKeluar />
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>

                <ModalPrintStok isOpen={this.state.isOpen} handleClose={this.handleClose} />
            </>
        )
    }
}

export default ListStok;