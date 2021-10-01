import type { GetServerSideProps, NextPage } from 'next';
import { Location } from '@prisma/client';

import prisma from '../lib/prisma';
import CheckInForm from '../components/Form/CheckInForm';
import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import humanImage from '../public/Human.png';
import translateImage from '../public/translate.png';
import { useState } from 'react';

import Lottie from 'react-lottie';
import backgroundAnimation from '../lottie/background.json';
import globeAnimation from '../lottie/globe.json';

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

const Home: NextPage<{ locations: Location[] }> = ({ locations }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftWindow}>
        <div className={styles.translateIcon}>
          <Image
            src={translateImage}
            alt="translate icon"
            onClick={() => setShowDrop(!showDrop)}
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

        <Head
          title="Covid Check-in Terminal"
          description="Check in with ease with this Terminal"
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

export default Home;
