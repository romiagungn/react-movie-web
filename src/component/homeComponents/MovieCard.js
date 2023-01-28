import React, { useRef } from "react";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { MdMovie } from "react-icons/md";

export default function MovieCard({ movie }) {
  const card = useRef();

  const cardHover = () => {
    card.current.style.boxShadow = "0 0 10px 0 #00000020";
  };
  const cardHoverOut = () => {
    card.current.style.boxShadow = "none";
  };

  const {
    id,
    original_title,
    original_language,
    vote_average,
    release_date,
    poster_path,
  } = movie;
  return (
    <Link
      key={id}
      to={`/movies/${id}`}
      style={{
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        position: "relative",
        cursor: "pointer",
        margin: "18px 0",
        textDecoration: "none",
        color: "#000000",
        transition: "all 0.3s ease",
        borderRadius: 10,
      }}
      onMouseOver={cardHover}
      onMouseOut={cardHoverOut}
      onClick={() => window.scrollTo(0, 0)}
      ref={card}
    >
      <div style={{ position: "relative", marginBottom: 20 }}>
        {poster_path ? (
          <img
            src={`${process.env.REACT_APP_POSTER_URL}${poster_path}`}
            style={{
              width: 180,
              height: 240,
              borderRadius: 10,
              boxShadow: "0 0 10px -2px #00000080",
            }}
            alt=""
          />
        ) : (
          <div
            style={{
              width: 180,
              height: 240,
              borderRadius: 10,
              boxShadow: "0 0 10px -2px #00000080",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000020",
            }}
          >
            <MdMovie
              style={{
                width: "50%",
                height: "50%",
                color: "#000000",
                opacity: 0.6,
              }}
            />
          </div>
        )}

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
              color: "yellow",
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
            {Math.trunc(vote_average * 10)}
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
          maxWidth: 140,
          maxHeight: 34,
          overflow: "hidden",
        }}
      >
        {original_title}
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
}
