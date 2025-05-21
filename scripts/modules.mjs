import byuiCourse from "./course.mjs";
import { setSectionSelection } from "./sections.mjs";
import { setTitle, renderSections } from "./output.mjs";

// Start page
setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

// button event listeners
document.querySelector("#enrollStudent").addEventListener("click", () => {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    if (sectionNum) {
    byuiCourse.changeEnrollment(sectionNum, true);
    renderSections(byuiCourse.sections);
    }
});

document.querySelector("#dropStudent").addEventListener("click", () => {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    if (sectionNum) {
    byuiCourse.changeEnrollment(sectionNum, false);
    renderSections(byuiCourse.sections);
    }
});
