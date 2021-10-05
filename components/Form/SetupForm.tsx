import type { Location } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Lottie from 'react-lottie';

import styles from '../../styles/Setup.module.css';

import confirmationAnimation from '../../lottie/confirmation.json';
import errorAnimation from '../../lottie/error.json';
import loadingAnimation from '../../lottie/loading.json';

const confirmationAni = {
  loop: false,
  autoplay: true,
  animationData: confirmationAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const errorAni = {
  loop: true,
  autoplay: true,
  animationData: errorAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const loadingAni = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

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
    setStage(3);
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
      setStage(2);
    }
  };

  return stage === 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.locationWrapper}>
        <h1>Setup Page</h1>
      </div>
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

      <div className={styles.button}>
        <button type="submit">{t('SetupPage.Setup')}</button>
      </div>

      <div className={styles.errorMessage}>
        {errors.location && (
          <span className="error-message">{t('SetupPage.LocationError')}</span>
        )}
      </div>
    </form>
  ) : stage === 1 ? (
    <div className={styles.confirmationContainer}>
      <h1>{t('SetupPage.SetupSuccess')}</h1>
      <Lottie options={confirmationAni} height={400} width={400} />

      <p>{`${t('SetupPage.SetupSuccessInfo')}${location}`}</p>
      <div className={styles.button}>
        <button>
          <Link href="/" passHref>
            <a>{t('SetupPage.GoBack')}</a>
          </Link>
        </button>
      </div>
    </div>
  ) : stage === 2 ? (
    <div className={styles.confirmationContainer}>
      <h2>{t('CheckInError.ErrorNotice')}</h2>
      <Lottie options={errorAni} height={400} width={400} />
      <p>{error}</p>
      <div className={styles.button}>
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
    </div>
  ) : stage === 3 ? (
    <div className={styles.loading}>
      <Lottie options={loadingAni} height={400} width={400} />
    </div>
  ) : null;
};

export default SetupForm;
