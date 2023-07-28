// app.js
let filaActualLubricacion = 1;
let filaActualPerforacion = 1;

function agregarFila(formulario) {
  const tableBody = formulario === 'lubricacion' ? document.getElementById("table-body-lubricacion") : document.getElementById("table-body-perforacion");
  const nuevaFila = `
    <tr>
      <td>${formulario === 'lubricacion' ? filaActualLubricacion : filaActualPerforacion}</td>
      <td><input type="text" name="hora"></td>
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

  filas.forEach((fila) => {
    const inputs = fila.querySelectorAll("input");
    const hora = inputs[1].value;
    const agua = parseFloat(inputs[2].value);
    const polimero = parseFloat(inputs[3].value);
    const bentonita = parseFloat(inputs[4].value);
    const viscosidad = parseFloat(inputs[5].value);
    const densidad = parseFloat(inputs[6].value);

    // Realiza los cálculos que necesites con los datos de cada fila
    // Por ejemplo, puedes realizar operaciones y mostrar los resultados
    // en otra columna de la tabla o en un mensaje aparte.
    // Si es el formulario de perforación, también puedes obtener el contenido de arena con inputs[7].value
  });
}
