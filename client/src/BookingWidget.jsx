import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";
import {UserContext} from './UserContext'
export default function BookingWidget({place})
{
     
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [numberOfGuests,setNumberOfGuests]=useState(1);
    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
    const [redirect,setRedirect]=useState('');

     const {user}=useContext(UserContext);
     useEffect(()=>{
        if(user)
        setName(user.name)
        if(checkIn && checkOut && !user)
        {
            alert("Please Login to Book Place");
            setCheckIn('');
            setCheckOut('');
        }
       
        
     },[user,checkIn,checkOut])
    let numberOfNights=0;
    if(checkIn && checkOut)
    {
        numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    }
    
   async function bookThisPlace()
    {
    
       const response= await axios.post('/bookings',{checkIn,checkOut,numberOfGuests,name,mobile,
            place:place._id,
            price:numberOfNights*place.price*numberOfGuests})
       
        const bookingId=response.data._id;
        setRedirect('/account/bookings/'+bookingId);

    }

    if(redirect)
   return <Navigate to={redirect}/>

    return(
    <div className="px-2 mt-4">
    <div className="bg-white rounded-2xl shadow py-1">
        <div className="text-2xl text-center mt-2">
        Price: ₹{place.price} /night
        </div>
       <div className="m-4 border rounded-2xl">
        <div className="flex">
        <div className=" px-4 py-3">
            <label>Check-in:</label>
            <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}/>
        </div>
        <div className="  px-4 py-3 border-l">
            <label>Check-out:</label>
            <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
        </div>
        </div>
       
       <div className="border-t  px-4 py-3">
        <label>Number of Guests:</label>
        <input type="number" value={numberOfGuests} onChange={ev=>setNumberOfGuests(ev.target.value)}/>
       </div>

       {checkIn && checkOut &&user &&(
        <div>
                 <div className="border-t  px-4 py-3">
                 <label>Your Full Name:</label>
                 <input type="text" value={name} onChange={ev=>setName(ev.target.value)}/>
                </div>
                <div className="border-t  px-4 py-3">
                 <label>Phone Number(+91):</label>
                 <input type="text" value={mobile} onChange={ev=>setMobile(ev.target.value)}/>
                </div>
               </div>
       )}
       
       
       </div>
        
        <div className="m-4">
        <button onClick={bookThisPlace} className="primary">Book this for 
        {numberOfNights>0 && (<span> ₹{numberOfNights*place.price*numberOfGuests }</span>)}
     
        </button>
        </div>
      
    </div>
    </div>)
}