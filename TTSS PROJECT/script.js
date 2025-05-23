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