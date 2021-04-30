
var globalConfirmados = document.querySelector('#global-confirmados');
var globalMuertos = document.querySelector('#global-muertos');
var mexicoActivos = document.querySelector('#mexico-activos');


document.addEventListener('DOMContentLoaded', function () {
    console.log("¡Estamos en vivo!");
    updateCovidData();
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