import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageContainer from "../PageContainer";
import { FaUser } from "react-icons/fa";
import MovieCard from "./MovieCard";

export const ActorsDetails = () => {
  const id = useParams().id;
  const [actor, setActor] = useState({});
  const [actorMovies, setActorMovies] = useState([]);
  const [page, setPage] = useState(1);

  const profile = useRef();

  const {
    also_known_as,
    biography,
    birthday,
    deathday,
    gender,
    known_for_department,
    name,
    place_of_birth,
    profile_path,
  } = actor;

  useEffect(() => {
    document.title = name ? name : "TMDB";
    window.scrollTo(0, 0);
  }, [name]);

  useEffect(() => {
    getActorsDetailsFromDB();
    getPopularMovies();
  }, []);

  const getActorsDetailsFromDB = async () => {
    const actor = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((actor) => setActor(actor.data));
  };

  const getPopularMovies = async () => {
    const movies = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_cast=${id}&page=${page}&sort_by=popularity.desc`
      )
      .then((movie) => setActorMovies(movie.data.results))
      .catch((err) => console.log(err));
  };

  const onImageHover = () => {
    profile.current.style.transform = "scale(1.1)";
  };
  const outImageHover = () => {
    profile.current.style.transform = "scale(1)";
  };

  const PersonalInfoCard = ({ title, content }) => {
    return (
      <>
        {title && (
          <h6
            style={{
              fontSize: 18,
              fontWeight: 500,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            {title}
          </h6>
        )}
        {content && (
          <p
            style={{
              fontSize: 14,
              fontWeight: 400,
              marginBottom: 14,
            }}
          >
            {content}
          </p>
        )}
      </>
    );
  };

  const PersonalInfo = () => {
    return (
      <div
        style={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {profile_path ? (
          <div
            onMouseOver={onImageHover}
            onMouseOut={outImageHover}
            style={{
              width: "100%",
              borderRadius: 10,
              height: 460,
              overflow: "hidden",
            }}
          >
            <img
              ref={profile}
              src={`${process.env.REACT_APP_POSTER_URL + profile_path}`}
              alt="profile"
              style={{ width: "100%", height: "100%", transition: "0.3s" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: 460,
              boxShadow: "0 0 10px 0 #00000010",
              backgroundColor: "#00000010",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <FaUser
              style={{
                width: "80%",
                height: "80%",
                padding: 20,
                opacity: 0.4,
              }}
            />
          </div>
        )}
        <h4
          style={{
            fontSize: 22,
            fontWeight: 600,
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          Personal Info
        </h4>
        <PersonalInfoCard title="Known For" content={known_for_department} />
        <PersonalInfoCard
          title="Gender"
          content={gender == 2 ? "Male" : "Female"}
        />
        <PersonalInfoCard title="Birth Date" content={birthday} />
        <PersonalInfoCard title="Place of birth" content={place_of_birth} />
        <PersonalInfoCard title="Also Known For" />
        {also_known_as &&
          also_known_as.map((data, index) => {
            return <PersonalInfoCard content={data} key={index} />;
          })}
      </div>
    );
  };

  return (
    <PageContainer>
      <div style={{ width: "100%", padding: "30px 0", display: "flex" }}>
        <PersonalInfo />
        <div
          style={{
            maxWidth: 1000,
            width: "calc(100vw - 300px)",
            paddingTop: 10,
            paddingLeft: 30,
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 20,
            }}
          >
            {name}
          </h2>
          <h6
            style={{
              fontSize: 18,
              marginBottom: 10,
              fontWeight: 500,
            }}
          >
            Biography
          </h6>
          <p
            style={{
              wordSpacing: 2,
              lineHeight: 1.3,
              fontSize: 14,
              marginBottom: 20,
              maxHeight: 148,
              overflow: "hidden",
            }}
          >
            {biography}
          </p>
          <h6
            style={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Known For
          </h6>

          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {actorMovies &&
              actorMovies.map((movie) => {
                return <MovieCard movie={movie} key={movie.id} />;
              })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
