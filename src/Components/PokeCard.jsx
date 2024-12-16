import { useState,useEffect } from "react"
import axios from "axios"
import { Col, Card, CardBody,CardFooter,CardImg,Badge } from "reactstrap"
import { Link } from "react-router-dom"

const PokeCard = (params) => {
    const [pokemon, setPokemon] = useState({});
    const [imagen, setImagen]=useState('');
    useEffect(()=>{
        getPokemon();
    },[]);

    const getPokemon = async()=>{
        const urlApi = params.poke.url;
        axios.get(urlApi).then(async(Response)=>{
            const respuesta = Response.data;
            setPokemon(respuesta);
            if(respuesta.sprites.other.dream_world.front_default !=null){
                setImagen(respuesta.sprites.other.dream_world.front_default)
            }else{
                setImagen(respuesta.sprites.other['official-artwork'].front_default)
            }
        })
    };
    return (
        <Col sm="4" lg="3" className="mb-3">
            <Card className="shadow border-4 border-warnig">
                <CardImg src={imagen} height='150' className="p-2"/> 
                    <CardBody className="text-center">
                        <Badge pill color="danger">#{pokemon.id}</Badge>
                        <label className="fs-4 text-capitalize">{pokemon.name}</label>
                    </CardBody>
                    <CardFooter className="bg-warning">
                        <Link className="btn btn-dark"> 
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>Details
                        </Link>
                    </CardFooter>
            </Card>
        </Col>
      );
};

export default PokeCard;