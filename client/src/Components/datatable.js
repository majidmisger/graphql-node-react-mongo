import React from 'react';

function DataTable({ data }) {
  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  // Extract column headers from the first data object's keys
  const columns = Object.keys(data[0]);

  return (
<table style={{ borderCollapse: 'collapse', width: '100%' }}>
  <thead>
    <tr>
      {columns.map((col, index) => (
        <th key={index} style={{ border: '1px solid white', padding: '8px' }}>
          {col.charAt(0).toUpperCase() + col.slice(1)}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {columns.map((col, colIndex) => (
          <td key={colIndex} style={{ border: '1px solid white', padding: '8px' }}>
            {row[col]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
  );
}

export default DataTable;