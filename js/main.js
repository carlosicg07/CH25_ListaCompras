//-------------------Definimos Variables-------------------
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones")
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto")

//-------------------Funcionamiento de los botones (Agregar y Clear)-------------------

    // BTN Limpiar Campos
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    });


    // BTN Agregar 

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    //---Los dos renglones que siguen dejan el formato de error ocultos al inicio---
    alertValidacionesTexto.innerHTML = "";  //---Esto nos elimina el mensaje de error cada que hacemos un nuevo intento---
    alertValidaciones.style.display = "none";  //--Define el formato inicial como oculto y asi no muestra el error siempre---
   
    //-----Primero hay que Validar que hay datos-----
   
    //txtNombre.value = txtNombre.value.trim();     //---Para quitar los espacios que hay en blanco pero mejor usamos la otra forma con BLUR por eso se comentó---

    console.log("borde:", txtNombre.style.border);  //---Para obtener los datos del borde original---

    let lista = "Los siguientes campos deben ser llenados correctamente:<ul>"; //---Esta variable se crea para hacer la lista con mensajes de error---

    if (txtNombre.value.length==0){  //---si no hay caracteres en los campos entonces---
        txtNombre.style.border="solid thin red";  //---Borde de error---
        lista += "<li>Se debe escribir un nombre válido</li>";   //---Parte de la lista de error---
        alertValidaciones.style.display = "block";  //---Esto es para que salga el borde rojo de los mensajes de error---
    } else{
        txtNombre.style.border="";  //---Borde original---
    } // if txtNombre


    if (txtNumber.value.length==0){
        txtNumber.style.border="solid thin red";  //---Borde de error---
        lista += "<li>Se debe escribir una cantidad válida</li>";  //---Parte de la lista error---
        alertValidaciones.style.display = "block";  //---Esto es para que salga el borde rojo de los mensajes de error---
    } else{
        txtNumber.style.border=""; //---Borde original---
    } // if txtNumber
    lista += "</ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);  //---Esto termina de dar formato a la lista de error---
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


