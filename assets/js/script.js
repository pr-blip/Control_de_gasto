let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionGasto = [];
let posicionGastoModificado = -1; //Para rastrear que el elemnto está siendo modificado

//Esta función se invoca al momento de que el usuario hace clic en el botón
function clickBoton(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto =  document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    let poscionGastoModificado = document.getElementById('posicionGastoModificado').value;

    //Verifica si estamos modificando un gasto existente
    if( poscionGastoModificado == -1) {
        //si no estamos modificando, añadimos un nuevo gasto
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionGasto.push(descripcionGasto);
        
    } else { 
        //Si estamos modificando, actualizamos el gasto en la posición específica
        listaNombresGastos[poscionGastoModificado] = nombreGasto;
        listaValoresGastos[poscionGastoModificado] = valorGasto;
        listaDescripcionGasto[poscionGastoModificado] = descripcionGasto;
        
        //Reiniciamos el valor del campo oculto para futuras inserciones
        document.getElementById('posicionGastoModificado').value = -1;

        //Cambiamos el texto del botón de nuevo a "Agregar gasto"
        document.getElementById('botonGasto').textContent = 'Agregar gasto';
    }

    if (valorGasto > 150) {
        alert("Cuidado se ha generado una gasto mayor a 150$");
        
    }

    actualizarListaGasto();
}
function actualizarListaGasto() {
    const tablaElementos=document.getElementById('tablaDeGastos').getElementsByTagName('tbody')[0];
    
    let totalGastos = 0;
    tablaElementos.innerHTML = '';
    
    listaNombresGastos.forEach((elemento,posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = (listaDescripcionGasto[posicion]);
       
    let fila = `
        <tr>
            <td data-label="Nombre del gasto">${elemento}</td>
            <td data-label=" Descripción">${descripcionGasto}</td>
            <td data-label="Valor">USD ${valorGasto.toFixed(2)}</td>
            <td data-label="Acciones">
                <button onclick="eliminarGasto (${posicion});">Eliminar</button>
                <button onclick="modificarGasto (${posicion});">Modificar</button>
            </td>    
       </tr>
    `;
    tablaElementos.innerHTML += fila;
    totalGastos += Number(valorGasto);

    });
    const totalElementos = document.getElementById('totalGastos');
    //listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);

    //console.log(htmlLista);
    limpiar();
}

function limpiar() {
     document.getElementById('nombreGasto').value = '';
     document.getElementById('valorGasto').value = '';
     document.getElementById('descripcionGasto').value = '';

}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionGasto.splice(posicion, 1);
    actualizarListaGasto();
    
}

function modificarGasto(posicion) {
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionGasto[posicion];

    //Guardamos la posicion del gasto a modificar
    document.getElementById('posicionGastoModificado').value = posicion;

    //Cambiamos el texto del botón a "Guardar Gasto"
    document.getElementById('botonGasto').textContent = 'Guardar gasto';
    
}

    

