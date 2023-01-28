import React from "react";
import { IoClose } from "react-icons/io5";

export default function VideoPlayer({ setVideoOpen, url }) {
  return (
    <>
      <div
        onClick={() => setVideoOpen(false)}
        style={{
          display: "block",
          zIndex: 10003,
          opacity: 0.5,
          backgroundColor: "black",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "block",
            backgroundColor: "white",
            zIndex: 10004,
            position: "fixed",
            left: 0,
            right: 0,
            top: -40,
            bottom: 0,
            margin: "auto",
            width: "76%",
            height: "80%",
            backgroundColor: "#000000",
          }}
        >
          <h4
            style={{
              color: "#ffffff",
              padding: "20px 0 0 20px ",
            }}
          >
            Play Trailer
          </h4>
          <iframe
            width="100%"
            height="90%"
            src={`https://www.youtube.com/embed/${url}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ paddingTop: 40 }}
          ></iframe>
          <h2>{url}</h2>
          <IoClose
            onClick={() => setVideoOpen(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 20,
              zIndex: 20,
              color: "#ffffff",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </>
  );
}
