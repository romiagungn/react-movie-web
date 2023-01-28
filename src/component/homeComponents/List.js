import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function List({ list, setPage, page, loading }) {
  return (
    <div
      style={{
        width: "100%",
        marginBottom: 20,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <div
        style={{ display: "flex", justifyContent: "space-between", margin: 18 }}
      >
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: 16,
            cursor: "pointer",
          }}
          onClick={() => setPage(page == 0 ? page - 1 : null)}
        >
          Prev
        </button>
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: 16,
            cursor: "pointer",
          }}
          onClick={() => setPage(page + 1)}
        >
          next
        </button>
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          overflowX: "scroll",
          overflowY: "hidden",
          padding: "20px 16px",
          paddingBottom: 30,
        }}
      >
        {list
          ? list.map((data) => {
              const {
                id,
                adult,
                backdrop_path,
                original_language,
                original_title,
                overview,
                popularity,
                poster_path,
                release_date,
                title,
                vote_average,
              } = data;
              return (
                <Link
                  key={id}
                  to={`/movies/${id}`}
                  style={{
                    padding: "0 10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    opacity: loading ? 0.5 : 1,
                    position: "relative",
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#000000",
                  }}
                >
                  <div style={{ position: "relative", marginBottom: 20 }}>
                    <img
                      src={`${process.env.REACT_APP_POSTER_URL}${poster_path}`}
                      style={{
                        width: 160,
                        height: 240,
                        borderRadius: 10,
                        boxShadow: "0 0 10px -2px #00000080",
                      }}
                      alt=""
                    />

                    <div
                      style={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bottom: -10,
                        left: 10,
                      }}
                    >
                      <CircularProgress
                        sx={{
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color:
                            vote_average * 10 > 70
                              ? "#00dd00"
                              : vote_average * 10 < 30
                              ? "#aa0000"
                              : "yellow",
                          padding: 0.4,
                        }}
                        size={36}
                        thickness={4}
                        variant="determinate"
                        value={vote_average * 10}
                      />
                      <p
                        style={{
                          position: "absolute",
                          fontSize: 10,
                          color: "white",
                          fontWeight: "bolder",
                        }}
                      >
                        {vote_average * 10}
                        <span
                          style={{
                            fontSize: 6,
                          }}
                        >
                          %
                        </span>
                      </p>
                    </div>
                  </div>
                  <h2
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 6,
                    }}
                  >
                    {title}
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      opacity: 0.5,
                    }}
                  >
                    {release_date}
                  </p>
                </Link>
              );
            })
          : null}
      </div>
      <div
        style={{
          width: 70,
          height: "100%",
          backgroundColor: "red",
          position: "absolute",
          right: 0,
          background: "linear-gradient(to right, #ffffff10 , #ffffff)",
        }}
      ></div>
    </div>
  );
}
