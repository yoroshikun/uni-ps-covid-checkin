import { CheckIn, User, Location } from '@prisma/client';
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
    (searchValue: string) => {
      switch (searchType) {
        case 'uid': {
          const newCheckIns = initialCheckIns.filter(
            (checkIn) => checkIn.user.uid === Number(searchValue)
          );

          setCheckIns(newCheckIns);

          break;
        }
        case 'username': {
          const newCheckIns = initialCheckIns.filter((checkIn) =>
            checkIn.user.name.toLowerCase().includes(searchValue.toLowerCase())
          );

          setCheckIns(newCheckIns);

          break;
        }
        case 'userId': {
          const newCheckIns = initialCheckIns.filter(
            (checkIn) => checkIn.userId === searchValue
          );

          setCheckIns(newCheckIns);

          break;
        }
        case 'location': {
          const newCheckIns = initialCheckIns.filter((checkIn) =>
            checkIn.location.name
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          );

          setCheckIns(newCheckIns);

          break;
        }
        case 'locationId': {
          const newCheckIns = initialCheckIns.filter(
            (checkIn) => checkIn.locationId === searchValue
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
        <button type="button" onClick={refresh}>
          Click to refresh
        </button>
        <button
          type="button"
          onClick={() => {
            setCheckIns(initialCheckIns);
          }}
        >
          Reset
        </button>
      </div>
      <SearchBar
        search={search}
        searchType={searchType}
        setSearchType={setSearchType}
      />
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
