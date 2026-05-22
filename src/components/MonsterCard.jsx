import { Link } from "react-router-dom";

function MonsterCard({ id, name, image_url }) {
  return (
    <div className="home-card">
      <h5>
        <Link className="home-card-title" to={`/monsters/${id}`}>
          {name}
        </Link>
      </h5>

      <img className="home-card-image" src={image_url} alt={name} />
    </div>
  );
}

export default MonsterCard;
