import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PlaceGallery from "./PlaceGallery";
export default function PlacePage()
{
    const {id}=useParams();
    const [place,setPlace]=useState(null);
   

    useEffect(()=>{
               axios.get('/places/'+id).then(response=>{
                setPlace(response.data);
               })
    },[id])
    if(!place)
    return '';

 
    
    return(<div className="bg-gray-100 mt-4 -m-8 py-4 px-8">
        <h1 className="text-3xl font-semibold">{place.title}</h1>
      <a className="mt-2 flex mb-2 block font-semibold underline" target='_blank' href={'https://maps.google.com/?='+place.address}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>

        {place.address}</a>

        <PlaceGallery place={place}/>

        <div className="mt-8 gap-2 grid  grid-cols-1 md:grid-cols-[2fr_1fr]">
      
            <div>
                   <div className="my-4">
                   <h1 className="font-semibold text-3xl">Description</h1>
                   <p>{place.description}</p>
                   </div>
                   Check-in: {place.checkIn}<br/>
                   Check-out: {place.checkOut}<br/>
                   Max number of guests: {place.maxGuests}
                  
            </div>
              <BookingWidget place={place}/>
            
            </div>
                  <div className="bg-white -mx-8 px-8 mt-6 py-4 mb-4">
                   <h2 className="font-semibold text-3xl">Extra Info</h2>
                   {place.extraInfo}
                   </div>
        </div>
    )
}