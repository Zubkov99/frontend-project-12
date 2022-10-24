import {Outlet, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {Navbar, Container, Button, DropdownButton, Dropdown} from "react-bootstrap";
import AppContext from "../../helpers/сontext";
import {useTranslation} from "react-i18next";


const Layout = () => {

    const { key, setKey, lang, setLang } = useContext(AppContext);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    return (
         <div className='App'>
             <Navbar variant="light">
                    <Container>
                        <Navbar.Brand href="/">Zubkov_D</Navbar.Brand>
                        <div style={{
                            display: 'flex',
                        }}>
                            <DropdownButton id="dropdown-basic-button"
                                            title={t('layout.selectLeng')}
                                            size="sm"
                                            style={{
                                marginRight: '1vw'
                            }}>
                                <Dropdown.Item onClick={() => {
                                    setLang('en')
                                    i18n.changeLanguage('en')
                                }}>{t('layout.engLeng')}</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setLang('ru')
                                    i18n.changeLanguage('ru')
                                }}>{t('layout.rusLeng')}</Dropdown.Item>
                            </DropdownButton>
                            {!!key &&
                                <Button size="sm" onClick={() => {
                                    setKey('');
                                    navigate('/login');
                                }}>
                                    {t('layout.logoutButton')}
                                </Button>
                            }
                        </div>
                    </Container>
             </Navbar>
             <Outlet />
         </div>
    )
};

export default Layout;