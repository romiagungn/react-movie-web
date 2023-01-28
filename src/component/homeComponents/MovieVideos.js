import React, { useState } from "react";
import VideoPlayer from "../VideoPlayer";
import { FaPlay } from "react-icons/fa";

export default function MovieVideos({ video, first }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const { id, key, name } = video;
  return (
    <>
      <div
        style={{
          width: 400,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          borderRadius: 10,
        }}
        onClick={() => setVideoOpen(true)}
      >
        <img
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          src={`https://img.youtube.com/vi/${key}/0.jpg`}
          alt=""
        />
        <div
          style={{
            backgroundColor: "#00000080",
            padding: 20,
            borderRadius: "50%",
            position: "absolute",
            opacity: first ? 1 : 0.6,
          }}
        >
          <FaPlay style={{ color: "#ffffff", fontSize: 20 }} />
        </div>
      </div>
      {videoOpen && <VideoPlayer setVideoOpen={setVideoOpen} url={key} />}
    </>
  );
}
