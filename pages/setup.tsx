import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import SetupForm from '../components/Form/SetupForm';
import Head from '../components/Layout/Head';
import LeftContainer from '../components/LeftContainer';
import TopWindow from '../components/TopWindow';
import styles from '../styles/Home.module.css';

const Setup: NextPage = () => {
  const [t] = useTranslation();

  return (
    <div className={styles.mainContainer}>
      <Head
        title="Covid Install Terminal"
        description="Install with ease with this Terminal"
      />

      <LeftContainer tkey="SetupPage" />

      <div className={styles.rightContainer}>
        <TopWindow />

        <div className={styles.subContainer}>
          <SetupForm />
        </div>
      </div>
    </div>
  );
};

export default Setup;
