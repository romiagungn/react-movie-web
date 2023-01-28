import React from "react";
import List from "./List";

export default function TrendingMovies({
  trendingMovies,
  loading,
  setTrendingType,
  trendingType,
}) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", margin: "14px 0" }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: "bold",
            letterSpacing: 1,
            marginRight: 20,
          }}
        >
          Trending
        </h2>
        <div
          style={{
            borderRadius: 40,
            overflow: "hidden",
            border: "1px solid #00000040",
          }}
        >
          <button
            style={{
              border: "none",
              backgroundColor:
                trendingType == "day" ? "#000000" : "transparent",
              fontSize: 14,
              color: trendingType == "day" ? "#ffffff" : "#000000",
              padding: "8px 20px",
              width: 160,
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 500,
              letterSpacing: 1,
            }}
            onClick={() => setTrendingType("day")}
          >
            Today
          </button>
          <button
            style={{
              border: "none",
              backgroundColor:
                trendingType == "week" ? "#000000" : "transparent",
              fontSize: 14,
              color: trendingType == "week" ? "#ffffff" : "#000000",
              padding: "8px 20px",
              width: 160,
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 500,
              letterSpacing: 1,
            }}
            onClick={() => setTrendingType("week")}
          >
            This Week
          </button>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <List list={trendingMovies && trendingMovies} loading={loading} />
        <img
          src={require("../../db/trendingBG.png")}
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            zIndex: -1,
          }}
          alt=""
        />
      </div>
    </>
  );
}
