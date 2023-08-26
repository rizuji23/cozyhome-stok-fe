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
import Stok from './module/Stok';
import ListAlat from './list/ListAlat';
import CountAlat from './etc/CountAlat';

class AddAlat extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            nama_alat: "",
            harga_alat: "",
            disabled: true,
            loading: false,
            data_auth: localStorage.getItem("user-cozystok"),
            data: [],
            isOpen: {
                show: false,
                data: {},
            },
            loading_full: false,
            qty: 0,
            total_harga: 0,
        }

        this.validated = this.validated.bind(this);
        this.handleNamaAlat = this.handleNamaAlat.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleSimpan = this.handleSimpan.bind(this);
        this.getAlat = this.getAlat.bind(this);
        this.getDetailKategori = this.getDetailKategori.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleHargaAlat = this.handleHargaAlat.bind(this);
    }

    handleHargaAlat(e) {
        this.setState({
            harga_alat: System.convertInt(e.target.value),
        }, () => {
            this.validated();
            this.calculateSum();
        });
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

    getAlat() {
        this.setState({
            loading: true,
            loading_full: true,
        })
        Stok.getAlat({ id: 'all' }, this.state.data_auth).then((result) => {
            console.log("DAWDWD", result);
            let no = 1;
            result.data.data.alat.map((el) => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['updated_at'] = moment(el.updated_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['harga_alat'] = System.convertRupiah(el.harga_alat);
                el['total_harga'] = System.convertRupiah(el.total_harga);
                el['opsi'] = <><button onClick={() => this.getDetailKategori(el.id_alat)} className='btn btn-info btn-sm'>Detail</button></>
            });

            this.setState({
                data: result.data.data.alat,
                loading: false,
                loading_full: false,

            });
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getAlat();
    }


    validated() {
        if (System.isObjectEmpty({ nama_alat: this.state.nama_alat, harga_alat: this.state.harga_alat, qty: this.state.qty, total_harga: this.state.total_harga })) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    handleNamaAlat(e) {
        this.setState({
            nama_alat: e.target.value,
        }, () => {
            this.validated();
        });
    }

    clearState() {
        this.setState({
            nama_alat: "",
            harga_alat: "",
            qty: 0,
            total_harga: 0
        });
    }

    handleSimpan() {
        this.setState({
            loading: true,
            disabled: true,
        });
        Stok.addAlat({ nama_alat: this.state.nama_alat, harga_alat: this.state.harga_alat, qty: this.state.qty, total_harga: this.state.total_harga }, this.state.data_auth).then((result) => {
            console.log(result);
            toast.success("Alat berhasil dibuat");
            this.setState({
                loading: false,
                disabled: true,
            });
            this.getAlat();
            this.clearState();
        }).catch((rejects) => {
            toast.error("Alat gagal dibuat");
            console.log(rejects);
            this.setState({
                loading: false,
                disabled: true,
            });
            this.clearState();
        })
    }

    calculateSum() {
        const get_sum = parseInt(this.state.harga_alat) * parseInt(this.state.qty);
        this.setState({
            total_harga: get_sum
        })
        return get_sum;
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Alat" />
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
                            <Title title="Tambah Alat" />
                            <CountAlat />

                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Tambah Alat</h5>
                                    <hr />

                                    <div className='form-group'>
                                        <label htmlFor="">Nama Alat</label>
                                        <input type="text" value={this.state.nama_alat} onChange={this.handleNamaAlat} className='form-control' />
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Harga</label>
                                        <input type="text" value={System.convertRupiah(this.state.harga_alat)} onChange={this.handleHargaAlat} className='form-control' />
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Qty</label>
                                        <input type="number" value={this.state.qty} onChange={(e) => {
                                            this.setState({
                                                qty: e.target.value
                                            }, () => {
                                                this.calculateSum();
                                                this.validated();
                                            });


                                        }} className='form-control' />
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Total Harga</label>
                                        <input type="text" value={System.convertRupiah(this.state.total_harga)} disabled className='form-control' />
                                    </div>

                                    <div className='mt-3 text-right'>
                                        <Link to={'/material_all'} className='btn btn-danger'>Kembali</Link>
                                        <Button onClick={this.handleSimpan} className='btn btn-primary ml-2' disabled={this.state.disabled}>Tambah <LoadingButton show={this.state.loading} /></Button>
                                    </div>
                                </div>
                            </div>

                            <div className='card'>
                                <div className='card-body'>
                                    <h5>List Alat</h5>
                                    <hr />

                                    <div>
                                        <ListAlat data={this.state.data} loading={this.state.loading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDetailKategori isOpen={this.state.isOpen} handleClose={this.handleClose} getAlat={this.getAlat} />
            </>
        )
    }
}

export default AddAlat;