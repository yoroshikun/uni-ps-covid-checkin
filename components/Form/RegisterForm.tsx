import type { User } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import registerUser from '../../lib/registerUser';
import QRCode from 'react-qr-code';
import Link from 'next/link';
import styles from '../../styles/RegisterForm.module.css';
import Lottie from 'react-lottie';
import { Users, Envelope, Phone } from 'phosphor-react';
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

  const [uid, setUID] = useState<undefined | string>();
  const [error, setError] = useState('');
  const [stage, setStage] = useState(0);

  const onSubmit = async ({ name, email, phone }: FormData) => {
    try {
      setStage(3);
      const user = await registerUser({ name, email, phone });

      setUID(String(user.uid).padStart(7, '0'));
      setStage(1);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return stage === 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <h1>Setup Page</h1>
      </div>
      <div className={styles.input}>
        <div className={styles.phosphor}>
          <Users />
        </div>
        <label>Name:</label>
        <input
          placeholder="Please enter your name"
          type="text"
          {...register('name', {
            required: true,
            maxLength: 26,
            pattern: /^[A-Za-z ]+$/,
          })}
        />
        <div className={styles.phosphor}>
          <Envelope />
        </div>
        <label>Email:</label>
        <input
          placeholder="Please enter your email if you have one"
          type="text"
          {...register('email', {
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />

        <div className={styles.phosphor}>
          <Phone />
        </div>
        <label>Phone:</label>
        <input
          placeholder="Please enter your phone number if you have one"
          type="text"
          {...register('phone', {
            pattern: /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
          })}
        />
      </div>

      <div className={styles.button}>
        <button type="submit" value="Register">
          Register
        </button>
      </div>

      <div className={styles.checkIn}>
        <label>
          Already have an account?
          <div className={styles.link}>
            <Link href="/" passHref>
              <a> Check-in here</a>
            </Link>
          </div>
        </label>
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
  ) : stage === 1 ? (
    <div className={styles.confirmationContainer}>
      <h1>You have successfully registered!</h1>

      <h3>{`Your UID is: ${uid}`}</h3>
      <p>Your QR Code is:</p>
      <QRCode value={`${Buffer.from(uid || '').toString('base64')}`} />

      <button
        onClick={() => {
          setStage(0);
          setUID(undefined);
          setError('');
        }}
      >
        Go back
      </button>
    </div>
  ) : stage === 2 ? (
    <div className={styles.confirmationContainer}>
      <h1>An error has occured!</h1>
      <Lottie options={errorAni} height={400} width={400} />
      <p>{error}</p>
      <button
        onClick={() => {
          setStage(0);
          setUID(undefined);
          setError('');
        }}
      >
        Go back
      </button>
    </div>
  ) : stage === 3 ? (
    <div className={styles.loading}>
      <Lottie options={loadingAni} height={400} width={400} />
    </div>
  ) : null;
};

export default RegisterForm;
