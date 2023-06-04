import React from "react";
import { Button, Modal } from "react-bootstrap";
import System from "../module/System";
import MaterialModule from "../module/MaterialModule";
import { toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";
import ModalAddKategori from "./ModalAddKategori";

class ModalAddMaterial extends React.Component<any, any> {
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
        }
        this.getKategori = this.getKategori.bind(this);
        this.validated = this.validated.bind(this);
        this.handleNamaMaterial = this.handleNamaMaterial.bind(this);
        this.getKategori = this.getKategori.bind(this);
        this.handleHarga = this.handleHarga.bind(this);
        this.handleKategori = this.handleKategori.bind(this);
        this.handleSimpan = this.handleSimpan.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleOpenKategori = this.handleOpenKategori.bind(this);
        this.handleCloseKategori = this.handleCloseKategori.bind(this);
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

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen != this.props.isOpen) {
            this.getKategori();
        }

        if (prevState.isOpen != this.state.isOpen) {
            this.getKategori();
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Material Baru</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                            <a href="#" onClick={this.handleOpenKategori}>Tambah Kategori Baru?</a>
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Harga</label>
                            <input type="text" value={System.convertRupiah(this.state.material.harga)} onChange={this.handleHarga} className='form-control' />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleClose}>
                            Batal
                        </Button>
                        <Button className='btn btn-primary' onClick={this.handleSimpan} disabled={this.state.disabled}>Tambah <LoadingButton show={this.state.loading} /></Button>
                    </Modal.Footer>
                </Modal>

                <ModalAddKategori handleClose={this.handleCloseKategori} isOpen={this.state.isOpen} />

            </>
        )
    }
}

export default ModalAddMaterial;