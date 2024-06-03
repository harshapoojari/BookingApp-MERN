import { Link } from "react-router-dom"
import Header from "../Header"
import axios from "axios";
import { useEffect, useState } from "react"
 function IndexPage()
{
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        axios.get('/places').then(response=>{
          
            setPlaces([...response.data]);
            
        })
    },[])
    return (
    <div  className="gap-6 gap-y-8 mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
       {places.length>0 && places.map(place=>(
        <Link to={'/place/'+place._id}>
         <div className="bg-gray-500 mb-2 rounded-2xl ">
          {place.photos.length>0
          &&
          <img  className="h-100 w-100 rounded-2xl object-cover aspect-square" src={'http://localhost:3000/uploads/'+place.photos[0]}/>
         }
          
          </div>
          <h3 className="font-bold">{place.address}</h3>
          <h3 className="text-sm text-gray-500 ">{place.title}</h3>
          <p ><span className="font-bold">{place.price}</span> Rs per night</p>
          </Link>)

       )} 
    </div>)
}

export default IndexPage