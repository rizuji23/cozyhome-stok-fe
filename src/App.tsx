import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import { main } from './js/app';
import ListStok from './component/ListStok';
import AddStokIn from './component/AddStokIn';
import Material from './component/Material';
import AddMaterial from './component/AddMaterial';
import AddKategoriMaterial from './component/AddKategoriMaterial';
import Pengaturan from './component/Pengaturan';


class App extends React.Component<any, any> {
  componentDidMount(): void {
    main();
  }

  render(): React.ReactNode {
    return (
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/stok_all' element={<ListStok />}></Route>
        <Route path='/tambah_stok_in' element={<AddStokIn />}></Route>
        <Route path='/material_all' element={<Material />}></Route>
        <Route path='/tambah_material' element={<AddMaterial />}></Route>
        <Route path='/tambah_kategori' element={<AddKategoriMaterial />}></Route>
        <Route path='/pengaturan' element={<Pengaturan />}></Route>

      </Routes>
    )
  }
}

export default App;
