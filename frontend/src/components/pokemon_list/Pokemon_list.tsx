import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Pokemon_list.css';
import axios from 'axios';

// Define the type for the Pokémon data
interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: string[];
  image: string;
}

const Pokemon_list: React.FC = () => {
  const [Allpokemons, setAllpokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/pokemons`);
      setAllpokemons(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className='pokemon-container'>
      {
        Allpokemons.map((item) => (
          <Card
            key={item.id}
            id={item.id.toString()}
            name={item.name}
            height={item.height.toString()}   // Passing height as number
            weight={item.weight.toString()}   // Passing weight as number
            base_experience={item.base_experience}   // Passing base_experience as number
            abilities={item.abilities}   // Passing abilities as array of strings
            image={item.image}   // Passing image as string
          />
        ))
      }
    </div>
  );
}

export default Pokemon_list;
