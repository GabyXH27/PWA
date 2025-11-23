class SistemaEjerciciosEnteros {
    constructor() {
        this.ejercicios = [];
        this.ejercicioActual = 0;
        this.puntuacion = 0;
        this.ejerciciosCompletados = 0;
    }

    inicializar() {
        this.generarEjercicios();
        this.mostrarEjercicio(0);
    }

    generarEjercicios() {
        this.ejercicios = [
            {
                tipo: 'temperatura',
                enunciado: 'La temperatura al amanecer era de -8°C. Durante el día subió 15°C. ¿Qué temperatura se alcanzó?',
                operacion: '-8 + 15',
                respuestaCorrecta: 7,
                contexto: '°C'
            },
            {
                tipo: 'deuda',
                enunciado: 'María debe $320. Pagó $150. ¿Cuánto debe ahora?',
                operacion: '-320 + 150',
                respuestaCorrecta: -170,
                contexto: '$'
            },
            {
                tipo: 'altitude',
                enunciado: 'Un submarino está a -55 metros. Sube 30 metros. ¿A qué profundidad está ahora?',
                operacion: '-55 + 30',
                respuestaCorrecta: -25,
                contexto: 'metros'
            },
            {
                tipo: 'finanzas',
                enunciado: 'Una empresa tuvo pérdidas de $2,500 en enero y ganancias de $4,800 en febrero. ¿Cuál es el resultado total?',
                operacion: '-2500 + 4800',
                respuestaCorrecta: 2300,
                contexto: '$'
            },
            {
                tipo: 'multiplicacion',
                enunciado: 'Un buzo desciende 7 metros cada minuto durante 5 minutos. ¿Cuál es su cambio total de posición?',
                operacion: '(-7) × 5',
                respuestaCorrecta: -35,
                contexto: 'metros'
            },
            {
                tipo: 'temperatura',
                enunciado: 'La temperatura era de 5°C. Bajó 12°C durante la noche. ¿Qué temperatura se alcanzó?',
                operacion: '5 - 12',
                respuestaCorrecta: -7,
                contexto: '°C'
            },
            {
                tipo: 'ascensor',
                enunciado: 'Un ascensor está en el piso -3. Sube 8 pisos. ¿En qué piso se detiene?',
                operacion: '-3 + 8',
                respuestaCorrecta: 5,
                contexto: 'piso'
            },
            {
                tipo: 'operacion',
                enunciado: 'Calcula: (-15) + (-8) + 30',
                operacion: '(-15) + (-8) + 30',
                respuestaCorrecta: 7,
                contexto: ''
            },
            {
                tipo: 'multiplicacion',
                enunciado: 'Calcula: (-6) × (-9)',
                operacion: '(-6) × (-9)',
                respuestaCorrecta: 54,
                contexto: ''
            },
            {
                tipo: 'division',
                enunciado: 'Calcula: 56 ÷ (-8)',
                operacion: '56 ÷ (-8)',
                respuestaCorrecta: -7,
                contexto: ''
            }
        ];
    }

    mostrarEjercicio(indice) {
        if (indice >= this.ejercicios.length) {
            this.mostrarResultados();
            return;
        }

        this.ejercicioActual = indice;
        const ejercicio = this.ejercicios[indice];

        const contenedor = document.getElementById('ejercicioContenedor');
        contenedor.innerHTML = '';

        const ejercicioDiv = document.createElement('div');
        ejercicioDiv.className = 'ejercicio-item';
        ejercicioDiv.innerHTML = `
            <h3>Ejercicio ${indice + 1} de ${this.ejercicios.length}</h3>
            <div class="problema-container">
                <p class="enunciado">${ejercicio.enunciado}</p>
                <div class="operacion-visual">
                    <span class="operacion-texto">${ejercicio.operacion}</span>
                </div>
            </div>
        `;

        contenedor.appendChild(ejercicioDiv);
        this.crearOpcionesRespuesta(ejercicio);

        const botonesDiv = document.createElement('div');
        botonesDiv.className = 'botones-navegacion';
        botonesDiv.innerHTML = `
            <button id="btn-verificar" class="btn-verificar">Verificar</button>
            <button id="btn-siguiente" class="btn-siguiente" style="display:none;">Siguiente</button>
        `;
        contenedor.appendChild(botonesDiv);

        document.getElementById('btn-verificar').addEventListener('click', () => {
            this.verificarEjercicioActual();
        });

        document.getElementById('btn-siguiente').addEventListener('click', () => {
            this.mostrarEjercicio(this.ejercicioActual + 1);
        });
    }

    crearOpcionesRespuesta(ejercicio) {
        const opcionesDiv = document.createElement('div');
        opcionesDiv.className = 'opciones-respuesta';
        opcionesDiv.id = 'opciones-respuesta';

        const opciones = this.generarOpciones(ejercicio.respuestaCorrecta);

        opciones.forEach((valor) => {
            const boton = document.createElement('button');
            boton.className = 'opcion-btn';

            let textoBoton = valor.toString();
            if (ejercicio.contexto === '$') {
                textoBoton = valor < 0 ? `-$${Math.abs(valor)}` : `$${valor}`;
            } else if (ejercicio.contexto === '°C') {
                textoBoton = `${valor}°C`;
            } else if (ejercicio.contexto === 'metros') {
                textoBoton = `${valor} metros`;
            } else if (ejercicio.contexto === 'piso') {
                textoBoton = valor === 0 ? 'Planta baja' : valor > 0 ? `Piso ${valor}` : `Piso ${valor}`;
            }

            boton.textContent = textoBoton;
            boton.dataset.valor = valor;
            boton.addEventListener('click', () => {
                document.querySelectorAll('.opcion-btn').forEach(b => b.classList.remove('seleccionada'));
                boton.classList.add('seleccionada');
                ejercicio.respuestaUsuario = parseInt(valor);
            });
            opcionesDiv.appendChild(boton);
        });

        document.getElementById('ejercicioContenedor').appendChild(opcionesDiv);
    }

    generarOpciones(correcta) {
        const opciones = [correcta];

        while (opciones.length < 4) {
            let opcionIncorrecta;
            const rand = Math.random();

            if (rand < 0.3) {
                opcionIncorrecta = -correcta;
            } else if (rand < 0.5) {
                opcionIncorrecta = correcta + (Math.random() < 0.5 ? -10 : 10);
            } else if (rand < 0.7) {
                opcionIncorrecta = correcta + (Math.random() < 0.5 ? -5 : 5);
            } else {
                opcionIncorrecta = Math.floor(Math.random() * 100) - 50;
            }

            if (!opciones.includes(opcionIncorrecta) && opcionIncorrecta !== correcta) {
                opciones.push(opcionIncorrecta);
            }
        }

        for (let i = opciones.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
        }

        return opciones;
    }

    verificarEjercicioActual() {
        const ejercicio = this.ejercicios[this.ejercicioActual];

        if (ejercicio.respuestaUsuario === undefined) {
            alert('Por favor, selecciona una respuesta');
            return;
        }

        const esCorrecta = ejercicio.respuestaUsuario === ejercicio.respuestaCorrecta;

        if (esCorrecta) {
            this.puntuacion++;
        }

        this.ejerciciosCompletados++;
        this.mostrarRetroalimentacion(esCorrecta, ejercicio);

        document.getElementById('btn-verificar').style.display = 'none';
        document.getElementById('btn-siguiente').style.display = 'inline-block';
    }

    mostrarRetroalimentacion(esCorrecta, ejercicio) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `feedback ${esCorrecta ? 'correcto' : 'incorrecto'}`;

        if (esCorrecta) {
            feedbackDiv.innerHTML = `
                <span class="icono">✓</span>
                <span>¡Correcto! Excelente trabajo.</span>
            `;
        } else {
            let respuestaTexto = ejercicio.respuestaCorrecta.toString();
            if (ejercicio.contexto === '$') {
                respuestaTexto = ejercicio.respuestaCorrecta < 0 
                    ? `-$${Math.abs(ejercicio.respuestaCorrecta)}` 
                    : `$${ejercicio.respuestaCorrecta}`;
            } else if (ejercicio.contexto === '°C') {
                respuestaTexto = `${ejercicio.respuestaCorrecta}°C`;
            } else if (ejercicio.contexto === 'metros') {
                respuestaTexto = `${ejercicio.respuestaCorrecta} metros`;
            } else if (ejercicio.contexto === 'piso') {
                respuestaTexto = ejercicio.respuestaCorrecta === 0 
                    ? 'Planta baja' 
                    : ejercicio.respuestaCorrecta > 0 
                        ? `Piso ${ejercicio.respuestaCorrecta}` 
                        : `Piso ${ejercicio.respuestaCorrecta}`;
            }

            feedbackDiv.innerHTML = `
                <span class="icono">✗</span>
                <span>Incorrecto. La respuesta correcta es: <strong>${respuestaTexto}</strong></span>
            `;
        }

        const contenedor = document.getElementById('ejercicioContenedor');
        contenedor.appendChild(feedbackDiv);

        document.querySelectorAll('.opcion-btn').forEach(btn => {
            btn.disabled = true;
            const valor = parseInt(btn.dataset.valor);
            if (valor === ejercicio.respuestaCorrecta) {
                btn.classList.add('correcta');
            }
            if (valor === ejercicio.respuestaUsuario && !esCorrecta) {
                btn.classList.add('incorrecta');
            }
        });
    }

    mostrarResultados() {
        const contenedor = document.getElementById('ejercicioContenedor');
        const porcentaje = (this.puntuacion / this.ejercicios.length * 100).toFixed(1);

        let mensaje = '';
        let clase = '';

        if (porcentaje >= 90) {
            mensaje = '¡Excelente trabajo! Dominas las operaciones con números enteros.';
            clase = 'excelente';
        } else if (porcentaje >= 70) {
            mensaje = '¡Buen trabajo! Vas por buen camino.';
            clase = 'bueno';
        } else if (porcentaje >= 50) {
            mensaje = 'Bien, pero puedes mejorar. ¡Sigue practicando!';
            clase = 'regular';
        } else {
            mensaje = 'Necesitas más práctica. ¡No te rindas!';
            clase = 'necesita-practica';
        }

        contenedor.innerHTML = `
            <div class="resultados ${clase}">
                <h2>¡Ejercicios Completados!</h2>
                <div class="puntuacion-final">
                    <div class="numero-grande">${this.puntuacion}</div>
                    <div class="de-total">de ${this.ejercicios.length}</div>
                </div>
                <div class="porcentaje">${porcentaje}%</div>
                <p class="mensaje">${mensaje}</p>
                <button class="btn-reintentar" onclick="location.reload()">Intentar de nuevo</button>
            </div>
        `;
    }
}

// INICIALIZACIÓN AUTOMÁTICA - Se ejecuta cuando la página carga
window.addEventListener('DOMContentLoaded', () => {
    const sistema = new SistemaEjerciciosEnteros();
    sistema.inicializar();
});