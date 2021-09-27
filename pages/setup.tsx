import type { NextPage } from 'next';

import SetupForm from '../components/Form/SetupForm';

import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';

import Image from 'next/image';
import humanImage from '../public/Human.png';

const Setup: NextPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftWindow}>
        <p className={styles.line1}>Welcome to</p>
        <p className={styles.line2}>COVID CHECK-IN</p>
        <p className={styles.line3}>Setup your terminal</p>

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

        <Head
          title="Setup Covid Check-in Terminal"
          description="Setup with ease with this Terminal"
        />
       <div className={styles.subContainer}>
          <SetupForm />
        </div>
      </div>
    </div>
  );
};


export default Setup;
