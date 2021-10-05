import useDate from '../lib/useDate';
import styles from '../styles/Home.module.css';

const TopWindow = () => {
  const { date, time } = useDate();

  return (
    <div className={styles.topWindow}>
      <h2>{date}</h2>
      <h3>{time}</h3>
    </div>
  );
};

export default TopWindow;
