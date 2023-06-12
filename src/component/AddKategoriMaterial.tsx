import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Header from './etc/Header';
import Title from './etc/Title';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListKategori from './list/ListKategori';
import System from './module/System';
import LoadingButton from './etc/LoadingButton';
import MaterialModule from './module/MaterialModule';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import moment from 'moment';
import ModalAddKategori from './modal/ModalAddKategori';
import ModalDetailKategori from './modal/ModalDetailKategori';
import LoadingFull from './LoadingFull';

class AddKategoriMaterial extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            nama_kategori: "",
            disabled: true,
            loading: false,
            data_auth: localStorage.getItem("user-cozystok"),
            data: [],
            isOpen: {
                show: false,
                data: {},
            },
            loading_full: false,
        }

        this.validated = this.validated.bind(this);
        this.handleNamaKategori = this.handleNamaKategori.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleSimpan = this.handleSimpan.bind(this);
        this.getKategori = this.getKategori.bind(this);
        this.getDetailKategori = this.getDetailKategori.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleOpen(data) {
        this.setState({
            isOpen: {
                show: true,
                data: data,
            }
        })
    }

    handleClose() {
        this.setState({
            isOpen: {
                show: false,
                data: {
                    kategori_material: {},
                    material: []
                }
            }
        })
    }

    getDetailKategori(id) {
        this.setState({
            loading_full: true,
        })
        MaterialModule.getDetailKategori(id, this.state.data_auth).then((result) => {
            console.log(result);
            this.handleOpen(result.data.data)
            this.setState({
                loading_full: false,
            })
        })
    }

    getKategori() {
        this.setState({
            loading: true,
            loading_full: true,
        })
        MaterialModule.getKategori(this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.kategori_material.map((el) => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['updated_at'] = moment(el.updated_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['opsi'] = <><button onClick={() => this.getDetailKategori(el.id_kategori_material)} className='btn btn-info btn-sm'>Detail</button></>
            });

            this.setState({
                data: result.data.data.kategori_material,
                loading: false,
                loading_full: false,

            });
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getKategori();
    }


    validated() {
        if (System.isObjectEmpty({ nama_kategori: this.state.nama_kategori })) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    handleNamaKategori(e) {
        this.setState({
            nama_kategori: e.target.value,
        }, () => {
            this.validated();
        });
    }

    clearState() {
        this.setState({
            nama_kategori: "",
        })
    }

    handleSimpan() {
        this.setState({
            loading: true,
            disabled: true,
        })
        MaterialModule.addKategori({ nama_kategori: this.state.nama_kategori }, this.state.data_auth).then((result) => {
            console.log(result);
            toast.success("Kategoti Material berhasil dibuat");
            this.setState({
                loading: false,
                disabled: true,
            });
            this.getKategori();
            this.clearState();
        }).catch((rejects) => {
            toast.error("Kategoti Material gagal dibuat");
            console.log(rejects);
            this.setState({
                loading: false,
                disabled: true,
            });
            this.clearState();
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Kategori Material" />
                <LoadingFull display={this.state.loading_full} />

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />


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
                                        <input type="text" value={this.state.nama_kategori} onChange={this.handleNamaKategori} className='form-control' />
                                    </div>

                                    <div className='mt-3 text-right'>
                                        <Link to={'/material_all'} className='btn btn-danger'>Kembali</Link>
                                        <Button onClick={this.handleSimpan} className='btn btn-primary ml-2' disabled={this.state.disabled}>Tambah <LoadingButton show={this.state.loading} /></Button>
                                    </div>
                                </div>
                            </div>

                            <div className='card'>
                                <div className='card-body'>
                                    <h5>List Kategori Material</h5>
                                    <hr />

                                    <div>
                                        <ListKategori data={this.state.data} loading={this.state.loading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDetailKategori isOpen={this.state.isOpen} handleClose={this.handleClose} getKategori={this.getKategori} />
            </>
        )
    }
}

export default AddKategoriMaterial;