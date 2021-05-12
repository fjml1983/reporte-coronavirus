
var globalConfirmados = document.querySelector('#global-confirmados');
var globalMuertos = document.querySelector('#global-muertos');
var mexicoActivos = document.querySelector('#mexico-activos');
var tituloPrincipal = document.querySelector('#titulo-principal');
var subtitulo = document.querySelector('#subtitulo');

var datosGrafico = {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Datos COVID-19'
  },
  xAxis: {
      categories: []//['México', 'E.U.', 'Canada']
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
};


document.addEventListener('DOMContentLoaded', function () {
    console.log("¡Estamos en vivo!");
    updateCovidData();

    animateText(tituloPrincipal,1,32,"pt",1000);
    animateText(subtitulo,1,18,"pt",1000);
});


function updateCovidData(){
    var url="https://covid-api.mmediagroup.fr/v1/cases"

    fetch(url).then(function(response){
        response.json().then(function(json){
          
            console.log(json);
            console.log(json.Global.All.confirmed);
            //globalConfirmados.textContent = json.Global.All.confirmed;
            //globalMuertos.textContent = json.Global.All.deaths;
            //mexicoActivos.textContent = json.Mexico.All.confirmed - json.Mexico.All.recovered;           
            animateValue(globalConfirmados,0,json.Global.All.confirmed,1000);
            animateValue(globalMuertos,0,json.Global.All.deaths,1000);
            animateValue(mexicoActivos,0,(json.Mexico.All.confirmed - json.Mexico.All.recovered),1000);

            /*
            datosGrafico.xAxis.categories.push("México");
            datosGrafico.series[0].data.push(json.Global.All.confirmed-json.Global.All.recovered-json.Global.All.deaths);
            datosGrafico.series[1].data.push(json.Global.All.recovered);
            datosGrafico.series[2].data.push(json.Global.All.deaths);
            */

            for(var key in json){
              if(json.hasOwnProperty(key)){
                console.log(json[key]);
                console.log(json[key].All.country);
                console.log(json[key].All.confirmed);
                console.log(json[key].All.recovered);
                console.log(json[key].All.deaths);
                if(json[key].All.deaths > 50000){
                  datosGrafico.xAxis.categories.push(json[key].All.country);
                  datosGrafico.series[0].data.push(json[key].All.confirmed-json[key].All.recovered-json[key].All.deaths);
                  datosGrafico.series[1].data.push(json[key].All.recovered);
                  datosGrafico.series[2].data.push(json[key].All.deaths);
                }
              }
            }

            Highcharts.chart('grafico', datosGrafico);
        })
    });

}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = new Intl.NumberFormat("es-MX", {maximumFractionDigits:2})
                        .format(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
}

  function animateText(obj, startSize, endSize, unit, duration){
    let startTimestamp = null;
    const stepAnimateText = (timestamp) => {
      if(!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration,1);
      const size = Math.ceil(progress * (endSize - startSize) + startSize);

      const customStyle = {'font-size': size+unit, 'color': 'blue'};
      Object.assign(obj.style,customStyle);

      if (progress < 1) {
        window.requestAnimationFrame(stepAnimateText);
      }
    }

    window.requestAnimationFrame(stepAnimateText);
  }

