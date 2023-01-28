import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";

export default function FreeToWatch() {
  const [freeMovies, setFreeMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getFreeMoviesFromDB();
  }, [page]);

  const getFreeMoviesFromDB = async () => {
    setLoading(true);
    let movieData = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/free?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
      .then((movies) => {
        setFreeMovies(movies.data.results);
      });
    // .catch((err) => console.log(err));

    setLoading(false);
  };

  return (
    <List list={freeMovies} setPage={setPage} page={page} loading={loading} />
  );
}
