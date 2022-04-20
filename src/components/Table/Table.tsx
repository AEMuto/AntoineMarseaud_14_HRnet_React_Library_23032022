import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import * as _ from 'lodash';
import styled from 'styled-components';
import sortObjectsArray from '../../utils/sortObjecsArray';
import Data from '../../utils/DataClass';
import rangedBinarySearch from '../../utils/rangedBinarySearch';
import removeDiacritics from '../../utils/removeDiacritics';
import pagination from '../../utils/pagination';

export type category = {
  title: string;
  key: string;
  position: number | undefined;
};

export type TablePropsOptions = {
  categories: category[];
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

  const defaultCategories = Object.keys(data[0]).map((key, index) => {
    return { title: key, key, position: index };
  });

  const defaultOptions = {
    heading: 'Data Table',
    categories: defaultCategories,
  };

  const {
    heading = defaultOptions.heading,
    categories = defaultOptions.categories,
  } = options ? options : defaultOptions;

  const paginationOptions = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ];

  /* Data class instanciation ********************************************************************/

  const InitialData = new Data(data, categories);
  // Get the dictionary for binary search
  const dictionary = InitialData.dictionary;
  // Get the placeholder object that determine the cells width
  const placeholderEntries = InitialData.placeholderEntries;

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
    const tempData = [...currentData];
    sortObjectsArray(tempData, key, order);
    setCurrentData(() => tempData);
  };

  const updateSearchInput = _.debounce((e) => {
    if (!e.target.value.length) {
      setCurrentData(data);
      setSearchInput(() => '');
      return;
    }
    if (e.target.value.length < 3) return;
    setSearchInput(removeDiacritics(e.target.value.toLowerCase()));
  }, 500);

  /* EFFECTS *************************************************************************************/

  useEffect(() => {
    setPageIndex(() => 0);
  },[selectedPagination])

  // Modify the displayed data whether the dataChunks changes (meaning a change in the selected pagination)
  // or the pageIndex diminish or augment (meaning the user has clicked on the next|previous button or has
  // clicked on a page number button).
  useEffect(() => {
    console.log(dataChunks.length)
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
    setCurrentData(() => filteredData);
    // Changing the page index to 0 in order to display the filtered data correctly
    setPageIndex(() => 0);
    // Reset the sort
    setSortBy(() => '');
    setSortOrder(() => '');
  }, [searchInput]);

  // Handling the data sorting
  useEffect(() => {
    if (!sortBy || !sortOrder) return;
    console.log('Sort Order : ', sortOrder);
    console.log('Sorting by : ', sortBy);
    handleSort(sortBy, sortOrder);
  }, [sortOrder, sortBy]);



  //console.log(pagination(5, pageIndex, dataChunks.length));

  /* TSX *****************************************************************************************/
  return (
    <DataTable>
      <h1>{heading}</h1>
      <div className="datatable__tools-top">
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
      <div className="datatable__main">
        <table className="datatable__main-table">
          <thead className="datatable__main-header">
            <tr className="datatable__main-header-row placeholder">
              {placeholderEntries.map((entry, index) => (
                <th key={`${index}-${entry}`} className="datatable__heading">
                  {/*We had a 'W' at the end because it is the widest latin letter*/}
                  {entry[1]}W
                </th>
              ))}
            </tr>
            <tr className="datatable__main-header-row">
              {categories.map((category, index) => {
                const { title, key, position } = category;
                if (position !== undefined)
                  return (
                    <TableHeader
                      key={`th-${index}`}
                      title={title}
                      dataKey={key}
                      isSorted={sortBy === key}
                      sortOrder={sortBy === key ? sortOrder : ''}
                      setSortBy={setSortBy}
                      setSortOrder={setSortOrder}
                    />
                  );
              })}
            </tr>
          </thead>
          <tbody className="datatable__main-body">
            {displayedData &&
              displayedData.map((obj, index) => {
                return (
                  <Row
                    key={`tr-${index}`}
                    data={obj}
                    categories={categories}
                    sortBy={sortBy}
                    isEven={(index + 1) % 2 === 0}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="datatable__tools-bottom">
        <div className="datatable__info">
          <p>
            Showing{' '}
            {currentData
              ? (selectedPagination * (pageIndex + 1) ) - (selectedPagination - 1)
              : '0'}{' '}
            to {currentData ? ((selectedPagination * (pageIndex + 1) ) - (selectedPagination - 1)) + (displayedData?.length - 1 ): '0'} of{' '}
            {currentData.length} entries
          </p>
        </div>
        <div className="datatable__pagination-nav">
          <button
            data-title="Previous"
            onClick={handlePrevPage}
            disabled={pageIndex === 0}
            className="btn btn--controls">
            Previous
          </button>
          <span>
            {pagination(5, pageIndex + 1, dataChunks.length).map((page, index) => {
              if (typeof page !== 'string') {
                return (
                  <button
                    data-title={page}
                    key={`page-btn-${index}`}
                    onClick={handlePickPage}
                    className={page === pageIndex + 1 ? 'btn btn--pagination current' : 'btn btn--pagination'}>
                    {page}
                  </button>
                );
              }
              return (
                <span key={`page-ellipsis-${index}`} className={'btn btn--ellipsis'}>
                  {page}
                </span>
              );
            })}
          </span>
          <button
            data-title="Next"
            onClick={handleNextPage}
            disabled={pageIndex + 1 === dataChunks.length || !dataChunks.length}
            className="btn btn--controls">
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
      className="datatable__heading"
      data-issorted={isSorted}
      data-key={dataKey}
      onClick={toggleSort}>
      <span className="datatable__heading-content" data-sort={sortOrder}>
        {title}
      </span>
    </th>
  );
};

const Row = (props: {
  data: data;
  categories: category[];
  isEven: boolean;
  sortBy: string;
}) => {
  const { data, categories, isEven, sortBy } = props;

  return (
    <tr data-iseven={isEven} className="datatable__row">
      {categories.map((category, index) => {
        const { key, title, position } = category;
        if (position !== undefined) {
          return (
            <Cell
              key={`td-${key}-${index}`}
              category={key}
              entry={data[key]}
              title={title}
              isSorted={sortBy === key}
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
  category: string;
  isSorted: boolean;
}) => {
  const { entry, title, category, isSorted } = props;
  return (
    <td
      className="datatable__cell"
      data-title={title}
      data-category={category}
      data-issorted={isSorted}>
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
    &:disabled {
      cursor: auto;
    }
  }

  .datatable__tools-top {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
  }

  .datatable__main {
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

  .datatable__main-table {
    border-collapse: collapse;
    text-align: left;
    width: 100%;
    table-layout: auto;
    border-spacing: 0;
  }

  .datatable__main-body {
    border-top: solid 1px #000;
    border-bottom: solid 1px #000;
  }

  .datatable__main-header-row.placeholder {
    transform: scaleX(0);
    line-height: 0;
    & > .datatable__heading {
      padding: 0 8px;
    }
  }

  .datatable__heading {
    cursor: pointer;
    padding: 10.25px 8px;
    white-space: nowrap;
    .datatable__heading-content {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        width: 9px;
        height: 9px;
        background-color: #ccc;
        clip-path: polygon(50% 25%, 0% 100%, 100% 100%);
        right: -15px;
        top: -2px;
      }

      &:after {
        content: '';
        position: absolute;
        width: 9px;
        height: 9px;
        background-color: #ccc;
        clip-path: polygon(50% 75%, 0 0, 100% 0);
        right: -15px;
        bottom: -2px;
      }
      &[data-sort='asc'] {
        &:after {
          opacity: 0;
        }
        &:before {
          background-color: #7a80dd;
        }
      }
      &[data-sort='desc'] {
        &:before {
          opacity: 0;
        }
        &:after {
          background-color: #7a80dd;
        }
      }
    }
  }
  
  .datatable__cell {
    padding: 8.5px 8px;
    white-space: nowrap;
  }

  [data-iseven='false'] {
    background-color: #eeeeee;
  }

  .datatable__cell[data-issorted='true'] {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .datatable__tools-bottom {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn {
    font-size: 1rem;
    background-color: transparent;
    border: none;
    padding: 8px;
    margin: 2px;
    min-width: 28px;
    min-height: 28px;
    border-radius: 5px;
    position: relative;

    &--pagination:hover {
      border-color: #6985FC;
      background-color: #6985FC;
      color: white;
      font-weight: 700;
    }
    &--controls {
      min-width: 84px;
      &:disabled {
        min-width: 84px;
      }
      &:hover:enabled {
        text-decoration: underline 4px #6985FC;
        font-weight: 700;
      }
    }
  }
  
  button.current {
    border-color: #6985FC;
    background-color: #6985FC;
    color: white;
    font-weight: 700;
  }
`;
