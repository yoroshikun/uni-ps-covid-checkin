import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import styles from '../styles/QRScan.module.css';
import Head from '../components/Layout/Head';
import { useState } from 'react';
import type { Location } from '@prisma/client';

import Image from 'next/image';
import humanImage from '../public/Human.png';
import Link from 'next/link';
import handleOffline from '../lib/handleOffline';
import checkInUser from '../lib/checkInUser';
import prisma from '../lib/prisma';

import Lottie from 'react-lottie';
import confirmationAnimation from '../lottie/confirmation.json';
import errorAnimation from '../lottie/error.json';
import backgroundAnimation from '../lottie/background.json';
import globeAnimation from '../lottie/globe.json';

function getDate() {
  var current = new Date();
  var dateTime =
    current.getDate() +
    '/' +
    (current.getMonth() + 1) +
    '/' +
    current.getFullYear() +
    ', ' +
    current.getHours() +
    ':' +
    current.getMinutes();
  return dateTime;
}

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

const bgAni = {
  loop: true,
  autoplay: true,
  animationData: backgroundAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const globeAni = {
  loop: true,
  autoplay: true,
  animationData: globeAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

const QRTest: NextPage<{ locations: Location[] }> = ({ locations }) => {
  const [stage, setStage] = useState(0);
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const handleScan = async (data: string | null) => {
    try {
      if (data) {
        const decoded = Buffer.from(data, 'base64').toString('utf8');
        const isOnline = await handleOffline(
          { uid: decoded, timestamp: Date.now().toString() },
          locations[0].name
        );

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
      setError(`${error.message}`);
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
      <Head title="QRReader" description="Covid Checkin QRReader" />

      <div className={styles.leftContainer}>
        <p className={styles.line1}>Welcome to</p>
        <p className={styles.line2}>COVID CHECK-IN</p>
        <p className={styles.line3}>Scan QR</p>

        <div className={styles.human}>
          {/* <Image
            src={humanImage}
            alt="Human Illustration"
            height={400}
            width={250}
          /> */}
        </div>

        <div className={styles.globe}>
          <Lottie options={globeAni} height={450} width={500} />
        </div>

        <div className={styles.bgAnimation}>
          <Lottie options={bgAni} height={920} width={400} />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.topWindow}></div>

        {stage === 0 ? (
          <div className={styles.QRContainer}>
            <h2>Scan QR Code</h2>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: 400, height: 400 }}
            />
            <br></br>
            <p>
              <b>Location</b>: University of South Australia - Mawson Lakes -
              Campus
            </p>

            <Link href="/">
              <button type="button" value="Login UID Button">
                Login with UID
              </button>
            </Link>
          </div>
        ) : stage === 1 ? (
          <div className={styles.checkinButton}>
            <h1>Check-In Successful</h1>
            <h3>{`Thank you for checking in, ${name}!`}</h3>

            <Lottie options={confirmationAni} height={400} width={400} />

            <h4>{`Location: ${locations[0].name}`}</h4>
            <h2>Date: {getDate()}</h2>

            <button
              onClick={() => {
                setStage(0);
              }}
            >
              Check-In Again
            </button>
          </div>
        ) : stage === 2 ? (
          <div className={styles.checkinButton}>
            <Lottie options={errorAni} height={400} width={400} />

            <h4>Something went wrong when checking in...</h4>
            <h3>Please see staff assistance - {error}</h3>

            <button
              onClick={() => {
                setStage(0);
              }}
            >
              Check-In Again
            </button>
          </div>
        ) : stage === 3 ? (
          <div className={styles.checkinButton}>
            <h3>You are offline</h3>
            <p>
              Your UID has been stored and will update when connection is
              restored
            </p>
            <button
              onClick={() => {
                setStage(0);
              }}
            >
              Check-In Again
            </button>
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

export default QRTest;
