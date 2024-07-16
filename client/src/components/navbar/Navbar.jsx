import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { darkMode, changeTheme } = useContext(DarkModeContext);

  const [searchString, setSearchString] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: [search],
    queryFn: async () => {
      try {
        const response = await makeRequest.get(`/users/findbyname/${search}`);
        return response.data.id;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    enabled: !!search,
  });

  useEffect(() => {
    if (isError) {
      alert("User not found");
      console.log(error);
      setSearch("");
      navigate("/");
    } else if (!error && !isLoading && data) {
      navigate(`/profile/${data}`);
    }
  }, [error, isLoading, isError, data, navigate]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      setSearch(searchString);
      setSearchString("");
    }
  };

  const handleLogout = async () => {
    await makeRequest.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        <NavLink to="/">
          <span>SocioSapiens</span>
        </NavLink>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon cursor="pointer" onClick={() => changeTheme()} />
        ) : (
          <DarkModeOutlinedIcon
            cursor="pointer"
            onClick={() => changeTheme()}
          />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search..."
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
