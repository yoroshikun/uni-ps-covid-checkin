import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
// @ts-ignore
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker';
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { searchTypes } from './types';
import styles from '../../styles/Report/ReportTable.module.css';
import searchIcon from '../../public/search.png';

interface SearchBarProps {
  search: (searchValue: string, dates: Date[]) => void;
  searchType: string;
  setSearchType: Dispatch<SetStateAction<searchTypes>>;
}

let lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);

const SearchBar = ({ search, searchType, setSearchType }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState<Date[]>([lastWeek, new Date()]);

  const handleSearch = () => search(searchValue, dateRange);

  return (
    <div className={styles.searchAndCalendar}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
          />
          <div className={styles.searchIcon}>
            <Image
              src={searchIcon}
              alt="Search Icon"
              height="26px"
              width="23px"
            />
          </div>
          <button type="submit">Search</button>

          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as searchTypes)}
          >
            <option value="uid">UID</option>
            <option value="userId">User ID</option>
            <option value="username">Username</option>
            <option value="location">Location</option>
            <option value="locationId">Location ID</option>
          </select>
        </div>
      </form>

      <div className={styles.dateBar}>
        <DateTimeRangePicker
          onChange={(dates: Date[]) => {
            // Check if dates are valid
            if (dates[0] && dates[1]) {
              setDateRange(dates);
              handleSearch();
            }
          }}
          value={dateRange}
          className={styles.datePicker}
        />
      </div>
    </div>
  );
};

export default SearchBar;
