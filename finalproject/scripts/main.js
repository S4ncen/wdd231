document.addEventListener("DOMContentLoaded", function () {
  // --- Menu Hamburguer Start ---
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("is-open");
      navMenu.classList.toggle("is-open");

      if (navToggle.classList.contains("is-open")) {
        navToggle.setAttribute("aria-label", "close navigation");
      } else {
        navToggle.setAttribute("aria-label", "open navigation");
      }
    });
  }
  // --- Menu Hamburguer Ends ---

  // --- DYNAMIC PROJECTS & MODAL LOGIC ---
  const projects = [
    {
      id: 1,
      title: "Automated Client Reporting",
      description:
        "A workflow that automatically pulls data from Google Analytics, Facebook Ads, and a CRM into a centralized Google Sheet. It then generates a weekly PDF report and emails it to the client.",
      tools: "Google Analytics, Zapier, Google Sheets, Gmail",
    },
    {
      id: 2,
      title: "E-commerce Order Fulfillment",
      description:
        'Integrated a Shopify store with a Trello board. When a new order is placed, a new card is automatically created in the "To Do" list of the fulfillment team\'s board with all the order details.',
      tools: "Shopify, Trello, Make.com",
    },
    {
      id: 3,
      title: "Lead Qualification Chatbot",
      description:
        "An intelligent service bot was implemented on the company website. It asks visitors a series of qualifying questions and, if they are a good fit, automatically shows them the sales team's calendar to book a meeting.",
      tools: "Tidio, Calendly, Google Calendar",
    },
    {
      id: 4,
      title: "HR Onboarding Workflow",
      description:
        "When a new employee is added to the HR system, this automation triggers a sequence of actions: sends a welcome email, creates their user accounts in 3 different systems, and assigns their initial training modules.",
      tools: "BambooHR, Slack, Gmail, Trello",
    },
    {
      id: 5,
      title: "CRM Data Entry Automation",
      description:
        "New leads from web forms and social media lead ads are automatically parsed and created as new, properly tagged contacts in the HubSpot CRM, including a task for a sales rep to follow up.",
      tools: "HubSpot, Facebook Lead Ads, Zapier",
    },
    {
      id: 6,
      title: "Invoice Generation System",
      description:
        "For this consulting firm, a system was built to automatically generate and email monthly PDF invoices to clients based on hours tracked in their project management tool, saving hours of administrative work.",
      tools: "ClickUp, Zoho Invoice, Google Drive",
    },
  ];

  const projectGrid = document.getElementById("project-grid");

  if (projectGrid) {
    // Populate the project grid
    projectGrid.innerHTML = projects
      .map(
        (project) => `
          <div class="project-card">
              <h3>${project.title}</h3>
              <p>${project.description.substring(0, 100)}...</p>
              <button class="btn btn-secondary view-details-btn" data-id="${
                project.id
              }">View Details</button>
          </div>
      `
      )
      .join("");

    // Modal elements
    const modal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
    const closeButton = document.querySelector(".close-button");

    // Event listener for all "View Details" buttons (using event delegation)
    projectGrid.addEventListener("click", function (event) {
      if (event.target.classList.contains("view-details-btn")) {
        const projectId = parseInt(event.target.getAttribute("data-id"));
        const project = projects.find((p) => p.id === projectId);

        if (project) {
          modalBody.innerHTML = `
                      <h2>${project.title}</h2>
                      <p>${project.description}</p>
                      <p><strong>Tools Used:</strong> ${project.tools}</p>
                  `;
          modal.style.display = "block";
        }
      }
    });

    // Close modal when the 'x' is clicked
    closeButton.onclick = function () {
      modal.style.display = "none";
    };

    // Close modal when clicking outside of the modal content
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
});
