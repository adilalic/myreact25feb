import React from 'react'


import App from '../App.css'

import SubscribeForm from './SubscribeForm'





export default function Home() {
  return (
    <div>
      
<div className="jumbotron text-center">
    <h1>HomePage1</h1>
  <h1>Welcome to our first React APP</h1>
</div>
  
<div className="container">


<section className="newsletter">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="content">
                       
<SubscribeForm />



                    </div>
                </div>
            </div>
        </div>
    </section>
  
  <div className="row">
    <div className="col-sm-4">
      <h3>Column 1</h3>

      
    


      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
    <div className="col-sm-4">
      <h3>Column 2</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
    <div className="col-sm-4">
      <h3>Column 3</h3>        
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
  </div>
</div>

    </div>
  )
}
