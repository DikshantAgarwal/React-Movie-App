import React from "react";

const Movies = (props) => {
 const FavoriteComponent = props.favoriteComponent;
  return (
    <>
      {props.movies.map((movie, index) => {
        return( 
         <div key={index} className="image-container d-flex justify-content-start m-3">
              <img src={movie.Poster} alt="movie"></img>
              <div onClick={()=>props.handleFavorite(movie)} className="overlay d-flex justify-content-center align-items-center"><FavoriteComponent/></div>
         </div>   
       );
      })}
    </>
  );
};

export default Movies;
