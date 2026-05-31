let barChart;
let pieChart;

window.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarDashboard();

        setInterval(() => {
            cargarDashboard();
        }, 5000);

    }
);

async function cargarDashboard() {

    const respuesta =
        await obtenerEstadisticas();

    if (!respuesta.success) return;

    const stats =
        respuesta.estadisticas;

    document.getElementById(
        "total"
    ).innerText = stats.total;

    document.getElementById(
        "aprobacion"
    ).innerText = stats.aprobacion;

    document.getElementById(
        "consulta"
    ).innerText = stats.consulta;

    document.getElementById(
        "atencion"
    ).innerText = stats.atencion;

    document.getElementById(
        "desacuerdo"
    ).innerText = stats.desacuerdo;

    crearGraficoBarras(stats);

    crearGraficoPie(stats);

    const detecciones =
        await obtenerDetecciones();

    if (detecciones?.success) {
        crearGraficoConfianza(detecciones.data);
    }
}