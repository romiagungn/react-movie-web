import React, { useState, useEffect } from "react";
import List from "./List";

export default function PopularMovies({
  popularMovies,
  setPage,
  loading,
  page,
}) {
  return (
    <>
      <h2
        style={{
          fontSize: 24,
          fontWeight: "bold",
          letterSpacing: 1,
          margin: "14px 0",
        }}
      >
        Popular
      </h2>
      <List
        list={popularMovies && popularMovies}
        setPage={setPage}
        loading={loading}
        page={page}
      />
    </>
  );
}
