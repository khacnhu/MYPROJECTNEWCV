import React, { useState } from "react";
import "./header.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { getTours, searchTours } from "../../redux/features/tourSlice";
import decode from "jwt-decode";
import { toggleDarkMode } from "../../redux/features/themeSlice";

import { FaListAlt } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";

import Sidebar from "../Sidebar/Sidebar";

// CgDarkMode

// FaListAlt

const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  // console.log(search)

  const { darkMode } = useSelector((state) => ({ ...state.theme }));

  const { user } = useSelector((state) => ({ ...state.auth }));
  const accessToken = user?.accessToken;

  if (accessToken) {
    const decodeAccessToken = decode(accessToken);
    // console.log(decodeAccessToken)
    if (decodeAccessToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleLogout = () => {
    dispatch(setLogout({ navigate }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchTour=${search}`);
      setSearch("");
    } else {
      dispatch(getTours());
      navigate("/");
    }
  };

  const changeDarkMode = () => {
    const next = darkMode === "dark" ? "light" : "dark";
    console.log("nexxt", next);
    dispatch(toggleDarkMode(next));
  };

  return (
    <div className="header">
      <div className="headerContain">
        <div className="headerLeft">
          <div className="leftTitle">
            <Link to="/" className="LinkTitle">
              TRAN KHAC NHU TOUR
            </Link>
          </div>
          <div className="leftSearch">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="inputSearch"
                placeholder=" Type your search ........ "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <BsSearch className="iconSearch" />
          </div>
        </div>

        <div className="headerList">
          <CgDarkMode
            className="darkModeIcon"
            onClick={() => changeDarkMode()}
          />
          <Link to="/" style={{ textDecoration: "none" }} className="Link">
            Home
          </Link>
          {user?.result?._id ? (
            <>
              <Link to="/addTour" className="Link">
                AddTour
              </Link>
              <Link to="/dashboard" className="Link">
                Dashboard
              </Link>
            </>
          ) : (
            <div></div>
          )}
          {user?.result?._id ? (
            <Link onClick={() => handleLogout()} className="Link">
              Logout
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                className="Link"
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none" }}
                className="Link"
              >
                Register
              </Link>
            </>
          )}
          <div className="headerUser">
            {user?.result?.name ? (
              <div className="ListCheckRight">
                <div className="ListCheckUserAccount">
                  User Account: {user.result.name.toUpperCase()}
                </div>
                <div>
                  <FaListAlt
                    className="iconFaListAlt"
                    onClick={() => setShowSideBar(!showSideBar)}
                    // style = {{marginRight:"24px"}}
                  />
                </div>
                {showSideBar ? <Sidebar /> : <></>}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
