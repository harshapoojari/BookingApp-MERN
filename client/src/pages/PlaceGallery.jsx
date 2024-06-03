import { useState } from "react";
export default function PlaceGallery({place})
{
    const [showPhotos,setShowPhotos]=useState(false);
    if(showPhotos)
    return (
        <div  className="absolute  bg-black inset-0 min-w-full  min-h-screen">
            <div className="p-8 grid gap-4 bg-black">
                 <div>
                <h2 className="text-3xl text-white mb-2">Photos of {place.title}</h2>
                <button onClick={()=>setShowPhotos(false)} className=" fixed right-8 top-4 bg-gray-200 pr-4 pl-1 py-2 mb-2 rounded-full"> <span className="rounded-2xl bg-black text-white px-3 py-1">X</span> Close photos</button>
            </div>
         {place?.photos?.length>0 && place.photos.map(photo=>(
            <div>
        <img className="rounded-3xl mb-3 ml-96" src={'http://127.0.0.1:3000/uploads/'+photo} alt=""/>
        </div>
       ))}
    </div>
    </div>
    )
    return(
        // gap-2 grid-cols-[2fr_1fr]
        <div className="relative">
            <div className="grid gap-3 grid-cols-[1fr_1fr_1fr] ">
            <div>
                {place.photos?.[0] && (
                   
                    <img className="rounded-2xl  object-cover h-full w-full" src={'http://127.0.0.1:3000/uploads/'+place.photos[0]} alt="" />

                )
              }
            </div>
            <div className="">
              {place.photos?.[1] && (
                
                  <img className=" rounded-2xl   object-cover h-full w-full" src={'http://127.0.0.1:3000/uploads/'+place.photos[1]} alt="" />)
              }
            </div>
            <div className="grid gap-3 grid-cols-[3fr-1fr]">
            <div className="">
              {place.photos?.[2] && (
                    <img className=" rounded-2xl  object-cover relative h-80 w-full" src={'http://127.0.0.1:3000/uploads/'+place.photos[2]} alt="" />
                )}
              </div>
                <div className="overflow-hidden">
              {place.photos?.[3] && (
                    <img className=" rounded-2xl object-cover relative  h-80 w-full" src={'http://127.0.0.1:3000/uploads/'+place.photos[3]} alt="" />
                )}    
           
              </div>
            </div>
              
           
           </div>
           <button onClick={()=>setShowPhotos(true)} className=" flex  gap-1 absolute bottom-2 right-2 px-4 py-2 rounded-2xl shadow shadow-md shadow-gray-500 bg-white">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                   </svg>
                   
            Show more photos</button>
        </div>
    )
}