import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import translateImage from '../public/translate.png';
import styles from '../styles/LocaleSwitcher.module.css';

const locales = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'gr', name: 'Greek' },
  { code: 'jp', name: '日本語' },
  { code: 'zh', name: '官话' },
];

const LocaleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [_, i18n] = useTranslation();

  const handleLocaleChange = (code: string) => {
    i18n.changeLanguage(code);
    window.localStorage.setItem('locale', code);
    setIsOpen((prev) => !prev);
  };

  // Get the current locale code from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const code = window.localStorage.getItem('locale');
      if (code) {
        i18n.changeLanguage(code);
      }
    }
  }, [i18n]);

  return (
    <div className="locale-switcher">
      <div className={styles.translateIcon}>
        <Image
          src={translateImage}
          alt="translate icon"
          onClick={() => setIsOpen((prev) => !prev)}
        ></Image>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <ul>
            {locales.map((locale) => (
              <li
                key={locale.code}
                className="locale-switcher__button"
                onClick={() => handleLocaleChange(locale.code)}
                value={locale.code}
              >
                {locale.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocaleSwitcher;
