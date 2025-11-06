function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);


function isPalindrome(string) {
  const normalized = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return normalized === reversed;
}

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');


function extractNumber(string) {
  string = string.toString();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    const number = parseInt(char, 10);

    if (!Number.isNaN(number)) {
      result += number;
    }
  }

  if (result === '') {
    return NaN;
  }

  return parseInt(result, 10);
}

extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');
extractNumber(2023);
extractNumber(-1);
extractNumber(1.5);


const timeToMinutes = (time) => {
  const parts = time.split(':');
  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);
  return hours * 60 + minutes;
};

const isMeetingWithinWorkday = (workDayStart, workDayEnd, meetingStartTime, meetingDuration) => {
  const workStart = timeToMinutes(workDayStart);
  const workEnd = timeToMinutes(workDayEnd);
  const meetingStart = timeToMinutes(meetingStartTime);

  const meetingEnd = meetingStart + meetingDuration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
};

isMeetingWithinWorkday('08:00', '17:30', '14:00', 90);
isMeetingWithinWorkday('8:0', '10:0', '8:0', 120);
isMeetingWithinWorkday('08:00', '14:30', '14:00', 90);
isMeetingWithinWorkday('14:00', '17:30', '08:0', 90);
isMeetingWithinWorkday('8:00', '17:30', '08:00', 900);
