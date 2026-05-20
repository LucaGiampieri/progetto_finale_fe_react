import axios from "axios";
import { useState, useEffect } from "react";

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
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      });
  }

  useEffect(fetchMonsters, []);

  console.log(monsters);

  return (
    <>
      <div className="home-container">
        {monsters.map((monster) => (
          <div className="home-card" key={monster.id}>
            <h5 className="home-card-title">{monster.name}</h5>
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
