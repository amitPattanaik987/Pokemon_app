from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, Base, get_db

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Routes for the Pokémon CRUD operations
@app.get("/pokemons", response_model=list[schemas.Pokemon])
def read_pokemons(db: Session = Depends(get_db)):
    return crud.get_pokemons(db)

@app.get("/pokemons/{id}", response_model=schemas.Pokemon)
def read_pokemon(id: int, db: Session = Depends(get_db)):
    pokemon = crud.get_pokemon(db, id)
    if not pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return pokemon

@app.post("/pokemons", response_model=schemas.Pokemon)
def create_pokemon(pokemon: schemas.PokemonCreate, db: Session = Depends(get_db)):
    return crud.create_pokemon(db, pokemon)

@app.put("/pokemons/{id}", response_model=schemas.Pokemon)
def update_pokemon(id: int, pokemon: schemas.PokemonUpdate, db: Session = Depends(get_db)):
    updated_pokemon = crud.update_pokemon(db, id, pokemon)
    if not updated_pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return updated_pokemon

@app.delete("/pokemons/{id}", response_model=schemas.Pokemon)
def delete_pokemon(id: int, db: Session = Depends(get_db)):
    deleted_pokemon = crud.delete_pokemon(db, id)
    if not deleted_pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return deleted_pokemon
