const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000/api"
        : "https://detecciongestos-backend.onrender.com/api";

async function guardarDeteccion(gesto, confianza) {

    try {

        const response = await fetch(
            `${API_URL}/detecciones`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    gesto,
                    confianza
                })
            }
        );

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message
        };

    }

}

async function obtenerEstadisticas() {

    try {

        const response = await fetch(
            `${API_URL}/estadisticas`
        );

        if (!response.ok) {
            throw new Error(
                "Error HTTP " + response.status
            );
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message
        };

    }

}

async function obtenerDetecciones() {

    try {

        const response = await fetch(
            `${API_URL}/detecciones`
        );

        if (!response.ok) {
            throw new Error(
                "Error HTTP " + response.status
            );
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message
        };

    }

}