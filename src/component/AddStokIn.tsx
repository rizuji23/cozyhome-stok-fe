import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Header from './etc/Header';
import Title from './etc/Title';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AddStokIn extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Stok Masuk" />

                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                </div>

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <Title title="Tambah Stok Masuk" />

                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Tambah Stok Masuk</h5>
                                    <hr />

                                    <div className='form-group'>
                                        <label htmlFor="">Material</label>
                                        <select name="" className='form-control' id="">
                                            <option value="">Pilih Material</option>
                                            <option value=""></option>
                                        </select>
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Jumlah Stok Masuk</label>
                                        <input type="number" className='form-control' />
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Keterangan</label>
                                        <textarea name="" className='form-control' id="" cols={30} rows={10}></textarea>
                                    </div>

                                    <div className='mt-3 text-right'>
                                        <Link to={'/stok_all'} className='btn btn-danger'>Kembali</Link>
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

export default AddStokIn;