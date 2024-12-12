import { useState, useEffect } from 'react'
import api from '../services/api'
import { Col, Card, CardImg, Badge, CardBody, CardTitle, CardFooter } from 'reactstrap'
import { Card as Cr, CardContent, CardMedia, CardActions, Button  } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';

const PokeTarject = (params) => {

    const [pokemon, setPokemon] = useState([])
    const [imagen, setImage] = useState('')
    const [cardClass, setCardClass] = useState('d-done')
    const [loadClass, setLoadClass] = useState('')
    const img = 'public/img/loading2.gif'

    useEffect(() => {
        getPokemon()
    }, [])

    const getPokemon = async () => {
        await api.get(params.pokemon.url)
            .then((response) => {
                setPokemon(response.data)
                if(response.data.sprites.other['dream_world'].front_default !== null)
                    setImage(response.data.sprites.other['dream_world'].front_default)
                else
                    setImage(response.data.sprites.other['official-artwork'].front_default)
                    setCardClass('')
                    setLoadClass('d-done')
            })
    }

    return (

        <>
        {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        > */}
            <Col sm="12" md="6" lg="4" className="animate__animated animate__fadeInUp">
                {loadClass === '' ? (
                    <Cr className={`shadow border-4 ` + loadClass}>
                        <CardMedia component="img" height="200" image={img} alt="Card image cap" className='p-3' />
                    </Cr>
                ) : (
                    <Link style={{ cursor: 'pointer' }} to={`/pokemon/${pokemon.name}`} className='link-sub'>
                        <Cr className={`card-hover shadow border-4 ` + cardClass} style={{ borderRadius: '15px', overflow: 'hidden' }}>
                            <CardMedia component="img" image={imagen} height='150' alt="Card image cap" className='p-2 ' style={{ borderRadius: '15px 15px 0 0', objectFit: 'contain', width: '100%' }} />
                            <CardContent className="text-center" style={{ padding: '16px' }}>
                                <Badge pill color="danger" style={{ marginBottom: '8px' }}># {pokemon.id}</Badge>
                                <CardTitle style={{ fontWeight: 'bold', fontSize: '1.25rem' }}> 
                                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                </CardTitle>
                            </CardContent>
                        </Cr>
                    </Link>
                
                )}
                <br />
            </Col> 


        </>
    )
}

export default PokeTarject