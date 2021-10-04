import { useCallback, useState } from 'react';
import ReportTable from './ReportTable';
import SearchBar from './SearchBar';
import { fullCheckIn, searchTypes } from './types';
import styles from '../../styles/Report/ReportTable.module.css';

interface ReportProps {
  initialCheckIns: fullCheckIn[];
  refresh: () => void;
  refreshing: boolean;
}

const Layout = ({ initialCheckIns, refresh, refreshing }: ReportProps) => {
  const [checkIns, setCheckIns] = useState<fullCheckIn[]>(initialCheckIns);
  const [error, setError] = useState<string>('');
  const [searchType, setSearchType] = useState<searchTypes>('uid');

  // Handle search of check-ins
  const search = useCallback(
    (searchValue: string, dates: Date[]) => {
      if (searchValue === '') {
        const newCheckIns = initialCheckIns.filter(
          (checkIn) =>
            new Date(checkIn.timestamp).getTime() <= dates[1].getTime() &&
            new Date(checkIn.timestamp).getTime() >= dates[0].getTime()
        );

        setCheckIns(newCheckIns);
        return;
      }

      switch (searchType) {
        case 'uid': {
          const newCheckIns = initialCheckIns
            .filter((checkIn) => checkIn.user.uid === Number(searchValue))
            .filter(
              (checkIn) =>
                checkIn.timestamp.getTime() <= dates[1].getTime() &&
                checkIn.timestamp.getTime() >= dates[0].getTime()
            );

          setCheckIns(newCheckIns);

          break;
        }
        case 'username': {
          const newCheckIns = initialCheckIns
            .filter((checkIn) =>
              checkIn.user.name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
            .filter(
              (checkIn) =>
                checkIn.timestamp.getTime() <= dates[1].getTime() &&
                checkIn.timestamp.getTime() >= dates[0].getTime()
            );

          setCheckIns(newCheckIns);

          break;
        }
        case 'userId': {
          const newCheckIns = initialCheckIns
            .filter((checkIn) => checkIn.userId === searchValue)
            .filter(
              (checkIn) =>
                checkIn.timestamp.getTime() <= dates[1].getTime() &&
                checkIn.timestamp.getTime() >= dates[0].getTime()
            );

          setCheckIns(newCheckIns);

          break;
        }
        case 'location': {
          const newCheckIns = initialCheckIns
            .filter((checkIn) =>
              checkIn.location.name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
            .filter(
              (checkIn) =>
                checkIn.timestamp.getTime() <= dates[1].getTime() &&
                checkIn.timestamp.getTime() >= dates[0].getTime()
            );

          setCheckIns(newCheckIns);

          break;
        }
        case 'locationId': {
          const newCheckIns = initialCheckIns
            .filter((checkIn) => checkIn.locationId === searchValue)
            .filter(
              (checkIn) =>
                checkIn.timestamp.getTime() <= dates[1].getTime() &&
                checkIn.timestamp.getTime() >= dates[0].getTime()
            );

          setCheckIns(newCheckIns);

          break;
        }
        default:
          // Dont do anything if the search type is not valid
          setError('Invalid search type');
          break;
      }
    },
    [initialCheckIns, searchType, setCheckIns]
  );

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.buttonContainer}>
      <h1>Check-In Report</h1>
      <div className={styles.anotherContainer}>
        <SearchBar
          search={search}
          searchType={searchType}
          setSearchType={setSearchType}
        />

        <button type="button" className={styles.refresh} onClick={refresh}>
          Click to refresh
        </button>
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            setCheckIns(initialCheckIns);
          }}
        >
          Reset
        </button>
      </div>
      {refreshing ? (
        <p>Refreshing...</p>
      ) : checkIns.length === 0 ? (
        <p>No CheckIns</p>
      ) : (
        <ReportTable checkIns={checkIns} />
      )}
    </div>
  );
};

export default Layout;
