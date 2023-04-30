import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

function Table() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // fetch data from API or other data source
    // set data and totalItems state
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const startItem = pageNumber * itemsPerPage;
  const endItem = startItem + itemsPerPage;
  const currentData = data.slice(startItem, endItem);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(item => (
            <tr key={item.id}>
              <td>{item.data1}</td>
              <td>{item.data2}</td>
              <td>{item.data3}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

ReactDOM.render(<Table />, document.getElementById('root'));
