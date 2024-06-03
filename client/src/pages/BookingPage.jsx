import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import PlaceGallery from "./PlaceGallery";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns/fp";
export default function BookingPage()
{
    const {id}=useParams();
    const [booking,setBooking]=useState(null);

    useEffect(()=>{
        if(id)
        {
            axios.get('/bookings').then(response=>{
                const foundBooking=response.data.find(({_id})=> _id===id)
                if(foundBooking)
                setBooking(foundBooking);
            })
        }
    
    },[id])

    if(!booking)
    return '';
    return(
    <div>
      <h2 className="text-4xl pt-2 mt-4"> {booking.place.title}</h2>
      <a className="mt-2 flex mb-2 block font-semibold underline text-xl" target='_blank' href={'https://maps.google.com/?='+booking.place.address}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>

        {booking.place.address}</a>
        <div className="bg-gray-200 p-4 rounded-2xl my-4 py-6">
            <h2 className="text-2xl">Your booking information:</h2>

             <div className="flex mt-4 gap-2 items-center justify-between">
                <div className="flex gap-2 text-xl">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                   </svg>
                   <h3 className="">{differenceInCalendarDays(new Date(booking.checkIn),new Date(booking.checkOut))} nights: </h3>

                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                   </svg>
                   {format(new Date(booking.checkIn),"yyyy-MM-dd")} &rarr;
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                   </svg>
                   {format(new Date(booking.checkOut),"yyyy-MM-dd")}
                </div>

                <div className="bg-primary rounded-2xl text-white p-6 text-xl">
                     Total Price<br/>₹{booking.price}
                </div>
             </div>
        </div>

        <PlaceGallery place={booking.place}/>
</div>)
}

