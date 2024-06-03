import axios from "axios";
import { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
export default function LoginPage()
{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUser}=useContext(UserContext);
    async function handleLoginSubmit(event)
    {
        event.preventDefault();
        try{
           const userInfo= await axios.post('/login',{email,password})
           setUser(userInfo.data)
            alert('Login Successfull')
            setRedirect(true)
        }catch(e){
            alert('Login failed')
        }
        
    }
    if(redirect===true)
    return <Navigate to={'/'}/>
    return(<div className="mt-4 grow flex items-center justify-around">
        <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="your@email.com"
                                   value={email}
                                   onChange={event=>setEmail(event.target.value)}/>
              <input type="password" placeholder="password"
                                     value={password}
                                      onChange={event=>setPassword(event.target.value)}/>
              <button className="primary">Login</button>
               <div className="mt-2 text-center text-gray-600">
                Don't have an account yet? <Link className=" underline text-blue-900" to={'/register'}>Register Now</Link>
              </div> 
        </form>
        </div>
        
    </div>);
}