import type { Location } from '@prisma/client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'react-lottie';

import styles from '../../styles/Setup.module.css';
import Link from 'next/link';
import { MapPin } from 'phosphor-react';

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
      setStage(3);
      const response = await fetch(`/api/registerLocation`, {
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
        <label>Location:</label>
        <input
          placeholder="Please enter your location"
          type="text"
          required
          {...register('location', {
            pattern: /^[A-Za-z ]+$/,
          })}
        />
      </div>

      <div className={styles.installButton}>
        <button type="submit" value="Install">
          Install
        </button>
      </div>

      <div className={styles.errorMessage}>
        {errors.location && (
          <span className="error-message">Please enter a location</span>
        )}
      </div>
    </form>
  ) : stage === 1 ? (
    <div className={styles.confirmationContainer}>
      <h1>You have successfully installed!</h1>
      <Lottie options={confirmationAni} height={400} width={400} />

      <p>{`Your Location is: ${location}`}</p>
      <Link href="/" passHref>
        <a>
          <button
            onClick={() => {
              setStage(0);
              setLocation(undefined);
              setError('');
            }}
          >
            Go to Homepage
          </button>
        </a>
      </Link>
    </div>
  ) : stage === 2 ? (
    <div className={styles.confirmationContainer}>
      <h2>An error has occured!</h2>
      <Lottie options={errorAni} height={400} width={400} />
      <p>{error}</p>
      <div className={styles.installButton}>
        <button
          onClick={() => {
            setStage(0);
            setLocation(undefined);
            setError('');
          }}
        >
          Go back
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
