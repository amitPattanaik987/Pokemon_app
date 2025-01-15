import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddPokemon from './pages/Add_pokemon/AddPokemon';
import Navbar from './components/Navbar/Navbar';
import Edit_pokemon from './pages/Edit_pokemon/Edit_pokemon';
import Pokemon_details from './pages/Pokemon_details/PokemonDetails';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addpokemon' element={<AddPokemon />} />
        <Route path='/editpokemon' element={<Edit_pokemon />} />
        <Route path='/pokemon/:id' element={<Pokemon_details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
