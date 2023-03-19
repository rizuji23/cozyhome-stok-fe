import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Header from './etc/Header';
import Title from './etc/Title';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListKategori from './list/ListKategori';

class AddKategoriMaterial extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Kategori Material" />

                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                </div>

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <Title title="Tambah Kategori Material" />

                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Tambah Kategori Material</h5>
                                    <hr />

                                    <div className='form-group'>
                                        <label htmlFor="">Nama Kategori</label>
                                        <input type="text" className='form-control' />
                                    </div>

                                    <div className='mt-3 text-right'>
                                        <Link to={'/material_all'} className='btn btn-danger'>Kembali</Link>
                                        <Button className='btn btn-primary ml-2'>Tambah</Button>
                                    </div>
                                </div>
                            </div>

                            <div className='card'>
                                <div className='card-body'>
                                    <h5>List Kategori Material</h5>
                                    <hr />

                                    <div>
                                        <ListKategori />
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

export default AddKategoriMaterial;