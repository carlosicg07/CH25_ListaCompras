//-------------------Definimos Variables-------------------
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let tabla = document.getElementById("tablaListaCompras");   //---Aqui se trae la tabla del HTML para poder ingresar los datos---
let cuerpoTabla = tabla.getElementsByTagName("tbody");      //---Este paso es importante porque mete los datos en una parte específica de la tabla (Es necesario el paso de arriba para poder solo seleccionar esta tabla)---

let contadorProductos = document.getElementById("contadorProductos"); //---Variables de Resumen---
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;
let idTimeout;   //---Se da el id al setTimeout para generar una referencia y evitar errores---
let precio = 0;
let contador = 0;
let totalEnProductos = 0;
let costoTotal = 0;



//-------------------Funcionamiento de los botones (Agregar y Clear)-------------------

    // BTN Limpiar Campos
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    cuerpoTabla[0].innerHTML = "";

    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    
    contadorProductos.innerText = "0";
    productosTotal.innerText = "0";
    precioTotal.innerText = "$ 0";

    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));
    });




    // FUNCION validar cantidad
function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    } // if---si no hay caracteres en el campo es falso---

    if(isNaN(txtNumber.value)){
        return false;
    } // if---si no es un numero es falso---

    if (parseFloat(txtNumber.value)<=0){
        return false;
    } // if---si el valor del numero es 0 o menor es falso---

    return true;
};

    // FUNCION Get Precio   es para dar un numero random
function getPrecio(){
    return Math.floor(Math.random()*50 *100) /100;   //---Se hace esta operación para sacar un numero con 2 decimales, primero se da un numero, se pultiplica por 50 y ese es básicamente el número, despues se multipiica por 100 y se da el floor para quitar decimales y por último se divide entre 100 para dar 2 decimales---
};


    // BTN Agregar 

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    isValid = true;
    //console.log(getPrecio());  //---Aqui muestra el precio aleatorio en la consola para ver que es correcto en pruebas (pero no es necesario, por eso se comentó)---
    clearTimeout(idTimeout);   //---Esto cancela el timeout del mensaje de error cada que damos click en el boton---

    //---Los dos renglones que siguen dejan el formato de error ocultos al inicio---
    alertValidacionesTexto.innerHTML = "";  //---Esto nos elimina el mensaje de error cada que hacemos un nuevo intento---
    alertValidaciones.style.display = "none";  //--Define el formato inicial como oculto y asi no muestra el error siempre---
   
    //-----Primero hay que Validar que hay datos-----
   
    //txtNombre.value = txtNombre.value.trim();     //---Para quitar los espacios que hay en blanco pero mejor usamos la otra forma con BLUR por eso se comentó---

    //console.log("borde:", txtNombre.style.border);  //---Para obtener los datos del borde original en pruebas---

    let lista = "Los siguientes campos deben ser llenados correctamente:<ul>"; //---Esta variable se crea para hacer la lista con mensajes de error---

    if (txtNombre.value.length<2){  //---si no hay caracteres en los campos entonces---
        txtNombre.style.border="solid thin red";  //---Borde de error---
        lista += "<li>Se debe escribir un nombre válido</li>";   //---Parte de la lista de error---
        alertValidaciones.style.display = "block";  //---Esto es para que salga el borde rojo de los mensajes de error---
        isValid = false;
    } else{
        txtNombre.style.border="";  //---Borde original---
    } // if txtNombre


    if (! validarCantidad()){    //---Se agrega la funcion que valida el numero y tiene que dar falso para que el if se ejecute por eso ponemos un !---
        txtNumber.style.border="solid thin red";  //---Borde de error---
        lista += "<li>Se debe escribir una cantidad válida</li>";  //---Parte de la lista error---
        alertValidaciones.style.display = "block";  //---Esto es para que salga el borde rojo de los mensajes de error---
        isValid = false;
    } else{
        txtNumber.style.border=""; //---Borde original---
    } // if txtNumber
    lista += "</ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);  //---Esto termina de dar formato a la lista de error---

    idTimeout=setTimeout(function(){                   //---Toda esta función setTimeout permite que el mensaje de error desaparezca en un tiempo establecido---
    alertValidaciones.style.display = "none";          //---La función que se va a ocultar---
    }, 3000)                                               //---El tiempo asignado en milisegundos---
    if (isValid){                                       
    precio = getPrecio();                              //---Asigna el precio aleatorio---
    contador++;                         
    let row = `<tr>
                <th>${contador}</th>
                <td>${txtNombre.value}</td>
                <td>${txtNumber.value}</td>
                <td>$ ${precio}</td>
               </tr>`;      
    
    cuerpoTabla[0].insertAdjacentHTML("beforeend", row);    //---insertamos un renglon en la tabla---
    contadorProductos.innerText=contador;
    totalEnProductos += parseFloat(txtNumber.value);
    productosTotal.innerText=totalEnProductos;
    costoTotal += precio * parseFloat(txtNumber.value);     //---Multiplica el precio por el número de productos de todos los productos en la lista gracias al (+=)---
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;   //---Esto escribe en el campo correspondiente el precio total redondeado a 2 decimales---
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));
    txtNombre.value="";
    txtNumber.value="";
    txtNombre.focus();
    }
});

//---Estos dos parrafos a continuación sirven para eliminar espacios vacios al inicio o al final de los campos en caunto sales de ellos, asi evitar errores y poder validar correctamente---
txtNombre.addEventListener("blur",function(event){
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
}); // txtNombre BLUR

txtNumber.addEventListener("blur",function(event){
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
}); // txtNumber BLUR

window.addEventListener("load", function(event){                            //---Esto es para que al cargar la pagina de nuevo ejecute la acción que escribo abajo---
    if(localStorage.getItem("contadorProductos")==null){                    //---Este if hace que si no hay valor en el storage de contadorProductos se muestre un 0---
        localStorage.setItem("contadorProductos", "0");                   
    }    
    if(localStorage.getItem("totalEnProductos")==null){                    //---Este if hace que si no hay valor en el storage de totalEnProductos se muestre un 0---
        localStorage.setItem("totalEnProductos", "0");
    }   
    if(localStorage.getItem("costoTotal")==null){                          //---Este if hace que si no hay valor en el storage de costoTotal se muestre un 0---
        localStorage.setItem("costoTotal", "0.0");
    }                       

    contador = parseInt(localStorage.getItem("contadorProductos"));         //---Trae los datos almacenados en el local storage (contadorProductos, totalEnProductos, costoTotal)---
    totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
    costoTotal = parseFloat(localStorage.getItem("costoTotal"));
    
    contadorProductos.innerText = contador;                                 //---Muestra los valores almacenados (lo de arriba) en los campos asignados (lo de abajo)---
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal}`;
});