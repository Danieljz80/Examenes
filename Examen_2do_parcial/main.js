document.addEventListener('DOMContentLoaded', function() {
  var boton = document.getElementById('boton')

  boton.addEventListener('click', function() {
      validaciones()
  })
})

function validaciones() {

  var campo_numerico = document.getElementById('amount').value
  var mensaje = document.getElementById('span1')
  var imagen = document.getElementById('imagen')

  // Establecer una imagen predeterminada
  imagen.src = "Monaschinas.jpg"
  mensaje.innerText = " "

  if (campo_numerico == "") {
      mensaje.innerText = "Eres menso? , ingresa algo jaja"
      // Cambiar la imagen en caso de error
      imagen.src = "error.jpg"

  } else {
      var bandera = isNaN(campo_numerico)

      if (bandera == true) {
          mensaje.innerText = "Escribiste letras , ¡¡¡son numeros menso!!!"
          // Cambiar la imagen en caso de error
          imagen.src = "error.jpg"
      } else {
          var numero = parseFloat(campo_numerico)
          if (numero <= 0) {
              mensaje.innerText = "Este numero no es valido , ponte pilas papi"
              // Cambiar la imagen en caso de error
              imagen.src = "error.jpg"
          } else {
              // Ejecutar la función para convertir la divisa
              convertirMoneda()
          }
      }
  }
}

function convertirMoneda() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  const apiKey = 'TU_CLAVE_API';
  const apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error de red - ${response.status}: ${response.statusText}`);
          }
          return response.json();
      })
      .then(data => {
          const exchangeRate = data.rates[toCurrency];
          const resultado = amount * exchangeRate;

          document.getElementById('resultado').textContent = `${amount} ${fromCurrency} es aproximadamente ${resultado.toFixed(2)} ${toCurrency}`;
      })
      .catch(error => {
          console.error('Error al recuperar datos:', error);
      });
}
