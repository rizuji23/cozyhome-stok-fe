import React from 'react';
import HelmetTitle from './etc/HelmetTitle';

class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Login" />

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
                                                <form className="form-horizontal" action="/dashboard">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group mb-4">
                                                                <label htmlFor="username">Username</label>
                                                                <input type="text" className="form-control" id="username" placeholder="Enter username" />
                                                            </div>
                                                            <div className="form-group mb-4">
                                                                <label htmlFor="userpassword">Password</label>
                                                                <input type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                                            </div>

                                                            <div className="mt-4">
                                                                <button className="btn btn-success btn-block waves-effect waves-light" type="submit">Login</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
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