import {
  Button, Container, Dropdown, DropdownButton, Navbar,
} from 'react-bootstrap';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppContext from '../helpers/context';

const Header = () => {
  const { key, setKey, setLang } = useContext(AppContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Navbar variant="light">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <div style={{
          display: 'flex',
        }}
        >
          <DropdownButton
            id="dropdown-basic-button"
            title={t('layout.selectLeng')}
            size="sm"
            style={{
              marginRight: '1vw',
            }}
          >
            <Dropdown.Item onClick={() => {
              setLang('en');
              i18n.changeLanguage('en');
            }}
            >
              {t('layout.engLeng')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              setLang('ru');
              i18n.changeLanguage('ru');
            }}
            >
              {t('layout.rusLeng')}
            </Dropdown.Item>
          </DropdownButton>
          {!!key
            && (
            <Button
              size="sm"
              onClick={() => {
                setKey('');
                navigate('/login');
              }}
            >
              {t('layout.logoutButton')}
            </Button>
            )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
