class RectaEntera {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
    }

    dibujar(numeroMarcado = null) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.beginPath();
        ctx.moveTo(50, 60);
        ctx.lineTo(850, 60);
        ctx.strokeStyle = "#118AB2";
        ctx.lineWidth = 3;
        ctx.stroke();

        let x = 50;
        for (let i = -25; i <= 25; i++) {
            ctx.beginPath();
            ctx.moveTo(x, 55);
            ctx.lineTo(x, 65);
            ctx.strokeStyle = "#555";
            ctx.stroke();

            if (i === 0) {
                ctx.fillStyle = "#EF476F";
                ctx.font = "15px Comic Neue";
                ctx.fillText("0", x - 4, 40);
            }

            if (i === numeroMarcado) {
                ctx.fillStyle = "#06D6A0";
                ctx.beginPath();
                ctx.arc(x, 60, 6, 0, Math.PI * 2);
                ctx.fill();
            }

            x += 16;
        }
    }
}

class InteraccionRecta {
    constructor(selectId, textoId, canvasId) {
        this.select = document.getElementById(selectId);
        this.texto = document.getElementById(textoId);

        this.recta = new RectaEntera(canvasId);

        this.llenarSelect();
        this.escucharCambios();
        this.recta.dibujar(null);
    }

    llenarSelect() {
        for (let i = -25; i <= 25; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            this.select.appendChild(option);
        }
    }

    escucharCambios() {
        this.select.addEventListener("change", () => {
            const n = parseInt(this.select.value);

            if (n === 0) {
                this.texto.textContent = "El número 0 no es positivo ni negativo.";
            } else if (n > 0) {
                this.texto.textContent = `El número ${n} está a la DERECHA del 0 (es positivo).`;
            } else {
                this.texto.textContent = `El número ${n} está a la IZQUIERDA del 0 (es negativo).`;
            }

            this.recta.dibujar(n);
        });
    }
}


class DragRecta {
    constructor(canvasId, numeroId, mensajeId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.numero = document.getElementById(numeroId);
        this.mensaje = document.getElementById(mensajeId);

        this.numeroCorrecto = -4;

        this.recta = new RectaEntera(canvasId);
        this.recta.dibujar(null);

        this.arrastrando = false;

        this.initDragEvents();
    }

    initDragEvents() {
        this.numero.setAttribute("draggable", "true");

        this.numero.addEventListener("dragstart", (e) => {
            this.arrastrando = true;
            e.dataTransfer.setData("text/plain", this.numeroCorrecto);
        });

        this.canvas.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        this.canvas.addEventListener("drop", (e) => {
            e.preventDefault();
            const valor = parseInt(e.dataTransfer.getData("text/plain"));
            this.verificarColocacion(e.offsetX, valor);
        });
    }

    obtenerXDesdeNumero(n) {
        const inicio = 50;
        return inicio + (n + 25) * 16;
    }

    verificarColocacion(xDrop, numero) {
        const xCorrecta = this.obtenerXDesdeNumero(numero);

        if (Math.abs(xDrop - xCorrecta) <= 10) {
            this.mensaje.textContent = "✅ ¡Correcto! Colocaste el número -4 en su posición.";
            this.mensaje.style.color = "green";

            this.recta.dibujar(numero);

        } else {
            this.mensaje.textContent = "❌ Aún no es el punto correcto. Intenta de nuevo.";
            this.mensaje.style.color = "red";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new InteraccionRecta("numeroSelect", "respuestaInteraccion", "rectaCanvas");
    new DragRecta("rectaDragCanvas", "numeroArrastrable", "mensajeDrag");
});