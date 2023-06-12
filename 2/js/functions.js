function correctLength(string, length) {
  return string.length <= length;
}

function polindrom(string) {
  string = string.replaceAll(' ','');
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }
  return reverseString === string;
}

function digitInString(string) {
  string = string.toString();
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i])) {
      newString += string[i];
    }
  }
  return newString ? newString : NaN;
}
