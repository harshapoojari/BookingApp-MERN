import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

import AccountNav from "./AccountNav";
export default function AccountPage(){
    const {ready,user,setUser}=useContext(UserContext);
    const [redirect,setRedirect]=useState(null);
    let {subpage}=useParams();
    if(subpage===undefined)
    subpage='profile'

     async function logout()
     {
       await axios.post('/logout')
       setUser(null)
       setRedirect('/')
       
     }

     if(redirect)
     return <Navigate to={redirect}/>


     if(ready && !user && !redirect)
    return <Navigate to={'/login'}/>
     
    // if(user)
    return (<div>
        {/* Account Page for {user?.name} */}
        <AccountNav />
         {subpage==='profile' && (
        <div className="text-center mt-8 max-w-lg mx-auto">
        Logged in as {user.name} ({user.email})<br />
        <button onClick={logout} className="primary max-w-sm">Logout</button>
      </div>
       )}
        
        {subpage==='places' && (<PlacesPage/>)}
        
    </div>)
}