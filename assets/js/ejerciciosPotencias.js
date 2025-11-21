// Generador de ejercicios de potencias

// Función para generar un número aleatorio entre min y max (inclusive)
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para calcular una potencia
function calcularPotencia(base, exponente) {
    return Math.pow(base, exponente);
}

// Función para generar un ejercicio de potencias
function generarEjercicio() {
    const tiposEjercicio = [
        'potencia-simple',
        'expresion-multiplicacion',
        'identificar-base-exponente'
    ];

    const tipo = tiposEjercicio[generarNumeroAleatorio(0, tiposEjercicio.length - 1)];

    let pregunta, respuestaCorrecta;

    switch (tipo) {
        case 'potencia-simple':
            const base = generarNumeroAleatorio(2, 10);
            const exponente = generarNumeroAleatorio(2, 5);
            pregunta = `Calcula ${base}<sup>${exponente}</sup>`;
            respuestaCorrecta = calcularPotencia(base, exponente);
            break;

        case 'expresion-multiplicacion':
            const baseMult = generarNumeroAleatorio(2, 8);
            const veces = generarNumeroAleatorio(3, 6);
            let expresion = '';
            for (let i = 0; i < veces; i++) {
                expresion += baseMult;
                if (i < veces - 1) expresion += '×';
            }
            pregunta = `¿Cuál es la forma de potencia de ${expresion}?`;
            respuestaCorrecta = `${baseMult}<sup>${veces}</sup>`;
            break;

        case 'identificar-base-exponente':
            const baseId = generarNumeroAleatorio(2, 12);
            const exponenteId = generarNumeroAleatorio(2, 4);
            const potencia = calcularPotencia(baseId, exponenteId);
            pregunta = `En la expresión ${baseId}<sup>${exponenteId}</sup> = ${potencia}, ¿cuál es la base?`;
            respuestaCorrecta = baseId;
            break;
    }

    // Generar opciones incorrectas
    const opcionesIncorrectas = [];
    while (opcionesIncorrectas.length < 3) {
        let opcionIncorrecta;

        if (typeof respuestaCorrecta === 'number') {
            // Para respuestas numéricas
            opcionIncorrecta = generarNumeroAleatorio(respuestaCorrecta - 10, respuestaCorrecta + 10);
            // Asegurarnos de que no sea igual a la respuesta correcta
            if (opcionIncorrecta === respuestaCorrecta) {
                opcionIncorrecta += generarNumeroAleatorio(1, 5);
            }
        } else {
            // Para respuestas de texto (expresiones de potencia)
            const baseIncorrecta = generarNumeroAleatorio(2, 10);
            const exponenteIncorrecto = generarNumeroAleatorio(2, 5);
            opcionIncorrecta = `${baseIncorrecta}<sup>${exponenteIncorrecto}</sup>`;
            // Asegurarnos de que no sea igual a la respuesta correcta
            if (opcionIncorrecta === respuestaCorrecta) {
                opcionIncorrecta = `${baseIncorrecta + 1}<sup>${exponenteIncorrecto}</sup>`;
            }
        }

        // Verificar que no esté ya en las opciones incorrectas
        if (!opcionesIncorrectas.includes(opcionIncorrecta)) {
            opcionesIncorrectas.push(opcionIncorrecta);
        }
    }

    // Combinar opciones correctas e incorrectas y mezclarlas
    const todasLasOpciones = [respuestaCorrecta, ...opcionesIncorrectas];
    for (let i = todasLasOpciones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todasLasOpciones[i], todasLasOpciones[j]] = [todasLasOpciones[j], todasLasOpciones[i]];
    }

    return {
        pregunta,
        opciones: todasLasOpciones,
        respuestaCorrecta: respuestaCorrecta.toString()
    };
}

// Función para generar 10 ejercicios
function generar10Ejercicios() {
    const ejercicios = [];
    for (let i = 0; i < 10; i++) {
        ejercicios.push(generarEjercicio());
    }
    return ejercicios;
}

