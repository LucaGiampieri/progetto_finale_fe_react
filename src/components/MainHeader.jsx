import { Link, useLocation } from "react-router-dom";
import { GlobalProvider, useGlobal } from "../context/GlobalContext";

function MainHeader() {
  const location = useLocation();

  return (
    <nav className="header-navbar ">
      <h1>Il bestiario digitale</h1>

      {location.pathname.includes("/monsters/") && (
        <Link className="header-back-to-home" to="/">
          Torna alla Home
        </Link>
      )}
    </nav>
  );
}

export default MainHeader;
