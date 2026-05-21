import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useGlobal } from "../context/GlobalContext";

function HomePage() {
  let url = "http://127.0.0.1:8000/api/monsters";

  const { setIsLoading } = useGlobal();

  const [monsters, setMonsters] = useState([]);

  const [order, setOrder] = useState("");

  const [search, setSearch] = useState("");

  function fetchMonsters() {
    setIsLoading(true);

    const params = [];

    if (order) {
      params.push(`order=${order}`);
    }

    if (search) {
      params.push(`search=${search}`);
    }

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    axios
      .get(url)
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

  useEffect(fetchMonsters, [order, search]);

  return (
    <>
      <div className="home-select-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca mostro..."
        />
        <label htmlFor="order">Ordine</label>
        <select
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="">Default</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
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
