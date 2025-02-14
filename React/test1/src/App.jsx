import React from 'react'
import Demo from './Demo.jsx'
import Card from './Card.jsx'
import Navbar from './Navbar.jsx'

const App = () => {
  const cardsData=[
    {
      title:'Card1',
      text:'This is a first card',
      customClass:'bg-green-400'
    },
    {
      title:'Card2',
      text:'This is a Second card',
      customClass:'bg-blue-400'
    },
    {
      title:'Card3',
      text:'This is a Third card',
      customClass:'bg-red-400'
    },
  ];
  return (
    <>
    
    <Demo />
    <Navbar />
    {
      cardsData.map((card,index)=>(
        <Card key={index}
        title={card.title}
        text={card.text}
        customClass={card.customClass} />
      ))
    }
    
    </>
  )
}

export default App