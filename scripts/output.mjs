export function setTitle(course) {
    document.querySelector("#courseName").textContent = course.name;
    document.querySelector("#courseCode").textContent = course.code;
}

export function renderSections(sections) {
    const html = sections
    .map(
        (s) => `
        <tr>
        <td>${s.sectionNumber}</td>
        <td>${s.enrolled}</td>
        <td>${s.instructor}</td>
        </tr>
    `
    )
    .join("");
    document.querySelector("#sections").innerHTML = html;
}
