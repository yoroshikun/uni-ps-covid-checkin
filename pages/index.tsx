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
      setError(
        `Something went wrong when checking in please see staff assistance - ${error.message}`
      );
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
        description="Covid Checkin QRReader"
      />

      <div className={styles.leftContainer}>
        <p className={styles.line1}>Welcome to</p>
        <p className={styles.line2}>COVID CHECK-IN</p>
        <p className={styles.line3}>Scan QR</p>

        <div className={styles.human}>
          <Image
            src={humanImage}
            alt="Human Illustration"
            height={400}
            width={250}
          />
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

            <Link href="/UIDlogin" passHref>
              <button type="button" value="Login UID Button">
                Login with UID
              </button>
            </Link>
          </div>
        ) : stage === 1 ? (
          <div className={styles.checkinButton}>
            <h1>Check-In Successful!</h1>
            <h3>{`Thank you for checking in at ${locations[0].name} today ${name}`}</h3>
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
            <h3>{error}</h3>
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
