import React from 'react';
import { NavLink } from 'react-bootstrap';

class Sidebar extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="vertical-menu">

                    <div data-simplebar className="h-100">

                        <div id="sidebar-menu">
                            <ul className="metismenu list-unstyled" id="side-menu">
                                <li className="menu-title">Menu</li>

                                <li>
                                    <NavLink className="waves-effect" href="/dashboard">
                                        <span className="mdi mdi-view-dashboard"></span>&nbsp;&nbsp;&nbsp;
                                        <span>Dashboard</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="waves-effect" href="/stok_all">
                                        <span className="mdi mdi-basket"></span>&nbsp;&nbsp;&nbsp;
                                        <span>List Stok</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="waves-effect" href="/material_all">
                                        <span className="mdi mdi-toolbox"></span>&nbsp;&nbsp;&nbsp;
                                        <span>List Material</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="waves-effect" href="/alat">
                                        <span className="mdi mdi-tools"></span>&nbsp;&nbsp;&nbsp;
                                        <span>List Alat</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="waves-effect" href="/list_harga">
                                        <span className="mdi mdi-currency-usd"></span>&nbsp;&nbsp;&nbsp;
                                        <span>List Harga</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="waves-effect" href="/pengaturan">
                                        <span className="mdi mdi-cogs"></span>&nbsp;&nbsp;&nbsp;
                                        <span>Pengaturan</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="waves-effect" href="/logout">
                                        <span className="mdi mdi-logout"></span>&nbsp;&nbsp;&nbsp;
                                        <span>Logout</span>
                                    </NavLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Sidebar;