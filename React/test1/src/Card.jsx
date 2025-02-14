import React, { useState } from 'react'

const Card = ({title,text,customClass}) => {
    const [likes,setLike]=useState(0)
    const [titlecolor,setTitlecolor]=useState('text-black');
    
    const toggleTitlecolor=()=>{
        setTitlecolor((prevColor)=>
        prevColor==='text-black'?'text-blue-500':"text-black"
        );
    }
    
  return (
    <div className={`max-w-sm rounded overflow-hidden shadow-lg p-6  ${customClass}`}>
    <h2 className={`font-bold text-xlmb-2 ${titlecolor}`}>
    {title}
    </h2>
    <p className='text-gray-700 text-base'>
        {text}
    </p>
    <button 
    className='mt-4 py-2 bg-green-600 text-white rounded hover:bg-purple-700' onClick={()=>setLike(likes+1)}>
     Likes:{likes}   
    </button>
    <button
    className='mt-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 hover:bg-blue-500' onClick={toggleTitlecolor}>
        Toggle Title Color
    </button>
    </div>
  )
}


export default Card