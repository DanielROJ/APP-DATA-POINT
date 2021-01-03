document.querySelector('#barras').addEventListener('click', HacerGrafica);
function HacerGrafica(){
  const xhttp = new XMLHttpRequest();
  
  
  
  xhttp.open('GET', 'http://localhost:3000/users/visor/j', true);
 
 
 xhttp.send();

 
 
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      let datos = JSON.parse(this.responseText);
      console.log(datos);
      let res = document.querySelector('#res');
      res.innerHTML= '';
     
      let cars = []
      for(let item of datos){
        cars.push(item.marca);
      }



      let coches = []
      let repeticiones = []
      var i=0;

      for (i = 0; i < cars.length; i++) {
        tmp=cars[i];
        if(coches.indexOf(tmp)<0){
    	     coches.push(tmp);
           repeticiones.push(1);
        }
        else{
    	     repeticiones[coches.indexOf(tmp)]+=1;
        }
      }
      for (i=0; i<coches.length;i++){
        res.innerHTML+=`
        <tr>
          <td>${coches[i]}</td>
          <td>${repeticiones[i]}</td>
        </tr>
        `
      }
    }
  }
}



document.querySelector('#nose').addEventListener('click', nose);
function nose(){
  Highcharts.chart('container', {
      data: {
          table: 'datatable'
      },
      chart: {
          type: 'column'
      },
      title: {
          text: 'Grafica de ventas'
      },
      yAxis: {
          allowDecimals: false,
          title: {
              text: 'Units'
          }
      },
      tooltip: {
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  this.point.y + ' ' + this.point.name.toLowerCase();
          }
      }
  });
}
