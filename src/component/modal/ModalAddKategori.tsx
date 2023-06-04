import React from "react";
import { Button, Modal } from "react-bootstrap";
import MaterialModule from "../module/MaterialModule";
import moment from "moment";
import System from "../module/System";
import { toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";

class ModalAddKategori extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            nama_kategori: "",
            disabled: true,
            loading: false,
            data_auth: localStorage.getItem("user-cozystok"),
            data: [],
        }

        this.validated = this.validated.bind(this);
        this.handleNamaKategori = this.handleNamaKategori.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleSimpan = this.handleSimpan.bind(this);
        this.getKategori = this.getKategori.bind(this);
    }


    getKategori() {
        this.setState({
            loading: true,
        })
        MaterialModule.getKategori(this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.kategori_material.map((el) => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['updated_at'] = moment(el.updated_at, "YYYY-MM-DD").format("DD-MM-YYYY");
            });

            this.setState({
                data: result.data.data.kategori_material,
                loading: false,
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
                <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Kategori Material Baru</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className='form-group'>
                            <label htmlFor="">Nama Kategori</label>
                            <input type="text" value={this.state.nama_kategori} onChange={this.handleNamaKategori} className='form-control' />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleClose}>
                            Batal
                        </Button>
                        <Button onClick={this.handleSimpan} className='btn btn-primary ml-2' disabled={this.state.disabled}>Tambah <LoadingButton show={this.state.loading} /></Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalAddKategori;