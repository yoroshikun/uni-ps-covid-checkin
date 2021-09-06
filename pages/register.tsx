import type { NextPage } from 'next';

import RegisterForm from '../components/Form/RegisterForm';
import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';

const Register: NextPage = () => {
  return (
    <div>
      <div className={styles.topFrame}></div>
      <div className={styles.container}>
        <Head
          title="Covid Check-in Terminal"
          description="Check in with ease with this Terminal"
        />

        <h1>Register for new account</h1>
        <RegisterForm />
      </div>
      <div className={styles.bottomFrame}></div>
    </div>
  );
};

export default Register;
