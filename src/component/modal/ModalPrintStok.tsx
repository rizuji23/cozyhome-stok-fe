import React from "react";
import { Button, Modal } from "react-bootstrap";

class ModalPrintStok extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            tipe_print: "",
            comp_filter: "",
            disabled: true,
            error_print: {
                show: false,
                msg: "",
            },
            error_filter: {
                show: false,
                msg: "",
            },
            tipe_filter: "",
            comp_date: "",

        }

        this.handleTipePrint = this.handleTipePrint.bind(this);
        this.handleTipeFilter = this.handleTipeFilter.bind(this);
        this.handleTypeDate = this.handleTypeDate.bind(this);
    }

    handleTipePrint(e) {
        this.setState({
            tipe_print: e.target.value,
        })
        if (e.target.value.length === 0) {
            this.setState({
                disabled: true,
                error_print: {
                    show: true,
                    msg: "Tipe Print tidak boleh kosong.",
                },
                comp_filter: "",

            });
        } else {

            if (e.target.value === "Semua") {
                this.setState({
                    comp_filter: <><div className="form-group">
                        <label htmlFor="">Tipe Filter</label>
                        <select name="" onChange={this.handleTypeDate} className="form-control" id="">
                            <option value="">Pilih Tipe Filter</option>
                            <option value="Semua">Semua</option>
                            <option value="Tanggal">Tanggal</option>
                            <option value="Bulan">Bulan</option>
                            <option value="Tahun">Tahun</option>
                        </select>
                    </div></>
                })
            } else {
                this.setState({
                    comp_filter: "",
                })
            }
        }
    }

    handleTipeFilter(e) {
        this.setState({
            tipe_filter: e.target.value,
        })
        if (e.target.value.length === 0) {
            this.setState({
                disabled: true,
                error_filter: {
                    show: true,
                    msg: "Tipe Filter tidak boleh kosong.",
                },

            });
        } else {

            if (e.target.value === "Semua") {
                this.setState({
                    comp_filter: <><div className="form-group">
                        <label htmlFor="">Tipe Filter</label>
                        <select name="" onChange={this.handleTypeDate} className="form-control" id="">
                            <option value="">Pilih Tipe Filter</option>
                            <option value="Semua">Semua</option>
                            <option value="Tanggal">Tanggal</option>
                            <option value="Bulan">Bulan</option>
                            <option value="Tahun">Tahun</option>
                        </select>
                    </div></>
                })
            } else {
                this.setState({
                    comp_filter: "",
                    comp_date: "",
                })
            }
        }
    }

    handleTypeDate(e) {
        console.log(e)
        if (e.target.value.length !== 0) {
            if (e.target.value === "Semua") {
                this.setState({
                    comp_date: "",
                });
            } else if (e.target.value === "Tanggal") {
                this.setState({
                    comp_date: <>
                        <div className="form-group">
                            <label htmlFor="">Dari Tanggal</label>
                            <input type="date" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Sampai Tanggal</label>
                            <input type="date" className="form-control" />
                        </div>
                    </>
                })
            } else if (e.target.value === "Bulan") {
                this.setState({
                    comp_date: <>
                        <div className="form-group">
                            <label htmlFor="">Bulan</label>
                            <input type="month" className="form-control" />
                        </div>
                    </>
                });
            } else if (e.target.value === "Tahun") {
                this.setState({
                    comp_date: <>
                        <div className="form-group">
                            <label htmlFor="">Tahun</label>
                            <input type="year" className="form-control" />
                        </div>
                    </>
                })
            }
        } else {
            this.setState({
                disabled: true,
                error_filter: {
                    show: true,
                    msg: "Tipe Filter tidak boleh kosong.",
                },
                comp_date: ""
            });
        }

    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Print Stok</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="">Tipe Print</label>
                            <select name="" className="form-control" onChange={this.handleTipePrint} id="">
                                <option value="">Pilih Tipe Print</option>
                                <option value="Perbandingan">Perbandingan</option>
                                <option value="Semua">Semua</option>
                            </select>
                        </div>

                        {
                            this.state.comp_filter
                        }

                        {
                            this.state.comp_date
                        }


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleClose}>
                            Batal
                        </Button>
                        <Button variant="primary" onClick={this.props.handleClose}>
                            Print
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalPrintStok;