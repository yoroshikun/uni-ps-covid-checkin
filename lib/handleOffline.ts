import checkInUser from './checkInUser';

interface Data {
  uid: string;
  timestamp: string;
}

// Function that handles offline mode
// It should check if the user is offline if so store the data in local storage
// It should merge the data with the data in local storage
// Data should be stored in local storage as an array of objects
// Return if the user is online
const handleOffline = async (
  data: Data,
  location: string
): Promise<boolean> => {
  // Check if offline
  if (!navigator.onLine) {
    const offlineData = localStorage.getItem('offlineData');
    if (offlineData) {
      const decodedData = Buffer.from(offlineData, 'base64').toString('utf8');
      const parsedData = JSON.parse(decodedData);
      const newData = [...parsedData, data];
      // Base 64 encode the data
      const encodedData = Buffer.from(JSON.stringify(newData)).toString(
        'base64'
      );
      localStorage.setItem('offlineData', encodedData);
    } else {
      const encodedData = Buffer.from(JSON.stringify([data])).toString(
        'base64'
      );
      localStorage.setItem('offlineData', encodedData);
    }
    return false;
  }
  // If online, register all users in offline storage
  else {
    const offlineData = localStorage.getItem('offlineData');

    if (offlineData) {
      // Base 64 decode the data
      const decodedData = Buffer.from(offlineData, 'base64').toString('utf8');
      const parsedData: Data[] = JSON.parse(decodedData);

      for (const user of parsedData) {
        await checkInUser({ uid: user.uid, location });
      }

      localStorage.removeItem('offlineData');
    }
    return true;
  }
};

export default handleOffline;
