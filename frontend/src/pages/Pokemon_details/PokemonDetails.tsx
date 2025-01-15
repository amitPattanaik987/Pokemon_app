import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image, Spinner, Button, Badge } from "react-bootstrap";
import "./PokemonDetails.css";

// Define types for the Pokemon details
interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: string[];
  image: string;
}

function PokemonDetails() {
  const { id } = useParams<{ id: string }>(); // Get the Pokémon ID from the route
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Define the type of pokemon state
  const [loading, setLoading] = useState<boolean>(true); // Define the type for loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch Pokémon details from the database
      axios
        .get<Pokemon>(`http://127.0.0.1:8000/pokemons/${id}`)
        .then((response) => {
          setPokemon(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon details:", error);
          setLoading(false);
        });
    }
  }, [id]);

  // Render based on loading or Pokémon not found state
  return (
    <Container className="text-center mt-5">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : !pokemon ? (
        <>
          <h1 className="text-danger">Page Not Found</h1>
          <p>Sorry, we couldn't find a Pokémon with that ID.</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Go Back to Home
          </Button>
        </>
      ) : (
        <div className="main-container">
          <Row className="justify-content-center">
            {/* Pokémon Image */}
            <Col md={5} className="text-center">
              <Image
                src={pokemon.image || "https://via.placeholder.com/300"}
                alt={pokemon.name}
                fluid
                rounded
                className="imgofpokemon"
              />
            </Col>

            {/* Pokémon Details */}
            <Col md={6} className="textpart">
              <div className="name-section">
                <h1 className="mb-4">{pokemon.name}</h1>
              </div>
              <div className="details-section">
                <h2>Details</h2>
                <ul className="list-unstyled">
                  <li className="detail-item bg-primary text-white p-2 mb-2 rounded">
                    <strong>Height:</strong> {pokemon.height}
                  </li>
                  <li className="detail-item bg-success text-white p-2 mb-2 rounded">
                    <strong>Weight:</strong> {pokemon.weight}
                  </li>
                  <li className="detail-item bg-warning text-dark p-2 mb-2 rounded">
                    <strong>Base Experience:</strong> {pokemon.base_experience}
                  </li>
                </ul>
              </div>
              <div className="abilities-section">
                <h5>Abilities</h5>
                {pokemon.abilities.map((ability, index) => (
                  <Badge
                    key={index}
                    className="ability-badge bg-info text-white me-2 mb-2"
                  >
                    {ability}
                  </Badge>
                ))}
              </div>
              <div className="button-section mt-4">
                <Button variant="primary" size="lg" className="me-3" onClick={() => navigate("/")}>
                  Go Back
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}

export default PokemonDetails;
