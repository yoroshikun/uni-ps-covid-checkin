import type { GetServerSideProps, NextPage } from 'next';
import { Location } from '@prisma/client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Lottie from 'react-lottie';

import CheckInForm from '../components/Form/CheckInForm';
import Head from '../components/Layout/Head';
import prisma from '../lib/prisma';
import styles from '../styles/Home.module.css';
import translateImage from '../public/translate.png';

import backgroundAnimation from '../lottie/background.json';
import globeAnimation from '../lottie/globe.json';

export const useDate = () => {
  const locale = 'en';
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

  useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  })}\n\n`;

  const time = today.toLocaleTimeString(locale, {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });

  return {
    date,
    time,
  };
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

const UID: NextPage<{ locations: Location[] }> = ({ locations }) => {
  const [showDrop, setShowDropdown] = useState(false);
  const { date, time } = useDate();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftWindow}>
        <div className={styles.translateIcon}>
          <Image
            src={translateImage}
            alt="translate icon"
            onClick={() => setShowDropdown((prev) => !prev)}
          ></Image>
        </div>

        {showDrop && (
          <div className={styles.dropdown} id="language">
            <ul>
              <li>English</li>
              <li>French</li>
              <li>Greek</li>
              <li>日本語</li>
              <li>官话</li>
            </ul>
          </div>
        )}

        <p className={styles.line1}>Welcome to</p>
        <p className={styles.line2}>COVID CHECK-IN</p>
        <p className={styles.line3}>Check-in with UID</p>

        <div className={styles.globe}>
          <Lottie options={globeAni} height={450} width={500} />
        </div>

        <div className={styles.bgAnimation}>
          <Lottie options={bgAni} height={920} width={400} />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.topWindow}>
          <h2>{date}</h2>
          <h3>{time}</h3>
        </div>

        <Head
          title="Check-in with UID"
          description="Check in manually with UID"
        />
        <div className={styles.subContainer}>
          <CheckInForm locations={locations} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const locations = await prisma.location.findMany();
  return { props: { locations } };
};

export default UID;
