import type { Location } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin } from 'phosphor-react';
import { useTranslation } from 'react-i18next';

import styles from '../../styles/Setup.module.css';

interface FormData {
  location: string;
}

const SetupForm = () => {
  const [t] = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [location, setLocation] = useState<undefined | string>();
  const [error, setError] = useState('');
  const [stage, setStage] = useState(0);

  const onSubmit = async ({ location }: FormData) => {
    try {
      // Use the API to create new location
      const response = await fetch(`/api/registerlocation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: location,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = (await response.json()) as Location;
      setLocation(json.name);
      setStage(1);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return stage === 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input}>
        <div className={styles.phosphor}>
          <MapPin />
        </div>
        <label>{t('SetupPage.Location')}</label>
        <input
          placeholder={t('SetupPage.LocationLabel')}
          type="text"
          {...register('location', { required: true })}
        />
      </div>

      <div className={styles.setupButton}>
        <button type="submit">{t('SetupPage.Setup')}</button>
      </div>

      <div className={styles.errorMessage}>
        {errors.location && (
          <span className="error-message">{t('SetupPage.LocationError')}</span>
        )}
      </div>
    </form>
  ) : stage === 1 ? (
    <div>
      <h2>{t('SetupPage.SetupSuccess')}</h2>
      <p>{`${t('SetupPage.SetupSuccessInfo')}${location}`}</p>
      <button
        onClick={() => {
          setStage(0);
          setLocation(undefined);
          setError('');
        }}
      >
        {t('SetupPage.GoBack')}
      </button>
    </div>
  ) : stage === 2 ? (
    <div>
      <h2>{t('CheckInError.ErrorNotice')}</h2>
      <p>{error}</p>
      <button
        onClick={() => {
          setStage(0);
          setLocation(undefined);
          setError('');
        }}
      >
        {t('SetupPage.GoBack')}
      </button>
    </div>
  ) : null;
};

export default SetupForm;
