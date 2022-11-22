import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from '../Header';
import ModalWindows from '../../HomePage/components/ModalWindows';

const Layout = () => (
  <div className="App">
    <Header />
    <Outlet />
    <ModalWindows />
  </div>
);

export default Layout;
