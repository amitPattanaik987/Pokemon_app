import React, { useEffect, useState } from 'react';
import './Edit_pokemon.css';
import Edit_pokemon_card from '../../components/Edit_pokemon_card/Edit_pokemon_card';
import axios from 'axios';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: string[];
  image: string;
}

const Edit_pokemon = () => {
  const [Allpokemons, setAllpokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<Pokemon[]>(`http://127.0.0.1:8000/pokemons`);
      setAllpokemons(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className='pokemon_lists'>
      {Allpokemons.map((item) => (
        <Edit_pokemon_card
          key={item.id}
          name={item.name}
          image={item.image}
          height={item.height}
          weight={item.weight}
          id={item.id}
          base_experience={item.base_experience}
          abilities={item.abilities}
        />
      ))}
    </div>
  );
};

export default Edit_pokemon;
