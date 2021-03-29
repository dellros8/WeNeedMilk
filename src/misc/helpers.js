import Clipboard from 'expo-clipboard';

export const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4();
};

export const getWeekDay = () => {
  var d = new Date();
  var n = d.getDay();
  switch (n) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
};

export const copyToClipboard = async (string, setCopiedStringTimeCallback) => {
  Clipboard.setString(string);
  const text = await Clipboard.getStringAsync();
  setCopiedStringTimeCallback(text);
};

export const sortFullItemList = (list) => {
  return list.sort((a, b) => {
    if (a.checked && !b.checked) {
      return 1;
    } else if (!a.checked && b.checked) {
      return -1;
    }

    if (a.checked && b.checked) {
      if (a.checkedTime > b.checkedTime) {
        return -1;
      } else {
        return 1;
      }
    } else if (!a.checked && !b.checked) {
      if (a.createdTime > b.createdTime) {
        return -1;
      } else {
        return 1;
      }
    }

    return 0;
  });
};
