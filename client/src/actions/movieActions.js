import axios from "axios";
import keys from "../config/keys";
import {
  GET_MOVIES,
  GET_ERRORS,
  MOVIE_POPUP,
  MOVIE_POPUP_CLOSE,
  SEARCH_MOVIE_TMDB,
  IMDB_POPUP,
  IMDB_POPUP_CLOSE,
  MOVIE_ADDED_SUCCESS,
  DELETE_MOVIE_DB,
  UPDATE_MOVIE_DB
} from "./types";

export const getAllMovies = () => dispatch => {
  axios
    .get("/api/movies/allmovies")
    .then(res => {
      let movieList = res.data.movies;

      dispatch(getMovieList(movieList));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getMovieList = success => {
  return {
    type: GET_MOVIES,
    payload: success
  };
};

export const moviePopup = movieData => {
  return {
    type: MOVIE_POPUP,
    payload: movieData
  };
};
export const moviePopupClose = () => {
  return {
    type: MOVIE_POPUP_CLOSE,
    payload: {}
  };
};

//TMDB
export const searchMovie = movieData => dispatch => {
  let url = "https://api.themoviedb.org/3/search/movie?query=";

  let key = `&api_key=${keys.API_KEY}`;

  delete axios.defaults.headers.common["Authorization"];
  axios.get(url + movieData + key).then(res => {
    let movieList = res.data.results;

    axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
    dispatch(showMoviesFound(movieList));
  });
};

export const showMoviesFound = movieData => {
  return {
    type: SEARCH_MOVIE_TMDB,
    payload: movieData
  };
};

//ADD IMDB DATA WITHOUT POPUP
export const getMovieInfoAddtoDb = movieId => dispatch => {
  let url = "https://api.themoviedb.org/3/movie/";
  let key = `?api_key=${keys.API_KEY}&language=sv`;

  let trailerUrl = "https://api.themoviedb.org/3/movie/";
  let trailerKey = `/videos?api_key=${keys.API_KEY}`;

  delete axios.defaults.headers.common["Authorization"];

  let trailerVideo;

  axios.get(trailerUrl + movieId + trailerKey).then(res => {
    let trailer = res.data.results;
    if (trailer.length > 0) {
      trailerVideo = `http://youtube.com/watch?v=${trailer[0].key}`;
    } else {
      trailerVideo = `http://youtube.com`;
    }
  });

  axios
    .get(url + movieId + key)
    .then(res => {
      let movie = res.data;
      return movie;
    })
    .then(movieToAdd => {
      let urlForImg = "http://image.tmdb.org/t/p/original";
      let genreArray = movieToAdd.genres.map(genre => {
        return genre.name;
      });

      let addToDb = {
        title: movieToAdd.title,
        description: movieToAdd.overview,
        background: urlForImg + movieToAdd.backdrop_path,
        poster: urlForImg + movieToAdd.poster_path,
        runtime: movieToAdd.runtime,
        genres: genreArray,
        imdb_id: movieToAdd.imdb_id,
        release: movieToAdd.release_date,
        rating: movieToAdd.vote_average,
        dvdOrBluRay: "bluRay",
        trailer: trailerVideo
      };

      axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
      axios.post("/api/movies/addmovie", addToDb).then(res => {
        let success = {
          title: "Film tillagd!",
          msg: "Filmen finns nu i databasen"
        };
        dispatch(movieAddedSuccess(success));
      });
    });
};

//IMDB POPUP
export const imdbPopup = movieId => dispatch => {
  let url = "https://api.themoviedb.org/3/movie/";
  let key = `?api_key=${keys.API_KEY}&language=sv`;

  delete axios.defaults.headers.common["Authorization"];

  axios.get(url + movieId + key).then(res => {
    let movie = res.data;
    axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
    dispatch(showSpecificMovie(movie));
  });
};

export const imdbPopupClose = () => {
  return {
    type: IMDB_POPUP_CLOSE,
    payload: {}
  };
};

export const showSpecificMovie = movieData => {
  return {
    type: IMDB_POPUP,
    payload: movieData
  };
};

//TODO: Trailer via
//LÄGG TILL I DB
export const addToMovieDb = (addToDb, movieId) => dispatch => {
  let movieInfo = addToDb;
  let id = movieId;

  delete axios.defaults.headers.common["Authorization"];

  function fetchTrailerUrl(id) {
    let trailerUrl = "https://api.themoviedb.org/3/movie/";
    let trailerKey = `/videos?api_key=${keys.API_KEY}`;
    const request = axios
      .get(trailerUrl + id + trailerKey)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        return Promise.reject(error);
      });

    return {
      payload: request
    };
  }

  fetchTrailerUrl(id)
    .payload.then(data => {
      if (data.results.length > 0) {
        movieInfo.trailer = `http://youtube.com/watch?v=${data.results[0].key}`;
      } else {
        movieInfo.trailer = `http://youtube.com/`;
      }
    })
    .then(() => {
      axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;

      axios.post("/api/movies/addmovie", movieInfo).then(res => {
        let success = {
          title: "Film tillagd!",
          msg: "Filmen finns nu i databasen"
        };
        dispatch(movieAddedSuccess(success));
      });
    });
};

export const movieAddedSuccess = success => {
  return {
    type: MOVIE_ADDED_SUCCESS,
    payload: success
  };
};

//DELETE FRÅN DB
export const deleteMovie = movie => dispatch => {
  let objId = movie._id;
  axios
    .delete("/api/movies", { data: { objId } })
    .then(res => {
      if (res) {
        dispatch(movieDeleteSuccess(movie));
      } else {
        console.log("Något gick fel när film skulle tas bort från databasen.");
      }
    })
    .catch(err => {
      throw err;
    });
};

export const movieDeleteSuccess = deletedMovie => {
  return {
    type: DELETE_MOVIE_DB,
    payload: deletedMovie
  };
};

//UPPDATERA DB
export const updateDb = updatedMovie => dispatch => {
  axios
    .post("/api/movies/update", { data: { updatedMovie } })
    .then(res => {
      if (res) {
        dispatch(movieUpdated(updatedMovie));
      }
    })
    .catch(err => {
      throw err;
    });
};

export const movieUpdated = updated => {
  return {
    type: UPDATE_MOVIE_DB,
    payload: updated
  };
};
