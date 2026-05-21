import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useGlobal } from "../context/GlobalContext";

function HomePage() {
  const endpoint = "http://127.0.0.1:8000/api/monsters";

  const { setIsLoading } = useGlobal();

  const [monsters, setMonsters] = useState([]);

  function fetchMonsters() {
    setIsLoading(true);

    axios
      .get(endpoint)
      .then((res) => {
        const data = res.data.data.map((monster) => ({
          ...monster,
          image_url: `${import.meta.env.VITE_API_URL}/storage/${monster.image}`,
        }));

        setMonsters(data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(fetchMonsters, []);

  return (
    <>
      <div className="home-container">
        {monsters.map((monster) => (
          <div className="home-card" key={monster.id}>
            <h5>
              <Link className="home-card-title" to={`monsters/${monster.id}`}>
                {monster.name}
              </Link>
            </h5>
            <img
              className="home-card-image"
              src={monster.image_url}
              alt={monster.name}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
