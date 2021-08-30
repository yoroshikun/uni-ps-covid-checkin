import type { NextPage } from 'next';
import Form from '../components/Form/Form';
import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';

const Home: NextPage<{ feed: any }> = ({ feed }) => {
  return (
    <div className={styles.container}>
      <Head
        title="Covid Check-in Terminal"
        description="Check in with ease with this Terminal"
      />

      <h1>Covid Check-in</h1>
      <Form />
    </div>
  );
};

export default Home;

// Fetch all locations from the database
// export const getStaticProps: GetStaticProps = async () => {
//   // Custom logic
//   return { props: { locations } };
// };
