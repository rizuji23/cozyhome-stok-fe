import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import System from './module/System';
import Auth from './module/Auth';
import { Navigate } from 'react-router-dom';
import AlertBottom from './etc/AlertBottom';
import LoadingButton from './etc/LoadingButton';

class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                username: "",
                password: "",
            },
            disabled: true,
            loading: false,
            msg_password: "",
            isLogged: false,
        }

        this.validated = this.validated.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    validated() {
        if (System.isObjectEmpty(this.state.login)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    handleUsername(e) {
        this.setState(prevState => ({
            login: {
                ...prevState.login,
                username: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }

    handlePassword(e) {
        this.setState(prevState => ({
            login: {
                ...prevState.login,
                password: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }


    clearState() {
        this.setState(prevState => ({
            login: {
                username: "",
                password: "",
            }
        }));
        this.validated();
    }

    handleLogin() {
        const data = {
            username: this.state.login.username,
            password: this.state.login.password,
        }

        this.setState({
            disabled: true,
            loading: true,
        });

        Auth.login(data).then((result: any) => {
            console.log(result);
            this.setState({
                disabled: false,
                loading: false,
            });
            this.setState({
                isLogged: <Navigate to="/dashboard" replace={true} />
            })
            localStorage.setItem("user-cozystok", JSON.stringify(result.data));
            localStorage.setItem("logged-cozystok", JSON.stringify(true));
        }).catch((reject) => {
            this.setState({
                msg_password: <AlertBottom show={true} msg="Username atau Password salah." />,
                loading: false,
            })
            this.clearState();
        })
    }


    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Login" />
                {this.state.isLogged}
                <div className='bg-primary bg-pattern' style={{ height: '100vh' }}>
                    <div className="account-pages pt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center mb-5">
                                        <a href="index.html" className="logo"><img src="/assets/images/logo-light.png" height="24" alt="logo" /></a>
                                        <h5 className="font-size-16 text-white-50 mb-4">Stok Management</h5>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <div className="p-2">
                                                <h5 className="mb-5 text-center">Login</h5>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group mb-4">
                                                            <label htmlFor="username">Username</label>
                                                            <input type="text" value={this.state.login.username} onChange={this.handleUsername} className="form-control" id="username" placeholder="Enter username" />
                                                        </div>
                                                        <div className="form-group mb-4">
                                                            <label htmlFor="userpassword">Password</label>
                                                            <input type="password" value={this.state.login.password} onChange={this.handlePassword} className="form-control" id="userpassword" placeholder="Enter password" />
                                                            {this.state.msg_password}
                                                        </div>

                                                        <div className="mt-4">
                                                            <button className="btn btn-success btn-block waves-effect waves-light" disabled={this.state.disabled} onClick={this.handleLogin}>Login <LoadingButton show={this.state.loading} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default Login;