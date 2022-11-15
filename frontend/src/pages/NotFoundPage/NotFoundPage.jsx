import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.mainPage}>
      <h1>
        {t('notFoundPage.header')}
      </h1>
      <p>
        {t('notFoundPage.description')}
&nbsp;
        {' '}
        <Link to="/">{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
