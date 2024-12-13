import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { useEffect, useState } from 'react';
import api from '../services/api';
import env from '../constants/Constanst';
const PokemonSearch = (params) => {

    const [imagen, setImage] = useState('')
    const [pokemon, setPokemon] = useState([])
    const [cardClass, setCardClass] = useState('d-done')
    const [loadClass, setLoadClass] = useState('')
    const img = 'public/img/loading2.gif'

    const  {pokemons, filter, search, list, total, offset, limit, goPage, setFilter, setList} = params

    // const [list, setList] = useState(pokemons);

    const getPokemon = async () => {
      list.forEach(element => {
        console.log(element.url)
          api.get(element.url)
            .then((response) => {
                console.log(response.data)
                setPokemon(response.data)
                if(response.data.sprites.other['dream_world'].front_default !== null)
                    setImage(response.data.sprites.other['dream_world'].front_default)
                else
                    setImage(response.data.sprites.other['official-artwork'].front_default)
                    setCardClass('')
                    setLoadClass('d-done')
            })
          });
    }

    useEffect(() => {
      getPokemon()
    }, [])

  return (
    <div className="container">
      Search Bar
      <div className="row">
        <div className="col s12">
          <div className="input-field">
            <input
              id="search"
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onKeyUpCapture={search}
              placeholder="Search Pokemon"
              className="validate"
            />
            <label htmlFor="search">Pokemon</label>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="row">
        {list.map((pokemon, index) => (
          <div key={index} className="col s12 m6 l4">
            <div className="card hoverable">
              <div className="card-image">
                <img src={imagen} alt={pokemon.name} />
                <span className="card-title">{pokemon.name}</span>
              </div>
              <div className="card-content">
                <p>{pokemon.description}</p>
              </div>
              <div className="card-action">
                <a href={`/pokemon/${pokemon.id}`} className="blue-text text-darken-2">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* No Results Message */}
        {list.length === 0 && (
          <div className="col s12 center-align">
            <p>No se encontraron resultados</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {list.length > 0 && (
        <div className="row">
          <ul className="pagination center-align">
            {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
              <li key={index} className={`waves-effect ${offset === index + 1 ? 'active' : ''}`}>
                <a href="#!" onClick={() => goPage(index + 1)}>{index + 1}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;