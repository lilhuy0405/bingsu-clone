export const minimizeAddress = (address: string) => {
  if (address.length < 6) {
    return address
  }
  const start = address.slice(0, 2)
  const end = address.slice(-4)
  return `${start}...${end}`
}

export const formatNumber = (toFormat: string, currency: string) => {
  return `${toFormat.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} ${currency}`
}

export const calculateUsdPerBingSu = (usdAmount: number, saveDiv: number, salePrice: number) => {
  return usdAmount * (saveDiv / salePrice)
}

export const calculateBnbPerBingSu = (bnbAmount: number, saveDiv: number, salePrice: number, bnbPrice: number) => {
  return bnbAmount * (bnbPrice * saveDiv / salePrice)

}


export const removeTrailZeros = (number: string) => {
  const pointIndex = number.indexOf(".");
  if (pointIndex < 0) return number
  let numberCopy = number;
  for (let i = number.length - 1; i > pointIndex; i--) {
    if (+number[i] !== 0) {
      break;
    }
    numberCopy = numberCopy.substring(0, numberCopy.length - 1);
  }
  if (numberCopy[numberCopy.length - 1] === ".") {
    numberCopy = numberCopy.substring(0, numberCopy.length - 1);
    numberCopy = parseFloat(numberCopy).toFixed(2);
  }
  return numberCopy
}


const oneDay = 1000 * 60 * 60 * 24;
const oneHour = 1000 * 60 * 60
const oneMinute = 1000 * 60
const oneSecond = 1000;

function addZero(i: string | number) {
  if (i < 10 && i >= 0) {
    i = '0' + i;
  }
  return i;
}

export const countDown = (expiredDate: Date, onStopCountDown: Function) => {
  const expriredDateInMilisecond = expiredDate.getTime();
  const today = new Date();
  let todayInMilisecond = today.getTime();

  let differenceInMs = expriredDateInMilisecond - todayInMilisecond; //check if difference > 0
  if (differenceInMs <= 0) {
    onStopCountDown();
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }
  let remainingMs = differenceInMs;
  //get difference day
  let differenceInDays = Math.floor(differenceInMs / oneDay);
  remainingMs = differenceInMs % oneDay;
  //get difference hours
  let differenceInHours = Math.floor(remainingMs / oneHour);
  remainingMs = remainingMs % oneHour
  //get Difference in minute
  let differenceInMinute = Math.floor(remainingMs / oneMinute);
  remainingMs = remainingMs % oneMinute
  //get difference in second
  let differenceInSecond = Math.floor(remainingMs / oneSecond);
  remainingMs = remainingMs % oneSecond;
  return {
    days: addZero(differenceInDays),
    hours: addZero(differenceInHours),
    minutes: addZero(differenceInMinute),
    seconds: addZero(differenceInSecond)
  }

}

