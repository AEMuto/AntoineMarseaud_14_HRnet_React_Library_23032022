import { data } from '../components/Table/Table';
import removeDiacritics from './removeDiacritics';
import patterns from './patterns';

const { date: datePattern, onlyNumbers: onlyNumbersPattern } = patterns;

const sortObjectsArray = (
  data: Array<data>,
  key: string,
  order: 'desc' | 'asc' = 'desc',
) => {
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
      // Fields contain only a date
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
      // TODO: Street Sort
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
  //console.table(data);
  return data;
};

export default sortObjectsArray;
