import React from "react";
import DataTable from "react-data-table-component";

class ListMaterial extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            column: [
                {
                    name: "No",
                    selector: row => row.no,
                },
                {
                    name: "Nama Material",
                    selector: row => row.nama_material,
                },
                {
                    name: "Kategori Material",
                    selector: row => row.kategori,
                },
                {
                    name: "Tanggal Dibuat",
                    selector: row => row.created_at
                },
                {
                    name: "Tanggal Diupdate",
                    selector: row => row.updated_at
                },
            ],

            data: [
                {
                    no: 1,
                    nama_material: "Triplek",
                    kategori: "HVL",
                    created_at: "11-03-2023 08:52AM",
                    updated_at: "11-03-2023 08:52AM"
                }
            ]
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <DataTable columns={this.state.column} data={this.state.data} pagination />
            </>
        )
    }
}

export default ListMaterial;