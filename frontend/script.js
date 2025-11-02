// Configuration
const EMAIL_BACKEND_URL = 'http://localhost:3000';
const INBOX_BACKEND_URL = 'http://localhost:8000';

// Tab Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Load tab-specific data
        if (tabName === 'inbox') {
            loadAccounts();
        } else if (tabName === 'settings') {
            checkBackendStatus();
        }
    });
});

// Send Single Email
document.getElementById('send-email-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultDiv = document.getElementById('send-result');
    resultDiv.className = 'result-message';
    resultDiv.textContent = 'Sending email...';
    resultDiv.classList.add('info');
    
    const formData = {
        from: document.getElementById('from-email').value,
        to: document.getElementById('to-email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        isHtml: document.getElementById('html-email').checked
    };
    
    try {
        const response = await fetch(`${EMAIL_BACKEND_URL}/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            resultDiv.className = 'result-message success';
            resultDiv.textContent = '✓ Email sent successfully!';
            document.getElementById('send-email-form').reset();
        } else {
            throw new Error(data.error || 'Failed to send email');
        }
    } catch (error) {
        resultDiv.className = 'result-message error';
        resultDiv.textContent = `✗ Error: ${error.message}`;
    }
});

// Send Bulk Email
document.getElementById('bulk-email-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultDiv = document.getElementById('bulk-result');
    resultDiv.className = 'result-message';
    resultDiv.textContent = 'Sending bulk emails...';
    resultDiv.classList.add('info');
    
    const formData = new FormData();
    formData.append('from', document.getElementById('bulk-from').value);
    formData.append('subject', document.getElementById('bulk-subject').value);
    formData.append('message', document.getElementById('bulk-message').value);
    formData.append('csv', document.getElementById('csv-file').files[0]);
    
    try {
        const response = await fetch(`${EMAIL_BACKEND_URL}/api/send-bulk`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            resultDiv.className = 'result-message success';
            resultDiv.textContent = `✓ Bulk emails sent successfully! Sent: ${data.sent || 0}, Failed: ${data.failed || 0}`;
            document.getElementById('bulk-email-form').reset();
        } else {
            throw new Error(data.error || 'Failed to send bulk emails');
        }
    } catch (error) {
        resultDiv.className = 'result-message error';
        resultDiv.textContent = `✗ Error: ${error.message}`;
    }
});

// Search Inbox
let searchInterval;
document.getElementById('inbox-search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const senderEmail = document.getElementById('sender-email').value;
    const subject = document.getElementById('search-subject').value;
    
    if (!senderEmail && !subject) {
        alert('Please provide at least one search criteria');
        return;
    }
    
    const statusDiv = document.getElementById('search-status');
    const resultsDiv = document.getElementById('search-results');
    
    statusDiv.className = 'search-status active';
    statusDiv.innerHTML = `
        <p>🔍 Searching emails...</p>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
        <p id="progress-text">Initializing search...</p>
    `;
    
    resultsDiv.innerHTML = '';
    
    try {
        // Start search
        const searchData = {};
        if (senderEmail) searchData.sender_email = senderEmail;
        if (subject) searchData.subject = subject;
        
        const response = await fetch(`${INBOX_BACKEND_URL}/api/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
        });
        
        const data = await response.json();
        const searchId = data.search_id;
        
        // Poll for results
        searchInterval = setInterval(async () => {
            try {
                const statusResponse = await fetch(`${INBOX_BACKEND_URL}/api/search/${searchId}/status`);
                const statusData = await statusResponse.json();
                
                const progress = (statusData.completed / statusData.total) * 100;
                document.querySelector('.progress-fill').style.width = `${progress}%`;
                document.getElementById('progress-text').textContent = 
                    `Checked ${statusData.completed} of ${statusData.total} accounts...`;
                
                // Display partial results
                if (statusData.results && statusData.results.length > 0) {
                    displayResults(statusData.results);
                }
                
                if (statusData.status === 'completed') {
                    clearInterval(searchInterval);
                    statusDiv.innerHTML = `
                        <p>✓ Search completed! Found ${statusData.results.length} results.</p>
                    `;
                    
                    if (statusData.results.length === 0) {
                        resultsDiv.innerHTML = '<p>No emails found matching your criteria.</p>';
                    }
                }
            } catch (error) {
                clearInterval(searchInterval);
                statusDiv.innerHTML = `<p class="error">Error checking status: ${error.message}</p>`;
            }
        }, 2000);
        
    } catch (error) {
        statusDiv.innerHTML = `<p class="error">✗ Error: ${error.message}</p>`;
    }
});

