import { data } from '../components/Table/Table';
import removeDiacritics from './removeDiacritics';
import patterns from './patterns';

const { date: datePattern, onlyNumbers: onlyNumbersPattern } = patterns;

/**
 * Sort implementation with a custom compare function.
 * Created mostly to handle cases where the entry is a string that could
 * be parsed as a number and therefore sorted as one.
 * If it is a string containing letters we remove its diacritics if there is any
 * and sort it.
 * @param {Array<data>} data Our array of objects
 * @param {string} key The object's key by which we wish to sort the array
 * @param {"desc" | "asc"} order Our desired sort order
 * @returns {Array<data>} The sorted array
 */
const sortObjectsArray = (
  data: Array<data>,
  key: string,
  order: 'desc' | 'asc' = 'desc',
): Array<data> => {
  //console.table(data);
  data.sort((prev, next) => {
    const prevField = prev[key];
    const nextField = next[key];

    // Fields are numbers
    if (typeof prevField === 'number' && typeof nextField === 'number') {
      if (order === 'desc') return nextField - prevField;
      else return prevField - nextField;
    }
    // Fields are string
    else if (typeof prevField === 'string' && typeof nextField === 'string') {
      // Fields contain only a date: we parse it and sort it as a number
      if (prevField.match(datePattern) && nextField.match(datePattern)) {
        const prevDate = Date.parse(prevField);
        const nextDate = Date.parse(nextField);
        if (order === 'desc') return nextDate - prevDate;
        else return prevDate - nextDate;
      }
      // Fields contain only numbers
      if (
        prevField.match(onlyNumbersPattern) &&
        nextField.match(onlyNumbersPattern)
      ) {
        const prevNumber = parseInt(prevField, 10);
        const nextNumber = parseInt(nextField, 10);
        if (order === 'desc') return nextNumber - prevNumber;
        else return prevNumber - nextNumber;
      }
      // TODO: Street Sort ?
      // Default sort
      const prevString = removeDiacritics(prevField).toUpperCase();
      const nextString = removeDiacritics(nextField).toUpperCase();
      if (order === 'desc')
        return prevString > nextString ? -1 : nextString > prevString ? 1 : 0;
      else
        return prevString > nextString ? 1 : nextString > prevString ? -1 : 0;
    }
    // Fields are invalid
    else {
      throw new Error(
        `A cell in the column ${key} contains neither a string, nor a number and thus cannot be sorted.`,
      );
    }
  });
  return data;
};

export default sortObjectsArray;
