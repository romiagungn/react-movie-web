import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../PageContainer";
import MovieCard from "./MovieCard";
import { CircularProgress } from "@mui/material";
import {
  FaThList,
  FaHeart,
  FaBookmark,
  FaStar,
  FaPlay,
  FaUser,
} from "react-icons/fa";
import VideoPlayer from "../VideoPlayer";
import MovieVideos from "./MovieVideos";

export default function MovieDetails() {
  const id = useParams().id;
  const [movieDetails, setMovieDetails] = useState({});
  const [movieVideos, setMovieVideos] = useState([]);
  const [credits, setCredits] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [page, setPage] = useState(1);
  const [videoOpen, setVideoOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    document.title =
      movieDetails.original_title +
      " " +
      "(" +
      String(movieDetails.release_date).slice(0, 4) +
      ")";
  }, [movieDetails]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getMovieDetailsFromDB();
    getMovieCreditsFromDB();
    getRecommendationsFromDB();
  }, [id]);

  useEffect(() => {
    getMovieVideosDetailsFromDB(id);
  }, [id]);

  const getMovieDetailsFromDB = async () => {
    setLoading(true);
    const movie = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((movie) => setMovieDetails(movie.data))
      .catch((err) => {
        // console.log(err);
      });
    setLoading(false);
  };
  const getMovieVideosDetailsFromDB = async (id) => {
    setLoading(true);
    // console.log(id);
    const videos = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((videos) => setMovieVideos(videos.data.results))
      .catch((err) => {
        // console.log(err);
      });
    setLoading(false);
  };
  // console.log(movieVideos);

  const getMovieCreditsFromDB = async () => {
    setLoading(true);
    const credit = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((credit) => setCredits(credit.data))
      .catch((err) => {
        // console.log(err);
      });
    setLoading(false);
  };
  const getRecommendationsFromDB = async () => {
    setLoading(true);
    const recommendation = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
      .then((recommendation) => setRecommendations(recommendation.data.results))
      .catch((err) => {
        // console.log(err);
      });
    setLoading(false);
  };

  const {
    adult,
    backdrop_path,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    runtime,
    tagline,
    spoken_languages,
    vote_average,
    release_date,
    genres,
  } = movieDetails;
  // console.log(movieDetails);

  const {} = credits;
  // console.log(credits);

  const movieTime = (totalMinutes) => {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    return hours + "h" + " " + minutes + "m";
  };

  const HandleVideo = () => {
    setVideoOpen(true);
    const trailer = movieVideos.filter((video) => video.type == "Trailer");
    setTrailerKey(trailer[0].key);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            backgroundColor: "#00000010",
            padding: "20px 0",
            height: 600,
          }}
        ></div>
      ) : (
        <div
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8),  rgba(0,0,0,0.4)),url(${
              process.env.REACT_APP_POSTER_URL + backdrop_path
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            padding: "20px 0",
            height: 600,
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  height: 600,
                  borderRadius: 10,
                }}
                src={process.env.REACT_APP_POSTER_URL + poster_path}
                alt=""
              />
            </div>
            <div style={{ marginLeft: 40 }}>
              <h2
                style={{
                  fontSize: 46,
                  fontWeight: "bolder",
                  color: "#ffffff",
                  maxWidth: "100%",
                  maxLines: 1,
                }}
              >
                {original_title}
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: "normal",
                    opacity: "0.5",
                    marginLeft: 10,
                  }}
                >
                  {String(release_date).slice(0, 4)}
                </span>
              </h2>
              <p
                style={{ color: "#ffffff", margin: "10px 0", fontWeight: 500 }}
              >
                <span style={{ marginRight: 6 }}> {release_date}</span>
                <span style={{ marginRight: 6 }}>
                  {genres
                    ? genres.map((data) => {
                        return data.name + " ";
                      })
                    : null}
                </span>
                <span>{movieTime(runtime)}</span>
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "16px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
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
                    size={60}
                    thickness={4}
                    variant="determinate"
                    value={vote_average * 10}
                  />
                  <p
                    style={{
                      position: "absolute",
                      fontSize: 16,
                      color: "white",
                      fontWeight: 900,
                    }}
                  >
                    {vote_average * 10}
                    <span
                      style={{
                        fontSize: 12,
                      }}
                    >
                      %
                    </span>
                  </p>
                </div>
                <h4
                  style={{
                    maxWidth: 60,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    marginRight: 20,
                  }}
                >
                  User Score
                </h4>
                <div
                  style={{
                    padding: 14,
                    backgroundColor: "rgb(3,37,65)",
                    borderRadius: "50%",
                    marginRight: 20,
                  }}
                >
                  <FaThList
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: 14,
                    backgroundColor: "rgb(3,37,65)",
                    borderRadius: "50%",
                    marginRight: 10,
                  }}
                >
                  <FaHeart
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: 14,
                    backgroundColor: "rgb(3,37,65)",
                    borderRadius: "50%",
                    marginRight: 20,
                  }}
                >
                  <FaBookmark
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: 14,
                    backgroundColor: "rgb(3,37,65)",
                    borderRadius: "50%",
                    marginRight: 20,
                  }}
                >
                  <FaStar
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                    }}
                  />
                </div>
                <button
                  onClick={() => HandleVideo()}
                  style={{
                    fontSize: 16,
                    color: "#ffffff",
                    fontWeight: 600,
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <FaPlay style={{ marginRight: 6 }} />
                  Play Trailer
                </button>
              </div>
              <em style={{ color: "#ffffff", opacity: 0.5 }}>{tagline}</em>

              <h4
                style={{
                  fontSize: 20,
                  color: "#ffffff",
                  fontWeight: 600,
                  margin: "10px 0",
                }}
              >
                Overview
              </h4>
              <p
                style={{
                  fontSize: 14,
                  color: "#ffffff",
                  fontWeight: 600,
                  lineHeight: 1.5,
                }}
              >
                {overview}
              </p>
            </div>
          </div>
        </div>
      )}

      <PageContainer>
        <div
          style={{
            margin: "10px 0",
          }}
        >
          <h4>Top Billed Cast</h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                padding: "20px 0",
                width: "80%",
                overflowX: "scroll",
                position: "relative",
                overflowY: "hidden",
              }}
            >
              {credits.cast
                ? credits.cast.length >= 8
                  ? credits.cast.slice(0, 10).map((data) => {
                      const {
                        id,
                        cast_id,
                        character,
                        credit_id,
                        gender,
                        known_for_department,
                        name,
                        original_name,
                        popularity,
                        profile_path,
                      } = data;

                      return (
                        <Link
                          to={`/person/${id}`}
                          key={id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0 10px",
                            boxShadow: "0 0 10px 0 #00000020",
                            paddingBottom: 8,
                            textDecoration: "none",
                          }}
                        >
                          {profile_path ? (
                            <img
                              src={
                                process.env.REACT_APP_POSTER_URL + profile_path
                              }
                              style={{
                                width: 160,
                                height: 180,
                              }}
                              alt="Profile"
                            />
                          ) : (
                            <FaUser
                              style={{
                                width: 140,
                                height: 160,
                                padding: 20,
                                opacity: 0.4,
                              }}
                            />
                          )}
                          <h4
                            style={{
                              margin: "10px 0",
                              color: "#000000",
                              fontSize: 16,
                              fontWeight: "bold",
                              paddingLeft: 6,
                            }}
                          >
                            {name}
                          </h4>
                          <p
                            style={{
                              color: "#000000",
                              fontSize: 12,
                              paddingLeft: 6,
                              maxHeight: 24,
                              overflow: "hidden",
                              maxWidth: 140,
                            }}
                          >
                            {character}
                          </p>
                        </Link>
                      );
                    })
                  : credits.cast.map((data) => {
                      const {
                        id,
                        cast_id,
                        character,
                        credit_id,
                        gender,
                        known_for_department,
                        name,
                        original_name,
                        popularity,
                        profile_path,
                      } = data;
                      return (
                        <div
                          key={id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0 10px",
                            boxShadow: "0 0 10px 0 #00000020",
                            paddingBottom: 8,
                          }}
                        >
                          {profile_path ? (
                            <img
                              src={
                                process.env.REACT_APP_POSTER_URL + profile_path
                              }
                              style={{ width: 160, height: 180 }}
                              alt="Profile"
                            />
                          ) : (
                            <FaUser
                              style={{
                                width: 140,
                                height: 160,
                                padding: 20,
                                opacity: 0.4,
                              }}
                            />
                          )}
                          <h4
                            style={{
                              margin: "10px 0",
                              color: "#000000",
                              fontSize: 16,
                              fontWeight: "bold",
                              paddingLeft: 6,
                            }}
                          >
                            {name}
                          </h4>
                          <p
                            style={{
                              color: "#000000",
                              fontSize: 12,
                              paddingLeft: 6,
                              maxHeight: 24,
                              overflow: "hidden",
                              maxWidth: 140,
                            }}
                          >
                            {character}
                          </p>
                        </div>
                      );
                    })
                : null}
            </div>

            <div
              style={{
                width: "18%",
                display: "flex",
                padding: "20px 0",
                boxShadow: "0 0 10px 0 #00000020",
              }}
            ></div>
          </div>
        </div>
        <div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginTop: 40,
              marginBottom: 10,
            }}
          >
            Media
          </h2>
          <div
            style={{
              display: "flex",
              padding: "20px 0",
              width: "100%",
              overflowX: "scroll",
              position: "relative",
              overflowY: "hidden",
            }}
          >
            {movieVideos &&
              movieVideos.map((video, index) => {
                return (
                  <div key={video.id} style={{ width: 400, marginRight: 20 }}>
                    <MovieVideos video={video} first={index == 0 && true} />
                  </div>
                );
              })}
          </div>
        </div>
        <h2
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginTop: 40,
            marginBottom: 10,
          }}
        >
          Recommendations
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {recommendations &&
            recommendations.map((movie, index) => {
              return <MovieCard movie={movie} key={index} />;
            })}
        </div>
      </PageContainer>
      {videoOpen && (
        <VideoPlayer
          setVideoOpen={setVideoOpen}
          url={trailerKey && trailerKey}
        />
      )}
    </>
  );
}
