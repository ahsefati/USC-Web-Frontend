import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.000') : '';

  return result(format, '.000');
}

export function fSixDigitNumber(number) {
  if (number !== undefined && !Number.isNaN(number)) {
      // Convert to string and split at the decimal point
      const parts = number.toString().split('.');
      
      // Count digits before the decimal point
      const integerPartLength = parts[0].length;

      // Calculate the needed decimal places to make the total length 6
      let decimalPlaces = 6 - integerPartLength;

      // Ensure decimalPlaces is not negative
      decimalPlaces = Math.max(decimalPlaces, 0);

      // Format the number with the required decimal places
      return number.toFixed(decimalPlaces);
  }

  return '';
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = numeral(number).format('0.00a');

  return result(format, '0.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
