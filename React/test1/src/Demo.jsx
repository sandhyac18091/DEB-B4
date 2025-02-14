import React from 'react'

const Demo = () => {
    const name='john';
    const x=10;
    const y=15;
    const sum=x+y
    const names=['Ramu','sonu','gopu']
    const passed=true;
  return (
    <>
    <div className='text-5xl font-mono text-blue-500 font-bold'>App</div>
    <p>Hello {name}</p>
    <p>Sum is {sum}</p>
    <ul>
        {names.map((name,index)=>(
            <li key={index}>{name}</li>
        ))}
    </ul>
    {passed?<h1>You have passed</h1>:<h1>You have failed</h1>}
    </>
  )
}

export default Demo