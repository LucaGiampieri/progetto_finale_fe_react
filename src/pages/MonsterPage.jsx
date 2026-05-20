import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useGlobal } from "../context/GlobalContext";

function MonsterPage() {
  const { id } = useParams();

  const endpoint = `http://127.0.0.1:8000/api/monsters/${id}`;

  const { setIsLoading } = useGlobal();

  const [monster, setMonster] = useState();

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
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      });
  }

  useEffect(fetchMonster, []);

  if (!monster) return null;

  return (
    <>
      <div className="monster-container">
        <img
          className="monster-image"
          src={monster.image_url}
          alt={monster.name}
        />
        <div className="monster-text-container">
          <h2>{monster.name}</h2>
          {monster.size && <h4>Taglia: {monster.size.name}</h4>}
          {monster.size && <p>{monster.size.description}</p>}
          {monster.types &&
            monster.types.map((type) => (
              <div key={type.id}>
                <h4>Tipologia: {type.name}</h4>
                <p>{type.description}</p>
              </div>
            ))}
          <h3>Descrizione:</h3>
          <p>{monster.description}</p>
        </div>
      </div>
    </>
  );
}

export default MonsterPage;
