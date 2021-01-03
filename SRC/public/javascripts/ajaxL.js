document.querySelector('#boton').addEventListener('click', traerDatos);
let lugaresInfo = []




function traerDatos() {
  const xhttp = new XMLHttpRequest();


  xhttp.open('GET','http://localhost:3000/users/visor/j', true);

  


  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {

      let datos = JSON.parse(this.responseText);
      console.log(datos);


      for (let item of datos) {
        console.log(item.marca);
       
        let lugarInfo = {
          posicion: { lat: item.latitud, lng: item.longitud },
          nombre: item.marca
        }


        lugaresInfo.push(lugarInfo);
      }
    }
  }

xhttp.send();


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(usuarioUbicacion => {
      let ubicacion = {
        lat: usuarioUbicacion.coords.latitude,
        lng: usuarioUbicacion.coords.longitude
      }
      dibujarMapa(ubicacion)
    })
  }
}



const dibujarMapa = (obj) => {
  let Mapa = new google.maps.Map(document.getElementById('container'), {
    center: obj,
    zoom: 7
  })

  let marcadorUsuario = new google.maps.Marker({
    position: obj,
    title: 'Tu ubicacion'
  })



  let marcadores = lugaresInfo.map(lugar => {
    return new google.maps.Marker({
      position: lugar.posicion,
      title: lugar.nombre,
      map: Mapa
    })
  })
}



