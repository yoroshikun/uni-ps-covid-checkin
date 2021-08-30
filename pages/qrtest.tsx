import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import styles from '../styles/Home.module.css';
import Head from '../components/Layout/Head';
import { useState } from 'react';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

const QRTest: NextPage = () => {
  const [result, setResult] = useState('');

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);
      console.log(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  if (typeof window === 'undefined') {
    return <>loading</>;
  }

  return (
    <div className={styles.container}>
      <Head title="QRTest" description="Report for Covid Check-in QRTest" />

      <h1>QRTest</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: 400, height: 400 }}
      />
      <p>Scanned value: {result}</p>
    </div>
  );
};

export default QRTest;
