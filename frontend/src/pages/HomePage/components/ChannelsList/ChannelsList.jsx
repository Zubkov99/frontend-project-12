/* eslint-disable */
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from './ChannelList.module.css';
import { setActiveChannel } from '../../../../slices/channels';
import EditModalWindow from '../EditModalWindow';
import AppContext from '../../../../contexts/AppContext';
import RemoveChannelModal from '../RemoveChannelModal';
import { activeChannelIdSelector } from '../../../../slices/selectors';

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

function ChannelsList(props) {
  const { t } = useTranslation();
  const { channels } = props;
  const dispatch = useDispatch();
  const { key } = useContext(AppContext);
  const activeChannelId = useSelector(activeChannelIdSelector);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleShowRemoveModal = () => setShowRemoveModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  return (
    <>
      <ListGroup
        variant="flush"
        className={styles.ChannelsContainer}
      >
        {channels.map(({
          name, id, removable, author,
        }) => {
          const newName = `# ${name.length > 15 ? name.slice(0, 13)+'....' : name}`;
          return (
            <ListGroup.Item
              action
              variant="dark"
              active={activeChannelId === id}
              key={id}
              onClick={() => dispatch(setActiveChannel(id))}
              className={styles.ListGroup}
            >
              <span style={{
                width: '60%'
              }}>{newName}</span>
              { author === key.username
                                    && (
                                    <Dropdown>
                                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
                                      <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {
                                          setCurrentId(id);
                                          handleShowEditModal();
                                        }}
                                        >
                                          {t('chatPage.editChannelButton')}
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                          if (!removable) return;
                                          setCurrentId(id);
                                          handleShowRemoveModal();
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
      <EditModalWindow show={showEditModal} handleClose={handleCloseEditModal} currentId={currentId} />
      <RemoveChannelModal show={showRemoveModal} handleClose={handleCloseRemoveModal} currentId={currentId} />
    </>
  );
}

export default ChannelsList;