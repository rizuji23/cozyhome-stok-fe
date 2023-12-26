import { ToastContainer, toast } from "react-toastify";
import HelmetTitle from "./etc/HelmetTitle";
import Header from "./etc/Header";
import Sidebar from "./etc/Sidebar";
import Title from "./etc/Title";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "./module/axios";
import System from "./module/System";
import moment from "moment";

const column = [
    {
        name: "No",
        selector: row => row.no,
        sortable: true,
    },
    {
        name: "Nama Material",
        selector: row => row.nama_material,
        sortable: true,
        wrap: true,
    },
    {
        name: "Harga",
        selector: row => row.harga,
        sortable: true,
        wrap: true,
    },
    {
        name: "Nama Toko",
        selector: row => row.nama_toko,
        sortable: true,
        wrap: true,
    },
    {
        name: "Tanggal",
        selector: row => row.created_at,
        sortable: true,
        wrap: true,
    }
]

export default function ListHarga() {
    const [data, setData] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [nama_material, setNamaMaterial] = useState<string>("");
    const [nama_toko, setNamaToko] = useState<string>("");
    const [harga, setHarga] = useState<any>(0);

    const get_data = async () => {
        setLoading(true);
        try {
            const res = await axios({
                url: "/api/v1/list_harga/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-cozystok"))?.access
                },
            });

            if (res.status === 200) {
                let no = 1;
                res.data.data.list_harga.map((el: any) => {
                    el['no'] = no++;
                    el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss")
                })
                setData(res.data.data.list_harga);
            } else {
                toast.error("Terjadi kesalahan.");
            }
        } catch (err) {
            setLoading(false);
            toast.error("Terjadi kesalahan.");
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios({
                url: "/api/v1/list_harga/",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-cozystok"))?.access
                },
                method: "POST",
                data: {
                    nama_material: nama_material,
                    nama_toko: nama_toko,
                    harga: System.convertInt(harga),
                }
            });
            setLoading(false);
            if (res.status === 201) {
                toast.success("Berhasil di tambah");
                get_data();
                setNamaMaterial("");
                setNamaToko("");
                setHarga(0);
            } else {
                toast.error("Terjadi kesalahan");
            }
        } catch (err) {
            setLoading(false);
            toast.error("Terjadi kesalahhan.");
        }
    }

    useEffect(() => {
        get_data();
    }, []);

    return (
        <>
            <HelmetTitle title="List Harga" />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div id="layout-wrapper">
                <Header />
                <Sidebar />
            </div>

            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <Title title="List Harga" />

                        <div className="card">
                            <div className="card-header">
                                <h6>Tambah Harga</h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="">Nama Material</label>
                                        <input type="text" className="form-control" value={nama_material} required onChange={(e) => setNamaMaterial(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Harga</label>
                                        <input type="text" className="form-control" required onChange={(e) => setHarga(e.target.value)} value={System.convertRupiah(harga)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Nama Toko</label>
                                        <input type="text" className="form-control" value={nama_toko} required onChange={(e) => setNamaToko(e.target.value)} />
                                    </div>
                                    <div className="form-group text-end">
                                        <button className="btn btn-primary" type="submit">Tambah</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="card">
                                <div className="card-body">
                                    <DataTable columns={column} data={data} pagination />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}