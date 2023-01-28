import { Link } from "react-router-dom";
import React from "react";
import PageContainer from "./PageContainer";

export default function Footer() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(3,37,65)",
        paddingTop: 60,
        paddingBottom: 20,
      }}
    >
      <PageContainer>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: 60,
              fontWeight: "bolder",
              color: "#ffffff",
              marginRight: 100,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            TMDB
          </Link>
          <div style={{ color: "#ffffff", marginRight: 40 }}>
            <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 20 }}>
              THE BASICS
            </h4>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>About TMDB</p>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>Contact Us</p>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>Support Forums</p>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>API</p>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>System Status</p>
          </div>
          <div style={{ color: "#ffffff", marginRight: 40 }}>
            <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 20 }}>
              Contribution Bible
            </h4>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>Add New Movie</p>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>Add New TV Show</p>
          </div>
          <div style={{ color: "#ffffff", marginRight: 40 }}>
            <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 20 }}>
              Guidelines
            </h4>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>Discussions</p>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>Leaderboard</p>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>Twitter</p>
          </div>
          <div style={{ color: "#ffffff" }}>
            <h4 style={{ fontWeight: 800, marginBottom: 16 }}>Terms of Use</h4>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>API Terms of Use</p>
            <p style={{ marginBottom: 6, fontWeight: 500 }}>Privacy Policy</p>
          </div>
        </div>
      </PageContainer>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <h1 style={{ fontSize: 12, color: "#ffffff", opacity: 0.2 }}>
          Created with ❤️ by{" "}
          <a
            href="https://jaydipvidhate.netlify.app/"
            target="_blank"
            style={{
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Jaydip Vidhate
          </a>
        </h1>
      </div>
    </div>
  );
}
