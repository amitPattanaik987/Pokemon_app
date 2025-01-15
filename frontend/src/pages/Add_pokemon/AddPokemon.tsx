import React, { useState, ChangeEvent, FormEvent } from "react";
import "./AddPokemon.css";
import axios from "axios";

interface FormData {
  name: string;
  height: string;
  weight: string;
  base_experience: string;
  abilities: string;
  image: string;
}

const AddPokemon = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    height: "",
    weight: "",
    base_experience: "",
    abilities: "",
    image: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      base_experience: parseInt(formData.base_experience),
      abilities: formData.abilities.split(",").map((ability) => ability.trim()),
    };

    console.log(payload);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/pokemons/", payload);
      console.log("Pokemon added:", response.data);
      alert("Pokemon added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding Pokemon:", error);
      alert("Failed to add Pokemon. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-pokemon-form">
      <h2>Add Pokémon</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Pokémon name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="height">Height:</label>
        <input
          id="height"
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Enter height (in decimeters)"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="weight">Weight:</label>
        <input
          id="weight"
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Enter weight (in hectograms)"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="base_experience">Base Experience:</label>
        <input
          id="base_experience"
          type="number"
          name="base_experience"
          value={formData.base_experience}
          onChange={handleChange}
          placeholder="Enter base experience points"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="abilities">Abilities (comma-separated):</label>
        <input
          id="abilities"
          type="text"
          name="abilities"
          value={formData.abilities}
          onChange={handleChange}
          placeholder="Enter abilities (e.g., overgrow, chlorophyll)"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL:</label>
        <input
          id="image"
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          required
        />
      </div>
      <button type="submit">Add Pokémon</button>
    </form>
  );
};

export default AddPokemon;
