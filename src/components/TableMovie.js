import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination} from "react-table";
import MovieDetails from "./MovieDetails";
import AddMovieModal from "./AddMovie";
import { Modal } from 'antd';


import { Button, message, Popconfirm } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editingMovie, setEditingMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://localhost:44311/api/services/app/Movie/GetAll"
        );
        const data = await response.json();
        setMovies(data.result.items);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }) => (
          <div style={{ maxWidth: "500px" }}>{value}</div>
        ),
      },
      {
        Header: "Starring",
        accessor: "starring",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <button onClick={() => handleView(row)}>View</button>
            <button onClick={() => handleEdit(row)}>Edit</button>
              <Button type="link"  onClick={() => handleDeleteClick(row)} > Delete</Button>
          </>
        ),
      },
    ],
    []
  );

  const filteredMovies = useMemo(() => {
    let filtered = movies;
    if (searchQuery) {
      filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.starring.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.duration.toString().includes(searchQuery.toLowerCase())
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter((movie) => movie.category === categoryFilter);
    }
    return filtered;
  }, [movies, searchQuery, categoryFilter]);

  const handleView = (row) => {
    setSelectedMovie(row.original);
  };

  const handleEdit = (row) => {
    setEditingMovie(row.original);
  };

  const handleBack = () => {
    setSelectedMovie(null);
  };

  const handleDeleteClick = (row) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this movie?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        confirmDelete(row);
      },
    });
  };

 
  const handleDelete = async (row) => {
    try {
      const response = await fetch(
        `https://localhost:44311/api/services/app/Movie/Delete?Id=${row.original.id}`,
        { method: 'DELETE' }
      );
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== row.original.id));
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = async (row) => {
    try {
      const response = await fetch(
        `https://localhost:44311/api/services/app/Movie/Delete?Id=${row.original.id}`,
        { method: 'DELETE' }
      );
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== row.original.id));
      message.success('Movie deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete movie');
    }
  };
  const handleAdd = () => {

    setShowModal(true);
  };


  const data = useMemo(() => movies, [movies]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex ,pageSize }, // <-- use pageIndex from the state object
    prepareRow,
  } = useTable(
    {
      columns,
      data: filteredMovies,
      initialState: { pageIndex: 0, pageSize:10  },
    },
    usePagination
  );

  return (

    <div>
    <h1 style={{  display: "flex", justifyContent: "center", marginTop: "30px" }} >MOVIES</h1>

    <div style={{  display: "flex", justifyContent: "center", marginTop: "30px" }}>
    <div showModal >
    <button style={{ marginRight: "30px" }}  onClick={handleAdd}>{<AddMovieModal />}</button>
  
    </div>
    <div style={{marginRight: "50px" }}>
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" name="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    </div>
    <div>
      <label htmlFor="category">Filter by category:</label>
      <select id="category" name="category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Musical">Musical</option>
        <option value="Thriller">Thriller</option>
      </select>
    </div>


    </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onBackClick={handleBack} />
        ) : (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
       )}
 </div>
<div className="pagination" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
  Previous
</button>{" "}
<span>
  Page{" "}
  <strong>
    {pageIndex + 1} of {pageOptions.length}
  </strong>{" "}
</span>
<button onClick={() => nextPage()} disabled={!canNextPage}>
  Next
</button>{" "}

      </div>



</div>

);
};
export default MovieTable;