let selectedCourses = [];

function filterCourses(category) {
    let courseButtons = document.querySelectorAll('.course-btn');
    let filteredCount = document.getElementById('filteredCount');
    let count = 0;

    courseButtons.forEach(button => {
        if (category === 'all' || button.classList.contains(category)) {
            button.style.display = 'inline-block';
            count++;
        } else {
            button.style.display = 'none';
        }
    });

    filteredCount.textContent = count;
    updateSelectedCount();
}

function selectCourse(button) {
    button.classList.toggle('selected');

    // Actualizamos el array selectedCourses solo con los que están seleccionados
    if (button.classList.contains('selected')) {
        selectedCourses.push(button.textContent);
    } else {
        selectedCourses = selectedCourses.filter(course => course !== button.textContent);
    }

// Mostrar el recuento de los cursos seleccionados
    updateSelectedCount();
    }
    function updateSelectedCount() {
    let selectedCount = selectedCourses.length;
    let selectedCountDisplay = document.getElementById('selectedCount');
    selectedCountDisplay.textContent = `Selected: ${selectedCount}`;
    }


// Función para mostra esa fecha en el html id last-update
document.addEventListener("DOMContentLoaded", () => {
  // Get current year
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

  // Get date of last modification of document
    const lastModified = new Date(document.lastModified);
    const formattedLastModified = lastModified.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    });
    document.getElementById("date-and-time").textContent = formattedLastModified;
});

