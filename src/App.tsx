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
import { withRouter } from './component/etc/withRouter';
import Logout from './component/etc/Logout';
import PrintPerbandingan from './component/print/PrintPerbandingan';
import DetailStok from './component/DetailStok';
import PrintDetail from './component/print/PrintDetail';
import AuthCheck from './component/AuthCheck';
import PrintAll from './component/print/PrintAll';
import AddAlat from './component/AddAlat';


class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      main();
    }
  }

  componentDidMount(): void {
    main();
  }

  render(): React.ReactNode {
    return (
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route element={<AuthCheck />}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/stok_all' element={<ListStok />}></Route>
          <Route path='/tambah_stok_in' element={<AddStokIn />}></Route>
          <Route path='/material_all' element={<Material />}></Route>
          <Route path='/tambah_material' element={<AddMaterial />}></Route>
          <Route path='/tambah_kategori' element={<AddKategoriMaterial />}></Route>
          <Route path='/pengaturan' element={<Pengaturan />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
          <Route path='/print/banding/:id' element={<PrintPerbandingan />}></Route>
          <Route path='/detail' element={<DetailStok />}></Route>
          <Route path='/print_detail' element={<PrintDetail />}></Route>
          <Route path='/print_all' element={<PrintAll />}></Route>
          <Route path='/alat' element={<AddAlat />}></Route>
        </Route>
      </Routes>
    )
  }
}

export default withRouter(App);
