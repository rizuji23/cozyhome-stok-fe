import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Header from './etc/Header';
import Title from './etc/Title';
import { Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Stok from './module/Stok';
import System from './module/System';
import AlertBottom from './etc/AlertBottom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import LoadingButton from './etc/LoadingButton';
import ModalAddMaterial from './modal/ModalAddMaterial';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import CreatableSelect from 'react-select/creatable';

const MySwal = withReactContent(Swal)

class AddStokIn extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            comp_material: [],
            data_auth: localStorage.getItem("user-cozystok"),
            stok_old: {
                nama_material: "",
                stok: 0,
                total_harga: 0,
                harga: 0,
                id_material: "",
            },
            stok_new: {
                stok_in: 0,
                total_stok: 0,
                sum_harga: 0,
                now_harga: 0,
                keterangan: "",
                nama_toko: "",
            },
            msg_material: "",
            msg_stok: "",
            id_user: JSON.parse(localStorage.getItem("user-cozystok")).id_user,
            disabled: true,
            loading: false,
            navigation: false,
            isOpen: false,
            toko_material: [],
        }

        this.getMaterial = this.getMaterial.bind(this);
        this.handleMaterial = this.handleMaterial.bind(this);
        this.handleStok = this.handleStok.bind(this);
        this.handleKeterangan = this.handleKeterangan.bind(this);
        this.handleSimpan = this.handleSimpan.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleOpenMaterial = this.handleOpenMaterial.bind(this);
        this.handleCloseMaterial = this.handleCloseMaterial.bind(this);
        this.handleNamaToko = this.handleNamaToko.bind(this);
    }


    clearState() {
        this.setState(prevState => ({
            stok_new: {
                stok_in: 0,
                total_stok: 0,
                sum_harga: 0,
                now_harga: 0,
                keterangan: "",
                nama_toko: "",
            },
            disabled: true,
            loading: false,
        }))
    }

    validated() {
        if (System.isObjectEmpty({ stok_in: this.state.stok_new.stok_in, id_material: this.state.stok_old.id_material, nama_toko: this.state.stok_new.nama_toko })) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    handleSimpan() {
        MySwal.fire({
            title: "Apa kamu yakin?",
            text: 'Stok yang dipilih akan tertambah.',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya',
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    id_material: this.state.stok_old.id_material,
                    stok_in: parseInt(this.state.stok_new.stok_in),
                    keterangan: this.state.stok_new.keterangan,
                    id_user: this.state.id_user,
                    nama_toko: this.state.stok_new.nama_toko
                };

                console.log(data)

                Stok.addIn(this.state.data_auth, data).then((result) => {
                    console.log(result);
                    toast.success("Stok Berhasil ditambah.");
                    MySwal.fire({
                        title: "Apakah ingin diprint?",
                        text: 'Stok yang ditambah akan diprint sekarang.',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Iya',
                        icon: 'info',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log("TEST");
                        } else {
                            this.setState({
                                navigation: <Navigate to={'/stok_all'} state={{ code: true, msg: "Stok berhasil ditambah" }} />
                            })
                        }
                    });
                    this.setState({
                        loading: false,

                    });
                    this.getMaterial();
                }).catch((rejects) => {
                    toast.success("Stok Gagal ditambah.");
                    console.log(rejects);
                    this.setState({
                        loading: false,
                        navigation: <Navigate to={'/stok_all'} state={{ code: false, msg: "Stok gagal ditambah" }} />
                    })
                })
            }
        });
        this.setState({
            loading: true,
        })

    }

    handleMaterial(e) {
        console.log(e);
        const data = JSON.parse(e);
        const total = parseInt(data?.harga_material || 0) * data?.stok || 0;
        console.log(data)
        if (e === null) {
            this.setState(prevState => ({
                stok_old: {
                    nama_material: "",
                    stok: 0,
                    total_harga: 0,
                    harga: 0,
                    id_material: "",
                }
            }), () => {
                this.validated();
                this.clearState();
            })
        } else {
            this.setState(prevState => ({
                stok_old: {
                    ...prevState.stok_old,
                    nama_material: data.nama_material,
                    stok: data.stok,
                    total_harga: total,
                    harga: parseInt(data.harga_material),
                    id_material: data.id_material
                }
            }), () => {
                this.countStok(this.state.stok_new.stok_in);
                this.validated();
            })
        }
    }

    countStok(stok) {
        const total = parseInt(stok || 0) * parseInt(this.state.stok_old.harga);
        const total_all = parseInt(stok || 0) + parseInt(this.state.stok_old.stok);
        const sum_harga = parseInt(stok) * parseInt(this.state.stok_old.harga);
        const now_harga = parseInt(this.state.stok_old.total_harga) + sum_harga || 0;

        console.log(System.isNegative(stok))

        if (System.isNegative(stok)) {
            this.setState(prevState => ({
                msg_material: <AlertBottom show={true} msg="Stok tidak boleh minus (-)." />,
                stok_new: {
                    ...prevState.stok_new,
                    stok_in: 0,
                },
                disabled: true,
            }));
        } else if (stok === "0") {
            this.setState(prevState => ({
                msg_material: <AlertBottom show={true} msg="Stok tidak boleh nol (0)." />,
                stok_new: {
                    ...prevState.stok_new,
                    stok_in: 0
                },
                disabled: true,
            }));
        } else if (stok.length === 0) {
            this.setState(prevState => ({
                msg_material: <AlertBottom show={true} msg="Stok tidak boleh kosong." />,
                stok_new: {
                    ...prevState.stok_new,
                    stok_in: 0
                },
                disabled: true,
            }));
        } else {
            this.setState(prevState => ({
                stok_new: {
                    ...prevState.stok_new,
                    stok_in: stok,
                    total_stok: total_all,
                    sum_harga: sum_harga || 0,
                    now_harga: now_harga
                },
                msg_material: "",
                disabled: false,
            }));
        }
    }

    handleStok(e) {
        const total = parseInt(e.target.value || 0) * parseInt(this.state.stok_old.harga);
        const total_all = parseInt(e.target.value || 0) + parseInt(this.state.stok_old.stok || 0);
        const sum_harga = parseInt(e.target.value) * parseInt(this.state.stok_old.harga);
        const now_harga = parseInt(this.state.stok_old.total_harga) + sum_harga || 0;

        console.log(System.isNegative(e.target.value))

        if (System.isNegative(e.target.value)) {
            this.setState(prevState => ({
                msg_material: <AlertBottom show={true} msg="Stok tidak boleh minus (-)." />,
                stok_new: {
                    ...prevState.stok_new,
                    stok_in: 0,
                    total_stok: 0,
                },
                disabled: true,
            }));
        } else if (e.target.value === "0") {
            this.setState(prevState => ({
                msg_material: <AlertBottom show={true} msg="Stok tidak boleh nol (0)." />,
                stok_new: {
                    ...prevState.stok_new,
                    stok_in: 0,
                    total_stok: 0,
                },
                disabled: true,
            }));
        } else if (e.target.value.length === 0) {
            this.setState(prevState => ({
                msg_material: <AlertBottom show={true} msg="Stok tidak boleh kosong." />,
                stok_new: {
                    ...prevState.stok_new,
                    stok_in: 0,
                    total_stok: 0,
                },
                disabled: true,
            }));
        } else {
            this.setState(prevState => ({
                stok_new: {
                    ...prevState.stok_new,
                    stok_in: e.target.value,
                    total_stok: total_all,
                    sum_harga: sum_harga || 0,
                    now_harga: now_harga
                },
                msg_material: "",
                disabled: false,
            }));
        }
    }

    getMaterial() {
        Stok.get(this.state.data_auth).then((result) => {
            console.log("result", result);
            const data = result.data.data.stok.map((el) => {
                return {
                    name: `${el.nama_material} (${el.stok} pcs)`,
                    value: JSON.stringify({ id_material: el.id_material_2, id_stok_gudang: el.id_stok_gudang, stok: el.stok, nama_material: el.nama_material, harga_material: el.harga_material })
                }
            });

            this.setState({
                comp_material: [{ name: 'Pilih Material', value: '' }, ...data],
            });
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    handleKeterangan(e) {
        this.setState(prevState => ({
            stok_new: {
                ...prevState.stok_new,
                keterangan: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleNamaToko(e) {
        console.log(e.value);
        this.setState(prevState => ({
            stok_new: {
                ...prevState.stok_new,
                nama_toko: e?.value,
            }
        }), () => {
            this.validated();
        })
    }

    getTokoMaterial() {
        Stok.getTokoMaterial({ id: 'all' }, this.state.data_auth).then((result) => {
            const data = result.data.data.toko.map((el) => {
                return {
                    label: el.nama_toko,
                    value: el.id_toko_material
                }
            });

            this.setState({
                toko_material: data
            })
        })
    }


    componentDidMount(): void {
        this.getMaterial();
        this.getTokoMaterial();
    }

    handleOpenMaterial() {
        this.setState({
            isOpen: true,
        })
    }

    handleCloseMaterial() {
        this.setState({
            isOpen: false,
        })
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.isOpen != this.state.isOpen) {
            this.getMaterial();
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Stok Masuk" />

                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                </div>

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

                {this.state.navigation}

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <Title title="Tambah Stok Masuk" />
                            <div className='card'>
                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor="">Material</label>
                                        {/* <select name="" onChange={this.handleMaterial} className='form-control' id="">
                                            <option value="{}">Pilih Material</option>
                                            {this.state.comp_material}
                                        </select> */}
                                        <SelectSearch options={this.state.comp_material} onChange={this.handleMaterial} search />
                                        <a href="#" onClick={this.handleOpenMaterial}>Tambah Material Baru?</a>
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Jumlah Stok Masuk</label>
                                        <input type="number" onChange={this.handleStok} className='form-control' />
                                        {this.state.msg_material}
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="">Nama Toko</label>
                                        <CreatableSelect isClearable options={this.state.toko_material} onChange={this.handleNamaToko} />
                                        <small><span className='text-danger'>*</span>Ketik lalu enter jika ingin menambah data yang baru.</small>
                                    </div>

                                    {/* <div className='form-group mt-3'>
                                        <label htmlFor="">Keterangan</label>
                                        <textarea name="" className='form-control' onChange={this.handleKeterangan} id="" cols={30} rows={10}></textarea>

                                    </div> */}

                                    <div className='d-flex'>
                                        <div className='mr-5'>
                                            <div>
                                                <h5>Data Stok Dulu</h5>
                                                <hr />
                                            </div>
                                            <div>
                                                <small>Nama Material</small>
                                                <h4>{this.state.stok_old.nama_material}</h4>
                                            </div>
                                            <div>
                                                <small>Stok Tersedia</small>
                                                <h4>{this.state.stok_old.stok} pcs</h4>
                                            </div>
                                            <div>
                                                <small>Harga Satuan</small>
                                                <h4>Rp. {System.convertRupiah(this.state.stok_old.harga)}</h4>
                                            </div>
                                            <div>
                                                <small>Total Harga Asset Dulu</small>
                                                <h4>Rp. {System.convertRupiah(this.state.stok_old.total_harga)}</h4>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <h5>Data Stok Baru</h5>
                                                <hr />
                                            </div>
                                            <div>
                                                <small>Stok Yang Ditambah</small>
                                                <h4>{this.state.stok_new.stok_in} pcs</h4>
                                            </div>
                                            <div>
                                                <small>Total Stok Yang Ditambah</small>
                                                <h4>{this.state.stok_new.total_stok} pcs</h4>
                                            </div>
                                            <div>
                                                <small>Total Harga Asset Ditambah</small>
                                                <h4>Rp. {System.convertRupiah(this.state.stok_new.sum_harga)}</h4>
                                            </div>
                                            <div>
                                                <small>Hasil Total Harga Asset</small>
                                                <h4>Rp. {System.convertRupiah(this.state.stok_new.now_harga)}</h4>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='mt-3 text-right'>
                                        <Link to={'/stok_all'} className='btn btn-danger'>Kembali</Link>
                                        <Button className='btn btn-primary ml-2' disabled={this.state.disabled} onClick={this.handleSimpan}>Tambah <LoadingButton show={this.state.loading} /></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalAddMaterial isOpen={this.state.isOpen} handleClose={this.handleCloseMaterial} />
            </>
        )
    }
}

export default AddStokIn;