import { useEffect, useState } from "react";

const useCountdown = (targetDate: number) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

function padNumber(number: number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Use padStart to ensure the string has at least 2 digits
  const paddedNumber = numberString.padStart(2, "0");

  return paddedNumber;
}

function preventNegative(value: number): string {
  return value >= 0 ? padNumber(value) : "00";
}

export const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = preventNegative(Math.floor(countDown / (1000 * 60 * 60 * 24)));
  const hours = preventNegative(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = preventNegative(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = preventNegative(Math.floor((countDown % (1000 * 60)) / 1000));
  const isOver = countDown <= 0;

  const timer = { days, hours, minutes, seconds, isOver };
  return timer;
};

export { useCountdown };
