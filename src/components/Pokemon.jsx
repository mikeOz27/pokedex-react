import React, { useState, useEffect } from 'react';
import { Container as CT, Row, InputGroup } from 'reactstrap';
import { TextField, InputAdornment, Grid2 } from "@mui/material";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import api from '../services/api';
import env from '../constants/Constanst';
import PokeTarject from './PokeCard';

function Pokemon() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState('');

    const [offset, setOffset] = useState(0);
    const [limit] = useState(20);
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
        const pokemonId = await api.get(`${API_URL}${env.POKEMON_URL}?limit=100&offset=0`);
        setAllPokemons(pokemonId.data.results);
    }

    const goPage = async (page) => {
        setList([]);
        await getPokemons((page === 1 ? 0 : (page - 1) * limit));
        setOffset(page); 
    }

    const search = (event) => {
        if (event.keyCode === 13 && filter.trim() !== '') {
            setList([]);
            setTimeout(() => {
                setList(allPokemons.filter((pokemon) => pokemon.name.includes(filter.toLowerCase())));
            },100);

        } else if (filter.trim() === '') {
            setList([]); // Restaura la lista original si no hay filtro
            setTimeout(() => {
                setList(pokemons);
            },100);
        }
    };

    useEffect(() => {
        getPokemons(offset);
        getAllPokemons();
    }, []); // Dispara cuando cambia la página actual


    // const handlePageChange = (page) => {
    //     setCurrentPage(page); // Actualiza la página actual
    // };

    return (
        <>
            <CT className="shadow bg">
                <Row>
                    <Grid2>
                        <InputGroup>
                            <TextField
                                id="outlined-basic"
                                label="Pokemon"
                                variant="outlined"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                placeholder="Search Pokemon"
                                onKeyUpCapture={search}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }}
                            />
                        </InputGroup>
                    </Grid2>
                </Row>
                <br />
                <Row className="mt-3">
                    {list.map((pokemon, index) => (
                        <PokeTarject key={index} pokemon={pokemon} />
                    ))}
                </Row>
                <Row>
                    <PaginationControl
                        last={true}
                        limit={limit}
                        total={total}
                        page={offset} // Página actual
                        // changePage={handlePageChange} // Cambia la página
                        changePage={page => goPage(page)} // Cambia la página
                    />
                </Row>
            </CT>
        </>
    );
}

export default Pokemon;

