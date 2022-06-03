import * as _ from 'lodash';

/**
 * Pagination algorithm implementation by Scott Sauyet
 * "Our main function calculates the start and end of the range that includes the number,
 * taking care not to extend beyond the range 1 - total. The complexities of max and min
 * and the floor operations are to handle all the possibilities that the expected range
 * would fall off these boundaries. Then it builds an output, dealing with the various
 * combinations of values and ellipses. The beginning, before our start-end range,
 * could be 1 followed by an ellipsis, or it could just be a 1, or it could be empty.
 * And then after the range, we have similar behavior at the end."
 * https://stackoverflow.com/questions/55585987/pagination-algorithm-with-ellipsis
 * @param {number} count How many numbers we would like to show
 * @param {number} page Current page index
 * @param {number} total Total number of pages
 * @returns {(number | string)[]}
 */
const pagination = (count: number, page: number, total: number): (number | string)[] => {
  const { floor, min, max } = Math;

  const start = max(1, min(page - floor((count - 3) / 2), total - count + 2));

  const end = min(total, max(page + floor((count - 2) / 2), count - 1));

  return [
    ...(start > 2 ? [1, '...'] : start > 1 ? [1] : []),
    ..._.range(start, end + 1),
    ...(end < total - 1 ? ['...', total] : end < total ? [total] : []),
  ];
};

export default pagination;