// Display Search Results
function displayResults(results) {
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '<h3>Search Results:</h3>';
    
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <h4>📧 ${result.account_email}</h4>
            <p><span class="badge ${result.folder}">${result.folder.toUpperCase()}</span></p>
            <p><strong>Provider:</strong> ${result.provider}</p>
            <p><strong>Time Received:</strong> ${result.time_received}</p>
        `;
        resultsDiv.appendChild(resultItem);
    });
}

// Load Accounts
async function loadAccounts() {
    const accountsList = document.getElementById('accounts-list');
    accountsList.innerHTML = '<div class="spinner"></div>';
    
    try {
        const response = await fetch(`${INBOX_BACKEND_URL}/api/accounts`);
        const data = await response.json();
        
        if (data.accounts && data.accounts.length > 0) {
            accountsList.innerHTML = '';
            data.accounts.forEach(account => {
                const accountItem = document.createElement('div');
                accountItem.className = 'account-item';
                
                const icon = getProviderIcon(account.provider);
                
                accountItem.innerHTML = `
                    <div class="account-icon">${icon}</div>
                    <div class="account-info">
                        <h4>${account.email}</h4>
                        <p>Provider: ${account.provider}</p>
                    </div>
                `;
                accountsList.appendChild(accountItem);
            });
        } else {
            accountsList.innerHTML = '<p>No email accounts configured. Please add accounts in config.json</p>';
        }
    } catch (error) {
        accountsList.innerHTML = `<p class="error">Error loading accounts: ${error.message}</p>`;
    }
}

// Get Provider Icon
function getProviderIcon(provider) {
    const icons = {
        'gmail': '📮',
        'yahoo': '📬',
        'outlook': '📧',
        'hotmail': '📧'
    };
    return icons[provider.toLowerCase()] || '📧';
}

// Refresh Accounts
document.getElementById('refresh-accounts').addEventListener('click', loadAccounts);

// Check Backend Status
async function checkBackendStatus() {
    const emailStatus = document.getElementById('email-backend-status');
    const inboxStatus = document.getElementById('inbox-backend-status');
    
    emailStatus.className = 'status-indicator checking';
    emailStatus.textContent = 'Checking...';
    inboxStatus.className = 'status-indicator checking';
    inboxStatus.textContent = 'Checking...';
    
    // Check Email Backend
    try {
        const response = await fetch(`${EMAIL_BACKEND_URL}/api/health`, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (response.ok) {
            emailStatus.className = 'status-indicator online';
            emailStatus.textContent = '✓ Online';
        } else {
            throw new Error('Not responding');
        }
    } catch (error) {
        emailStatus.className = 'status-indicator offline';
        emailStatus.textContent = '✗ Offline';
    }
    
    // Check Inbox Backend
    try {
        const response = await fetch(`${INBOX_BACKEND_URL}/api/accounts`);
        
        if (response.ok) {
            inboxStatus.className = 'status-indicator online';
            inboxStatus.textContent = '✓ Online';
        } else {
            throw new Error('Not responding');
        }
    } catch (error) {
        inboxStatus.className = 'status-indicator offline';
        inboxStatus.textContent = '✗ Offline';
    }
}

// Test Connection Button
document.getElementById('test-connection').addEventListener('click', checkBackendStatus);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('KingMailer initialized');
    console.log('Email Backend:', EMAIL_BACKEND_URL);
    console.log('Inbox Backend:', INBOX_BACKEND_URL);
});
