import { fullCheckIn } from './types';
import styles from '../../styles/Report/ReportTable.module.css';

const ReportTable = ({ checkIns }: { checkIns: fullCheckIn[] }) => {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">UID</th>
            <th scope="col">User</th>
            <th scope="col">Location</th>
            <th scope="col">Check-in</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {checkIns.map((checkIn) => (
            <tr key={checkIn.id}>
              <td>{String(checkIn.user.uid).padStart(7, '0')}</td>
              <td>{checkIn.user.name}</td>
              <td>{checkIn.location.name}</td>
              <td>{new Date(checkIn.timestamp).toString()}</td>
              <td>{checkIn.user.phone}</td>
              <td>{checkIn.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
