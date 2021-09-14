const isProduction = process.env.NODE_ENV === 'production';

const makeAPIURL = () => {
  if (isProduction) {
    return 'https://uni-ps-covid-checkin.vercel.app';
  }

  return 'http://localhost:3000';
};

export default makeAPIURL;
