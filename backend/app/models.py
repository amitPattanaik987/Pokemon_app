from sqlalchemy import Column, Integer, String, JSON
from .database import Base

class Pokemon(Base):
    __tablename__ = "pokemons"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    height = Column(Integer, nullable=False)
    weight = Column(Integer, nullable=False)
    base_experience = Column(Integer, nullable=False)
    abilities = Column(JSON, nullable=False)
    image = Column(String, nullable=True)
