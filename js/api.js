const API_URL = "https://detecciongestos-backend.onrender.com";

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

        return await response.json();

    } catch (error) {

        console.error(error);

    }

}

async function obtenerDetecciones() {

    try {

        const response = await fetch(
            `${API_URL}/detecciones`
        );

        return await response.json();

    } catch (error) {

        console.error(error);

    }

}