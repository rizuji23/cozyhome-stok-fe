import React from "react";
import Stok from "../module/Stok";
import System from "../module/System";

export default class CountAlat extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            data_auth: localStorage.getItem("user-cozystok"),
            total_harga: 0,
            qty: 0,
        }
    }

    getCountAlat() {
        Stok.getCountAlat(this.state.data_auth).then((result) => {
            console.log("DAWDAWDWAD", result.data.data.total_harga);
            this.setState({
                total_harga: result.data.data.total_harga.total_harga__sum,
                qty: result.data.data.qty.qty__sum
            })
        })
    }

    componentDidMount(): void {
        this.getCountAlat();
    }

    render(): React.ReactNode {
        return (
            <>
                <div className='row'>
                    <div className='col-sm'>
                        <div className="card">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <h5 className="font-size-14">Total Asset Alat</h5>
                                    </div>
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <span className="mdi mdi-toolbox"></span>
                                        </span>
                                    </div>
                                </div>
                                <h4 className="m-0 align-self-center">Rp. {System.convertRupiah(this.state.total_harga)}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm'>
                        <div className="card">
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <h5 className="font-size-14">Total Qty Alat</h5>
                                    </div>
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <span className="mdi mdi-toolbox"></span>
                                        </span>
                                    </div>
                                </div>
                                <h4 className="m-0 align-self-center">{this.state.qty} Pcs</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}