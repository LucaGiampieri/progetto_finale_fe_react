import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useGlobal } from "../context/GlobalContext";

function MonsterPage() {
  const { id } = useParams();

  const endpoint = `http://127.0.0.1:8000/api/monsters/${id}`;

  const { setIsLoading } = useGlobal();

  const [monster, setMonster] = useState();

  const [monsters, setMonsters] = useState([]);

  function fetchMonster() {
    setIsLoading(true);

    axios
      .get(endpoint)
      .then((res) => {
        const data = {
          ...res.data.data,
          image_url: `${import.meta.env.VITE_API_URL}/storage/${res.data.data.image}`,
        };

        setMonster(data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchMonsters() {
    axios
      .get("http://127.0.0.1:8000/api/monsters")
      .then((res) => {
        setMonsters(res.data.data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchMonster();
    fetchMonsters();
  }, [id]);

  const currentIndex = monsters.findIndex(
    (monster) => monster.id === Number(id),
  );

  const prevMonster = monsters[currentIndex - 1];

  const nextMonster = monsters[currentIndex + 1];

  if (!monster) return null;

  return (
    <>
      <div className="monster-container ">
        <div className="monster-image-container">
          <div className="monster-button-container">
            {prevMonster && (
              <Link
                className="monster-nav-button"
                to={`/monsters/${prevMonster.id}`}
              >
                <i class="bi bi-caret-left-fill"></i>
              </Link>
            )}
          </div>
          <img
            className="monster-image"
            src={monster.image_url}
            alt={monster.name}
          />
          <div className="monster-button-container">
            {nextMonster && (
              <Link
                className="monster-nav-button"
                to={`/monsters/${nextMonster.id}`}
              >
                <i class="bi bi-caret-right-fill"></i>
              </Link>
            )}
          </div>
        </div>
        <div className="monster-text-container">
          <h2 className="monster-name">{monster.name}</h2>

          {monster.size && (
            <div className="monster-info-container">
              <h3 className="monster-info-title">Taglia:</h3>
              <div className="monster-info-hover">
                <p className="monster-info"> {monster.size.name}</p>

                <p className="monster-hover-description">
                  {monster.size.description}
                </p>
              </div>
            </div>
          )}

          <div className="monster-info-container">
            {monster.types && (
              <h3 className="monster-info-title">Tipologia:</h3>
            )}
            <ul className="monster-list">
              {monster.types &&
                monster.types.map((type) => (
                  <div className="monster-info-hover" key={type.id}>
                    <li className="monster-info">{type.name}</li>

                    <p className="monster-hover-description">
                      {type.description}
                    </p>
                  </div>
                ))}
            </ul>
          </div>

          <h3 className="monster-info-title">Descrizione:</h3>
          <p className="monster-description">{monster.description}</p>
        </div>
      </div>
    </>
  );
}

export default MonsterPage;