// Función para mostrar los ejercicios en el HTML
function mostrarEjercicios(ejercicios) {
    const contenedor = document.getElementById('contenedor-ejercicios');
    contenedor.innerHTML = '';

    ejercicios.forEach((ejercicio, index) => {
        const ejercicioDiv = document.createElement('div');
        ejercicioDiv.className = 'ejercicio';
        ejercicioDiv.innerHTML = `
            <div class="pregunta">${index + 1}. ${ejercicio.pregunta}</div>
            <div class="opciones">
                ${ejercicio.opciones.map((opcion, opcionIndex) => `
                    <div class="opcion" data-ejercicio="${index}" data-opcion="${opcionIndex}">
                        ${opcion}
                    </div>
                `).join('')}
            </div>
        `;
        contenedor.appendChild(ejercicioDiv);
    });

    document.querySelectorAll('.opcion').forEach(opcion => {
        opcion.addEventListener('click', function() {
            const ejercicioIndex = this.getAttribute('data-ejercicio');
            const opcionIndex = this.getAttribute('data-opcion');
            
            // Quitar selección previa en este ejercicio
            document.querySelectorAll(`.opcion[data-ejercicio="${ejercicioIndex}"]`).forEach(op => {
                op.classList.remove('seleccionada');
            });
            
            // Marcar esta opción como seleccionada
            this.classList.add('seleccionada');
            
            // Guardar la respuesta seleccionada
            ejercicios[ejercicioIndex].respuestaSeleccionada = ejercicios[ejercicioIndex].opciones[opcionIndex];
        });
    });
}

// Función para comprobar las respuestas
function comprobarRespuestas(ejercicios) {
    let correctas = 0;
    const resultadoDiv = document.getElementById('resultado');
    const estadisticasDiv = document.getElementById('estadisticas');

    ejercicios.forEach((ejercicio, index) => {
        const opciones = document.querySelectorAll(`.opcion[data-ejercicio="${index}"]`);

        opciones.forEach(opcion => {
            opcion.classList.remove('correcta', 'incorrecta');

            const valorOpcion = ejercicio.opciones[parseInt(opcion.getAttribute('data-opcion'))];

            if (valorOpcion.toString() === ejercicio.respuestaCorrecta) {
                opcion.classList.add('correcta');
            } else if (opcion.classList.contains('seleccionada') && valorOpcion.toString() !== ejercicio.respuestaCorrecta) {
                opcion.classList.add('incorrecta');
            }
        });

        if (ejercicio.respuestaSeleccionada && ejercicio.respuestaSeleccionada.toString() === ejercicio.respuestaCorrecta) {
            correctas++;
        }
    });

    // Mostrar resultado
    resultadoDiv.textContent = `Has acertado ${correctas} de ${ejercicios.length} ejercicios.`;
    resultadoDiv.className = `resultado ${correctas === ejercicios.length ? 'correcto' : 'incorrecto'}`;

    // Mostrar estadísticas
    const porcentaje = Math.round((correctas / ejercicios.length) * 100);
    estadisticasDiv.textContent = `Porcentaje de aciertos: ${porcentaje}%`;
}

// Inicializar la aplicación
let ejerciciosActuales = [];

document.addEventListener('DOMContentLoaded', function () {
    // Generar primeros 10 ejercicios
    ejerciciosActuales = generar10Ejercicios();
    mostrarEjercicios(ejerciciosActuales);

    // Event listener para el botón de comprobar
    document.getElementById('comprobar').addEventListener('click', function () {
        comprobarRespuestas(ejerciciosActuales);
    });

    // Event listener para el botón de nuevos ejercicios
    document.getElementById('nuevos-ejercicios').addEventListener('click', function () {
        ejerciciosActuales = generar10Ejercicios();
        mostrarEjercicios(ejerciciosActuales);
        document.getElementById('resultado').textContent = '';
        document.getElementById('estadisticas').textContent = '';
    });
});