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