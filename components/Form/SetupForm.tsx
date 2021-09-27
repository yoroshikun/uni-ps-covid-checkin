import type { Location } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from '../../styles/Setup.module.css';
import Link from 'next/link';
import { MapPin } from 'phosphor-react';


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
    <div className={styles.input}>
    <div className={styles.installButton}>
      <h2>You have successfully installed!</h2>

 

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
      </button></a>
      </Link>
     
    </div>
    </div>
  ) : stage === 2 ? (
    <div className={styles.input}>
      
      <h2>An error has occured!</h2>
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
  ) : null;
};

export default SetupForm;