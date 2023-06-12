import React from "react";
import DataTable from "react-data-table-component";
import MaterialModule from "../module/MaterialModule";
import moment from "moment";
import System from "../module/System";
import ModalDetailMaterial from "../modal/ModalDetailMaterial";
import LoadingFull from "../LoadingFull";


class ListMaterial extends React.Component<any, any> {
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
                    selector: row => row.nama_kategori,
                    sortable: true,
                },
                {
                    name: "Harga",
                    selector: row => System.convertRupiah(row.harga),
                    sortable: true,
                },
                {
                    name: "Tanggal Dibuat",
                    selector: row => row.created_at,
                    sortable: true,
                },
                {
                    name: "Tanggal Diupdate",
                    selector: row => row.updated_at,
                    sortable: true,
                },
                {
                    name: "Opsi",
                    selector: row => row.opsi,
                }
            ],

            data: [],
            data_auth: localStorage.getItem("user-cozystok"),
            search: "",
            loading: true,
            isOpen: {
                show: false,
                data: {},
            },
            loading_full: false,
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.getMaterial = this.getMaterial.bind(this);
        this.getDetailMaterial = this.getDetailMaterial.bind(this);
        this.handleCloseDetail = this.handleCloseDetail.bind(this);
    }

    handleCloseDetail() {
        this.setState({
            isOpen: {
                show: false,
                data: {},
            }
        })
    }

    getDetailMaterial(id_material) {
        this.setState({
            loading_full: true,
        });

        MaterialModule.getDetailMaterial(id_material, this.state.data_auth).then((result) => {
            this.setState({
                isOpen: {
                    show: true,
                    data: result.data.data
                },
                loading_full: false,
            });
        });
    }

    getMaterial() {
        this.setState({
            loading: true,
        })
        MaterialModule.get(this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.material.map((el) => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['updated_at'] = moment(el.updated_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['opsi'] = <><button className="btn btn-info btn-sm" onClick={() => this.getDetailMaterial(el.id_material)}>Detail</button></>
            });

            this.setState({
                data: result.data.data.material,
                loading: false,
            }, () => {
                this.props.setCount(result.data.data.material.length)
            });
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getMaterial();
    }

    handleSearch(e) {
        this.setState({
            search: e.target.value,
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <LoadingFull display={this.state.loading_full} />
                <div className="mt-3 mb-3 d-flex flex-row-reverse">
                    <div>
                        <input type="text" onChange={this.handleSearch} className="form-control" placeholder="Cari Nama Material" />
                    </div>
                </div>
                <DataTable columns={this.state.column} data={this.state.data.filter((data) => {
                    if (this.state.search === "") {
                        return data;
                    } else if (data.nama_material.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return data;
                    }
                })} progressPending={this.state.loading} pagination />

                <ModalDetailMaterial isOpen={this.state.isOpen} handleClose={this.handleCloseDetail} getMaterial={this.getMaterial} />
            </>
        )
    }
}

export default ListMaterial;