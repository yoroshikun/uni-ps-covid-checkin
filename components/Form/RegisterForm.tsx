import { useForm } from 'react-hook-form';
import styles from '../../styles/RegisterForm.module.css';

interface FormData {
  name: string;
  email?: string;
  phone?: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, email, phone }: FormData) => {
    // Use the API to create new check in
    const response = await fetch(`/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
      }),
    });

    console.log(response);

    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input}>
        <label>Name:</label>
        <input
          placeholder="Please enter your name"
          type="text"
          {...register('name', { required: true })}
        />
        <label>Email:</label>
        <input
          placeholder="Please enter your email if you have one"
          type="text"
          {...register('email')}
        />
        <label>Phone:</label>
        <input
          placeholder="Please enter your phone number if you have one"
          type="text"
          {...register('phone')}
        />
      </div>

      <div className={styles.registerButton}>
        <button type="submit" value="Register">
          Register
        </button>
      </div>

      <div className={styles.errorMessage}>
        {errors.name && (
          <span className="error-message">Please enter a name</span>
        )}
        {errors.email && (
          <span className="error-message">Please enter a valid Email</span>
        )}
        {errors.phone && (
          <span className="error-message">
            Please enter a valid Phone Number
          </span>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
