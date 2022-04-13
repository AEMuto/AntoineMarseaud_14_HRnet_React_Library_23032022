import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import * as _ from 'lodash';
import styled from 'styled-components';
import sortObjectsArray from '../../utils/sortObjecsArray';
import makeDictionary from '../../utils/makeDictionary';
import rangedBinarySearch from '../../utils/rangedBinarySearch';
import removeDiacritics from '../../utils/removeDiacritics';

export type dataKey = {
  title: string;
  value: string;
  position: number | undefined;
};

export type TablePropsOptions = {
  dataKeys?: dataKey[];
  heading?: string;
  style?: CSSStyleDeclaration;
};

export type data = Record<string, string | number>;

export type TableProps = {
  data: Array<data>;
  options?: TablePropsOptions;
};

type sort = (key: string, order: 'asc' | 'desc') => void;

const Table = ({ data = [], options }: TableProps) => {
  /* DEFAULT VALUES ******************************************************************************/

  const defaultKeys = Object.keys(data[0]).map((key, index) => {
    return { title: key, value: key, position: index };
  });

  const defaultOptions = { heading: 'Data Table', dataKeys: defaultKeys };

  const {
    heading = defaultOptions.heading,
    dataKeys = defaultOptions.dataKeys,
  } = options ? options : defaultOptions;

  const paginationOptions = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ];

  /* STATES **************************************************************************************/

  const [currentData, setCurrentData] = useState(data);
  const [selectedPagination, setSelectedPagination] = useState(
    paginationOptions[0].value,
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');

  // Building our chunks of data depending on the selected pagination and current data
  const dataChunks = useMemo(
    () => _.chunk(currentData, selectedPagination),
    [selectedPagination, currentData],
  );

  // State depending on the chunks of the data
  const [displayedData, setDisplayedData] = useState(dataChunks[pageIndex]);

  // Building the dictionary for the binary search
  const dictionary = useMemo(() => {
    if (!data.length) return;
    return makeDictionary(data);
  }, []);

  /* HANDLERS ************************************************************************************/

  const handleNextPage = () => {
    if (pageIndex + 1 >= dataChunks.length) return;
    setPageIndex(pageIndex + 1);
  };

  const handlePrevPage = () => {
    if (pageIndex - 1 < 0) return;
    setPageIndex(pageIndex - 1);
  };

  const handlePickPage = _.debounce((e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    setPageIndex(+e.target.innerHTML - 1);
  }, 50);

  const handleSort: sort = (key, order) => {
    const tempData = [...data];
    sortObjectsArray(tempData, key, order);
    setCurrentData(() => tempData);
  };

  const updateSearchInput = _.debounce((e) => {
    if (!e.target.value.length) {
      setCurrentData(data);
      return;
    }
    if (e.target.value.length < 3) return;
    setSearchInput(removeDiacritics(e.target.value.toLowerCase()));
  }, 500);

  /* EFFECTS *************************************************************************************/

  // Modify the displayed data whether the dataChunks changes (meaning a change in the selected pagination)
  // or the pageIndex diminish or augment (meaning the user has clicked on the next|previous button or has
  // clicked on a page number button).
  useEffect(() => {
    setDisplayedData(dataChunks[pageIndex]);
  }, [dataChunks, pageIndex]);

  // Modify the displayed data when the input from the search field changes.
  useEffect(() => {
    if (!dictionary || !searchInput) return;
    const result = rangedBinarySearch(dictionary, searchInput);
    const filteredData = data.filter((obj) => {
      const id = `${obj.id}`;
      return result.indexOf(id) > -1;
    });
    setCurrentData(filteredData);
  }, [searchInput]);

  useEffect(() => {
    if (!sortBy || !sortOrder) return;
    console.log('Sort Order : ', sortOrder);
    console.log('Sorting by : ', sortBy);
  }, [sortOrder, sortBy]);

  /* TSX *****************************************************************************************/
  return (
    <DataTable>
      <h1>{heading}</h1>
      <div className="datatable__header">
        <div className="datatable__pagination-dropdown">
          <label htmlFor="pagination">
            Show{'  '}
            <Dropdown
              options={paginationOptions}
              selectedOption={selectedPagination}
              setSelectedOption={setSelectedPagination}
            />{' '}
            entries
          </label>
        </div>
        <div className="datatable__search-input">
          <label htmlFor="search">
            Search:{'  '}
            <input type="text" onChange={updateSearchInput} />
          </label>
        </div>
      </div>
      <div className="datatable__body">
        <table>
          <thead>
            <tr>
              {dataKeys.map((key, index) => {
                const { title, value, position } = key;
                if (position !== undefined)
                  return (
                    <TableHeader
                      key={`th-${index}`}
                      title={title}
                      dataKey={value}
                      isSorted={sortBy === value}
                      sortOrder={sortBy === value ? sortOrder : ''}
                      setSortBy={setSortBy}
                      setSortOrder={setSortOrder}
                    />
                  );
              })}
            </tr>
          </thead>
          <tbody>
            {displayedData &&
              displayedData.map((obj, index) => {
                return (
                  <Row
                    key={`tr-${index}`}
                    data={obj}
                    dataKeys={dataKeys}
                    sortBy={sortBy}
                    isEven={(index + 1) % 2 === 0}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="datatable__footer">
        <div className="datatable__info">
          <p>
            Showing{' '}
            {displayedData &&
              displayedData.length * (pageIndex + 1) -
                displayedData.length +
                1}{' '}
            to {displayedData && displayedData.length * (pageIndex + 1)} of{' '}
            {currentData.length} entries
          </p>
        </div>
        <div className="datatable__page-nav">
          <button
            onClick={handlePrevPage}
            disabled={pageIndex === 0}
            className="btn datatable__prev-page">
            Previous
          </button>
          <span>
            {dataChunks.map((_, index) => {
              return (
                <button
                  key={`page-btn-${index}`}
                  onClick={handlePickPage}
                  className={index === pageIndex ? 'btn current' : 'btn'}>
                  {index + 1}
                </button>
              );
            })}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pageIndex + 1 === dataChunks.length}
            className="btn datatable__next-page">
            Next
          </button>
        </div>
      </div>
    </DataTable>
  );
};

export default Table;

const TableHeader = (props: {
  title: string;
  dataKey: string;
  isSorted: boolean;
  sortOrder: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setSortOrder: React.Dispatch<React.SetStateAction<'' | 'asc' | 'desc'>>;
}) => {
  const { title, dataKey, isSorted, sortOrder, setSortBy, setSortOrder } =
    props;

  const toggleSort = () => {
    if (!isSorted) {
      setSortOrder(() => 'asc');
      setSortBy(() => dataKey);
    } else
      sortOrder === 'asc'
        ? setSortOrder(() => 'desc')
        : setSortOrder(() => 'asc');
  };

  return (
    <th
      className=""
      data-issorted={isSorted}
      data-sort={sortOrder}
      data-key={dataKey}
      onClick={toggleSort}>
      {title}
    </th>
  );
};

const Row = (props: {
  data: data;
  dataKeys: dataKey[];
  isEven: boolean;
  sortBy: string;
}) => {
  const { data, dataKeys, isEven, sortBy } = props;

  return (
    <tr data-iseven={isEven}>
      {dataKeys.map((key, index) => {
        const { value, title, position } = key;
        if (position !== undefined) {
          return (
            <Cell
              key={`td-${value}-${index}`}
              keyValue={value}
              entry={data[value]}
              title={title}
              isSorted={sortBy === value}
            />
          );
        }
      })}
    </tr>
  );
};

const Cell = (props: {
  entry: string | number;
  title: string;
  keyValue: string;
  isSorted: boolean;
}) => {
  const { entry, title, keyValue, isSorted } = props;
  return (
    <td data-title={title} data-keyvalue={keyValue} data-issorted={isSorted}>
      {entry}
    </td>
  );
};

const DataTable = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  button {
    cursor: pointer;
  }

  .datatable__header {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
  }

  .datatable__body {
    width: 100%;
    overflow-x: auto;
    padding: 0 0 1rem 0;
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 10px;
    }
  }

  table {
    border-collapse: collapse;
    text-align: left;
    width: 100%;
  }

  th,
  td {
    padding: 5px 10px;
    white-space: nowrap;
  }

  [data-iseven='false'] {
    background-color: #eeeeee;
  }

  td[data-issorted='true'] {
    background-color: rgba(0,0,0,0.05);
  }

  .datatable__footer {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
  }

  button.current {
    border-color: red;
    background-color: red;
    color: white;
    font-weight: 700;
  }
`;
