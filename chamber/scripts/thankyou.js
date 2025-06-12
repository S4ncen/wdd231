document.addEventListener("DOMContentLoaded", function () {
    const formDataDisplay = document.getElementById("formDataDisplay");

  // 1. Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);

  // 2. Crear un HTML para mostrar los datos
    let htmlOutput = "<ul>";

  // Mapeo de nombres de parámetros a etiquetas más legibles
    const labels = {
    fname: "First Name",
    lname: "Last Name",
    title: "Title (Pattern Min. 7 Chars)",
    email: "Email",
    phone: "Cell Phone",
    organization: "Organization Name",
    busposition: "Business Position/Role",
    membership: "Membership Level",
    bizdescription: "Business Description",
    timestamp: "Application Submitted At",
    };

  // 3. Iterar sobre los parámetros y añadirlos a la lista
  // (Asegúrate de que los nombres de los parámetros coincidan con los atributos 'name' de tus campos de formulario)
    params.forEach((value, key) => {
    const label = labels[key] || key; // Usa la etiqueta legible o la clave si no hay etiqueta
    let displayValue = value;

    // Formatear el timestamp si es el campo de timestamp
    if (key === "timestamp" && value) {
        try {
        const date = new Date(value);
        // Formato más completo: Mes día, año, hora:minuto AM/PM
        displayValue = date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        } catch (e) {
        console.error("Error formatting date:", e);
        // Mantener el valor original si hay error
        }
    }

    htmlOutput += `<li><strong>${label}:</strong> ${
        displayValue || "<em>Not provided</em>"
    }</li>`;
    });

    htmlOutput += "</ul>";

  // 4. Mostrar el HTML en el div
    if (formDataDisplay) {
    formDataDisplay.innerHTML = htmlOutput;
    } else {
    console.error("Element with ID 'formDataDisplay' not found.");
    }
});
