import React from 'react'
import ReactDOM from 'react-dom'
import Header from './componentes/header'
import GraficoPaises from './componentes/grafico-paises'
require('./index.css');

ReactDOM.render(
  <body>
    <Header></Header> 
    <main class="row col-sm-1 col-md-1 col-2 container">
      <GraficoPaises></GraficoPaises>


    </main>
    
  </body>
  ,
  document.getElementById('app')
);