const URL = "./modelo/";

let model;
let webcam;
let maxPredictions;

let ultimoGuardado = 0;

async function iniciarCamara() {

document.getElementById("start-btn").disabled = true;

model = await tmImage.load(
    URL + "model.json",
    URL + "metadata.json"
);

maxPredictions = model.getTotalClasses();

webcam = new tmImage.Webcam(
    400,
    400,
    true
);

await webcam.setup();
await webcam.play();

window.requestAnimationFrame(loop);

document
    .getElementById("webcam-container")
    .appendChild(webcam.canvas);

}

async function loop() {

webcam.update();

await predecir();

window.requestAnimationFrame(loop);

}

async function predecir() {

const prediction = await model.predict(
    webcam.canvas
);

let mejorClase = "";
let mejorConfianza = 0;

for (let i = 0; i < prediction.length; i++) {

    const confianza =
        prediction[i].probability * 100;

    if (confianza > mejorConfianza) {

        mejorConfianza = confianza;
        mejorClase = prediction[i].className;
    }
}

document.getElementById(
    "gesture-name"
).innerText = mejorClase;

document.getElementById(
    "gesture-confidence"
).innerText =
    mejorConfianza.toFixed(2) + "%";

await procesarDeteccion(
    mejorClase,
    mejorConfianza
);

}

async function procesarDeteccion(
gesto,
confianza
) {

const ahora = Date.now();

if (confianza < 90) {
    return;
}

if (ahora - ultimoGuardado < 1000) {
    return;
}

const resultado = await guardarDeteccion(
    gesto,
    Number(confianza.toFixed(2))
);

if (resultado.success) {

    document.getElementById(
        "save-status"
    ).innerText =
        "✓ Registro guardado";

    ultimoGuardado = ahora;

} else {

    document.getElementById(
        "save-status"
    ).innerText =
        resultado.message;
}

}

document
.getElementById("start-btn")
.addEventListener(
"click",
iniciarCamara
);