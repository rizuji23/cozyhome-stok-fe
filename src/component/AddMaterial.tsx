import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Header from './etc/Header';
import Title from './etc/Title';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AddMaterial extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Material" />

                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                </div>

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <Title title="Tambah Material" />

                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Tambah Material</h5>
                                    <hr />

                                    <div className='form-group'>
                                        <label htmlFor="">Nama Material</label>
                                        <input type="text" className='form-control' />
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Kategori</label>
                                        <select name="" className='form-control' id=""></select>
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Harga</label>
                                        <input type="text" className='form-control' />
                                    </div>

                                    <div className='mt-3 text-right'>
                                        <Link to={'/material_all'} className='btn btn-danger'>Kembali</Link>
                                        <Button className='btn btn-primary ml-2'>Tambah</Button>
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

export default AddMaterial;