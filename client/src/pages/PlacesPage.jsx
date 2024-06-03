import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "./AccountNav";

export default function PlacesPage(){
    const [places,setPlaces]=useState([]);
useEffect(()=>{
    axios.get('/user-places').then(({data})=>{
        setPlaces(data);
    })
},[]);
    return(
    <div>
    <AccountNav />
     <div className="text-center mt-8">
     <Link className="inline-flex gap-1 bg-primary py-2 px-6 rounded-full text-white" to={'/account/places/new'}>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
       <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
       </svg>
         Add new places
         </Link>
    </div>
    
    <div className="mt-4">
        {places.length >0 && places.map(place=>(
             <Link to={'/account/places/'+place._id}className=" cursor-pointer flex gap-4 bg-gray-200 p-4 rounded-2xl mt-2">
                <div className=" flex bg-gray-300 h-32 w-32 rounded-xl">
                    {place.photos.length > 0 && (<img className="w-32 h-32 rounded-xl" src={'http://localhost:3000/uploads/'+place.photos[0]} alt="" />)}
                    
                </div>
                <div className="">
                <h2 className="text-xl">{place.title}</h2>
               <p className="">{place.description}</p>
                </div>
             
              
                </Link>))}
    </div>
    </div>)
}