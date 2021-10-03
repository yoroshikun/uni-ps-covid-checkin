import type { NextPage } from 'next';

import InstallForm from '../components/Form/InstallForm';
import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';

const Install: NextPage = () => {
  return (
    <div>
      <div className={styles.topFrame}></div>
      <div className={styles.container}>
        <Head
          title="Covid Install Terminal"
          description="Install with ease with this Terminal"
        />

        <h1>Installation</h1>
        <InstallForm />
      </div>
      <div className={styles.bottomFrame}></div>
    </div>
  );
};

export default Install;
