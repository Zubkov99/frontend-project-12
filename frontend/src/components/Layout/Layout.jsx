import { Outlet } from "react-router-dom";
import React from "react";
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const Layout = () => {
    return (
         <div className='App'>
             <Navbar variant="light">
                 <Container>
                     <Navbar.Brand href="/">Zubkov_D</Navbar.Brand>
                     <Button>Log out</Button>
                 </Container>
             </Navbar>
             <Outlet />
         </div>
    )
};

export default Layout;