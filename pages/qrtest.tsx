import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import styles from '../styles/QRScan.module.css';
import Head from '../components/Layout/Head';
import { useState } from 'react';

import Image from 'next/image';
import humanImage from '../public/Human.png';
import Link from 'next/link';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

const QRTest: NextPage = () => {
  const [result, setResult] = useState('');

  const handleScan = (data: string | null) => {
    if (data) {
      const decoded = Buffer.from(data, 'base64').toString('utf8');

      setResult(decoded);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
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
          <p>
            <b>Scanned UID</b>: {result}
          </p>

          <Link href="/">
            <button type="button" value="Login UID Button">
              Login with UID
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QRTest;
