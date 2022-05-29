import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import Button from '@mui/material/Button';

const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className="header">
      <Link style={{ textDecoration: "none", color: "black" }} to="/"><h3>FriendsHub</h3></Link>
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>

      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>

      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>

      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>

      <Link style={{ textDecoration: "none" }} to="/requests">
        <Button variant="outlined">Requests</Button>
      </Link>

      <Link style={{ textDecoration: "none" }} to="/suggestions">
        <Button variant="outlined">Suggestions</Button>
      </Link>

    </div>
  );
};

export default Header;
