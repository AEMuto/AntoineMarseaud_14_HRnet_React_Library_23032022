import React from 'react';

type TableProps = {
  data: Array<any>;
  title: string;
};

const Table = (props: TableProps) => {
  const { data, title } = props;
  const keys = Object.keys(data[0]);
  return (
    <>
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            {keys.map((key, index) => {
              if (key !== 'id') return <th key={`${key}-${index}`}>{key}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) => {
            return <Row key={`row-${index}`} data={obj} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;

const Row = (props: { data: {} }) => {
  const { data } = props;
  const entries = Object.entries(data);
  return (
    <tr>
      {entries.map((entry, index) => {
        if (entry[0] !== 'id' && typeof entry[1] === 'string')
          return <Cell key={`${entry}-${index}`} entry={entry[1]} />;
      })}
    </tr>
  );
};

const Cell = (props: { entry: string }) => {
  const { entry } = props;
  return <td>{entry}</td>;
};
