import React from 'react'

import C from './C';


export default function B({name}) {


  return (
    <>
    <h1>B {name}</h1>
    
    <C name1={name}/>
    </>
  )
}
