import { data, category } from "../components/Table/Table";
import { fastQuicksort } from './fastQuickSort';

const searchPattern = /\p{L}{3,}|\d{3,}/gu;

/**
 * Our Data class for the Table component. Its constructor
 * takes the required props from the Table component and
 * make a dictionary out of it for use in a binary search.
 * It also makes a "placeholder" array. This placeholder
 * contains the longest entry for each category, it helps us
 * style correctly the width of each column in the Table component.
 */
class Data {

  private data: { dictionary: Array<Array<string>>; placeholderEntries: Array<Array<string>> };

  constructor(data: Array<data>, categories:category[]) {
    this.data = this.makeDictionaryAndPlaceholder(data, categories)
  }

  /**
   * Construct a dictionary which is an array containing subarray following the pattern
   * [entry, [id1, id2, id3]] - Example: ["sales", ["6664f953-8d7c-49a8-ab88-caf2b30b4498", "369710cb-bf45-4b9e-8891-227081c40b7f"]
   * If we take the employees mock array as an example, each id would be the uuid of an employee where the entry is present.
   * We also make the placeholder in there because it permits us to avoid making another loop through the entire data argument (could be
   * not very efficient if it is an array with a length superior to 500, O(n) is better than O(n)^2).
   * @param {Array<data>} data
   * @param {category[]} categories
   * @returns {{dictionary: Array<Array<string>>, placeholderEntries: Array<Array<string>>}}
   */
  makeDictionaryAndPlaceholder(data: Array<data>, categories: category[]): { dictionary: Array<Array<string>>; placeholderEntries: Array<Array<string>>; } {
    const result: Record<any, any> = {};
    const placeholderEntries: Record<string, string> = {};

    data.forEach((obj, index) => {
      // Cycle through each keys of the object
      for (let key in obj) {
        if (key === 'id') continue; // No need to take the id
        if (!obj[key]) continue; // We don't want an undefined entry in our Dict
        // Dictionary construction
        const entry = `${obj[key]}`.toLowerCase(); // Each entry will be lowercase
        const terms = entry.match(searchPattern); // Get an array of searchable terms from this entry
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
            // First we make our longest entry equal to its category label. It should have a defined position.
            // Then we compare the current entry length to its longest stored entry.
            // If it is longer we make that entry the longest
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
