import React from 'react'
import api from '../services/api'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PokeCard from '../components/PokeCard'
import { Col, Container, Row, Card, CardImg, Badge, CardBody, CardText, Progress } from 'reactstrap'
import env from '../constants/Constanst'
import '../../src/index.css'

function Detail() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams()
  const [pokemon, setPokemon] = useState([])
  const [imagen, setImage] = useState('')

  const [species, setSpecies] = useState({})
  const [evolution, setEvolution] = useState('')
  const [listEvolutions, setListEvolutions] = useState([])
  const [stats, setStats] = useState([])
  const [abilities, setAbilities] = useState([])
  const [types, setTypes] = useState([])
  const [habitat, setHabitat] = useState([])
  const [description, setDescription] = useState('')
  const [cardClass, setCardClass] = useState('d-done')
  const [loadClass, setLoadClass] = useState('')
  const img = '/public/img/loading2.gif'

  useEffect(() => {
    getPokemon()
  }, [id])

  const getPokemon = async () => {
    await api.get(`${API_URL}${env.POKEMON_URL}/${id}`)
      .then((response) => {
        setPokemon(response.data)
        getTypes(response.data.types)
        getSpecies(response.data.species.name)
        getAbilities(response.data.abilities)
        getStatistics(response.data.stats)
        if(response.data.sprites.other['dream_world'].front_default !== null)
          setImage(response.data.sprites.other['dream_world'].front_default)
      else
          setImage(response.data.sprites.other['official-artwork'].front_default)
        setCardClass('')
        setLoadClass('d-done')
      }
      )
  }

  const getTypes = async (typ) => {
    let types = []
    typ.forEach((t) => {
      api.get(t.type.url)
        .then(async (response) => {
          types.push(response.data.names[5].name)
        })
    })
    setTypes(types)
  }

  const getSpecies = async (spe) => {
    await api.get(`${API_URL}${env.POKEMON_URL}-species/${spe}`)
      .then((response) => {
        setSpecies(response.data)
        if(response.data.habitat !== null)
          getHabitat(response.data.habitat.url)
          getDescriptions(response.data.flavor_text_entries)
          // console.log(response.data)
          getEvolutions(response.data.evolution_chain.url)
      })
  }

  const getHabitat = async (hab) => {
    await api.get(hab)
      .then((response) => {
        setHabitat(response.data.names[1].name)
      })
  }

  const getDescriptions = async (des) => {
    let texto = ''
    des.forEach((entry) => {
      if (entry.language.name === 'es') {
        texto = entry.flavor_text
      }
    })
    if(texto === '' && des.length > 0)
      texto = des[0].flavor_text
    setDescription(texto)
  }

  const getAbilities = async (abil) => {
    let abilities = []
    abil.forEach((a) => {
      api.get(a.ability.url)
        .then(async (response) => {
          abilities.push(response.data.names[5].name)
        })
    })
    setAbilities(abilities)
  }
  
  const getStatistics = async (sta) => {
    let statistics = []
    sta.forEach((a) => {
      api.get(a.stat.url)
        .then(async (response) => {
          statistics.push({name: response.data.names[5].name, base: a.base_stat})
        })
    })
    setStats(statistics)
  }

  const getEvolutions = async (evo) => {
    await api.get(evo)
      .then(async (response) => {
            const res = response.data
            let evolutions = res.chain.species.url.replace('-species', '')
            evolutions += processEvolutions(res.chain)
            setEvolution(evolutions)
            let help = evolutions.split(' ')
            let listEvo = []
            help.forEach(ep => {
              if(ep !== ''){
                listEvo.push({url: ep})
              }
            })
            setListEvolutions(listEvo)
        })
  }

  const processEvolutions = (evo) => {
    let res = " ";
    if(evo.evolves_to.length > 0){
      res += evo.evolves_to[0].species.url.replace('-species', '')
      console.log(res)
      return res + ' ' + processEvolutions(evo.evolves_to[0])
    }else{
      return res
    }
  }

  return (
    <Container className='mt-3'>
      <Row>
        <Col className='mt-3 bm-3'>
          <CardBody className='mt-3'>
            <Row>
              <Col className='text-end'>
                <Link to='/pokemons' className='btn btn-primary'>
                  <i className='fa-solid fa-home'></i>
                </Link>
              </Col>
            </Row>
            {loadClass === '' ? (
              <Row className={loadClass}>
                <Col md='6'>
                  <CardImg src={img} alt='loading' className='w-100' />
                </Col>
              </Row>
            ) : (
            <Row className={cardClass}>
              <Col md='6'>
                <CardImg src={imagen} alt={pokemon.name} className='w-100 img-fluid animate__animated animate__bounceInRight card-hover' />
              </Col>
              <Col md='6'>
                <CardBody className='text-capitalize'>
                  <CardText className='text-capitalize'>
                    <b><div>{pokemon.name}</div></b>
                  </CardText>
                  <CardText>{description}</CardText>
                  <CardText className='fs-5'>
                  <b>Altura:</b> {pokemon.height / 10} m <br/>
                  <b>Peso: </b>{pokemon.weight / 10} kg
                  </CardText>
                  <CardText>
                    <b>Tipo:</b>&nbsp;
                    {types.map((type, index) => (
                      <Badge key={index} pill color='danger' className='me-1' style={{padding: '9px'}}>
                        {type}
                      </Badge>
                    ))}
                  </CardText>
                  <CardText>
                  <b>Hábitat: </b>{habitat}
                  </CardText>
                  <CardText>
                  <b>Habilidades:&nbsp;</b>
                      {abilities.map((ability, index) => (
                      <Badge key={index} pill color='primary' className='me-1' style={{padding: '9px'}}>
                        {ability}
                      </Badge>
                    ))}
                  </CardText>
                </CardBody>
              </Col >
              <Col md='12'>
               <CardText className='text-center fs-4'>
                    <b>Estadisticas:</b>
                    {stats.map((stat, index) => (
                      <Row key={index}>
                        <Col xs='6' md='3'>
                          {stat.name}
                        </Col>
                        <Col xs='6' md='3'>
                          <Progress className='my-2' value={stat.base} max='100' >{stat.base}</Progress>
                        </Col>
                      </Row>
                    ))}
                </CardText>
              </Col>
              <Col md='12'>
                <CardText className='text-center fs-4'>
                  <b>Cadena de evolución:</b>
                </CardText>
              </Col>
              {listEvolutions.map((evo, index) => (
                <Row key={index}>
                  <Col md='12'>
                  <PokeCard key={index} pokemon={evo} />
                  </Col>
                </Row>
              ))}
            </Row >
            )}
          </CardBody >
        </Col >
      </Row >
    </Container >
  )
}

export default Detail