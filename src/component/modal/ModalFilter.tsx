import React from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ModalFilter extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            startDate: Date.now(),
            endDate: Date.now(),
        }

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    clearState() {
        this.setState({
            startDate: Date.now(),
            endDate: Date.now(),
        })
    }

    handleStartDate(e) {
        this.setState({
            startDate: e,
        })
    }

    handleEndDate(e) {
        this.setState({
            endDate: e
        })
    }

    onChangeDate(dates) {
        const [start, end] = dates;
        this.handleStartDate(start);
        this.handleEndDate(end);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.clearState();
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="">Jarak Tanggal</label>
                            <DatePicker selected={this.state.startDate} onChange={this.onChangeDate} selectsRange inline startDate={this.state.startDate} endDate={this.state.endDate} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleClose}>
                            Batal
                        </Button>
                        <Button variant="primary" onClick={() => this.props.handleFilter(this.state.startDate, this.state.endDate)}>
                            Filter
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalFilter;