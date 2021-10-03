import type { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import Lottie from 'react-lottie';

import translateImage from '../public/translate.png';
import InstallForm from '../components/Form/InstallForm';
import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';

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

const Install: NextPage = () => {
  const [showDrop, setShowDropdown] = useState(false);

  return (
    <div className={styles.mainContainer}>
      <Head
        title="Covid Install Terminal"
        description="Install with ease with this Terminal"
      />

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
        <p className={styles.line3}>Installation</p>

        <div className={styles.globe}>
          <Lottie options={globeAni} height={450} width={500} />
        </div>

        <div className={styles.bgAnimation}>
          <Lottie options={bgAni} height={920} width={400} />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.topWindow}></div>

        <div className={styles.subContainer}>
          <h1>Installation</h1>
          <InstallForm />
        </div>
      </div>
    </div>
  );
};

export default Install;
