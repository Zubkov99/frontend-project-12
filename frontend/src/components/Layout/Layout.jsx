import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from '../Header';

const Layout = () => (
  <div className="App">
    <Header />
    <Outlet />
  </div>
);

export default Layout;
