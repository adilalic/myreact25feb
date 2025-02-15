import { useState } from "react";

import React from 'react'

import B from './B';




export default function A() {

    const [x, setX] = useState("RFC");


  return (
    <>
    <h1>A {x}</h1>
    <B name={x}/>
    </>
  )
}
