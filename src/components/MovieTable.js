import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import MovieDetails from "./MovieDetails";


const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editingMovie, setEditingMovie] = useState(null);

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
            <button onClick={() => handleDelete(row)}>Delete</button>
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

  const handleDelete = (row) => {
    // Handle delete action for the selected movie
  };


  const tableInstance = useTable({ columns, data: filteredMovies });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
        <h1 style={{  display: "flex", justifyContent: "center", marginTop: "30px" }} >MOVIES</h1>

        <div style={{  display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <div>
          <button style={{marginRight: "30px" }}> Add </button>
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
          <table {...getTableProps()} style={{ marginTop: "100px", border: "solid 1px blue" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 3px red",
                        background: "aliceblue",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                            border: "solid 1px gray",
                            background: "papayawhip",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

      </div>


    </div>

  );
};

export default MovieTable;
