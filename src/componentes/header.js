import React, { Component } from 'react'

export default class Header extends Component{
    render(){
        return(
            <header>
            <div className="virus virus-left"></div>
            <h1 id="titulo-principal" >Reporte Coronavirus</h1>
            <p id="subtitulo" >Una fuente r&aacute;pida de informaci&oacute;n sobre el COVID-19</p>
            <div className="virus virus-right"></div>
            </header>
        );
    }    
}