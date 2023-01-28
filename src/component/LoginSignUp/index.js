import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { connect } from "react-redux";
import { loginUser, createUser } from "../../actions/index";

const InputCard = ({ title, placeHolder, value, setValue, inputType }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h6 style={{ fontSize: 18, fontWeight: 600, margin: "10px 0" }}>
        {title}
      </h6>
      <input
        style={{
          padding: "10px",
          border: "none",
          borderBottom: "2px solid #00000040",
          fontSize: 16,
          marginBottom: 40,
          outline: "none",
        }}
        type={inputType ? inputType : "text"}
        placeholder={placeHolder}
        value={value}
        onChange={(val) => setValue(val.target.value)}
      />
    </div>
  );
};

const LoginCard = ({ setIsLoginOpen, setIsLoginCard, users, loginUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = () => {
    if (!userName || !password) {
      return alert("Plz fill all details");
    }
    let user = {
      name: userName,
      password: password,
    };
    // console.log(users);

    if (users === []) {
      return alert("No account present plz create new");
    }
    if (users) {
      const filterUser = users?.filter(
        (data) => data.userName === userName && data.password == password
      );
      // console.log(filterUser);
      if (
        filterUser[0]?.userName == userName &&
        filterUser[0]?.password == password
      ) {
        return loginUser(user), setIsLoginOpen(false);
      } else {
        return alert("Password not matched");
      }
    }
  };
  return (
    <div
      style={{
        padding: 40,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        width: "40%",
        alignItems: "center",
        zIndex: 1000,
        position: "relative",
      }}
    >
      <RiCloseFill
        onClick={() => setIsLoginOpen(false)}
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          fontSize: 22,
          cursor: "pointer",
        }}
      />
      <h4
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 60,
        }}
      >
        Login
      </h4>
      <div style={{ width: "100%" }}>
        <InputCard
          title="User Name"
          placeHolder="Enter user name here"
          value={userName}
          setValue={setUserName}
        />
        <InputCard
          title="Password"
          placeHolder="Password here"
          value={password}
          setValue={setPassword}
          inputType="password"
        />
      </div>
      <button
        onClick={() => handleOnSubmit()}
        style={{
          padding: "10px 0",
          border: "none",
          backgroundColor: "#00aa0080",
          fontSize: 22,
          fontWeight: 600,
          color: "#ffffff",
          width: "50%",
          borderRadius: 10,
          marginBottom: 20,
          cursor: "pointer",
        }}
      >
        Login
      </button>
      <h4 style={{ fontSize: 18 }}>
        Have no account ?{" "}
        <span
          onClick={() => setIsLoginCard(false)}
          style={{
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            marginLeft: 10,
          }}
        >
          Create New{" "}
        </span>
      </h4>
    </div>
  );
};

const SignUpCard = ({ setIsLoginOpen, setIsLoginCard, users, createUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!userName || !password || !confirmPassword) {
      return alert("Please fill all fields");
    }
    if (password !== confirmPassword) {
      return alert("Password and Confirm Password not matched");
    }

    const userData = {
      userName: userName,
      password: password,
    };

    const filterUser = users?.filter((data) => data.userName === userName);
    if (filterUser[0]?.userName == userName) {
      // console.log(users);
      return alert("Username already present");
    }

    createUser(userData);
    setIsLoginCard(true);
    // console.log(users);
  };

  return (
    <div
      style={{
        padding: 40,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        width: "40%",
        alignItems: "center",
        zIndex: 1000,
        position: "relative",
      }}
    >
      <RiCloseFill
        onClick={() => setIsLoginOpen(false)}
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          fontSize: 22,
          cursor: "pointer",
        }}
      />
      <h4
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 2,
          marginBottom: 60,
        }}
      >
        SignUp
      </h4>
      <div style={{ width: "100%" }}>
        <InputCard
          title="User Name"
          placeHolder="Enter user name here"
          value={userName}
          setValue={setUserName}
        />
        <InputCard
          title="Password"
          placeHolder="Password here"
          value={password}
          setValue={setPassword}
          inputType="password"
        />
        <InputCard
          title="Confirm Password"
          placeHolder="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          inputType="password"
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 0",
          border: "none",
          backgroundColor: "#00aa0080",
          fontSize: 22,
          fontWeight: 600,
          color: "#ffffff",
          width: "50%",
          borderRadius: 10,
          marginBottom: 20,
          cursor: "pointer",
        }}
      >
        SignUp
      </button>
      <h4 style={{ fontSize: 18 }}>
        Already have an account ?{" "}
        <span
          onClick={() => setIsLoginCard(true)}
          style={{
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            marginLeft: 10,
          }}
        >
          Login
        </span>
      </h4>
    </div>
  );
};

const LoginSignUp = ({
  setIsLoginOpen,
  isLoginOpen,
  users,
  loginUser,
  createUser,
}) => {
  const [isLoginCard, setIsLoginCard] = useState(true);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        zIndex: 1,
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={() => setIsLoginOpen(false)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#00000060",
        }}
      ></div>
      {isLoginCard ? (
        <LoginCard
          setIsLoginOpen={setIsLoginOpen}
          setIsLoginCard={setIsLoginCard}
          users={users}
          loginUser={loginUser}
        />
      ) : (
        <SignUpCard
          setIsLoginOpen={setIsLoginOpen}
          setIsLoginCard={setIsLoginCard}
          users={users}
          createUser={createUser}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, { createUser, loginUser })(LoginSignUp);
