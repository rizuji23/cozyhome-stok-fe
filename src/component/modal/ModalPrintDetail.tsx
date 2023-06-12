import React from "react";
import { Button, Modal } from "react-bootstrap";
import Stok from "../module/Stok";
import moment from "moment";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { withRouter } from "../etc/withRouter";

class ModalPrintDetail extends React.Component<any, any> {
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
            date: {
                start_date: "",
                end_date: "",
            },
            month: "",
            year: "",
            data_auth: localStorage.getItem("user-cozystok"),
            navigate: false,
        }

        this.handleTypeDate = this.handleTypeDate.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
    }

    handleStartDate(e) {
        this.setState(prevState => ({
            date: {
                ...prevState.date,
                start_date: e.target.value,
            }
        }));
    }

    handleEndDate(e) {
        this.setState(prevState => ({
            date: {
                ...prevState.date,
                end_date: e.target.value,
            }
        }))
    }

    handleMonth(e) {
        this.setState({
            month: e.target.value,
        });
    }

    handleYear(e) {
        this.setState({
            year: e.target.value
        })
    }

    handleTypeDate(e) {
        console.log(e);
        this.setState({
            tipe_filter: e.target.value,
        })
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
                            <input type="date" onChange={this.handleStartDate} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Sampai Tanggal</label>
                            <input type="date" onChange={this.handleEndDate} className="form-control" />
                        </div>
                    </>
                })
            } else if (e.target.value === "Bulan") {
                this.setState({
                    comp_date: <>
                        <div className="form-group">
                            <label htmlFor="">Bulan</label>
                            <input type="month" onChange={this.handleMonth} className="form-control" />
                        </div>
                    </>
                });
            } else if (e.target.value === "Tahun") {
                this.setState({
                    comp_date: <>
                        <div className="form-group">
                            <label htmlFor="">Tahun</label>
                            <input type="year" onChange={this.handleYear} className="form-control" />
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

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({
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
                date: {
                    start_date: "",
                    end_date: "",
                },
                month: "",
                year: "",
                data_auth: localStorage.getItem("user-cozystok"),
            })
        }
    }

    handlePrint() {
        var data: any = {
            id: this.props.id,
            tipe_filter: this.state.tipe_filter
        };
        if (this.state.tipe_filter === "Semua") {
            data = {
                ...data
            }
        } else if (this.state.tipe_filter === "Tanggal") {
            data = {
                ...data,
                start_date: this.state.date.start_date,
                end_date: this.state.date.end_date
            }
        } else if (this.state.tipe_filter === "Bulan") {
            data = {
                ...data,
                month: moment(this.state.month).format("MM"),
                year: moment(this.state.month).format("YYYY")
            }
        } else if (this.state.tipe_filter === "Tahun") {
            data = {
                ...data,
                year: this.state.year,
            }
        } else {
            data = {
                ...data,
            }
        }

        console.log("data", data)

        Stok.printDetail(data, this.state.data_auth).then((result) => {
            console.log(result);
            if (result.data.data.modified.length !== 0) {
                this.setState({
                    navigate: <Navigate to={'/print_detail'} state={{ data: result.data.data, date: data }} />
                });
            } else {
                toast.error("Data tidak ditemukan.")
            }
        })
    }

    render(): React.ReactNode {
        return (
            <>
                {this.state.navigate}
                <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Print Stok</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="form-group">
                            <label htmlFor="">Tipe Filter</label>
                            <select name="" onChange={this.handleTypeDate} className="form-control" id="">
                                <option value="">Pilih Tipe Filter</option>
                                <option value="Semua">Semua</option>
                                <option value="Tanggal">Tanggal</option>
                                <option value="Bulan">Bulan</option>
                                <option value="Tahun">Tahun</option>
                            </select>
                        </div>

                        {
                            this.state.comp_date
                        }


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleClose}>
                            Batal
                        </Button>
                        <Button variant="primary" onClick={this.handlePrint}>
                            Print
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default withRouter(ModalPrintDetail);