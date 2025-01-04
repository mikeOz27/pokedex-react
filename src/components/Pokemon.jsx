import { useState, useEffect } from 'react';
import { Container as CT, Row, Col } from 'reactstrap';
import { Grid2, TextField } from "@mui/material";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import api from '../services/api';
import env from '../constants/Constanst';
import PokeCard from './PokeCard';

function Pokemon() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState('');

    const [offset, setOffset] = useState(0);
    const [limit] = useState(21);
    const [total, setTotal] = useState(0);

    const getPokemons = async (o) => {
        try {
            const response = await api.get(`${API_URL}${env.POKEMON_URL}?limit=${limit}&offset=${o}`);
            const data = response.data;
            setPokemons(data.results);
            setList(data.results);
            setTotal(data.count);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
    };

    const getAllPokemons = async () => {
        const pokemonId = await api.get(`${API_URL}${env.POKEMON_URL}?limit=10000&offset=0`);
        setAllPokemons(pokemonId.data.results);
    }

    // PAGINACION
    const goPage = async (page) => {
        setList([]);
        await getPokemons((page === 1 ? 0 : (page - 1) * limit));
        setOffset(page);
    }

    //FUNCION BUSCAR
    const search = (event) => {
        if (event.keyCode === 13) {
            if (filter.trim() !== '')
                setList([]);
            setTimeout(() => {
                setList(
                    allPokemons.filter(
                        (pokemon) => pokemon.name.includes(filter.toLowerCase()
                        ))
                );
            }, 100);
        } else if (filter.trim() === '') {
            setList([]); // Restaura la lista original si no hay filtro
            setTimeout(() => {
                setList(pokemons);
            }, 100);
        }
    };

    useEffect(() => {
        getPokemons(offset);
        getAllPokemons();

    }, []);

    return (
      <>
        <CT className="">
          <Row>
            <Col>
              <Grid2>
                <TextField
                  id="outlined-basic"
                  label="Pokemon"
                  variant="outlined"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search Pokemon"
                  onKeyUpCapture={search}
                  className="animate__animated animate__backInDown nes-input"
                />
                {/* <input
                  id="outlined-basic"
                  label="Pokemon"
                //   variant="outlined"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search Pokemon"
                  onKeyUpCapture={search}
                  className="animate__animated animate__backInDown nes-input"
                  style={{ backgroundColor: "#00000000" }}
                /> */}
              </Grid2>
            </Col>
          </Row>
          <br />
          <Row className="mt-3">
            {list.map((pokemon, index) => (
              <PokeCard key={index} pokemon={pokemon} />
            ))}
            {list.length === 0 ? (
              <Col className="text-center">No se encontraron resultados</Col>
            ) : (
              <div className="d-flex justify-content-center mt-4">
                <PaginationControl
                  last={true}
                  limit={limit}
                  total={total}
                  page={offset} // Página actual
                  changePage={(page) => goPage(page)} // Cambia la página
                  className="pagination"
                  style={{
                    backgroundColor: "#ffcf3d",
                    borderColor: "#c5a545",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
          </Row>
        </CT>
      </>
    );
}

export default Pokemon;

