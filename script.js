// Obtener los botones y los contenidos de los desplegables
var dropdownBtns = document.querySelectorAll('.dropbtn');
var dropdownContents = document.querySelectorAll('.dropdown-content');

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
      '1_a': (1000 * 672 * (10 * 20) / (40 * 60)),
      '1_b': (1000 * 672 * (15 * 20) / (40 * 60)),
      '1_c': (1000 * 672 * (20 * 20) / (40 * 60)),
      '1_d': (1000 * 672 * (15 * 25) / (40 * 60)),
      '1_e': (1000 * 672 * (20 * 25) / (40 * 60)),
      '1_f': (1000 * 672 * (15 * 30) / (40 * 60)),
      '1_g': (1000 * 672 * (20 * 30) / (40 * 60)),
      '1_h': (1000 * 672 * (25 * 30) / (40 * 60)),
      '1_i': (1000 * 672 * (30 * 30) / (40 * 60)),
      '1_j': (1000 * 672 * (30 * 40) / (40 * 60)),
      '1_k': (1000 * 672 * (35 * 40) / (40 * 60)),
      '1_l': (1000 * 672 * (40 * 40) / (40 * 60)),
      '1_m': (1000 * 672 * (40 * 50) / (40 * 60)),
      '1_n': (1000 * 672 * (40 * 60) / (40 * 60)),
      '2_a': (1000 * 900 * (10 * 20) / (40 * 60)),
      '2_b': (1000 * 900 * (15 * 20) / (40 * 60)),
      '2_c': (1000 * 900 * (20 * 20) / (40 * 60)),
      '2_d': (1000 * 900 * (15 * 25) / (40 * 60)),
      '2_e': (1000 * 900 * (20 * 25) / (40 * 60)),
      '2_f': (1000 * 900 * (15 * 30) / (40 * 60)),
      '2_g': (1000 * 900 * (20 * 30) / (40 * 60)),
      '2_h': (1000 * 900 * (25 * 30) / (40 * 60)),
      '2_i': (1000 * 900 * (30 * 30) / (40 * 60)),
      '2_j': (1000 * 900 * (30 * 40) / (40 * 60)),
      '2_k': (1000 * 900 * (35 * 40) / (40 * 60)),
      '2_l': (1000 * 900 * (40 * 40) / (40 * 60)),
      '2_m': (1000 * 900 * (40 * 50) / (40 * 60)),
      '2_n': (1000 * 900 * (40 * 60) / (40 * 60)),
      '3_a': (1000 * 450 * (10 * 20) / (40 * 60)),
      '3_b': (1000 * 450 * (15 * 20) / (40 * 60)),
      '3_c': (1000 * 450 * (20 * 20) / (40 * 60)),
      '3_d': (1000 * 450 * (15 * 25) / (40 * 60)),
      '3_e': (1000 * 450 * (20 * 25) / (40 * 60)),
      '3_f': (1000 * 450 * (15 * 30) / (40 * 60)),
      '3_g': (1000 * 450 * (20 * 30) / (40 * 60)),
      '3_h': (1000 * 450 * (25 * 30) / (40 * 60)),
      '3_i': (1000 * 450 * (30 * 30) / (40 * 60)),
      '3_j': (1000 * 450 * (30 * 40) / (40 * 60)),
      '3_k': (1000 * 450 * (35 * 40) / (40 * 60)),
      '3_l': (1000 * 450 * (40 * 40) / (40 * 60)),
      '3_m': (1000 * 450 * (40 * 50) / (40 * 60)),
      '3_n': (1000 * 450 * (40 * 60) / (40 * 60)),
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