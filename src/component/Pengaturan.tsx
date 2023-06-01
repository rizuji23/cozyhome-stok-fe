import React from "react";
import HelmetTitle from "./etc/HelmetTitle";
import Header from "./etc/Header";
import Sidebar from "./etc/Sidebar";
import Title from "./etc/Title";
import { Button } from "react-bootstrap";
import Auth from "./module/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Navigate } from "react-router-dom";
import System from "./module/System";
import LoadingButton from "./etc/LoadingButton";

class Pengaturan extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: JSON.parse(localStorage.getItem("user-cozystok")).username,
                old_password: "",
                new_password: "",
            },
            disabled: true,
            loading: false,
            data_auth: localStorage.getItem("user-cozystok"),
            navigation: false,
        }

        this.validated = this.validated.bind(this);
        this.handleOldPassword = this.handleOldPassword.bind(this);
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    validated() {
        if (System.isObjectEmpty(this.state.user)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    clearState() {
        this.setState({
            user: {
                username: JSON.parse(localStorage.getItem("user-cozystok")).username,
                old_password: "",
                new_password: "",
            },
        })
    }

    handleOldPassword(e) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                old_password: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleNewPassword(e) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                new_password: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleChange() {
        this.setState({
            disabled: true,
            loading: true,
        })
        const data = {
            username: this.state.user.username,
            old_password: this.state.user.old_password,
            new_password: this.state.user.new_password,
        }

        Auth.changePassword(data, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                disabled: false,
                loading: false,
                navigation: <Navigate to={'/'} />
            }, () => {
                localStorage.setItem("user-cozystok", JSON.stringify({ "refresh": "", "access": "", "name": "", "role": 123123, "username": "", "id_user": 123123 }))
            });
            toast.success("Password berhasil diubah");
            this.clearState();
        }).catch((reject) => {
            console.log(reject);
            toast.error("Password gagal diubah");
            this.setState({
                disabled: true,
                loading: false,
            });
            this.clearState();
        })
    }


    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Pengaturan" />

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
                            <Title title="Pengaturan" />

                            <div className="card">
                                <div className="card-body">
                                    <h5>Ganti Password</h5>
                                    <hr />

                                    <div className="form-group">
                                        <label htmlFor="">Password Lama</label>
                                        <input type="password" value={this.state.user.old_password} onChange={this.handleOldPassword} className="form-control" />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label htmlFor="">Password Baru</label>
                                        <input type="password" value={this.state.user.new_password} onChange={this.handleNewPassword} className="form-control" />
                                    </div>

                                    <div className="text-right">
                                        <Button className="btn btn-primary" disabled={this.state.disabled} onClick={this.handleChange}>Ganti <LoadingButton show={this.state.loading} /></Button>
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

export default Pengaturan;