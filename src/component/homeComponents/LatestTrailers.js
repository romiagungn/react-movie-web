import React, { useRef, useState } from "react";

const LatestTrailers = ({
  loading,
  setTrailersType,
  trailersType,
  trailers,
}) => {
  const [bGImage, setBGImage] = useState(
    trailers[0] ? trailers[0].poster_path : null
  );
  const posterCard = useRef();

  const onHover = (poster_path) => {
    posterCard.current.style.transform = "scale(1.2)";
    setBGImage(poster_path);
  };
  const onHoverOut = () => {
    posterCard.current.style.transform = "scale(1)";
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "40px 0px",
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6),  rgba(0,0,0,0.6)),url(${process.env.REACT_APP_POSTER_URL}${bGImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        height: 280,
      }}
    >
      <h2
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 600,
          marginRight: 30,
          paddingLeft: 20,
        }}
      >
        Upcoming Movies
      </h2>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          overflowY: "hidden",
          marginBottom: 10,
          marginLeft: 20,
        }}
      >
        {trailers &&
          trailers.map((data) => {
            const { id, original_title, poster_path } = data;
            return (
              <div key={id} style={{ width: "100%", cursor: "pointer" }}>
                <div
                  onMouseOver={() => onHover(poster_path)}
                  onMouseOut={() => onHoverOut()}
                  ref={posterCard}
                  style={{
                    // backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.2),  rgba(0,0,0,0.2)),url()`,
                    // backgroundRepeat: "no-repeat",
                    // backgroundSize: "cover",
                    margin: "20px 10px",
                    width: 400,
                    height: 200,
                    borderRadius: 10,
                    transform: "scale(1)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_POSTER_URL + poster_path}`}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default LatestTrailers;
