/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
const getMin = (time) => {
  const MIN_IN_HOUR = 60;
  const [hour, min] = time.split(':').map((element) => Number(element));
  return hour * MIN_IN_HOUR + min;
};

const beOnTime = (startTime, endTime, currentTime, lenTime) => {
  const startTimeMin = getMin(startTime);
  const endTimeMin = getMin(endTime);
  const currentTimeMin = getMin(currentTime);
  // console.log(startTimeMin, endTimeMin, currentTimeMin, lenTime);

  return (startTimeMin <= currentTimeMin) && (endTimeMin >= currentTimeMin + lenTime);
};

beOnTime('08:00', '17:30', '14:00', 90);
// console.log(beOnTime('08:00', '17:30', '14:00', 90)); // true
// console.log(beOnTime('8:0', '10:0', '8:0', 120));     // true
// console.log(beOnTime('08:00', '14:30', '14:00', 90)); // false
// console.log(beOnTime('14:00', '17:30', '08:0', 90));  // false
// console.log(beOnTime('8:00', '17:30', '08:00', 900)); // false
