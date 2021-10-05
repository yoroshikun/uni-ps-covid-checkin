import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
import Link from 'next/link';
import Image from 'next/image';

import LocaleSwitcher from './LocaleSwitcher';
import settingsImage from '../public/settings.png';
import styles from '../styles/LeftContainer.module.css';

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

const LeftContainer = ({ tkey }: { tkey: string }) => {
  const [t, _] = useTranslation();

  return (
    <div className={styles.leftWindow}>
      <LocaleSwitcher />

      <div className={styles.settingsIcon}>
        <Link href="/setup" passHref>
          <Image src={settingsImage} alt="settings icon"></Image>
        </Link>
      </div>

      <p className={styles.line1}>{t(`${tkey}.LeftMain1`)}</p>
      <p className={styles.line2}>{t(`${tkey}.LeftMain2`)}</p>
      <p className={styles.line3}>{t(`${tkey}.LeftMain3`)}</p>

      <div className={styles.globe}>
        <Lottie options={globeAni} height={450} width={500} />
      </div>

      <div className={styles.bgAnimation}>
        <Lottie options={bgAni} height={920} width={400} />
      </div>
    </div>
  );
};

export default LeftContainer;
