import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Card.css";

interface CardProps {
  id: string;
  image: string;
  name: string;
  height: string;
  weight: string;
  base_experience: number;
  abilities: string[];
}

const Card: React.FC<CardProps> = (props) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/pokemon/${props.id}`); 
    };

    return (
        <div className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
            <div className="upper">
                <img className='pokemon-img' src={props.image} alt={props.name} />
            </div>
            <div className="lower">
                <p>{props.name}</p>
                <div>
                    <p>Height: {props.height}</p>
                    <p>Weight: {props.weight}</p>
                </div>
                <p>Base Experience: {props.base_experience}</p>
                <p>Abilities: {props.abilities.join(', ')}</p>
            </div>
        </div>
    );
}

export default Card;
