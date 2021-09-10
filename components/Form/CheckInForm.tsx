import { CheckIn, Location, User } from '@prisma/client';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import styles from '../../styles/CheckInForm.module.css';
import Image from 'next/image';
import userIcon from '../../public/userIcon.png';
import Link from 'next/link';

interface FormData {
  uid: string;
  location: string;
}

const CheckInForm = ({ locations }: { locations: Location[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const location: string = watch('location', '');

  const [stage, setStage] = useState(0);
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async (data: FormData) => {
    try {
      // Use the API to create new check in
      const response = await fetch(`/api/checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: Number(data.uid),
          location: data.location,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = (await response.json()) as CheckIn & { user: User };
      setName(json.user.name);
      setStage(1);
    } catch (error: any) {
      setError(
        `Something went wrong when checking in please see staff assistance - ${error.message}`
      );
      setStage(2);
    }
  };

  return stage === 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.locationWrapper}>
        <h1>Location: {locations[0].name}</h1>
      </div>

      <div className={styles.input}>
        <div className={styles.userIcon}>
          <Image src={userIcon} alt="User Icon" />
          <label>Unique Identifcation:</label>
        </div>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Please enter UID"
          type="text"
          required
          {...register('uid', { required: true, maxLength: 7, minLength: 7 })}
        />
      </div>

      <br></br>

      <div className={styles.buttons}>
        <button type="submit" value="Submit">
          Check-In
        </button>

        <Link href="/qrtest">
          <button type="button" value="QR Scan">
            Scan QR
          </button>
        </Link>
      </div>

      {errors.uid && (
        <div className={styles.errorMessage}>
          <span className="error-message">Please enter a valid UID</span>
        </div>
      )}
    </form>
  ) : stage === 1 ? (
    <div className={styles.checkinButton}>
      <h1>Check-In Successful!</h1>
      <h3>{`Thank you for checking in at ${location} today ${name}`}</h3>
      <button
        onClick={() => {
          setStage(0);
          setValue('uid', '');
        }}
      >
        Check-In Again
      </button>
    </div>
  ) : stage === 2 ? (
    <div className={styles.checkinButton}>
      <h3>{error}</h3>
      <button
        onClick={() => {
          setStage(0);
          setValue('uid', '');
        }}
      >
        Check-In Again
      </button>
    </div>
  ) : null;
};

export default CheckInForm;
