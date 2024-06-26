// Obtener los botones y los contenidos de los desplegables
var dropdownBtns = document.querySelectorAll('.dropbtn');
var dropdownContents = document.querySelectorAll('.dropdown-content');
var addToCarritoButton = document.getElementById('addToCarrito');

// Cerrar todos los desplegables excepto el que se está abriendo
function cerrarDesplegables(exceptoEste) {
  dropdownContents.forEach(function(content) {
    if (content !== exceptoEste) {
      content.style.display = 'none';
    }
  });
}

// Iterar sobre los botones
dropdownBtns.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
        var content = dropdownContents[index];
        content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        cerrarDesplegables(content);
    });

    // Obtener las opciones de cada desplegable
    var options = dropdownContents[index].querySelectorAll('a');
    options.forEach(function(option) {
        option.addEventListener('click', function() {
            var selectedText = option.textContent;
            dropdownBtns[index].textContent = selectedText;
            dropdownContents[index].style.display = 'none';

            // Marcar la opción seleccionada y desmarcar las otras opciones
            options.forEach(function(opt) {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');

            // Obtener las opciones seleccionadas y calcular el resultado
            var opcion1 = dropdownContents[0].querySelector('.dropdown-content a.selected').getAttribute('data-value');
            var opcion2 = dropdownContents[1].querySelector('.dropdown-content a.selected').getAttribute('data-value');

            var resultado = calcularResultado(opcion1, opcion2);

            // Mostrar el resultado en el contenedor correspondiente
            document.getElementById('resultado').textContent = resultado;
        });
    });
});

// Cerrar el desplegable si se hace clic fuera de él
window.addEventListener('click', function(event) {
  dropdownBtns.forEach(function(btn, index) {
    var content = dropdownContents[index];
    if (!btn.contains(event.target) && !content.contains(event.target)) {
      content.style.display = 'none';
    }
  });
});

// Función para calcular el resultado según las opciones seleccionadas
function calcularResultado(opcion1, opcion2) {
  var resultados = {
      '1_a': (672 * (10 * 20) / (40 * 60)),
      '1_b': (672 * (15 * 20) / (40 * 60)),
      '1_c': (672 * (20 * 20) / (40 * 60)),
      '1_d': (672 * (15 * 25) / (40 * 60)),
      '1_e': (672 * (20 * 25) / (40 * 60)),
      '1_f': (672 * (15 * 30) / (40 * 60)),
      '1_g': (672 * (20 * 30) / (40 * 60)),
      '1_h': (672 * (25 * 30) / (40 * 60)),
      '1_i': (672 * (30 * 30) / (40 * 60)),
      '1_j': (672 * (30 * 40) / (40 * 60)),
      '1_k': (672 * (35 * 40) / (40 * 60)),
      '1_l': (672 * (40 * 40) / (40 * 60)),
      '1_m': (672 * (40 * 50) / (40 * 60)),
      '1_n': (672 * (40 * 60) / (40 * 60)),
      '2_a': (900 * (10 * 20) / (40 * 60)),
      '2_b': (900 * (15 * 20) / (40 * 60)),
      '2_c': (900 * (20 * 20) / (40 * 60)),
      '2_d': (900 * (15 * 25) / (40 * 60)),
      '2_e': (900 * (20 * 25) / (40 * 60)),
      '2_f': (900 * (15 * 30) / (40 * 60)),
      '2_g': (900 * (20 * 30) / (40 * 60)),
      '2_h': (900 * (25 * 30) / (40 * 60)),
      '2_i': (900 * (30 * 30) / (40 * 60)),
      '2_j': (900 * (30 * 40) / (40 * 60)),
      '2_k': (900 * (35 * 40) / (40 * 60)),
      '2_l': (900 * (40 * 40) / (40 * 60)),
      '2_m': (900 * (40 * 50) / (40 * 60)),
      '2_n': (900 * (40 * 60) / (40 * 60)),
      '3_a': (450 * (10 * 20) / (40 * 60)),
      '3_b': (450 * (15 * 20) / (40 * 60)),
      '3_c': (450 * (20 * 20) / (40 * 60)),
      '3_d': (450 * (15 * 25) / (40 * 60)),
      '3_e': (450 * (20 * 25) / (40 * 60)),
      '3_f': (450 * (15 * 30) / (40 * 60)),
      '3_g': (450 * (20 * 30) / (40 * 60)),
      '3_h': (450 * (25 * 30) / (40 * 60)),
      '3_i': (450 * (30 * 30) / (40 * 60)),
      '3_j': (450 * (30 * 40) / (40 * 60)),
      '3_k': (450 * (35 * 40) / (40 * 60)),
      '3_l': (450 * (40 * 40) / (40 * 60)),
      '3_m': (450 * (40 * 50) / (40 * 60)),
      '3_n': (450 * (40 * 60) / (40 * 60)),
  };

  var clave = opcion1 + '_' + opcion2;

  var resultado = resultados[clave];
  if (resultado !== undefined) {
      resultado = '$' + resultado;
  } else {
      resultado = 'No se ha definido un cálculo para estas opciones';
  }
  return resultado;
}

