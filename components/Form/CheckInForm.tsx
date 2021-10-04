import { Location } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import Lottie from 'react-lottie';
import { useTranslation } from 'react-i18next';

import checkInUser from '../../lib/checkInUser';
import handleOffline from '../../lib/handleOffline';
import userIcon from '../../public/userIcon.png';
import styles from '../../styles/CheckInForm.module.css';
import warningIcon from '../../public/warning.png';

import confirmationAnimation from '../../lottie/confirmation.json';
import errorAnimation from '../../lottie/error.json';
import loadingAnimation from '../../lottie/loading.json';

const getDate = () => {
  const current = new Date();
  return `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}, ${current.getHours()}:${current.getMinutes()}`;
};

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
  uid: string;
  location: string;
}

const CheckInForm = ({ locations }: { locations: Location[] }) => {
  const [t] = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [stage, setStage] = useState(0);
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async (data: FormData) => {
    try {
      const isOnline = await handleOffline(
        { uid: data.uid, timestamp: Date.now().toString() },
        locations[0].name
      );

      setStage(4);

      if (!isOnline) {
        setStage(3);
        return;
      }

      const checkIn = await checkInUser({
        ...data,
        location: locations[0].name,
      });

      setName(checkIn.user.name);
      setStage(1);
    } catch (error: any) {
      setError(error.message);
      setStage(2);
    }
  };

  return stage === 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.locationWrapper}>
        <h1>
          {t('homepage.Location')}
          {locations[0].name}
        </h1>
      </div>

      <div className={styles.input}>
        <div className={styles.userIcon}>
          <Image src={userIcon} alt="User Icon" />
          <label>{t('homepage.UniqueIdentification')}</label>
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

      {errors.uid && (
        <div className={styles.errorMessage}>
          <Image src={warningIcon} alt="User Icon" />
          <span className="error-message">{t('homepage.InvalidError')}</span>
        </div>
      )}

      <div className={styles.buttons}>
        <button type="submit" value="Submit">
          {t('homepage.CheckIn')}
        </button>

        <Link href="/" passHref>
          <a>
            <button type="button" value="QR Scan">
              {t('homepage.ScanQR')}
            </button>
          </a>
        </Link>
      </div>

      <div className={styles.register}>
        <h3>{t('homepage.RegisterButton')}</h3>
        <h4>
          <Link href="/register" passHref>
            {t('homepage.RegisterButtonAction')}
          </Link>
        </h4>
      </div>
    </form>
  ) : stage === 1 ? (
    <div className={styles.confirmationContainer}>
      <h1>{t('CheckInSuccess.Success')}</h1>
      <h3>{`${t('CheckInSuccess.Thanks')} ${name}!`}</h3>

      <Lottie options={confirmationAni} height={400} width={400} />

      <h4>{`${t('CheckInSuccess.Location')}${locations[0].name}`}</h4>
      <h2>{getDate()}</h2>

      <button
        onClick={() => {
          setStage(0);
          setValue('uid', '');
        }}
      >
        {t('CheckInSuccess.ReturnButton')}
      </button>
    </div>
  ) : stage === 2 ? (
    <div className={styles.checkinButton}>
      <Lottie options={errorAni} height={400} width={400} />

      <h4>{t('CheckInError.ErrorNotice')}</h4>
      <h3>
        {t('CheckInError.AskStaff')}
        {error}
      </h3>

      <button
        onClick={() => {
          setStage(0);
          setValue('uid', '');
        }}
      >
        {t('CheckInError.RetryButton')}
      </button>
    </div>
  ) : stage === 3 ? (
    <div className={styles.checkinButton}>
      <h3>{t('CheckInOffline.Heading')}</h3>
      <p>{t('CheckInOffline.Info')}</p>
      <button
        onClick={() => {
          setStage(0);
          setValue('uid', '');
        }}
      >
        {t('CheckInOffline.RetryButton')}
      </button>
    </div>
  ) : stage === 4 ? (
    <div className={styles.loading}>
      <Lottie options={loadingAni} height={400} width={400} />
    </div>
  ) : null;
};

export default CheckInForm;
