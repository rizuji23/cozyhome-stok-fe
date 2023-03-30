import React from "react";
import DataTable from "react-data-table-component";
import MaterialModule from "../module/MaterialModule";
import System from "../module/System";

class ListKategori extends React.Component<any, any> {
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
                    name: "Nama Kategori",
                    selector: row => row.nama_kategori,
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
            ],

            data_auth: localStorage.getItem("user-cozystok"),
            search: "",
            loading: true,
        }

    }

    render(): React.ReactNode {
        return (
            <>
                <DataTable columns={this.state.column} data={this.props.data} pagination progressPending={this.props.loading} />
            </>
        )
    }
}

export default ListKategori;