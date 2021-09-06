import { useForm } from 'react-hook-form';
import styles from '../../styles/CheckInForm.module.css';

interface FormData {
  uid: string;
}

const CheckInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FormData) => {
    // Use the API to create new check in
    const response = await fetch(`/api/checkin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: Number(data.uid),
        location: 'Coles - Churchill Road',
      }),
    });

    console.log(response);

    return;
  };

  return (
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
  );
};

export default CheckInForm;
