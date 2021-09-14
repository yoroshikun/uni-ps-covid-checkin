import { Dispatch, SetStateAction, useState } from 'react';
import { searchTypes } from './types';
import styles from '../../styles/Report/ReportTable.module.css';
import Image from 'next/image';
import searchIcon from '../../public/search.png';

interface SearchBarProps {
  search: (searchValue: string) => void;
  searchType: string;
  setSearchType: Dispatch<SetStateAction<searchTypes>>;
}

const SearchBar = ({ search, searchType, setSearchType }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(searchValue);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
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
    </div>
  );
};

export default SearchBar;
