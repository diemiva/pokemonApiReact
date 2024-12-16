import { Container,Row,Col,InputGroup, InputGroupText, Input } from 'reactstrap'
import './index.css'
import axios from "axios"
import { useState, useEffect } from 'react'
import PokeCard from '../Components/PokeCard'
import { PaginationControl } from 'react-bootstrap-pagination-control'



const index = () => {
    const [pokemones, setPokemones] = useState([]);
    const [allPokemones, setAllPokemones]= useState([]);
    const [listado, setListado]= useState([]);
    const [filtro, setFiltro] = useState([]);
    const [offset, setOffset]= useState(0);
    const [limit, setLimit] = useState(20);
    const [total,setTotal]= useState(0);
    useEffect(()=>{
        getPokemones(offset);
        getAllPokemones();
    },[]);
    const getPokemones = async (offset) => {
        const urlApi= 'https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset;
        axios.get(urlApi).then(async(Response)=>{
            const respuesta = Response.data
            setPokemones(respuesta.results)
            setListado(respuesta.results)
            setTotal(respuesta.count)

        })
    }
    const getAllPokemones = async (o) => {
        const urlApi= ' https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
        axios.get(urlApi).then(async(Response)=>{
            const respuesta = Response.data
            setAllPokemones(respuesta.results)

        })
    }
    const buscar = async(e)=>{
        if(e.keyCode==13){
            if(filtro.trim()!=''){
                setListado([]);
                setTimeout(()=>{
                    setListado(allPokemones.filter(p=>p.name.includes(filtro)))
                },100)
            }
        }else if(filtro.trim()==''){
            setListado([]);
            setTimeout(()=>{
                setListado(pokemones);
            },100)
        }
    }
    const goPage = async(p) => {
        setListado([]);
        const newOffset = (p === 1) ? 0 : ((p - 1) * limit);
        setOffset(newOffset); // Actualiza el offset aquí
        await getPokemones(newOffset);
    }
  return (
    <Container className='shadow bg-dark mt-3 rounded'>
        <Row>
            <Col>
                <InputGroup className='mt-2 mb-2  shadow'>
                    <InputGroupText>
                        <i className='fa-solid fa-search'></i>
                    </InputGroupText>
                    <Input value={filtro} onChange={(e)=>{setFiltro(e.target.value)}} onKeyUpCapture={buscar} placeholder='Buscar un pokemon' ></Input>
                    
                </InputGroup>
            </Col>
        </Row>
        <Row>
            {listado.map((pok,i)=>(
                <PokeCard poke={pok} key={i}/>
            ))}
            <PaginationControl last={true} limit={limit} total={total} page={Math.floor(offset / limit) + 1} changePage={page=>goPage(page)}/>
        </Row>
    </Container>
  )
}

export default index