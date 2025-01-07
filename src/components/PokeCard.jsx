import { useState, useEffect } from 'react'
import api from '../services/api'
import { Col, Badge, CardTitle, CardFooter } from 'reactstrap'
import { Card as Cr, CardContent, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'

const PokeCard = (params) => {

    const [pokemon, setPokemon] = useState([])
    const [imagen, setImage] = useState('')
    const [cardClass, setCardClass] = useState('d-done')
    const [loadClass, setLoadClass] = useState('')
    const img = 'public/img/loading2.gif'

    let sm = params.sm ? params.sm : 12;
    let md = params.md ? params.md : 12;
    let lg = params.lg ? params.lg : 4;

    const getPokemon = async () => {
        await api.get(params.pokemon.url)
            .then((response) => {
                setPokemon(response.data)
                if(response.data.sprites.other['dream_world'].front_default !== null)
                    setImage(response.data.sprites.other['dream_world'].front_default)
                else if(response.data.sprites.other['official-artwork'].front_default !== null)
                        setImage(response.data.sprites.other['official-artwork'].front_default)
                    else
                        setImage('public/img/pokeball.png')
                    setCardClass('')
                    setLoadClass('d-done')
            })
    }

    useEffect(() => {
        getPokemon();
    }, []);
    return (
        <>
            <Col sm={sm} md={md} lg={lg} className="animate__animated animate__fadeInUp">
                {loadClass === '' ? (
                    <Cr className={`shadow border-4 circle ` + loadClass}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={img}
                            alt="Card image cap"
                            className='p-3'
                        />
                    </Cr>
                ) : (
                    <Link style={{ backgroundColor: 'transparent', textDecoration: "none" }} to={`/pokemon/${pokemon.name}`} className='link-sub card'>
                        <Cr className={`card-hover shadow border-4 circle `} style={{ overflow: 'hidden', borderRadius: '0%', backgroundColor: '#ffffff38' }}>
                            <div className="card__circle"></div>
                            <CardMedia component="img" image={imagen} height='150' alt="Card image cap" className='p-2' style={{ borderRadius: '15px 15px 0 0', objectFit: 'contain', width: '100%' }} />
                            <CardContent className="text-center" style={{ padding: '16px' }}>
                                <Badge pill color="danger" style={{ marginBottom: '8px' }}># {pokemon.id}</Badge>
                                <CardTitle style={{ fontWeight: 'bold', fontSize: '1.25rem' }}> 
                                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                </CardTitle>
                                <CardFooter className={cardClass} key={pokemon.id} style={{border: "none"}}>
                                    {pokemon.types.map((type, index) => (
                                        <Badge color="danger" key={type.type.name + index} style={{ marginRight: '4px' }} className={type.type.name}>
                                            {type.type.name}
                                        </Badge>
                                    ))}
                                </CardFooter>
                            </CardContent>
                        </Cr>
                    </Link>
                )}
                <br />
            </Col>
        </>
    )
}

export default PokeCard