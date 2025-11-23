// Clase que representa una plantilla de pregunta
class PlantillaPregunta {
    constructor(tipo, texto, generarFn) {
        this.tipo = tipo;
        this.texto = texto;
        this.generar = generarFn;
    }
}

// ===========================================================
//  Banco de preguntas
// ===========================================================

const bancoPreguntas = [
    new PlantillaPregunta("opcion", "¿Cuál número es mayor?", () => {
        let a = Math.floor(Math.random() * 30) - 10;
        let b = Math.floor(Math.random() * 30) - 10;
        while (a === b) b++;

        return {
            pregunta: `${a} y ${b}`,
            opciones: [a, b].sort(() => Math.random() - 0.5),
            correcta: Math.max(a, b).toString()
        };
    }),

    new PlantillaPregunta("opcion", "¿Cuál número es menor?", () => {
        let a = Math.floor(Math.random() * 30) - 15;
        let b = Math.floor(Math.random() * 30) - 15;
        while (a === b) b++;

        return {
            pregunta: `${a} y ${b}`,
            opciones: [a, b].sort(() => Math.random() - 0.5),
            correcta: Math.min(a, b).toString()
        };
    }),

    new PlantillaPregunta("opcion", "¿Qué número está más a la derecha en la recta?", () => {
        let a = Math.floor(Math.random() * 20) - 10;
        let b = Math.floor(Math.random() * 20) - 10;
        while (a === b) b++;

        return {
            pregunta: `${a} y ${b}`,
            opciones: [a, b].sort(() => Math.random() - 0.5),
            correcta: (a > b ? a : b).toString()
        };
    }),

    new PlantillaPregunta("opcion", "¿Cuál es el número ANTERIOR?", () => {
        let a = Math.floor(Math.random() * 20) - 5;

        return {
            pregunta: `${a}`,
            opciones: [a - 1, a + 1, a - 2].sort(() => Math.random() - 0.5),
            correcta: (a - 1).toString()
        };
    }),

    new PlantillaPregunta("opcion", "¿Cuál es el número POSTERIOR?", () => {
        let a = Math.floor(Math.random() * 20) - 5;

        return {
            pregunta: `${a}`,
            opciones: [a + 1, a - 1, a + 2].sort(() => Math.random() - 0.5),
            correcta: (a + 1).toString()
        };
    }),

    new PlantillaPregunta("opcion", "Selecciona el signo correcto:", () => {
        let a = Math.floor(Math.random() * 20) - 10;
        let b = Math.floor(Math.random() * 20) - 10;
        while (a === b) b++;

        return {
            pregunta: `${a}  ?  ${b}`,
            opciones: [">", "<"],
            correcta: a > b ? ">" : "<"
        };
    })
];


class GeneradorEjerciciosRectaEntera {
    constructor(contenedorID, cantidad = 5) {
        this.contenedor = document.getElementById(contenedorID);
        this.cantidad = cantidad;
        this.aciertos = 0;
    }

    generar() {
        this.aciertos = 0;
        this.contenedor.innerHTML = "";

        // Reiniciar barra de puntaje
        const barra = document.getElementById("barraResultados");
        if (barra) barra.textContent = "";

        for (let i = 0; i < this.cantidad; i++) {
            const plantilla = this.elegirAleatoria(bancoPreguntas);
            const ejercicio = plantilla.generar();
            const id = `preg_${i}`;

            const bloque = this.renderPregunta(id, plantilla, ejercicio);
            this.contenedor.appendChild(bloque);

            this.activarRetroalimentacion(bloque, id, ejercicio.correcta);
        }
    }

    elegirAleatoria(lista) {
        return lista[Math.floor(Math.random() * lista.length)];
    }

    renderPregunta(id, plantilla, ejercicio) {
        const div = document.createElement("div");
        div.classList.add("pregunta-box");

        div.innerHTML = `
            <p><strong>${plantilla.texto}</strong> <br> ${ejercicio.pregunta}</p>
            ${ejercicio.opciones.map(op => `
                <label class="opcion">
                    <input type="radio" name="${id}" value="${op}">
                    ${op}
                </label>
            `).join("")}
            <p id="retro_${id}" class="retro"></p>
        `;
        return div;
    }

    activarRetroalimentacion(bloque, id, correcta) {
        const inputs = bloque.querySelectorAll("input");

        inputs.forEach(input => {
            input.addEventListener("change", () => {
                const retro = document.getElementById(`retro_${id}`);

                if (input.value == correcta) {
                    retro.textContent = "✔️ Correcto";
                    retro.style.color = "green";
                    this.aciertos += 1;
                } else {
                    retro.textContent = "❌ Incorrecto";
                    retro.style.color = "red";
                }

                // Bloquea la pregunta después de responder
                inputs.forEach(i => i.disabled = true);

                // Actualiza puntaje en pantalla
                this.actualizarPuntaje();
            });
        });
    }

    actualizarPuntaje() {
        const barra = document.getElementById("barraResultados");
        if (!barra) return;

        barra.textContent = `Aciertos: ${this.aciertos} / ${this.cantidad}`;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const generador = new GeneradorEjerciciosRectaEntera("contenedorPreguntas", 5);

    // Generar al cargar
    generador.generar();

    // Botón para volver a generar preguntas
    const btn = document.getElementById("btnGenerarPreguntas");
    if (btn) {
        btn.addEventListener("click", () => {
            generador.generar();
        });
    }
});

