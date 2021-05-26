
/*  REMOVER ESTE COMENTARIO PARA UTILIZAR WEBPACK

//CSS a utilizar, pero que quede embebido.
require('./index.css');
*/

var globalConfirmados = document.querySelector('#global-confirmados');
var globalMuertos = document.querySelector('#global-muertos');
var mexicoActivos = document.querySelector('#mexico-activos');
var tituloPrincipal = document.querySelector('#titulo-principal');
var subtitulo = document.querySelector('#subtitulo');
var btnEnviar = document.querySelector('#btnEnviar');
var txtEmail = document.querySelector('#email');
var txtMensaje = document.querySelector('#mensaje');

var estadosMXcodes = {
  Aguascalientes:'mx-ag',
  'Baja California':'mx-bc',
  'Baja California Sur':'mx-bs',
  Campeche:'mx-cm',
  Chiapas:'mx-cs',
  Chihuahua:'mx-ch',
  'Ciudad de Mexico':'mx-df',
  Coahuila:'mx-co',
  Colima:'mx-cl',
  Durango:'mx-dg',
  Guanajuato:'mx-gj',
  Guerrero:'mx-gr',
  Hidalgo:'mx-hg',
  Jalisco:'mx-ja',
  Mexico:'mx-mx',
  Michoacan:'mx-mi',
  Morelos:'mx-mo',
  Nayarit:'mx-na',
  'Nuevo Leon':'mx-nl',
  Oaxaca:'mx-oa',
  Puebla:'mx-pu',
  Queretaro:'mx-qt',
  'Quintana Roo':'mx-qr',
  'San Luis Potosi':'mx-sl',
  Sinaloa:'mx-si',
  Sonora:'mx-so',
  Tabasco:'mx-tb',
  Tamaulipas:'mx-tm',
  Tlaxcala:'mx-tl',
  Veracruz:'mx-ve',
  Yucatan:'mx-yu',
  Zacatecas:'mx-za'
};

var dataCovidMexico = [
  /*
    ['mx-3622', 0],
    ['mx-bc', 1],
    ['mx-bs', 2],
    ['mx-so', 3],
    ['mx-cl', 4],
    ['mx-na', 5],
    ['mx-cm', 6],
    ['mx-qr', 7],
    ['mx-mx', 8],
    ['mx-mo', 9],
    ['mx-df', 10],
    ['mx-qt', 11],
    ['mx-tb', 12],
    ['mx-cs', 13],
    ['mx-nl', 14],
    ['mx-si', 15],
    ['mx-ch', 16],
    ['mx-ve', 17],
    ['mx-za', 18],
    ['mx-ag', 19],
    ['mx-ja', 20],
    ['mx-mi', 21],
    ['mx-oa', 22],
    ['mx-pu', 23],
    ['mx-gr', 24],
    ['mx-tl', 25],
    ['mx-tm', 26],
    ['mx-co', 27],
    ['mx-yu', 28],
    ['mx-dg', 29],
    ['mx-gj', 30],
    ['mx-sl', 31],
    ['mx-hg', 32]
*/
];
var configMapaMexico = {
  chart: {
      map: 'countries/mx/mx-all'
  },

  title: {
      text: 'Casos confirmados en México'
  },

  subtitle: {
      text: 'Mapa origen: <a href="http://code.highcharts.com/mapdata/countries/mx/mx-all.js">Mexico</a>'
  },

  mapNavigation: {
      enabled: true,
      buttonOptions: {
          verticalAlign: 'bottom'
      }
  },

  colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: '#FF6347'
  },

  series: [{
      data: dataCovidMexico,
      name: 'Casos COVID-19',
      states: {
          hover: {
              color: '#F08080'
          }
      },
      dataLabels: {
          enabled: true,
          format: '{point.name}'
      }
  }]
};

var paises = []; //también se puede especificar los valores mediante una variable
var datosGrafico = {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Casos COVID-19 en el mundo'
  },
  xAxis: {
      categories: paises//['México', 'E.U.', 'Canada']
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
    updateCovidMexicoMapData();

    animateText(tituloPrincipal,1,32,"pt",1000);
    animateText(subtitulo,1,18,"pt",1000);
});

btnEnviar.addEventListener('click', async function(event){

  //VALIDACIÓN
  //https://developer.mozilla.org/es/docs/Learn/Forms/Form_validation
  if (!email.validity.valid) {
    alert("¡Se esperaba una dirección de correo electrónico!");
    return;
  }

  if (!mensaje.validity.valid) {
    alert("¡Cuéntanos algo, no dejes el mensaje vacío!");
    return;
  }
  
  event.preventDefault();
  btnEnviar.disabled = true;

  var url="http://localhost:8090/api/contacto/guardar";
  var data={"email": email.value, "mensaje": mensaje.value};

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
       'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer-when-downgrade', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  console.log(response.json());

  if(response.ok){
    alert("Se ha registrado correctamente tu email y mensaje.");
  }else{
    alert("Ocurrió un problema al realizar tu registro, Intenta mast tarde");
  }
} );

function updateCovidData(){
    var url="https://covid-api.mmediagroup.fr/v1/cases"

    fetch(url).then(function(response){
        response.json().then(function(json){
          
            //console.log(json);
            //console.log(json.Global.All.confirmed);
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
               /* console.log(json[key]);
                console.log(json[key].All.country);
                console.log(json[key].All.confirmed);
                console.log(json[key].All.recovered);
                console.log(json[key].All.deaths);*/
                if(json[key].All.deaths > 50000){
                  paises.push(key);
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

function updateCovidMexicoMapData(){
  var url="https://covid-api.mmediagroup.fr/v1/cases?country=Mexico";

  fetch(url).then(function(response){
      response.json().then(function(json){
      console.log(json);   
      
      //CARGAR DATOS DE MEXICO 
      for(var key in json){
        if(json.hasOwnProperty(key)){
           if(typeof estadosMXcodes[key] !== "undefined" ){
            dataCovidMexico.push([estadosMXcodes[key], json[key].confirmed]);
           }  
        }
      }

      Highcharts.mapChart('container-map-mx', configMapaMexico);      
    });
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

      const customStyle = {'font-size': size+unit};
      Object.assign(obj.style,customStyle);

      if (progress < 1) {
        window.requestAnimationFrame(stepAnimateText);
      }
    }

    window.requestAnimationFrame(stepAnimateText);
  }
