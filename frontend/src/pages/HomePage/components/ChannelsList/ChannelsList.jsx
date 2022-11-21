import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from './ChannelList.module.css';
import { setActiveChannel, getUserName, activeChannelIdSelector } from '../../../../slices/channels';
import AppContext from '../../../../contexts/AppContext';
import { setActiveModal, setExtraData } from '../../../../slices/modalWindows';
import modalWindowKeys from '../ModalWindows/modalWindowKeys';

// eslint-disable-next-line react/display-name
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="frontend/src/pages/HomePage/components/ChannelsList/ChannelsList"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{
      color: '#FFFFFF',
      textDecoration: 'none',
    }}
  >
    {/* //TODO */}
    {/* Раскомментить класснейм или выпилить */}
    <span>
      Управление каналом
    </span>
    {children}
    &#x25bc;
  </a>
));

const ChannelsList = (props) => {
  const { t } = useTranslation();
  const { channels } = props;
  const dispatch = useDispatch();
  const { userData } = useContext(AppContext);
  const activeChannelId = useSelector(activeChannelIdSelector);

  const handleShowEditModal = (currentId) => {
    dispatch(setActiveModal(modalWindowKeys.eitModalChannelWindow));
    dispatch(setExtraData(currentId));
  };

  const handleShowRemoveModal = (currentId) => {
    dispatch(setActiveModal(modalWindowKeys.removeChannelWindow));
    dispatch(setExtraData(currentId));
  };

  const username = useSelector(getUserName);
  return (
    <ListGroup
      variant="flush"
      className={styles.ChannelsContainer}
    >
      {channels.map(({
        name, id, removable, author,
      }) => {
        const newName = `# ${name.length > 15 ? `${name.slice(0, 12)}...` : name}`;
        return (
          <ListGroup.Item
            action
            variant="dark"
            active={activeChannelId === id}
            key={id}
            onClick={() => dispatch(setActiveChannel({ id, author: username }))}
            className={styles.ListGroup}
          >
            <span>{newName}</span>
            { author === userData.username
                                    && (
                                    <Dropdown>
                                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
                                      <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {
                                          handleShowEditModal(id);
                                        }}
                                        >
                                          {t('chatPage.editChannelButton')}
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                          if (!removable) return;
                                          handleShowRemoveModal(id);
                                        }}
                                        >
                                          {t('chatPage.removeChannelButton')}
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                    )}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default ChannelsList;
