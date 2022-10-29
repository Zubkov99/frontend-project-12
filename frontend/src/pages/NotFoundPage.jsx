import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
        <>
            <div style={{
              marginRight: 'auto',
              marginLeft: 'auto',
              width: '40%',
              marginTop: '10vh',
            }}>
                <h1>
                    {t('notFoundPage.header')}
                </h1>
                <p>{t('notFoundPage.description')}&nbsp; <Link to="/">{t('notFoundPage.link')}</Link></p>
            </div>
        </>
  );
};

export default NotFoundPage;
