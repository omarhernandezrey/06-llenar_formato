let filaActualLubricacion = 1;
let filaActualPerforacion = 1;

function agregarFila(formulario) {
  const tableBody = formulario === 'lubricacion' ? document.getElementById("table-body-lubricacion") : document.getElementById("table-body-perforacion");
  const nuevaFila = `
    <tr>
      <td>${formulario === 'lubricacion' ? filaActualLubricacion : filaActualPerforacion}</td>
      <td><input type="time" name="hora"></td>
      <td><input type="number" name="agua"></td>
      <td><input type="number" name="polimero"></td>
      <td><input type="number" name="bentonita"></td>
      <td><input type="number" name="viscosidad"></td>
      <td><input type="number" name="densidad"></td>
      ${formulario === 'perforacion' ? `<td><input type="number" name="contenidoArena"></td>` : ''}
    </tr>
  `;
  tableBody.insertAdjacentHTML("beforeend", nuevaFila);

  if (formulario === 'lubricacion') {
    filaActualLubricacion++;
  } else {
    filaActualPerforacion++;
  }
}

function calcularResultados(formulario) {
  const tableBody = formulario === 'lubricacion' ? document.getElementById("table-body-lubricacion") : document.getElementById("table-body-perforacion");
  const filas = tableBody.querySelectorAll("tr");
  let resultados = [];

  filas.forEach((fila, index) => {
    const idFila = index + 1;
    const inputs = fila.querySelectorAll("input");
    const hora = inputs[1].value || '00:00'; // Valor predeterminado en caso de que no se ingrese hora
    const aguaLitros = parseFloat(inputs[2].value) || 0;
    const polimero = parseFloat(inputs[3].value) || 0;
    const bentonita = parseFloat(inputs[4].value) || 0;
    const viscosidad = parseFloat(inputs[5].value) || 0;
    const densidad = inputs.length > 6 ? parseFloat(inputs[6].value) || 0 : 0;
    const aguaMetrosCubicos = aguaLitros / 1000;
    const resultadoPolimero = polimero * idFila;
    const resultadoBentonita = bentonita * idFila;
    const resultadoViscosidad = viscosidad * idFila;
    const resultadoDensidad = densidad * idFila;
    const resultadoTotal = aguaMetrosCubicos + resultadoPolimero + resultadoBentonita + resultadoViscosidad + resultadoDensidad;
    const contenidoArena = formulario === 'perforacion' ? (inputs.length > 7 ? parseFloat(inputs[7].value) || 0 : 0) : 0;

    resultados.push({
      idFila,
      hora,
      aguaMetrosCubicos,
      resultadoPolimero,
      resultadoBentonita,
      resultadoViscosidad,
      resultadoDensidad,
      contenidoArena,
      resultadoTotal
    });
  });

  mostrarResultados(resultados, formulario);
}

function mostrarResultados(resultados, formulario) {
  const tablaResultadosBody = formulario === 'lubricacion' ? document.getElementById("resultados-lubricacion-body") : document.getElementById("resultados-perforacion-body");
  let resultadosHTML = '';

  resultados.forEach((resultado) => {
    resultadosHTML += `
      <tr>
        <td>${resultado.idFila}</td>
        <td>${resultado.hora}</td>
        <td>${resultado.aguaMetrosCubicos.toFixed(2)}</td>
        <td>${resultado.resultadoPolimero.toFixed(2)}</td>
        <td>${resultado.resultadoBentonita.toFixed(2)}</td>
        <td>${resultado.resultadoViscosidad.toFixed(2)}</td>
        <td>${resultado.resultadoDensidad.toFixed(2)}</td>
        ${formulario === 'perforacion' ? `<td>${resultado.contenidoArena.toFixed(2)}</td>` : ''}
        <td>${resultado.resultadoTotal.toFixed(2)}</td>
      </tr>
    `;
  });

  tablaResultadosBody.innerHTML = resultadosHTML;
}
