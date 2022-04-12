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
};

export type data = Record<string, string | number>;

export type TableProps = {
  data: Array<data>;
  options?: TablePropsOptions;
};

const Table = ({ data = [], options }: TableProps) => {
  // Default Values
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

  // States for the current data, selected pagination and page index
  const [currentData, setCurrentData] = useState(data);
  const [selectedPagination, setSelectedPagination] = useState(
    paginationOptions[0].value,
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  // Building our chunks of data depending on the selected pagination and current data
  const dataChunks = useMemo(
    () => _.chunk(currentData, selectedPagination),
    [selectedPagination, currentData],
  );

  // State depending on the chunks of the data
  const [displayedData, setDisplayedData] = useState(dataChunks[pageIndex]);

  // Building the dictionary for the binary search
  const dictionary = useMemo(() => {
    if(!data.length) return
    return makeDictionary(data)
  },[]);

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

  //console.log('Current data: ', currentData);

  const handleNextPage = () => {
    //console.log('Next');
    if (pageIndex + 1 >= dataChunks.length) return;
    setPageIndex(pageIndex + 1);
  };

  const handlePrevPage = () => {
    //console.log('Previous');
    if (pageIndex - 1 < 0) return;
    setPageIndex(pageIndex - 1);
  };

  const handlePickPage = _.debounce((e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    //console.log(+e.target.innerHTML);
    setPageIndex(+e.target.innerHTML - 1);
  }, 50);

  const sortDescending = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const key = e.target.dataset.key;
    if (key === undefined) return;
    //console.log('Sort Descending by', key);
    const tempData = [...data];
    sortObjectsArray(tempData, key);
    setCurrentData(() => tempData);
  };

  const sortAscending = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const key = e.target.dataset.key;
    if (key === undefined) return;
    //console.log('Sort Ascending', e.target.dataset.key);
    const tempData = [...data];
    sortObjectsArray(tempData, key, 'asc');
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

  //if (!displayedData) return <p>No data to display!</p>

  return (
    <DataTable>
      <h1>{heading}</h1>
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
      <table>
        <thead>
          <tr>
            {dataKeys.map((key, index) => {
              if (key.position !== undefined)
                return (
                  <th key={`th-${index}`}>
                    <div className="column-header">
                      <span className="sort-controller">
                        <button onClick={sortAscending} data-key={key.value}>
                          🔺
                        </button>
                        <button onClick={sortDescending} data-key={key.value}>
                          🔻
                        </button>
                      </span>
                      {key.title}
                    </div>
                  </th>
                );
            })}
          </tr>
        </thead>
        <tbody>
          {displayedData && displayedData.map((obj, index) => {
            return <Row key={`tr-${index}`} data={obj} dataKeys={dataKeys} />;
          })}
        </tbody>
      </table>
      <div className="datatable__info">
        <p>
          Showing{' '}
          {displayedData && displayedData.length * (pageIndex + 1) - displayedData.length + 1} to{' '}
          {displayedData && displayedData.length * (pageIndex + 1)} of {currentData.length}{' '}
          entries
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
    </DataTable>
  );
};

export default Table;

const Row = (props: { data: data; dataKeys: dataKey[] }) => {
  const { data, dataKeys } = props;

  return (
    <tr>
      {dataKeys.map((key, index) => {
        if (key.position !== undefined) {
          return (
            <Cell key={`td-${key.value}-${index}`} entry={data[key.value]} />
          );
        }
      })}
    </tr>
  );
};

const Cell = (props: { entry: string | number }) => {
  const { entry } = props;
  return <td>{entry}</td>;
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
  button.current {
    border-color: red;
    background-color: red;
    color: white;
    font-weight: 700;
  }

  .column-header {
    display: flex;
    align-items: center;
  }
  .sort-controller {
    display: flex;
    flex-direction: column;
  }
`;
