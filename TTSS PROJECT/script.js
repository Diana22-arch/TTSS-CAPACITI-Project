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

// Initialize current cohort variable
let currentCohort = '';
 
// Student data
let currentCohortStudents = {
  'AI Academy': ['John Doe', 'Jane Smith', 'Mike Johnson'],
  'Cloud Computing': ['Sarah Wilson', 'Tom Brown'],
  'Demand': ['Alex Davis', 'Chris Lee']
};
 
// Cohort Modal Functions
function openCohortModal() {
  document.getElementById('cohortModal').style.display = 'block';
}
 
function closeCohortModal() {
  document.getElementById('cohortModal').style.display = 'none';
}
 
// View button functionality - Start
// Student Modal Functions
function openStudentModal(cohortName) {
  currentCohort = cohortName;
  const modal = document.getElementById('studentModal');
  const modalTitle = document.getElementById('studentModalTitle');
  modalTitle.textContent = `${cohortName} - Students`;
 
  renderStudentList(cohortName);
  modal.style.display = 'block';
}
 
function closeStudentModal() {
  const modal = document.getElementById('studentModal');
  modal.style.display = 'none';
  currentCohort = '';
}
// View button functionality - End
 
function renderStudentList(cohortName) {
  const studentList = document.getElementById('studentList');
  const students = currentCohortStudents[cohortName] || [];
 
  studentList.innerHTML = students.map(student => `
    <div class="student-item">
      <span>${student}</span>
      <span class="remove-student" onclick="removeStudent('${cohortName}', '${student}')">×</span>
    </div>
  `).join('');
}
 
function addStudent(cohortName) {
  const studentInput = document.getElementById('newStudentName');
  const studentName = studentInput.value.trim();
 
  if (studentName) {
    if (!currentCohortStudents[cohortName]) {
      currentCohortStudents[cohortName] = [];
    }
    currentCohortStudents[cohortName].push(studentName);
    renderStudentList(cohortName);
    studentInput.value = '';
  }
}
 
function removeStudent(cohortName, studentName) {
  currentCohortStudents[cohortName] = currentCohortStudents[cohortName].filter(
    student => student !== studentName
  );
  renderStudentList(cohortName);
}
 
function updateCohortStudents() {
  // Here you would typically send the updated data to your backend
  closeStudentModal();
}
 
