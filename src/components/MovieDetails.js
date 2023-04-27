import React from "react";

const MovieDetails = ({ movie, onBackClick }) => {
  return (
    <div style={{justifyContent: "center", marginTop: "30px" }}>
      <h2>{movie.title}</h2>
      <p>Duration: {movie.duration}</p>
      <p>Description: {movie.description}</p>
      <p>Starring: {movie.starring}</p>
      <p>Category: {movie.category}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

export default MovieDetails;