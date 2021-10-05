import { useState } from 'react';
import { useForm } from 'react-hook-form';
import QRCode from 'react-qr-code';
import Link from 'next/link';
import { Users, Envelope, Phone } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';

import registerUser from '../../lib/registerUser';
import styles from '../../styles/RegisterForm.module.css';

import errorAnimation from '../../lottie/error.json';
import loadingAnimation from '../../lottie/loading.json';

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
  const [t] = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uid, setUID] = useState<undefined | string>();
  const [error, setError] = useState('');
  const [stage, setStage] = useState(0);

  const onSubmit = async ({ name, email, phone }: FormData) => {
    setStage(3);
    try {
      const user = await registerUser({ name, email, phone });

      setUID(String(user.uid).padStart(7, '0'));
      setStage(1);
    } catch (err: any) {
      setError(err.message);
      setStage(2);
    }
  };

  return stage === 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input}>
        <div className={styles.phosphor}>
          <Users />
        </div>
        <label>{t('RegisterPage.Name')}</label>
        <input
          placeholder={t('RegisterPage.NameLabel')}
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
        <label>{t('RegisterPage.Email')}</label>
        <input
          placeholder={t('RegisterPage.EmailLabel')}
          type="text"
          {...register('email', {
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />

        <div className={styles.phosphor}>
          <Phone />
        </div>
        <label>{t('RegisterPage.Phone')}</label>
        <input
          placeholder={t('RegisterPage.PhoneLabel')}
          type="text"
          {...register('phone', {
            pattern: /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
          })}
        />
      </div>

      <div className={styles.button}>
        <button type="submit" value="Register">
          {t('RegisterPage.RegisterButton')}
        </button>
      </div>

      <div className={styles.checkIn}>
        <label>
          {t('RegisterPage.ReturnButton')}
          <div className={styles.link}>
            <Link href="/" passHref>
              <a>{t('RegisterPage.ReturnButtonAction')}</a>
            </Link>
          </div>
        </label>
      </div>

      <div className={styles.errorMessage}>
        {errors.name && (
          <span className="error-message">{t('RegisterPage.NameError')}</span>
        )}
        {errors.email && (
          <span className="error-message">{t('RegisterPage.EmailError')}</span>
        )}
        {errors.phone && (
          <span className="error-message">{t('RegisterPage.PhoneError')}</span>
        )}
      </div>
    </form>
  ) : stage === 1 ? (
    <div className={styles.confirmationContainer}>
      <h1>{t('RegisterPage.Success')}</h1>
      <h3>{`${t('RegisterOage.UID')}${uid}`}</h3>
      <p>{t('RegisterPage.QRCode')}</p>
      <QRCode value={`${Buffer.from(uid || '').toString('base64')}`} />

      <button
        onClick={() => {
          setStage(0);
          setUID(undefined);
          setError('');
        }}
      >
        {t('RegisterPage.GoBack')}
      </button>
    </div>
  ) : stage === 2 ? (
    <div className={styles.confirmationContainer}>
      <h1>{t('RegisterPage.Error')}</h1>
      <Lottie options={errorAni} height={400} width={400} />
      <p>{error}</p>
      <button
        onClick={() => {
          setStage(0);
          setUID(undefined);
          setError('');
        }}
      >
        {t('RegisterPage.GoBack')}
      </button>
    </div>
  ) : stage === 3 ? (
    <div className={styles.loading}>
      <Lottie options={loadingAni} height={400} width={400} />
    </div>
  ) : null;
};

export default RegisterForm;
