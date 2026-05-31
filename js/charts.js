function crearGraficoBarras(stats) {

    const ctx =
        document.getElementById(
            "barChart"
        );

    if (window.barChartInstance) {
        window.barChartInstance.destroy();
    }

    const colores = [
        "#047857",
        "#0369a1",
        "#b45309",
        "#b91c1c"
    ];

    window.barChartInstance =
        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [
                    "Aprobación",
                    "Consulta",
                    "Atención",
                    "Desacuerdo"
                ],

                datasets: [
                    {
                        label: "Cantidad",

                        data: [
                            stats.aprobacion,
                            stats.consulta,
                            stats.atencion,
                            stats.desacuerdo
                        ],

                        backgroundColor: colores,
                        borderRadius: 4
                    }
                ]
            },

            options: {
                responsive: true
            }

        });
}

function crearGraficoPie(stats) {

    const ctx =
        document.getElementById(
            "pieChart"
        );

    if (window.pieChartInstance) {
        window.pieChartInstance.destroy();
    }

    const colores = [
        "#047857",
        "#0369a1",
        "#b45309",
        "#b91c1c"
    ];

    window.pieChartInstance =
        new Chart(ctx, {

            type: "pie",

            data: {

                labels: [
                    "Aprobación",
                    "Consulta",
                    "Atención",
                    "Desacuerdo"
                ],

                datasets: [
                    {
                        data: [
                            stats.aprobacion,
                            stats.consulta,
                            stats.atencion,
                            stats.desacuerdo
                        ],
                        backgroundColor: colores,
                        borderWidth: 2,
                        borderColor: "#ffffff"
                    }
                ]
            },

            options: {
                responsive: true
            }

        });
}

const GESTOS = [
    "Aprobación",
    "Consulta",
    "Atención",
    "Desacuerdo"
];

const RANGOS_CONFIANZA = [
    {
        label: "90 – 93%",
        min: 90,
        max: 93,
        color: "#cbd5e1",
        border: "#94a3b8"
    },
    {
        label: "93 – 96%",
        min: 93,
        max: 96,
        color: "#93c5fd",
        border: "#3b82f6"
    },
    {
        label: "96 – 99%",
        min: 96,
        max: 99,
        color: "#60a5fa",
        border: "#2563eb"
    },
    {
        label: "99 – 100%",
        min: 99,
        max: 100.01,
        color: "#1d4ed8",
        border: "#1e3a8a"
    }
];

function contarEnRango(
    detecciones,
    gesto,
    min,
    max
) {

    return detecciones.filter(item => {

        if (item.gesto !== gesto) {
            return false;
        }

        const c = Number(item.confianza);

        return c >= min && c < max;

    }).length;

}

function crearGraficoConfianza(detecciones) {

    const ctx =
        document.getElementById(
            "confidenceChart"
        );

    if (window.confidenceChartInstance) {
        window.confidenceChartInstance.destroy();
    }

    const datasets =
        RANGOS_CONFIANZA.map(rango => ({
            label: rango.label,
            data: GESTOS.map(gesto =>
                contarEnRango(
                    detecciones,
                    gesto,
                    rango.min,
                    rango.max
                )
            ),
            backgroundColor: rango.color,
            borderColor: rango.border,
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false
        }));

    window.confidenceChartInstance =
        new Chart(ctx, {

            type: "bar",

            data: {
                labels: GESTOS,
                datasets
            },

            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: "top",
                        align: "center",
                        labels: {
                            usePointStyle: true,
                            pointStyle: "rectRounded",
                            padding: 18,
                            font: {
                                size: 12,
                                weight: "600",
                                family: "'Figtree', sans-serif"
                            },
                            color: "#4a4a5e"
                        }
                    },
                    tooltip: {
                        backgroundColor: "#1c1c28",
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label(ctx) {
                                return " " + ctx.dataset.label +
                                    ": " + ctx.raw + " detecciones";
                            },
                            footer(items) {
                                const total = items.reduce(
                                    (s, i) => s + i.raw,
                                    0
                                );
                                return "Total: " + total;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: { display: false },
                        ticks: {
                            font: {
                                weight: "700",
                                size: 12
                            },
                            color: "#1c1c28"
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            font: {
                                weight: "600",
                                size: 11
                            },
                            color: "#4a4a5e"
                        },
                        grid: {
                            color: "rgba(28, 28, 40, 0.07)"
                        },
                        title: {
                            display: true,
                            text: "Nº de detecciones",
                            font: { weight: "600", size: 12 },
                            color: "#4a4a5e"
                        }
                    }
                }
            }

        });

}