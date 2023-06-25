function correctLength(string, length) {
  return string.length <= length;
}

function polindrom(string) {
  string = string.replaceAll(' ','').toLowerCase();
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }
  return reverseString === string;
}

function digitInString(string) {
  string = string.toString().replaceAll(' ','');
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i])) {
      newString += string[i];
    }
  }
  return newString ? newString : NaN;
}

correctLength('проверяемая строка', 20);
correctLength('проверяемая строка', 18);
correctLength('проверяемая строка', 10);
polindrom('топот');
polindrom('Довод');
polindrom('Кекс');
polindrom('Лёша на полке клопа нашёл ');
digitInString('2023 год');
digitInString('ECMAScript 2022');
digitInString('1 кефир,0.5 батона');
digitInString('агент 007');
digitInString('а я томат');
