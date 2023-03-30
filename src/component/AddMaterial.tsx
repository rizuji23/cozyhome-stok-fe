import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Header from './etc/Header';
import Title from './etc/Title';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MaterialModule from './module/MaterialModule';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import System from './module/System';
import LoadingButton from './etc/LoadingButton';

class AddMaterial extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            kategori: "",
            data_auth: localStorage.getItem("user-cozystok"),
            material: {
                nama_material: "",
                kategori: "",
                harga: "",
            },
            disabled: true,
            loading: false,
        }
        this.getKategori = this.getKategori.bind(this);
        this.validated = this.validated.bind(this);
        this.handleNamaMaterial = this.handleNamaMaterial.bind(this);
        this.getKategori = this.getKategori.bind(this);
        this.handleHarga = this.handleHarga.bind(this);
        this.handleKategori = this.handleKategori.bind(this);
        this.handleSimpan = this.handleSimpan.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    validated() {
        if (System.isObjectEmpty(this.state.material)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    clearState() {
        this.setState(prevState => ({
            material: {
                ...prevState.material,
                nama_material: "",
                harga: "",
            }
        }))
    }

    getKategori() {
        MaterialModule.getKategori(this.state.data_auth).then((result) => {
            console.log(result);
            const data = result.data.data.kategori_material.map((el) => {
                return (
                    <><option value={el.id_kategori_material}>{el.nama_kategori}</option></>
                )
            });

            this.setState({
                kategori: data,
            })
        }).catch((rejects) => {
            console.log(rejects);
        });
    }

    handleNamaMaterial(e) {
        this.setState(prevState => ({
            material: {
                ...prevState.material,
                nama_material: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }

    handleKategori(e) {
        this.setState(prevState => ({
            material: {
                ...prevState.material,
                kategori: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }

    handleHarga(e) {
        this.setState(prevState => ({
            material: {
                ...prevState.material,
                harga: e.target.value
            }
        }), () => {
            this.validated();
        });
    }

    handleSimpan() {
        this.setState({
            loading: true,
            disabled: true,
        })
        const data = {
            nama_material: this.state.material.nama_material,
            kategori_material: this.state.material.kategori,
            harga: System.convertInt(this.state.material.harga),
        }

        MaterialModule.add(data, this.state.data_auth).then((result) => {
            console.log(result);
            toast.success("Material berhasil ditambah");
            this.setState({
                loading: false,
                disabled: false,
            }, () => {
                this.clearState()
            });
        }).catch((rejects) => {
            console.log(rejects);
            toast.error("Material gagal ditambah");
            this.setState({
                loading: false,
                disabled: true,
            }, () => {
                this.clearState()
            });
        })
    }

    componentDidMount(): void {
        this.getKategori();
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Material" />
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
                            <Title title="Tambah Material" />

                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Tambah Material</h5>
                                    <hr />

                                    <div className='form-group'>
                                        <label htmlFor="">Nama Material</label>
                                        <input type="text" value={this.state.material.nama_material} onChange={this.handleNamaMaterial} className='form-control' />
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Kategori</label>
                                        <select name="" onChange={this.handleKategori} className='form-control' id="">
                                            <option value="">Pilih Kategori</option>
                                            {this.state.kategori}
                                        </select>
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Harga</label>
                                        <input type="text" value={System.convertRupiah(this.state.material.harga)} onChange={this.handleHarga} className='form-control' />
                                    </div>

                                    <div className='mt-3 text-right'>
                                        <Link to={'/material_all'} className='btn btn-danger'>Kembali</Link>
                                        <Button className='btn btn-primary ml-2' onClick={this.handleSimpan} disabled={this.state.disabled}>Tambah <LoadingButton show={this.state.loading} /></Button>
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