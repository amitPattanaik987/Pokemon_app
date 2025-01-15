from pydantic import BaseModel
from typing import List, Optional

class PokemonBase(BaseModel):
    name: str
    height: int
    weight: int
    base_experience: int
    abilities: List[str]
    image: Optional[str]  # New field for image URL (optional)

class PokemonCreate(PokemonBase):
    pass

class PokemonUpdate(PokemonBase):
    pass

class Pokemon(PokemonBase):
    id: int

    class Config:
        orm_mode = True
