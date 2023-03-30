import React from "react";
import DataTable from "react-data-table-component";
import moment from 'moment';
import Stok from "../module/Stok";

class ListMasuk extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            column: [
                {
                    name: "No",
                    selector: row => row.no,
                    sortable: true,
                },
                {
                    name: "Nama Material",
                    selector: row => row.nama_material,
                    sortable: true,
                },
                {
                    name: "Kategori Material",
                    selector: row => row.kategori_material,
                    sortable: true,
                },
                {
                    name: "Stok Masuk",
                    selector: row => row.stok_in,
                    sortable: true,
                },
                {
                    name: "Tanggal",
                    selector: row => row.updated_at,
                    sortable: true,
                },
            ],

            data: [],
            loading: true,
            data_auth: localStorage.getItem("user-cozystok"),
            search: "",
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.getStokIn = this.getStokIn.bind(this);
    }

    getStokIn() {
        this.setState({
            loading: true,
        });

        Stok.getIn(this.state.data_auth).then((result) => {
            console.log(result);

            let no = 1;
            result.data.data.stok_in.map(el => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
                el['updated_at'] = moment(el.updated_at).format("DD-MM-YYYY HH:mm:ss");
            })

            this.setState(prevState => ({
                data: result.data.data.stok_in,
                loading: false,
            }))
        }).catch((rejects) => {
            console.log(rejects);
        });
    }

    componentDidMount(): void {
        this.getStokIn();
    }

    handleSearch(e) {
        this.setState({
            search: e.target.value,
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="mt-3 mb-3 d-flex flex-row-reverse">
                    <div>
                        <input type="text" onChange={this.handleSearch} className="form-control" placeholder="Cari Nama Material" />
                    </div>
                </div>
                <DataTable columns={this.state.column} progressPending={this.state.loading} data={this.state.data.filter((data) => {
                    if (this.state.search === "") {
                        return data;
                    } else if (data.nama_material.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return data;
                    }
                })} pagination />
            </>
        )
    }
}

export default ListMasuk;