from sqlalchemy.orm import Session
from . import models, schemas

def get_pokemon(db: Session, pokemon_id: int):
    return db.query(models.Pokemon).filter(models.Pokemon.id == pokemon_id).first()

def get_pokemons(db: Session):
    return db.query(models.Pokemon).all()


def create_pokemon(db: Session, pokemon: schemas.PokemonCreate):
    db_pokemon = models.Pokemon(**pokemon.dict()) 
    db.add(db_pokemon)
    db.commit()
    db.refresh(db_pokemon)
    return db_pokemon


def update_pokemon(db: Session, pokemon_id: int, pokemon: schemas.PokemonUpdate):
    db_pokemon = get_pokemon(db, pokemon_id)
    if not db_pokemon:
        return None
    for key, value in pokemon.dict().items():
        setattr(db_pokemon, key, value)
    db.commit()
    db.refresh(db_pokemon)
    return db_pokemon


def delete_pokemon(db: Session, pokemon_id: int):
    db_pokemon = get_pokemon(db, pokemon_id)
    if db_pokemon:
        db.delete(db_pokemon)
        db.commit()
        return db_pokemon
    return None
