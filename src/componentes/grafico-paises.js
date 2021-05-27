import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class GraficoPaises extends Component{

    constructor(props){
        super(props);

        //establecer aquí nuestro estado
        this.state =                     {
            chartOptions : {          
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Casos COVID-19 en el mundo'
                },
                xAxis: {
                    categories: [] //['México', 'E.U.', 'Canada']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Valores'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    }
                },
                series: [{
                    name: 'Activos',
                    data: []
                }, {
                    name: 'Recuperados',
                    data: []
                }, {
                    name: 'Muertes',
                    data: []
                }]
            }
        };
    }

    render(){
        const { chartOptions } = this.state;

        return(
            <article class="container">
            <header>
                <h2>A la fecha existen <span id="global-confirmados" ></span> de casos confirmados de Coronavirus alrededor del mundo.</h2>
            </header>                
            {/*<!--Colocar aqu&iacute; mapa o grafico de reporte-->*/}
            <figure className="highcharts-figure">
            <div>
                <HighchartsReact 
                    highcharts={Highcharts} 
                    options={chartOptions} 
                />
            </div>
            </figure>            
            <main>
                <p>Desde la &uacute;ltima semana, se ha incrementado #,### casos en el mundo, o un #%</p>
            </main>
            </article>
        );
    }  
        
    componentDidMount() {
        var url="https://covid-api.mmediagroup.fr/v1/cases"

        fetch(url).then((response)=>{
            response.json().then((json)=>{
            
                //animateValue(globalConfirmados,0,json.Global.All.confirmed,1000);
                //animateValue(globalMuertos,0,json.Global.All.deaths,1000);
                //animateValue(mexicoActivos,0,(json.Mexico.All.confirmed - json.Mexico.All.recovered),1000);

                const paises = [], activos = [], recuperados = [], muertes = [];
                for(var key in json){
                    if(json[key].All.deaths > 50000){
                        paises.push(key);
                        activos.push(json[key].All.confirmed-json[key].All.recovered-json[key].All.deaths);
                        recuperados.push(json[key].All.recovered);
                        muertes.push(json[key].All.deaths);
                    }
                }

                this.setState(
                    {
                        chartOptions : {          
                            xAxis: {
                                categories: paises //['México', 'E.U.', 'Canada']
                            },
                            series: [{
                                name: 'Activos',
                                data: activos
                            }, {
                                name: 'Recuperados',
                                data: recuperados
                            }, {
                                name: 'Muertes',
                                data: muertes
                            }]
                        }
                    }
                );
            })
        });

    }
}