import type { NextPage } from 'next';

import CheckInForm from '../components/Form/CheckInForm';
import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div>
      <div className={styles.topFrame}></div>
      <div className={styles.container}>
        <Head
          title="Covid Check-in Terminal"
          description="Check in with ease with this Terminal"
        />

        <h1>Covid Check-in</h1>
        <CheckInForm />
      </div>
      <div className={styles.bottomFrame}></div>
    </div>
  );
};

export default Home;
