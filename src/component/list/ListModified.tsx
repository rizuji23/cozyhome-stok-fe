import React from "react";
import DataTable from "react-data-table-component";
import moment from 'moment';
import Stok from "../module/Stok";

class ListModified extends React.Component<any, any> {
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
                    name: "Stok",
                    selector: row => row.stok,
                    sortable: true,
                },
                {
                    name: "Stok Masuk",
                    selector: row => row.stok_in,
                    sortable: true,
                },
                {
                    name: "Stok Out",
                    selector: row => row.stok_out,
                    sortable: true,
                },
                {
                    name: "Last Stok",
                    selector: row => row.last_stok,
                    sortable: true,
                },
                {
                    name: "Keterangan",
                    selector: row => row.keterangan,
                    sortable: true,
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                    sortable: true,
                },
                {
                    name: "Tanggal Update",
                    selector: row => row.updated_at,
                    sortable: true,
                },
            ],

            data: [],
            loading: true,
            data_auth: localStorage.getItem("user-cozystok"),
            search: "",
            sort: "all",
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.getModifiedIn = this.getModifiedIn.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    getModifiedIn() {
        this.setState({
            loading: true,
        });

        Stok.getModifiedIn({ sort: this.state.sort }, this.state.data_auth).then((result) => {

            let no = 1;
            result.data.data.modified_stok.map(el => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
                el['updated_at'] = moment(el.updated_at).format("DD-MM-YYYY HH:mm:ss");
            })

            this.setState(prevState => ({
                data: result.data.data.modified_stok,
                loading: false,
            }))
        }).catch((rejects) => {
            console.log(rejects);
        });
    }

    componentDidMount(): void {
        this.getModifiedIn();
    }

    handleSearch(e) {
        this.setState({
            search: e.target.value,
        })
    }

    handleFilter(e) {
        if (e.target.value.length === 0) {
            this.setState({
                sort: "all",
            }, () => {
                this.getModifiedIn()
            });
        } else {
            this.setState({
                sort: e.target.value,
            }, () => {
                this.getModifiedIn()
            })
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="mt-3 mb-3 d-flex flex-row-reverse">
                    <div className="ml-2">
                        <select name="" onChange={this.handleFilter} className="form-control" id="">
                            <option value="">Filter</option>
                            <option value="Stok Masuk">Stok Masuk</option>
                            <option value="Stok Keluar">Stok Keluar</option>
                        </select>
                    </div>
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

export default ListModified;