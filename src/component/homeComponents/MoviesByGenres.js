import React, { useState, useEffect } from "react";
import HomeWelcome from "./HomeWelcome";
import PageContainer from "../PageContainer";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";

export default function MoviesByGenres({ movies }) {
  const name = useParams().name;
  return (
    <PageContainer>
      <HomeWelcome
        welcomeImg={`${process.env.REACT_APP_POSTER_URL}${
          movies.results[0] && movies.results[0].backdrop_path
        }`}
        title={name}
        subTitle={`Best movies in ${name} genres`}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "20px 0",
        }}
      >
        {movies.results.map((data) => {
          return <MovieCard movie={data} key={data.id} />;
        })}
      </div>
    </PageContainer>
  );
}
