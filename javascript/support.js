
        // Initialize App
        document.addEventListener('DOMContentLoaded', function() {
            setupFormHandlers();
        });

        // Form Handlers
        function setupFormHandlers() {
            document.getElementById('support-form').addEventListener('submit', function(e) {
                e.preventDefault();
                handleSupportTicket();
            });

            document.getElementById('description').addEventListener('input', validateDescription);
        }

        // UI Functions
        function handleSupportTicket() {
            const issueType = document.getElementById('issue-type').value;
            const description = document.getElementById('description').value;

            if (!issueType) {
                showAlert('Please select an issue type', 'danger');
                document.getElementById('issue-type').classList.add('invalid');
                return;
            }

            if (!validateDescription(description)) {
                showAlert('Description must be at least 10 characters long', 'danger');
                document.getElementById('description').classList.add('invalid');
                return;
            }

            showAlert(`Support ticket for ${issueType} submitted!`, 'success');
            document.getElementById('support-form').reset();
        }

        function resetForm() {
            document.getElementById('support-form').reset();
            document.querySelectorAll('.form-control').forEach(input => input.classList.remove('invalid'));
            showAlert('Form reset', 'success');
        }

        // Validation Functions
        function validateDescription(description) {
            const input = typeof description === 'string' ? description : description.target.value;
            const isValid = input.length >= 10;
            if (typeof description !== 'string') {
                description.target.classList.toggle('invalid', input && !isValid);
            }
            return isValid;
        }

        // Utility Functions
        function showAlert(message, type) {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type}`;
            alertDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'times'}-circle"></i> ${message}`;
            
            const container = document.querySelector('.container');
            if (container) {
                container.insertBefore(alertDiv, container.firstChild);
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.parentNode.removeChild(alertDiv);
                    }
                }, 3000);
            }
        }

        // Navigation Functions
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            const bankingMenu = document.getElementById('banking-menu');
            if (window.innerWidth <= 768) {
                bankingMenu.classList.toggle('active');
            } else {
                sidebar.classList.toggle('active');
            }
            overlay.classList.toggle('active');
        }

        function closeSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            const bankingMenu = document.getElementById('banking-menu');
            bankingMenu.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }

        function navigateAndClose(url) {
            closeSidebar();
            window.location.href = url;
        }

        function logoutAndClose() {
            closeSidebar();
            logout();
        }

        function verifyAccount() {
            alert('Please complete the verification process.');
        }

        function logout() {
            window.location.href = 'index.html';
        }

        // Keyboard Navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });

        // Responsive Handling
        window.addEventListener('resize', function() {
            // No automatic navigation update, rely on toggle
        });
   