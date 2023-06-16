import React from 'react';
import Auth from '../module/Auth';

class Header extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            nama: JSON.parse(localStorage.getItem("user-cozystok")).name,
            img: "",
        }
    }

    getUserDetail() {
        const data_auth = localStorage.getItem("user-cozystok");
        Auth.check(data_auth).then((result: any) => {
            console.log(result);
            if (result.response === true) {
                this.setState(prevState => ({
                    img: result.data.data.detail_user.img,
                    nama: result.data.data.user.first_name + " " + result.data.data.user.last_name
                }))
            }
        })
    }

    componentDidMount(): void {
        this.getUserDetail();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.change !== this.props.change) {
            this.getUserDetail();
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <header id="page-topbar">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box">
                                <a href="/dashboard" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src="assets/images/logo-sm-dark.png" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="assets/images/logo-dark.png" alt="" height="20" />
                                    </span>
                                </a>

                                <a href="/dashboard" className="logo logo-light">
                                    <span className="logo-sm">
                                        <img src="assets/images/logo-sm-light.png" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="assets/images/logo-light.png" alt="" height="20" />
                                    </span>
                                </a>
                            </div>

                            <button type="button" className="btn btn-sm px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
                                <i className="mdi mdi-backburger"></i>
                            </button>
                        </div>

                        <div className="d-flex">
                            {/* <div className="dropdown d-inline-block">
                                <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-bell-outline"></i>
                                    <span className="badge badge-danger badge-pill">3</span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                                    aria-labelledby="page-header-notifications-dropdown">
                                    <div className="p-3">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="m-0 font-weight-medium text-uppercase"> Notifications </h6>
                                            </div>
                                            <div className="col-auto">
                                                <span className="badge badge-pill badge-danger">New 3</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-simplebar style={{ maxHeight: 230 }}>
                                        <a href="" className="text-reset notification-item">
                                            <div className="media">
                                                <div className="avatar-xs mr-3">
                                                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                        <i className="mdi mdi-cart"></i>
                                                    </span>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="mt-0 mb-1">Your order is placed</h6>
                                                    <div className="font-size-12 text-muted">
                                                        <p className="mb-1">If several languages coalesce the grammar</p>
                                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 3 min ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="" className="text-reset notification-item">
                                            <div className="media">
                                                <img src="assets/images/users/avatar-3.jpg"
                                                    className="mr-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="media-body">
                                                    <h6 className="mt-0 mb-1">Andrew Mackie</h6>
                                                    <div className="font-size-12 text-muted">
                                                        <p className="mb-1">It will seem like simplified English.</p>
                                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="" className="text-reset notification-item">
                                            <div className="media">
                                                <div className="avatar-xs mr-3">
                                                    <span className="avatar-title bg-success rounded-circle font-size-16">
                                                        <i className="mdi mdi-package-variant-closed"></i>
                                                    </span>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="mt-0 mb-1">Your item is shipped</h6>
                                                    <div className="font-size-12 text-muted">
                                                        <p className="mb-1">One could refuse to pay expensive translators.</p>
                                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 3 min ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>

                                        <a href="" className="text-reset notification-item">
                                            <div className="media">
                                                <img src="assets/images/users/avatar-4.jpg"
                                                    className="mr-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="media-body">
                                                    <h6 className="mt-0 mb-1">Dominic Kellway</h6>
                                                    <div className="font-size-12 text-muted">
                                                        <p className="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="p-2 border-top">
                                        <a className="btn-link btn btn-block text-center" href="javascript:void(0)">
                                            <i className="mdi mdi-arrow-down-circle mr-1"></i> Load More..
                                        </a>
                                    </div>
                                </div>
                            </div> */}

                            <div className="dropdown d-inline-block">
                                <button type="button" onClick={() => document.location.href = '/pengaturan'} className="btn header-item waves-effect">
                                    <img className="rounded-circle header-profile-user" width={60} src={`https://cozyhome.api.weworks.ink${this.state.img}`}
                                        alt="Header Avatar" />
                                    <span className="d-none d-sm-inline-block ml-1">{this.state.nama}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </>
        )
    }
}

export default Header;