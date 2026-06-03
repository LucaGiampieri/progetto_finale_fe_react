import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MonsterCard from "../components/MonsterCard";

import { useGlobal } from "../context/GlobalContext";

function HomePage() {
  const typesEndpoint = "http://127.0.0.1:8000/api/types";

  const sizesEndpoint = "http://127.0.0.1:8000/api/sizes";

  const { setIsLoading } = useGlobal();

  const [monsters, setMonsters] = useState([]);

  const [order, setOrder] = useState("");

  const [search, setSearch] = useState("");

  const [types, setTypes] = useState([]);

  const [sizes, setSizes] = useState([]);

  const [selectedType, setSelectedType] = useState("");

  const [selectedSize, setSelectedSize] = useState("");

  function fetchMonsters() {
    setIsLoading(true);

    let url = "http://127.0.0.1:8000/api/monsters";

    const params = [];

    if (order) {
      params.push(`order=${order}`);
    }

    if (search) {
      params.push(`search=${search}`);
    }

    if (selectedType) {
      params.push(`type=${selectedType}`);
    }

    if (selectedSize) {
      params.push(`size=${selectedSize}`);
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

  function featchTypes() {
    axios
      .get(typesEndpoint)
      .then((res) => {
        setTypes(res.data.data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  function featchSizes() {
    axios
      .get(sizesEndpoint)
      .then((res) => {
        setSizes(res.data.data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  useEffect(() => {
    fetchMonsters();
  }, [order, search, selectedType, selectedSize]);

  useEffect(() => {
    featchTypes();
    featchSizes();
  }, []);

  return (
    <>
      <div className="home-container-backgound">
        <div className="container">
          <div className="home-select-container">
            <div className="selcet-container">
              <label htmlFor="search">Cerca</label>
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cerca mostro..."
              />
            </div>

            <div className="selcet-container">
              <label htmlFor="types">Tipologia</label>
              <select
                id="types"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Tutte</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="selcet-container">
              <label htmlFor="sizes">Taglia</label>
              <select
                id="sizes"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Tutte</option>
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="selcet-container">
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
          </div>

          <div className="home-container">
            {monsters.map((monster) => (
              <MonsterCard
                key={monster.id}
                id={monster.id}
                name={monster.name}
                image_url={monster.image_url}
              />
            ))}
          </div>

          
        </div>
      </div>
    </>
  );
}

export default HomePage;
