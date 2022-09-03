import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
    return (
         <div className='App'>
             <h1>DRAFT: my SPA</h1>
             <Outlet />
             <footer>
                 <p>Here well be my footer</p>
             </footer>
         </div>
    )
};

export default Layout;