import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import { MAX_FILE_SIZE } from "../../Constants/AppConstants";
import { APP_NAME } from "../../Constants/AppConstants"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileSize = file.size;
    if (fileSize > MAX_FILE_SIZE) {
      alert.error('File size should be less than 5 MB')
      return;
    }
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const validateInputValues = () => {
    if (name === '') {
      alert.error('Name is required');
      return;
    } else if (email === '') {
      alert.error('Email is required');
      return;
    } else if (password === '') {
      alert.error('Password is required');
      return;
    } else if (avatar === '') {
      alert.error('Please upload profile picture');
      return;
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    validateInputValues();
    dispatch(registerUser(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          {APP_NAME}
        </Typography>
        <div>
          <img style={{ height: '150px', width: '200px' }} src="assets/gifs/friends.gif" />
        </div>
        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Already Signed Up? Login Now</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
