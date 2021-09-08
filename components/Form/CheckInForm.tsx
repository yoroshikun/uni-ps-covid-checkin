import { CheckIn, Location, User } from '@prisma/client';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import styles from '../../styles/CheckInForm.module.css';

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
      <div className={styles.input}>
        <label>Unique ID:</label>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Please enter UID"
          type="text"
          {...register('uid', { required: true, maxLength: 7, minLength: 7 })}
        />
      </div>

      <div className={styles.locationWrapper}>
        <div className={styles.location}>
          <div className={styles.locationTrigger}>
            <label>Location:</label>
            <br></br>

            <select {...register('location', { required: true })}>
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <br></br>

      <div className={styles.submitButton}>
        <button type="submit" value="Submit">
          Check-In
        </button>
      </div>

      {errors.uid && (
        <div className={styles.errorMessage}>
          <span className="error-message">Please enter a valid UID</span>
        </div>
      )}
    </form>
  ) : stage === 1 ? (
    <div>
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
    <div>
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
