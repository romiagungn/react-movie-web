import React, { useState, useEffect } from "react";
import axios from "axios";
import PageContainer from "../PageContainer";
import MovieCard from "./MovieCard";
import { MdOutlineError, MdOutlineSearch, MdClose } from "react-icons/md";

export default function HomeWelcome({ welcomeImg, title, subTitle }) {
  const [searchMovie, setSearchMovie] = useState("");
  const [movieSearched, setMovieSearched] = useState([]);

  useEffect(() => {
    SearchMovie(searchMovie);
  }, [searchMovie]);

  const SearchMovie = async (searchMovie) => {
    if (searchMovie !== "") {
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchMovie}`
        )
        .then((movie) => setMovieSearched(movie.data.results));
      // .catch((err) =>
      // console.log(err)
      // );
    }

    if (searchMovie === "") {
      setMovieSearched([]);
    }
  };

  return (
    <PageContainer>
      <div
        style={{
          width: "100%",
          padding: "80px 0px",
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8),  rgba(0,0,0,0.4)),url(${
            welcomeImg ? welcomeImg : require("../../db/tenet.png")
          })`,
          height: 180,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: 0,
        }}
      >
        <h2
          style={{
            fontSize: 50,
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: 10,
            marginLeft: 40,
          }}
        >
          {title}
        </h2>
        <h6 style={{ fontSize: 24, color: "#ffffff", marginLeft: 40 }}>
          {subTitle}
        </h6>
        <div
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            marginTop: 30,
            marginLeft: 40,
            width: "70%",
          }}
        >
          <input
            type="text"
            style={{
              width: "100%",
              padding: "12px 30px",
              borderRadius: 100,
              fontSize: 18,
              outline: "none",
              border: "none",
            }}
            value={searchMovie}
            onChange={(val) => setSearchMovie(val.target.value)}
            placeholder="Search for a movie"
          />
          {searchMovie ? (
            <MdClose
              style={{
                position: "absolute",
                color: "#000000",
                right: 20,
                fontSize: 26,
                opacity: 0.4,
                cursor: "pointer",
              }}
              onClick={() => setSearchMovie("")}
            />
          ) : (
            <MdOutlineSearch
              style={{
                position: "absolute",
                color: "#000000",
                right: 20,
                fontSize: 26,
                opacity: 0.4,
              }}
            />
          )}
        </div>
      </div>
      <>
        {searchMovie ? (
          <>
            <h2
              style={{
                fontSize: 24,
                fontWeight: "bold",
                letterSpacing: 1,
                margin: "14px 0",
              }}
            >
              Search Results
            </h2>
            {movieSearched.length !== 0 ? (
              <div style={{ display: "flex", overflowX: "scroll" }}>
                {movieSearched
                  ? movieSearched.map((movie) => {
                      return <MovieCard movie={movie} key={movie.id} />;
                    })
                  : null}
              </div>
            ) : (
              <div
                style={{
                  width: 180,
                  height: 240,
                  backgroundColor: "#00000020",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  borderRadius: 10,
                }}
              >
                <MdOutlineError
                  style={{ width: "60%", height: "60%", opacity: 0.6 }}
                />
                <h4 style={{ fontSize: 20, fontWeight: 600, color: "#aa0000" }}>
                  Movie Not Found
                </h4>
              </div>
            )}
          </>
        ) : null}
      </>
    </PageContainer>
  );
}
