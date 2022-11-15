import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from '../Header';
import AddModalChannelWindow from '../HomePage/components/AddModalChannelWindow';
import EditModalWindow from '../HomePage/components/EditModalWindow';
import RemoveChannelModal from '../HomePage/components/RemoveChannelModal';

const Layout = () => (
  <div className="App">
    <Header />
    <Outlet />
    <AddModalChannelWindow />
    <EditModalWindow />
    <RemoveChannelModal />
  </div>
);

export default Layout;
