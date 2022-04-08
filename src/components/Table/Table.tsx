import React from 'react';

import { useEffect, useMemo, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import * as _ from 'lodash';
import styled from 'styled-components';
import sortObjectsArray from '../../utils/sortObjecsArray';

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

/**
 * Table component based on the datatable jquery plugin.
 * TODO: Adding a 'sortingFunction' field to the options object ?
 * @param data
 * @param options
 * @constructor
 */
const Table = ({ data = [], options }: TableProps) => {
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

  const [sortedData, setSortedData] = useState(data);
  const [selectedPagination, setSelectedPagination] = useState(
    paginationOptions[0].value,
  );
  const [pageIndex, setPageIndex] = useState(0);

  const dataChunks = useMemo(
    () => _.chunk(sortedData, selectedPagination),
    [selectedPagination, sortedData],
  );
  //console.log(dataChunks);
  const [currentData, setCurrentData] = useState(dataChunks[pageIndex]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setCurrentData(dataChunks[pageIndex]);
  }, [dataChunks, pageIndex]);

  useEffect(() => {
    console.log(searchInput);
  }, [searchInput]);

  //console.log('Current data: ', currentData);

  const handleNextPage = () => {
    console.log('Next');
    if (pageIndex + 1 >= dataChunks.length) return;
    setPageIndex(pageIndex + 1);
  };

  const handlePrevPage = () => {
    console.log('Previous');
    if (pageIndex - 1 < 0) return;
    setPageIndex(pageIndex - 1);
  };

  const handlePickPage = _.debounce((e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    console.log(+e.target.innerHTML);
    setPageIndex(+e.target.innerHTML - 1);
  }, 50);

  const sortDescending = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const key = e.target.dataset.key;
    if (key === undefined) return;
    console.log('Sort Descending by', key);
    const tempData = [...data];
    sortObjectsArray(tempData, key);
    setSortedData(() => tempData);
  };

  const sortAscending = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const key = e.target.dataset.key;
    if (key === undefined) return;
    console.log('Sort Ascending', e.target.dataset.key);
    const tempData = [...data];
    sortObjectsArray(tempData, key, 'asc');
    setSortedData(() => tempData);
  };

  const updateSearchInput = _.debounce((e) => {
    if (e.target.value.length < 3) return;
    setSearchInput(e.target.value);
  }, 500);

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
          {currentData.map((obj, index) => {
            return <Row key={`tr-${index}`} data={obj} dataKeys={dataKeys} />;
          })}
        </tbody>
      </table>
      <div className="datatable__info">
        <p>
          Showing{' '}
          {currentData.length * (pageIndex + 1) - currentData.length + 1} to{' '}
          {currentData.length * (pageIndex + 1)} of {data.length} entries
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
