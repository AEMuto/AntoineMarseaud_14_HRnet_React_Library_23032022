import { data } from '../components/Table/Table';
import { fastQuicksort } from './fastQuickSort';

const searchPattern = /\p{L}{3,}|\d{3,}/gu;

function makeDictionary(data: Array<data>): string[][] {
  const result: Record<any, any> = {};
  console.time('makeDictionary');
  data.forEach((obj, index) => {
    for (let key in obj) {
      if (key === 'id') continue;
      if (!obj[key]) continue;
      const entry = `${obj[key]}`.toLowerCase();
      const terms = entry.match(searchPattern);
      if (terms !== null) {
        terms.forEach((term) => {
          !result[term]
            ? (result[term] = [obj.id] || [index])
            : result[term].push(obj.id || index);
        });
      }
    }
  });
  const dictionary = fastQuicksort(Object.entries(result));
  console.timeEnd('makeDictionary');
  return dictionary;
}

export default makeDictionary;
