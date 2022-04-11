import { data } from '../components/Table/Table';
import { fastQuicksort } from "./fastQuickSort";

const searchPattern = /\p{L}{3,}|\d{3,}/ug

function makeDictionary(data: Array<data>): Array<Record<any, any>> {
  const result: Record<any, any> = {};
  data.forEach((obj, index) => {
    for (let key in obj) {
      if (key === 'id') continue;
      if (!obj[key]) continue;
      const entry = `${obj[key]}`.toLowerCase();
      const terms = entry.match(searchPattern);
      if (terms !== null) {
        terms.forEach((term) => {
          !result[term]
            ? result[term] = [obj.id] || [index]
            : result[term].push(obj.id || index);
        });
      }
    }
  });
  return fastQuicksort(Object.entries(result));
}

export default makeDictionary;
