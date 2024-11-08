import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipes</Link>
      <Link to="/saved-recipes">Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button
          style={{
            background: "transparent",
            padding: ".7rem",
            fontFamily: "inherit",
            border: "none",
            fontSize: "1.4rem",
            cursor: "pointer",
            // color: "white",
          }}
          className="btn"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </div>
  );
};
export default Navbar;
