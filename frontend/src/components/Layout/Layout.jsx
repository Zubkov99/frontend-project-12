import {Outlet, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {Navbar, Container, Button} from "react-bootstrap";
import AppContext from "../../helpers/сontext";


const Layout = () => {

    const { setKey } = useContext(AppContext);
    const navigate = useNavigate();

    return (
         <div className='App'>
             <Navbar variant="light">
                 <Container>
                     <Navbar.Brand href="/">Zubkov_D</Navbar.Brand>
                     <Button onClick={() => {
                         setKey('');
                         navigate('/login');
                     }}>Log out</Button>
                 </Container>
             </Navbar>
             <Outlet />
         </div>
    )
};

export default Layout;