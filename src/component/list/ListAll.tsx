import React from "react";
import DataTable from "react-data-table-component";

class ListAll extends React.Component<any, any> {
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
                    name: "Stok",
                    selector: row => row.stok,
                },
                {
                    name: "Tanggal Update",
                    selector: row => row.updated_at
                },
            ],

            data: [
                {
                    no: 1,
                    nama_material: "Triplek",
                    kategori: "HVL",
                    stok: 20,
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

export default ListAll;