// Función para manejar el botón "Agregar al Carrito" para bolsas
document.addEventListener('DOMContentLoaded', () => {
  const addToCarritoButton = document.getElementById('addToCarrito');

  addToCarritoButton.addEventListener('click', function() {
      const selectedOption1 = document.querySelector('#dropdown1 .selected');
      const selectedOption2 = document.querySelector('#dropdown2 .selected');

      // Validar que se hayan seleccionado ambas opciones
      if (!selectedOption1 || !selectedOption2) {
          alert("Por favor, seleccione el tipo y la medida del producto.");
          return; // Detener la ejecución si no se seleccionaron ambas opciones
      }

      const opcion1 = selectedOption1.getAttribute('data-value');
      const opcion2 = selectedOption2.getAttribute('data-value');
      const productName = `Caja de bolsas de la medida ${selectedOption2.textContent.trim()} para ${selectedOption1.textContent.trim()}`;
      const productPrice = parseFloat(document.getElementById('resultado').textContent.replace('$', '').trim());

      // Actualizar los atributos del botón
      addToCarritoButton.setAttribute('data-product-id', `${opcion1}_${opcion2}`);
      addToCarritoButton.setAttribute('data-product-name', productName);
      addToCarritoButton.setAttribute('data-product-price', productPrice.toFixed(2));

      console.log('Producto agregado al carrito:', productName, productPrice);

      // Simular clic en el botón para delegar a carrito.js
      //addToCarritoButton.click();
  });
});

// DE ACA PARA ABAJO DE PARA LA PARTE DE PRODUCTOS Y EL PRECIO DEL DOLAR
// intente agregar el precio del dolar con una api para que se actualize solo dia por dia y poder dolarizar los precios, pero no logre hacerlo funcionar, dejo el codigo
// en la linea roja cuando estas en los productos deberia decir: Cargando el precio del dólar... hasta que funcione el codigo, lo cambio por a un precio de dolar fijo.


// document.addEventListener('DOMContentLoaded', function() {
//   // URL de la API de ejemplo (usando ExchangeRate-API)
//   const apiKey = 'd6cd65889b624e53ae110016b04dc26e'; // Reemplaza con tu API Key
//   const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

//   fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//           // Suponiendo que queremos obtener la tasa de USD a ARS (Peso Argentino)
//           const rate = data.conversion_rates.ARS;
//           document.getElementById('precio-dolar').innerText = `USD 1 = ARS ${rate}`;
//       })
//       .catch(error => {
//           console.error('Error al obtener el precio del dólar:', error);
//           document.getElementById('precio-dolar').innerText = 'No se pudo cargar el precio del dólar.';
//       });

//   const precioDolarBar = document.getElementById('precio-dolar-bar');
//   const footer = document.querySelector('footer');

//   window.addEventListener('scroll', function() {
//       const footerRect = footer.getBoundingClientRect();
//       const windowHeight = window.innerHeight;

//       if (footerRect.top <= windowHeight) {
//           precioDolarBar.style.position = 'static';
//           footer.classList.add('incorporate');
//       } else {
//           precioDolarBar.style.position = 'fixed';
//           precioDolarBar.style.bottom = '0';
//           footer.classList.remove('incorporate');
//       }
//   });
// });