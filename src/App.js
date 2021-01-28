import React, { useEffect, useState } from "react";
import Movies from "./component/Movies";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieListHeading from './component/MovieListHeading';
import SearchBox from './component/SearchBox';
import AddFavorite from './component/AddFavorite';
import RemoveFavorite from './component/RemoveFavorite';
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue,setSearchValue]= useState('');
  const [addFavorite,setAddFavorite]= useState([]);

  const getMovieRequest =async(searchValue)=>{
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=7419d9cf`
    const response = await fetch(url);
    const resposneJson= await response.json();
    resposneJson.Search && setMovies(resposneJson.Search);
    console.log(resposneJson);
  }
   const setLocalStorage = (items)=>{
    localStorage.setItem('react-favorite-item',JSON.stringify(items))
   }
  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue])

  useEffect(()=>{
    const favItem = JSON.parse(localStorage.getItem('react-favorite-item'))
    setAddFavorite(favItem);
  },[searchValue])

  const AddFavoriteHandler=movie=>{
    const currentFavorite=[...addFavorite,movie]
    setAddFavorite(currentFavorite)
    setLocalStorage(currentFavorite)
  }
  const RemoveFavoriteHandler=movie=>{
    const currentFavorite=addFavorite.filter(favorite=>favorite.imdbID!==movie.imdbID)
    setAddFavorite(currentFavorite);
    setLocalStorage(currentFavorite);
  }

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center my-3">
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <Movies movies={movies} favoriteComponent={AddFavorite} handleFavorite={AddFavoriteHandler}/>
      </div>
      <div className="row d-flex align-items-center my-3">
        <MovieListHeading heading="Favorite"/>
      </div>
      <div className="row">
        <Movies movies={addFavorite} favoriteComponent={RemoveFavorite} handleFavorite={RemoveFavoriteHandler}/>
      </div>

    </div>
  );
}

export default App;