/* new cohort functionality - End */

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

 /*mentor functionality page*/
 // Placeholder for Add New Mentor functionality
  function addMentor() {
    alert('Add mentor functionality to be implemented');
  }
 /*end of functionality page*/

 //student dashboard functionality
  function toggleFullReport() {
    const section = document.getElementById("full-report");
    section.classList.toggle("hidden");
  }

  function submitQuery(event) {
    event.preventDefault();
    const textarea = document.querySelector('.query-section textarea');
    const message = textarea.value.trim();

    if (message) {
      alert("Your query has been submitted:\n\n" + message);
      textarea.value = '';
    }
  }

 /*end of functionality page*/

 //Student Notification Page
 class NotificationDashboard {
    constructor() {
        this.notifications = [];
        this.filteredNotifications = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.unreadCount = 0;
       
        this.init();
    }
   
    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.renderNotifications();
        this.updateUnreadCounter();
       
        // Simulate loading state
        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.renderNotifications();
        }, 1500);
    }
   
    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterAndRenderNotifications();
        });
       
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.filterAndRenderNotifications();
            });
        });
       
        // Action buttons
        document.getElementById('markAllRead').addEventListener('click', () => {
            this.markAllAsRead();
        });
       
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshNotifications();
        });
       
        // Modal events
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeModal();
        });
       
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });
       
        document.getElementById('modalActionBtn').addEventListener('click', () => {
            this.handleModalAction();
        });
       
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
   
    loadFromStorage() {
        const stored = localStorage.getItem('studentNotifications');
        if (stored) {
            this.notifications = JSON.parse(stored);
        } else {
            // Initialize with empty state - no mock data
            this.notifications = [];
        }
        this.calculateUnreadCount();
    }
   
    saveToStorage() {
        localStorage.setItem('studentNotifications', JSON.stringify(this.notifications));
    }
   
    calculateUnreadCount() {
        this.unreadCount = this.notifications.filter(n => !n.read).length;
    }
   
    updateUnreadCounter() {
        const counter = document.getElementById('unreadCounter');
        counter.textContent = this.unreadCount;
        counter.style.display = this.unreadCount > 0 ? 'flex' : 'none';
    }
   
    filterAndRenderNotifications() {
        this.filteredNotifications = this.notifications.filter(notification => {
            // Filter by type
            const typeMatch = this.currentFilter === 'all' || notification.type === this.currentFilter;
           
            // Filter by search term
            const searchMatch = this.searchTerm === '' ||
                notification.title.toLowerCase().includes(this.searchTerm) ||
                notification.content.toLowerCase().includes(this.searchTerm);
           
            return typeMatch && searchMatch;
        });
       
        this.renderNotifications();
    }
   
    renderNotifications() {
        const container = document.getElementById('notificationsContainer');
        const emptyState = document.getElementById('emptyState');
       
        if (this.filteredNotifications.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            container.style.display = 'grid';
            emptyState.style.display = 'none';
           
            container.innerHTML = this.filteredNotifications
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map(notification => this.createNotificationCard(notification))
                .join('');
           
            // Bind click events to cards
            this.bindCardEvents();
        }
    }
   
    createNotificationCard(notification) {
        const timeAgo = this.getTimeAgo(notification.timestamp);
        const priorityIcon = this.getPriorityIcon(notification.priority);
       
        return `
            <div class="notification-card ${notification.read ? 'read' : 'unread'}"
                 data-id="${notification.id}"
                 role="button"
                 tabindex="0"
                 aria-label="Notification: ${notification.title}">
                <div class="notification-header">
                    <span class="notification-type ${notification.type}">
                        <i class="${this.getTypeIcon(notification.type)}"></i>
                        ${notification.type}
                    </span>
                    <span class="notification-time">${timeAgo}</span>
                </div>
               
                <h3 class="notification-title">${this.escapeHtml(notification.title)}</h3>
               
                <div class="notification-content">
                    ${this.escapeHtml(notification.content)}
                </div>
               
                <div class="notification-meta">
                    <div class="notification-priority priority-${notification.priority}">
                        <i class="${priorityIcon}"></i>
                        ${notification.priority} priority
                    </div>
                   
                    <div class="notification-actions">
                        <button onclick="event.stopPropagation(); notificationDashboard.toggleRead('${notification.id}')"
                                aria-label="${notification.read ? 'Mark as unread' : 'Mark as read'}">
                            <i class="fas fa-${notification.read ? 'envelope' : 'envelope-open'}"></i>
                        </button>
                        <button onclick="event.stopPropagation(); notificationDashboard.deleteNotification('${notification.id}')"
                                aria-label="Delete notification">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
   
    bindCardEvents() {
        const cards = document.querySelectorAll('.notification-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                this.openNotificationModal(id);
            });
           
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const id = card.dataset.id;
                    this.openNotificationModal(id);
                }
            });
        });
    }
   
    getTypeIcon(type) {
        const icons = {
            tasks: 'fas fa-tasks',
            updates: 'fas fa-info-circle',
            announcements: 'fas fa-bullhorn'
        };
        return icons[type] || 'fas fa-bell';
    }
   
    getPriorityIcon(priority) {
        const icons = {
            high: 'fas fa-exclamation-triangle',
            medium: 'fas fa-exclamation-circle',
            low: 'fas fa-info-circle'
        };
        return icons[priority] || 'fas fa-info-circle';
    }
   
    getTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;
       
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
       
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
   
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
   
    toggleRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = !notification.read;
            this.calculateUnreadCount();
            this.updateUnreadCounter();
            this.saveToStorage();
            this.filterAndRenderNotifications();
        }
    }
   
    deleteNotification(id) {
        if (confirm('Are you sure you want to delete this notification?')) {
            this.notifications = this.notifications.filter(n => n.id !== id);
            this.calculateUnreadCount();
            this.updateUnreadCounter();
            this.saveToStorage();
            this.filterAndRenderNotifications();
        }
    }
   
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.calculateUnreadCount();
        this.updateUnreadCounter();
        this.saveToStorage();
        this.filterAndRenderNotifications();
       
        // Show feedback
        this.showToast('All notifications marked as read');
    }
   
    refreshNotifications() {
        this.showLoading();
       
        // Simulate API call
        setTimeout(() => {
            this.hideLoading();
            this.filterAndRenderNotifications();
            this.showToast('Notifications refreshed');
        }, 1000);
    }
   
    openNotificationModal(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (!notification) return;
       
        // Mark as read when opened
        if (!notification.read) {
            notification.read = true;
            this.calculateUnreadCount();
            this.updateUnreadCounter();
            this.saveToStorage();
        }
       
        const modal = document.getElementById('modalOverlay');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');
        const actionBtn = document.getElementById('modalActionBtn');
       
        title.textContent = notification.title;
        body.innerHTML = `
            <div class="modal-notification-meta">
                <div class="notification-type ${notification.type}">
                    <i class="${this.getTypeIcon(notification.type)}"></i>
                    ${notification.type}
                </div>
                <div class="notification-priority priority-${notification.priority}">
                    <i class="${this.getPriorityIcon(notification.priority)}"></i>
                    ${notification.priority} priority
                </div>
                <div class="notification-time">
                    ${new Date(notification.timestamp).toLocaleString()}
                </div>
            </div>
            <div class="modal-notification-content">
                ${this.escapeHtml(notification.content)}
            </div>
            ${notification.details ? `
                <div class="modal-notification-details">
                    <h4>Additional Details:</h4>
                    ${this.escapeHtml(notification.details)}
                </div>
            ` : ''}
        `;
       
        // Update action button
        actionBtn.innerHTML = `
            <i class="fas fa-check"></i>
            ${notification.read ? 'Mark as Unread' : 'Mark as Read'}
        `;
        actionBtn.dataset.notificationId = id;
       
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
   
    closeModal() {
        const modal = document.getElementById('modalOverlay');
        modal.classList.remove('active');
        document.body.style.overflow = '';
       
        // Re-render to show updated read status
        this.filterAndRenderNotifications();
    }
   
    handleModalAction() {
        const actionBtn = document.getElementById('modalActionBtn');
        const id = actionBtn.dataset.notificationId;
        this.toggleRead(id);
        this.closeModal();
    }
   
    showLoading() {
        document.getElementById('loadingState').style.display = 'block';
        document.getElementById('notificationsContainer').style.display = 'none';
        document.getElementById('emptyState').style.display = 'none';
    }
   
    hideLoading() {
        document.getElementById('loadingState').style.display = 'none';
    }
   
    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: hsl(var(--success-color));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
       
        document.body.appendChild(toast);
       
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
       
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
   
    // Method to add new notification (for testing or external integration)
    addNotification(notification) {
        const newNotification = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            read: false,
            ...notification
        };
       
        this.notifications.unshift(newNotification);
        this.calculateUnreadCount();
        this.updateUnreadCounter();
        this.saveToStorage();
        this.filterAndRenderNotifications();
       
        this.showToast('New notification received');
    }
}
 
// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.notificationDashboard = new NotificationDashboard();

    // You can call this from browser console or integrate with actual API
    window.addSampleNotification = () => {
        const sampleNotifications = [
            {
                type: 'tasks',
                title: 'New Assignment Available',
                content: 'Complete the JavaScript fundamentals assignment by Friday.',
                priority: 'high',
                details: 'This assignment covers variables, functions, and DOM manipulation. Submit via the course portal.'
            },
            {
                type: 'updates',
                title: 'Course Schedule Update',
                content: 'Tomorrow\'s lecture has been moved to 2:00 PM.',
                priority: 'medium'
            },
            {
                type: 'announcements',
                title: 'Welcome to CAPACITI',
                content: 'Welcome to your student portal! Check here regularly for updates.',
                priority: 'low'
            }
        ];
       
        const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
        window.notificationDashboard.addNotification(randomNotification);
    };
});
 
// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// end of the Student notification page

