//Funcion para generar un numero aleatorio

function generarExponenteAleatorio() {
    const exponente = Math.floor(Math.random() * 9) + 1;
    return exponente;
}

//Funcion para asignar exponentes

function asignarExponente() {

    var n1 = generarExponenteAleatorio();
    var n2 = generarExponenteAleatorio();
    var n3 = generarExponenteAleatorio();

    while(n1 == n2){
        n2 = generarExponenteAleatorio();
    }
    while(n2 == n3 || n1 == n3){
        n3 = generarExponenteAleatorio();
    }

    document.getElementById("p1").innerText = n1;
    document.getElementById("p2").innerText = n2;
    document.getElementById("p3").innerText = n3;

    document.getElementById("res1").value = "";
    document.getElementById("res2").value = "";
    document.getElementById("res3").value = "";
}

//Generamos los numeros aleatorios
asignarExponente()

//Funcion para calcular el resultado



function calcularResultados() { 

    //Generamos un nuevo contador 
    let contador = 0; 

    //Obtenemos las respuestas 
    var res1 = parseInt(document.getElementById("res1").value); 
    var res2 = parseInt(document.getElementById("res2").value); 
    var res3 = parseInt(document.getElementById("res3").value); 
    
    //Obtenemos los exponentes 
    let p1 = document.getElementById("p1").textContent; 
    let p2 = document.getElementById("p2").textContent; 
    let p3 = document.getElementById("p3").textContent; 
    
    //Calculamos las respuestas correctas 
    var respuestaCorrecta1 = 10 ** parseInt(p1); 
    var respuestaCorrecta2 = 10 ** parseInt(p2); 
    var respuestaCorrecta3 = 10 ** parseInt(p3); 
    
    //Mostramos los resultados en consola 
    console.log(respuestaCorrecta1) 
    console.log(respuestaCorrecta2) 
    console.log(respuestaCorrecta3)

    //Verificamos si las respuestas dadas coinciden con las respuestas correctas 
    if (res1 == respuestaCorrecta1){ 
        contador += 1 
    } 
    if (res2 == respuestaCorrecta2){ 
        contador += 1 
    } 
    if (res3 == respuestaCorrecta3){ 
        contador += 1 
    }

    switch(contador){
        case 1:
            document.getElementById("total").innerText = contador;
            document.getElementById("textoFinal").innerText = "Es un primer paso a algo mas grande, sigue adelante";
            break;
        case 2:
            document.getElementById("total").innerText = contador;
            document.getElementById("textoFinal").innerText = "Ya casi lo tienes, sigue intentandolo";
            break;
        case 3:
            document.getElementById("total").innerText = contador;
            document.getElementById("textoFinal").innerText = "Nota perfecta, felicidades";
            break;
        default:
            document.getElementById("total").innerText = contador;
            document.getElementById("textoFinal").innerText = "No te preocupes, siempre hay una segunda oportunidad";
            break;
    }
    
}


