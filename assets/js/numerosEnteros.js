class EjercicioEnteros {
    constructor() {
        this.num1 = this.generarNumero();
        this.num2 = this.generarNumero();
        this.operacion = this.elegirOperacion();
        this.respuestaCorrecta = this.calcularResultado();
    }

    generarNumero() {
        return Math.floor(Math.random() * 41) - 20;
    }

    elegirOperacion() {
        const operaciones = ["+", "-", "×", "÷"];
        return operaciones[Math.floor(Math.random() * operaciones.length)];
    }

    calcularResultado() {
        switch (this.operacion) {
            case "+":
                return this.num1 + this.num2;

            case "-":
                return this.num1 - this.num2;

            case "×":
                return this.num1 * this.num2;

            case "÷":
                if (this.num2 === 0) return "Indefinido";
                return this.num1 / this.num2;

            default:
                return null;
        }
    }

    generarHTML(id) {
        return `
            <div class="ejercicio-card">
                <p>
                    <strong>${this.num1} ${this.operacion} ${this.num2} = </strong>
                    <input type="number" id="respuesta-${id}" class="input-respuesta" />
                </p>
                <button class="btn" onclick="verificar(${id})">Verificar</button>
                <p id="resultado-${id}" class="resultado"></p>
            </div>
        `;
    }
}

class GestorEjercicios {
    constructor() {
        this.ejercicios = [];
        this.contenedor = document.getElementById("contenedor-ejercicios");

        document.getElementById("btn-nuevo").addEventListener("click", () => {
            this.nuevoEjercicio();
        });

        this.nuevoEjercicio();
    }

    nuevoEjercicio() {
        const ejercicio = new EjercicioEnteros();
        this.ejercicios.push(ejercicio);

        const id = this.ejercicios.length - 1; 

        this.contenedor.innerHTML += ejercicio.generarHTML(id);
    }

    verificarRespuesta(id) {
        const ejercicio = this.ejercicios[id];
        const campo = document.getElementById(`respuesta-${id}`);
        const resultado = document.getElementById(`resultado-${id}`);

        let respuestaUsuario = campo.value;

        if (respuestaUsuario === "") {
            resultado.textContent = "Por favor escribe una respuesta.";
            resultado.style.color = "orange";
            return;
        }

        if (ejercicio.respuestaCorrecta === "Indefinido") {
            resultado.textContent = "La división entre 0 es indefinida.";
            resultado.style.color = "blue";
            return;
        }

        respuestaUsuario = Number(respuestaUsuario);

        if (respuestaUsuario === ejercicio.respuestaCorrecta) {
            resultado.textContent = "✔ ¡Correcto!";
            resultado.style.color = "green";
        } else {
            resultado.textContent =
                `✘ Incorrecto. La respuesta correcta es ${ejercicio.respuestaCorrecta}`;
            resultado.style.color = "red";
        }
    }
}


const gestor = new GestorEjercicios();
window.verificar = function (id) {
    gestor.verificarRespuesta(id);
};
