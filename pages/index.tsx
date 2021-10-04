import type { GetServerSideProps, NextPage } from 'next';
import type { Location } from '@prisma/client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Lottie from 'react-lottie';
import { useTranslation } from 'react-i18next';

import checkInUser from '../lib/checkInUser';
import handleOffline from '../lib/handleOffline';
import Head from '../components/Layout/Head';
import LeftContainer from '../components/LeftContainer';
import prisma from '../lib/prisma';
import styles from '../styles/QRScan.module.css';

import confirmationAnimation from '../lottie/confirmation.json';
import errorAnimation from '../lottie/error.json';
import loadingAnimation from '../lottie/loading.json';

const getDate = () => {
  const current = new Date();
  return `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}, ${current.getHours()}:${current.getMinutes()}`;
};

const errorAni = {
  loop: true,
  autoplay: true,
  animationData: errorAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const confirmationAni = {
  loop: false,
  autoplay: true,
  animationData: confirmationAnimation,
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

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

const Home: NextPage<{ locations: Location[] }> = ({ locations }) => {
  const [stage, setStage] = useState(0);
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const [t, _] = useTranslation();

  const handleScan = async (data: string | null) => {
    try {
      if (data) {
        const decoded = Buffer.from(data, 'base64').toString('utf8');
        const isOnline = await handleOffline(
          { uid: decoded, timestamp: Date.now().toString() },
          locations[0].name
        );

        setStage(4);

        if (!isOnline) {
          setStage(3);
          return;
        }

        const checkIn = await checkInUser({
          uid: decoded,
          location: locations[0].name,
        });

        setName(checkIn.user.name);
        setStage(1);
      }
    } catch (error: any) {
      setError(error.message);
      setStage(2);
    }
  };

  const handleError = (err: any) => {
    setError(err.message);
  };

  if (typeof window === 'undefined') {
    return <>loading...</>;
  }

  return (
    <div className={styles.container}>
      <Head
        title="Covid Check-in Terminal"
        description="Check in with ease with this Terminal"
      />

      <LeftContainer tkey="ScanQRPage" />

      <div className={styles.rightContainer}>
        <div className={styles.topWindow}></div>

        {stage === 0 ? (
          <div className={styles.QRContainer}>
            <h2>{t('ScanQRPage.Header')}</h2>
            <QrReader
              className={styles.QRReader}
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: 400, height: 400 }}
            />
            <br></br>
            <p>
              <b>{t('ScanQRPage.Location')}</b>
              {locations[0].name}
            </p>

            <Link href="/uid" passHref>
              <button type="button" value="Login UID Button">
                {t('ScanQRPage.ReturnButton')}
              </button>
            </Link>

            <div className={styles.register}>
              <h3>{t('homepage.RegisterButton')}</h3>
              <h4>
                <Link href="/register" passHref>
                  {t('homepage.RegisterButtonAction')}
                </Link>
              </h4>
            </div>
          </div>
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
              }}
            >
              {t('CheckInOffline.RetryButton')}
            </button>
          </div>
        ) : stage === 4 ? (
          <div className={styles.loading}>
            <Lottie options={loadingAni} height={400} width={400} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const locations = await prisma.location.findMany();
  return { props: { locations } };
};

export default Home;
