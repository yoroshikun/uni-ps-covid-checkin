import { fullCheckIn } from './types';
import styles from '../../styles/Report/ReportTable.module.css';

const ReportTable = ({ checkIns }: { checkIns: fullCheckIn[] }) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">UID</th>
            <th scope="col">User</th>
            <th scope="col">Location</th>
            <th scope="col">Check-in</th>
          </tr>
        </thead>
        <tbody>
          {checkIns.map((checkIn) => (
            <tr key={checkIn.id}>
              <td>{String(checkIn.user.uid).padStart(7, '0')}</td>
              <td>
                {checkIn.user.name}:{checkIn.userId}
              </td>
              <td>
                {checkIn.location.name}:{checkIn.locationId}
              </td>
              <td>{checkIn.timestamp.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReportTable;
