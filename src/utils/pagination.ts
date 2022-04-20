import * as _ from 'lodash';

/**
 https://stackoverflow.com/questions/55585987/pagination-algorithm-with-ellipsis
 **/
const pagination = (count: number, page: number, total: number) => {
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
