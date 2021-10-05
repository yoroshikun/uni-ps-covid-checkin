import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import RegisterForm from '../components/Form/RegisterForm';
import Head from '../components/Layout/Head';
import LeftContainer from '../components/LeftContainer';
import TopWindow from '../components/TopWindow';
import styles from '../styles/Home.module.css';

const Register: NextPage = () => {
  const [t] = useTranslation();

  return (
    <div className={styles.mainContainer}>
      <Head
        title="Covid Register Terminal"
        description="Register with ease with this Terminal"
      />

      <LeftContainer tkey="RegisterPage" />

      <div className={styles.rightContainer}>
        <TopWindow />

        <div className={styles.subContainer}>
          <Head
            title="Covid Register Terminal"
            description="Register with ease with this Terminal"
          />

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
