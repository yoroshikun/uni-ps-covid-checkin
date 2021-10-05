import { useEffect, useState } from 'react';

const useDate = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const day = now.toLocaleDateString('en', { weekday: 'long' });
  const monthAndYear = now.toLocaleDateString('en', {
    month: 'long',
    year: 'numeric',
  });
  const date = `${day}, ${now.getDate()} ${monthAndYear}\n\n`;

  const time = now.toLocaleTimeString('en', {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });

  return {
    date,
    time,
  };
};

export default useDate;
