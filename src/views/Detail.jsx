import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card as Cr, CardContent, CardMedia, CardActions, Button  } from '@mui/material'
import PokeCard from '../components/PokeCard' 

function Detail() {
  const { id, name } = useParams()
  const [pokemon, setPokemon] = useState([])
  const [imagen, setImage] = useState('')
  return (
    <div>{name}</div>
  )
}

export default Detail