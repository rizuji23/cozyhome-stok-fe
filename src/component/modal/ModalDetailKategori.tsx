import React from "react";
import { Button, Modal } from "react-bootstrap";
import MaterialModule from "../module/MaterialModule";
import moment from "moment";
import System from "../module/System";
import { toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";

class ModalDetailKategori extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            nama_kategori: "",
            disabled: true,
            loading: false,
            data_auth: localStorage.getItem("user-cozystok"),
            data: {},
            data_material: []
        }

        this.validated = this.validated.bind(this);
        this.handleNamaKategori = this.handleNamaKategori.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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

    handleEdit() {
        this.setState({
            loading: true,
            disabled: true,
        })
        MaterialModule.updateKategori({ nama_kategori: this.state.nama_kategori, id: this.props.isOpen.data?.kategori_material?.id_kategori_material }, this.state.data_auth).then((result) => {
            console.log(result);
            toast.success("Kategoti Material berhasil diedit");
            this.setState({
                loading: false,
                disabled: true,
            });
            this.clearState();
            this.props.handleClose()
            this.props.getKategori()
        }).catch((rejects) => {
            toast.error("Kategoti Material gagal diedit");
            console.log(rejects);
            this.setState({
                loading: false,
                disabled: true,
            });
            this.clearState();
        })
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen !== this.props.isOpen) {
            console.log(this.props.isOpen)
            this.setState({
                nama_kategori: this.props.isOpen.data?.kategori_material?.nama_kategori,
                data_material: this.props.isOpen.data?.material,
            })
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail Kategori Material</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Nama Kategori</label>
                            <input type="text" value={this.state.nama_kategori} onChange={this.handleNamaKategori} className='form-control' />
                        </div>

                        <div>
                            <h6>List Material: </h6>
                            <ul className="list-group">
                                {
                                    this.state.data_material.map(el => {
                                        return <li className="list-group-item">{el.nama_material}</li>
                                    })
                                }

                            </ul>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleClose}>
                            Batal
                        </Button>
                        <Button onClick={this.handleEdit} className='btn btn-primary ml-2' disabled={this.state.disabled}>Edit <LoadingButton show={this.state.loading} /></Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalDetailKategori;