import { useState, useEffect } from "react";
import './MovieDetails.css'

const MovieDetails = ({ movie, onBackClick }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedMovie, setUpdatedMovie] = useState(movie);
  const [shouldReload, setShouldReload] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(movie.category);

  const categories = ["Action", "Drama", "Comedy", "Thriller", "Romance"];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setUpdatedMovie((prevMovie) => ({ ...prevMovie, category: event.target.value }));
  };

  const handleSubmit = () => {
    // Call API to update movie in the database
    fetch("https://localhost:44311/api/services/app/Movie/Update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShouldReload(true);
      })
      .catch((error) => console.log(error));

    setIsEditMode(false);
  };

  useEffect(() => {
    if (shouldReload) {
    
      window.location.reload();
    }
  }, [shouldReload]);

  if (isEditMode) {
    return (

      <div style={{ marginTop: "30px" }}>
      <div className="wrapper" style={{ justifyContent: "center"}}>
        <h2>
        Movie Name:{" "}
          <input
            type="text"
            name="title"
            value={updatedMovie.title}
            onChange={handleInputChange}
          />
        </h2>
        <p>
          Duration:{" "}
          <input
            type="text"
            name="duration"
            value={updatedMovie.duration}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Description:{" "}
          <input
            type="text"
            name="description"
            value={updatedMovie.description}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Starring:{" "}
          <input
            type="text"
            name="starring"
            value={updatedMovie.starring}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Category:{" "}
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </p>
      
      </div>
        <div className="button-group" style={{ marginTop: "40px"}}>
        <button className="button" onClick={handleSubmit}>Submit</button>
        <button className="button" onClick={() => setIsEditMode(false)}>Cancel</button>
      </div>

      </div>
    );
  }

  return (
    <div style={{ justifyContent: "center", marginTop: "30px" }}>
     
      <div className="wrapper">

      <h2>{movie.title}</h2>
      <p>Duration: {movie.duration}</p>
      <p>Description: {movie.description}</p>
      <p>Starring: {movie.starring}</p>
      <p>Category: {movie.category}</p>
      </div>

      <div className="button-group"   style={{ marginTop: "40px"}}>
     
     <button className="button" onClick={() => setIsEditMode(true)}>Edit</button>
     <button className="button" onClick={onBackClick}>Back</button>
     </div> 
    </div>

    
  );
};

export default MovieDetails
