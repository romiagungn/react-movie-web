import React, { useRef, useState, useEffect } from "react";
import { Fab } from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import { useSelector } from "react-redux";

const Header = ({
  genres,
  handleOnPress,
  setIsLoginOpen,
  isLoginOpen,
  loggedInUser,
  logoutUser,
}) => {
  const [genresOpen, setGenresOpen] = useState(false);
  // console.log(loggedInUser.name);
  const user = useSelector((data) => data.loggedInUser);
  // console.log("====================================");
  // console.log(user);
  // console.log("====================================");
  return (
    <div
      style={{
        backgroundColor: "rgb(3,37,65)",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: 1300,
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
        }}
      >
        <div style={{ display: "flex" }}>
          <Link
            to="/"
            className="navLink"
            style={{
              fontWeight: "bolder",
              letterSpacing: 4,
              fontSize: 22,
              padding: "10px 0",
            }}
          >
            TMDB
          </Link>
          <Link
            to="/"
            style={{
              padding: "10px 0",
            }}
            className="navLink"
          >
            Movies
          </Link>
          <Link
            to="/tvShows"
            style={{
              padding: "10px 0",
            }}
            className="navLink"
          >
            TV Shows
          </Link>
          <Link
            to="/people"
            style={{
              padding: "10px 0",
            }}
            className="navLink"
          >
            People
          </Link>
          <div
            style={{
              position: "relative",
              cursor: "pointer",
            }}
            onMouseOver={() => setGenresOpen(true)}
            onMouseLeave={() => setGenresOpen(false)}
          >
            <h2
              style={{
                padding: "10px 0",
              }}
              className="navLink"
            >
              Genres
            </h2>
            {genresOpen ? (
              <div
                onMouseOver={() => setGenresOpen(true)}
                onMouseLeave={() => setGenresOpen(false)}
                style={{
                  position: "absolute",
                  top: 40,
                  left: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  boxShadow: "0 0 10px 0 #00000020",
                  zIndex: 1000,
                  width: 300,
                  padding: "10px 0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {genres?.map((data) => {
                  return (
                    <Link
                      key={data.id}
                      to={`/genres/${data.name}`}
                      onClick={() => handleOnPress(data.id)}
                      style={{
                        padding: "10px 0",
                        paddingLeft: 30,
                        color: "black",
                        cursor: "pointer",
                        width: "100%",
                        fontSize: 18,
                        fontWeight: 400,
                        textDecoration: "none",
                      }}
                    >
                      {data.name}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div>
          {loggedInUser.name ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4
                style={{ color: "#ffffff", fontWeight: 500, marginRight: 10 }}
              >
                Welcome back{" "}
                <span style={{ fontWeight: 800 }}>{user?.name}</span>
              </h4>
              <Fab
                onClick={() => logoutUser()}
                size="small"
                sx={{ pr: 6, pl: 6 }}
                variant="extended"
              >
                LogOut
              </Fab>
            </div>
          ) : (
            <Fab
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              size="small"
              sx={{ pr: 6, pl: 6 }}
              variant="extended"
            >
              Login
            </Fab>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};
export default connect(mapStateToProps, { logoutUser })(Header);
