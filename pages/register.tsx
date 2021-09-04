import type { NextPage } from 'next';

import RegisterForm from '../components/Form/RegisterForm';
import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';

const Register: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head
        title="Covid Check-in Terminal"
        description="Check in with ease with this Terminal"
      />

      <h1>Register for new account</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
