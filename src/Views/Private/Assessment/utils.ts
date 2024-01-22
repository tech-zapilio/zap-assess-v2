export function time_elapsed(startTime: number): string {
  const currentTime = Date.now();
  const timeElapsedInSeconds = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds

  // Calculate minutes and seconds
  const minutes = Math.floor(timeElapsedInSeconds / 60);
  const seconds = timeElapsedInSeconds % 60;

  // Format the time as MM:SS
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}

export function formatSingleDigitNumber(num: number): string {
  if (num >= 0 && num <= 9) {
    // If it's a single-digit number, add a leading '0'
    return `0${num}`;
  } else {
    // If it's not a single-digit number, return it as is
    return num.toString();
  }
}
