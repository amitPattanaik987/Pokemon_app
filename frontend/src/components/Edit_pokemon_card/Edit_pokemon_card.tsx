import React, { useState, ChangeEvent, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Edit_pokemon_card.css';
import edit from '../../assets/Editicon.png';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

interface EditPokemonCardProps {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: string[];
  image: string;
}

export default function EditPokemonCard(props: EditPokemonCardProps) {
  const [showModal, setShowModal] = useState(false);

  const [pokemonData, setPokemonData] = useState({
    name: props.name,
    base_experience: props.base_experience,
    height: props.height,
    weight: props.weight,
    abilities: props.abilities.join(', '), // Convert array to comma-separated string
    image: props.image || "", // Initialize image with the current image prop or an empty string
  });

  // Function to toggle the modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPokemonData({
      ...pokemonData,
      [name]: value,
    });
  };

  // Handle form submission (e.g., updating the Pokémon data)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedPokemon = {
      name: pokemonData.name,
      base_experience: parseInt(pokemonData.base_experience.toString(), 10),
      height: parseInt(pokemonData.height.toString(), 10),
      weight: parseInt(pokemonData.weight.toString(), 10),
      abilities: pokemonData.abilities.split(',').map((ability) => ability.trim()),
      image: pokemonData.image || "",
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/pokemons/${props.id}`,
        updatedPokemon
      );

      console.log('Updated Pokémon:', response.data);

      setShowModal(false);
      window.location.reload(); // Reload the page to reflect the changes
    } catch (error) {
      console.error('Error updating Pokémon:', error);
    }
  };

  return (
    <div className="card mb-3 main-card">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={props.image}
            className="img-fluid rounded-start"
            alt={props.name}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </div>
        <div className="col-md-8 data">
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">
              <strong>Base Experience:</strong> {props.base_experience}
            </p>
            <p className="card-text">
              <strong>Height:</strong> {props.height} cm
            </p>
            <p className="card-text">
              <strong>Weight:</strong> {props.weight} kg
            </p>
            <p className="card-text">
              <strong>Abilities:</strong> {props.abilities.join(', ')}
            </p>
            <p className="card-text">
              <small className="text-muted">ID: {props.id}</small>
            </p>
          </div>
          <div className="imagediv" onClick={handleShow}>
            <img src={edit} alt="Edit Icon" />
          </div>
        </div>
      </div>

      {/* Modal for editing Pokémon */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pokémon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={pokemonData.name}
                onChange={handleInputChange}
                placeholder="Enter Pokémon name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBaseExperience">
              <Form.Label>Base Experience</Form.Label>
              <Form.Control
                type="number"
                name="base_experience"
                value={pokemonData.base_experience}
                onChange={handleInputChange}
                placeholder="Enter base experience"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formHeight">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                type="number"
                name="height"
                value={pokemonData.height}
                onChange={handleInputChange}
                placeholder="Enter height"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formWeight">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={pokemonData.weight}
                onChange={handleInputChange}
                placeholder="Enter weight"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAbilities">
              <Form.Label>Abilities</Form.Label>
              <Form.Control
                type="text"
                name="abilities"
                value={pokemonData.abilities}
                onChange={handleInputChange}
                placeholder="Enter abilities (comma separated)"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={pokemonData.image}
                onChange={handleInputChange}
                placeholder="Enter Pokémon image URL"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
