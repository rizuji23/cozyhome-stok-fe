import React from "react";
import { Button, Modal } from "react-bootstrap";
import System from "../module/System";
import MaterialModule from "../module/MaterialModule";
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";
import ModalAddKategori from "./ModalAddKategori";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class ModalDetailMaterial extends React.Component<any, any> {
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
            isOpen: false,
            loading_full: false,
        }
        this.getKategori = this.getKategori.bind(this);
        this.validated = this.validated.bind(this);
        this.handleNamaMaterial = this.handleNamaMaterial.bind(this);
        this.getKategori = this.getKategori.bind(this);
        this.handleHarga = this.handleHarga.bind(this);
        this.handleKategori = this.handleKategori.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleOpenKategori = this.handleOpenKategori.bind(this);
        this.handleCloseKategori = this.handleCloseKategori.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleOpenKategori() {
        this.setState({
            isOpen: true,
        })
    }

    handleCloseKategori() {
        this.setState({
            isOpen: false,
        })
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

    handleEdit() {
        this.setState({
            loading: true,
            disabled: true,
        });
        const data = {
            nama_material: this.state.material.nama_material,
            kategori_material: this.state.material.kategori,
            harga: System.convertInt(this.state.material.harga),
            id: this.props.isOpen.data.material.id_material
        }

        MaterialModule.update(data, this.state.data_auth).then((result) => {
            console.log(result);
            toast.success("Material berhasil diedit");
            this.setState({
                loading: false,
                disabled: false,
            }, () => {
                this.clearState()
                this.props.getMaterial();
                this.props.handleClose();
            });
        }).catch((rejects) => {
            console.log(rejects);
            toast.error("Material gagal diedit");
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

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen != this.props.isOpen) {
            this.getKategori();
            console.log(this.props.isOpen)
            this.setState({
                material: {
                    nama_material: this.props.isOpen.data?.material?.nama_material,
                    kategori: this.props.isOpen.data?.material?.id_kategori,
                    kategori_2: this.props.isOpen.data?.material?.nama_kategori,
                    harga: System.convertRupiah(this.props.isOpen.data?.material?.harga || "0"),
                    id_kategori: this.props.isOpen.data?.material?.id_kategori
                }
            })
        }
    }

    handleDelete() {
        MySwal.fire({
            title: "Apa kamu yakin?",
            html: <>
                <div className='text-left'>
                    <p>Yang akan ikut terhapus: </p>
                    <ul>
                        <li>List Stok Semua</li>
                        <li>Kebutuhan Material (Project Management)</li>
                        <li>Harga Kebutuhan Material (Project Management)</li>
                    </ul>
                </div>
            </>,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya',
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({
                    loading_full: true,
                });

                MaterialModule.delete(this.props.isOpen.data.material.id_material, this.state.data_auth).then((result) => {
                    this.setState({
                        loading_full: false,
                    });

                    this.clearState()
                    this.props.getMaterial();
                    this.props.handleClose();
                    toast.success("Material berhasil dihapus.");
                }).catch((err) => {
                    toast.error("Material gagal dihapus.");
                })
            }
        })
    }

    render(): React.ReactNode {
        return (
            <>
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
                <Modal show={this.props.isOpen.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail Material Baru</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Nama Material</label>
                            <input type="text" value={this.state.material.nama_material} onChange={this.handleNamaMaterial} className='form-control' />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Kategori</label>
                            <select name="" onChange={this.handleKategori} className='form-control' id="">
                                <option value={this.state.material.kategori}>{this.state.material.kategori_2}</option>
                                <option value="">Pilih Kategori</option>
                                {this.state.kategori}
                            </select>
                            <a href="#" onClick={this.handleOpenKategori}>Tambah Kategori Baru?</a>
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Harga</label>
                            <input type="text" value={this.state.material.harga} onChange={this.handleHarga} className='form-control' />
                        </div>

                        <div className="alert alert-danger">
                            <div className="d-flex">
                                <b className="flex-grow-1">Zona Berbahaya</b>
                                <button className="btn btn-danger btn-sm" onClick={this.handleDelete}>Hapus</button>
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleClose}>
                            Batal
                        </Button>
                        <Button className='btn btn-primary' onClick={this.handleEdit} disabled={this.state.disabled}>Edit <LoadingButton show={this.state.loading} /></Button>
                    </Modal.Footer>
                </Modal>

                <ModalAddKategori handleClose={this.handleCloseKategori} isOpen={this.state.isOpen} />

            </>
        )
    }
}

export default ModalDetailMaterial;