export function monthDayNumbersToWords(timeNum) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
    return `${months[Number(timeNum[5] + timeNum[6]) - 1]} ${Number(timeNum[8] + timeNum[9])}`;
}