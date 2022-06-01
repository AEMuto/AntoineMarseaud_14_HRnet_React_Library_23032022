import { data, category } from "../components/Table/Table";
import { fastQuicksort } from './fastQuickSort';

const searchPattern = /\p{L}{3,}|\d{3,}/gu;

class Data {

  private data: { dictionary: Array<Array<string>>; placeholderEntries: Array<Array<string>> };

  constructor(data: Array<data>, categories:category[]) {
    this.data = this.makeDictionary(data, categories)
  }

  makeDictionary(data: Array<data>, categories: category[]) {
    const result: Record<any, any> = {};
    const placeholderEntries: Record<string, string> = {};

    data.forEach((obj, index) => {
      for (let key in obj) {
        if (key === 'id') continue;
        if (!obj[key]) continue;
        // dictionary construction
        const entry = `${obj[key]}`.toLowerCase();
        const terms = entry.match(searchPattern);
        if (terms !== null) {
          terms.forEach((term) => {
            !result[term]
              ? (result[term] = [obj.id] || [index])
              : result[term].push(obj.id || index);
          });
        }
        // Placeholder Row's entries construction
        categories.forEach(category => {
          if(key === category.key && category.position !== undefined) {
            if(!placeholderEntries[category.position]) placeholderEntries[category.position] = category.title
            else placeholderEntries[category.position].length < `${obj[key]}`.length ? placeholderEntries[category.position] = `${obj[key]}`: '';
          }
        })

      }
    });
    const dictionary = fastQuicksort(Object.entries(result));

    return { dictionary, placeholderEntries: fastQuicksort(Object.entries(placeholderEntries)) };
  }

  get dictionary() {
    return this.data.dictionary
  }

  get placeholderEntries() {
    return this.data.placeholderEntries
  }

}

export default Data
