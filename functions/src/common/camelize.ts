import { regexes } from './constants';

const camelize = (str: string): string => {
  if (str.toUpperCase() == str) return str; // abbreviation case

  const cleanedStr = str.replace(regexes.camelizeClean, '');

  return cleanedStr.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export default camelize;
