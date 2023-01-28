import React, { useState, useEffect } from "react";
import PageContainer from "../component/PageContainer";
import HomeWelcome from "../component/homeComponents/HomeWelcome";
import PopularMovies from "../component/homeComponents/PopularMovies";
import FreeToWatch from "../component/homeComponents/FreeToWatch";
import axios from "axios";
import TrendingMovies from "../component/homeComponents/TrendingMovies";
import LatestTrailers from "../component/homeComponents/LatestTrailers";

export const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingType, setTrendingType] = useState("day");

  const [trailers, setTrailers] = useState([]);
  const [trailersType, setTrailersType] = useState("Streaming");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "TMDB";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getPopularMoviesFromDB();
    getTrendingMoviesFromDB();
    getTrailersFromDB();
  }, []);
  useEffect(() => {
    getPopularMoviesFromDB();
  }, [page]);
  useEffect(() => {
    getTrendingMoviesFromDB();
  }, [trendingType]);

  const getPopularMoviesFromDB = async () => {
    setLoading(true);
    let movieData = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
      .then((movies) => {
        setPopularMovies(movies.data.results);
      });
    // .catch((err) => console.log(err));

    setLoading(false);
  };

  const getTrendingMoviesFromDB = async () => {
    setLoading(true);
    let trending = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/trending/all/${trendingType}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((trending) => setTrendingMovies(trending.data.results));
    // .catch((err) => console.log(err));

    setLoading(false);
  };
  // console.log(trendingMovies);

  const getTrailersFromDB = async () => {
    setLoading(true);
    const trailers = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((trailers) => setTrailers(trailers.data.results));
    // .catch((err) => console.log(err));

    setLoading(false);
  };

  return (
    <>
      <PageContainer>
        <HomeWelcome
          welcomeImg={`${process.env.REACT_APP_POSTER_URL}${
            popularMovies[0]
              ? popularMovies[0].backdrop_path
              : require("../db/tenet.png")
          }`}
          title="Welcome"
          subTitle=" Millions of movies, TV shows and people to discover. Explore now."
        />
        <PopularMovies
          popularMovies={popularMovies}
          setPage={setPage}
          loading={loading}
          page={page}
        />
        <LatestTrailers
          trailers={trailers}
          trailersType={trailersType}
          setTrailersType={setTrailersType}
          loading
        />
        <TrendingMovies
          trendingMovies={trendingMovies}
          loading={loading}
          setTrendingType={setTrendingType}
          trendingType={trendingType}
        />
        {/* <FreeToWatch /> */}
      </PageContainer>
    </>
  );
};
