/*Login functionality*/
/*end of login*/

/*Signup functionality*/
/*end of signup*/

/* Add new cohort functionality - Start */
function openCohortModal() {
  const modal = document.getElementById('cohortModal');
  modal.style.display = 'block';
}

function closeCohortModal() {
  const modal = document.getElementById('cohortModal');
  modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const cohortForm = document.getElementById('cohortForm');
  if (cohortForm) {
    cohortForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Get form values
      const formData = {
        cohortName: document.getElementById('cohortName').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        students: document.getElementById('students').value,
        status: document.getElementById('status').value
      };
      
      // Here you would typically send this data to your backend
      console.log('New cohort data:', formData);
      
      // Close the modal and reset form
      closeCohortModal();
      cohortForm.reset();
    });
  }
});
/* Add new cohort functionality - End */

/*Evaluation functionality*/
// JavaScript for handling score selection and comments display
    document.addEventListener('DOMContentLoaded', function () {
      const scoreSelects = document.querySelectorAll('.score-select');
      const scoreComments = document.querySelectorAll('.score-comment');

      // Function to update cell background based on score
      function updateCellBackground(select) {
        const cell = select.closest('.score-cell');
        // Remove existing score classes
        cell.classList.remove('score-1-cell', 'score-2-cell', 'score-3-cell', 'score-4-cell', 'score-5-cell');
        // Add appropriate score class
        cell.classList.add(`score-${select.value}-cell`);
      }

      // Update cell backgrounds on page load
      scoreSelects.forEach(updateCellBackground);

      // Add event listeners to all score selects
      scoreSelects.forEach(select => {
        select.addEventListener('change', function () {
          // Update the cell background
          updateCellBackground(this);

          // Show relevant score comments
          const criteria = this.getAttribute('data-criteria');
          scoreComments.forEach(comment => {
            comment.classList.remove('active');
          });

          const activeComment = document.getElementById(`${criteria}-comments`);
          if (activeComment) {
            activeComment.classList.add('active');
          }

          // Recalculate overall score for the student (simplified calculation)
          const studentId = this.getAttribute('data-student');
          const studentScores = document.querySelectorAll(`.score-select[data-student="${studentId}"]`);
          let total = 0;

          studentScores.forEach(scoreSelect => {
            total += parseInt(scoreSelect.value);
          });

          const average = Math.round((total / studentScores.length) * 20); // Convert to percentage
          const scoreCell = this.closest('tr').querySelector('.overall-score');
          scoreCell.textContent = `${average}%`;
        });
      });

      
      // Show different score comments when clicking on column headers
      const headers = document.querySelectorAll('.evaluation-table th');

      headers.forEach((header, index) => {
        if (index > 0 && index < 7) { // Skip first (name) and last two columns (overall score and group)
          header.addEventListener('click', function () {
            const headerText = this.textContent.toLowerCase().replace(/\s+/g, '-');
            // Simplification for demo, in real app would use proper mapping
            let criteria = headerText.includes('attendance') ? 'attendance' :
              headerText.includes('communication') ? 'communication' :
                headerText.includes('accountability') ? 'accountability' :
                  headerText.includes('creativity') ? 'creativity' :
                    headerText.includes('project') ? 'project-delivery' : 'tech-skills';

            scoreComments.forEach(comment => {
              comment.classList.remove('active');
            });

            const activeComment = document.getElementById(`${criteria}-comments`);
            if (activeComment) {
              activeComment.classList.add('active');
            }
          });
        }
      });
    });

      /*end of evaluation page functionality*/

      /*evaluation page functionality*/
      // JavaScript for report page
// Reports data - in a real application, this would come from an API
const sampleReports = [
    {
      id: 1,
      name: "Q2 Cohort Performance",
      type: "cohort",
      createdBy: "Admin User",
      generatedAt: "2023-06-15"
    },
    {
      id: 2,
      name: "Web Development Student Progress",
      type: "student",
      createdBy: "Admin User",
      generatedAt: "2023-07-10"
    },
    {
      id: 3,
      name: "Technical Interview Evaluations",
      type: "evaluation",
      createdBy: "Admin User",
      generatedAt: "2023-08-05"
    }
  ];
 
  // DOM elements
  const reportsTableBody = document.getElementById('reports-table-body');
  const generateReportButtons = document.querySelectorAll('.generate-report-btn');
  const createReportBtn = document.querySelector('.create-report-btn');
  const toast = document.getElementById('toast');
 
  // Display reports in the table
  function displayReports(reports) {
    if (reports.length === 0) {
      reportsTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-state">No reports found. Generate a report to get started.</td>
        </tr>
      `;
      return;
    }
 
    reportsTableBody.innerHTML = reports.map(report => `
      <tr>
        <td>${report.name}</td>
        <td>${capitalizeFirstLetter(report.type)}</td>
        <td>${report.createdBy}</td>
        <td>${formatDate(report.generatedAt)}</td>
        <td>
          <div class="action-buttons">
            <button class="action-btn download-btn" data-id="${report.id}" title="Download">
              <i class="fas fa-download"></i>
            </button>
            <button class="action-btn edit-btn" data-id="${report.id}" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete delete-btn" data-id="${report.id}" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
 
    // Add event listeners to action buttons
    document.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', () => handleDownload(parseInt(btn.dataset.id)));
    });
 
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => handleEdit(parseInt(btn.dataset.id)));
    });
 
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => handleDelete(parseInt(btn.dataset.id)));
    });
  }
 
  // Generate report handler
  function handleGenerateReport(type) {
    // In a real application, this would make an API call
    showToast('Report Generated', `Your ${type} report has been generated successfully.`);
   
    // Simulate adding a new report
    const newReport = {
      id: sampleReports.length + 1,
      name: `New ${capitalizeFirstLetter(type)} Report`,
      type: type,
      createdBy: "Admin User",
      generatedAt: new Date().toISOString().split('T')[0]
    };
   
    sampleReports.push(newReport);
    displayReports(sampleReports);
  }
 
  // Download report handler
  function handleDownload(id) {
    const report = sampleReports.find(r => r.id === id);
    showToast('Download Started', `Downloading ${report.name}...`);
    // In a real application, this would initiate a file download
  }
 
  // Edit report handler
  function handleEdit(id) {
    const report = sampleReports.find(r => r.id === id);
    showToast('Edit Report', `Editing ${report.name}...`);
    // In a real application, this would open an edit form
  }
 
  // Delete report handler
  function handleDelete(id) {
    const report = sampleReports.find(r => r.id === id);
    const confirmDelete = confirm(`Are you sure you want to delete "${report.name}"?`);
   
    if (confirmDelete) {
      const index = sampleReports.findIndex(r => r.id === id);
      sampleReports.splice(index, 1);
      displayReports(sampleReports);
      showToast('Report Deleted', `${report.name} has been deleted.`);
    }
  }
 
  // Create new report handler
  function handleCreateReport() {
    showToast('Create Report', 'This functionality will be implemented in future versions.');
    // In a real application, this would open a form to create a new report
  }
 
  // Show toast notification
  function showToast(title, message) {
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
   
    toastTitle.textContent = title;
    toastMessage.textContent = message;
   
    toast.classList.add('show');
   
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
 
  // Helper function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
  // Helper function to format date
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
 
  // Add event listeners
  generateReportButtons.forEach(button => {
    button.addEventListener('click', () => {
      const reportType = button.dataset.reportType;
      handleGenerateReport(reportType);
    });
  });
 
  createReportBtn.addEventListener('click', handleCreateReport);
 
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    displayReports(sampleReports);
  });
 
 /*end of the functionality*/