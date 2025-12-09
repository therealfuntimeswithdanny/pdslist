// Load PDS data and populate table
let allPDSData = []; // Store all data for filtering

document.addEventListener('DOMContentLoaded', function() {
    loadPDSData();
    
    // Add event listeners for search and filters
    document.getElementById('search-input').addEventListener('input', filterData);
    document.querySelectorAll('input[name="invite-filter"]').forEach(radio => {
        radio.addEventListener('change', filterData);
    });
});

async function loadPDSData() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');
    const tableBody = document.getElementById('table-body');
    const noData = document.getElementById('no-data');
    const serverCount = document.getElementById('server-count');

    try {
        const response = await fetch('./pdslist.json');
        const pdsData = await response.json();
        allPDSData = pdsData; // Store for filtering

        // Hide loading
        loading.style.display = 'none';
        content.style.display = 'block';

        if (pdsData.length === 0) {
            noData.style.display = 'block';
            return;
        }

        // Update server count
        serverCount.textContent = pdsData.length;

        // Populate table
        pdsData.forEach(pds => {
            const row = createTableRow(pds);
            tableBody.appendChild(row);
        });
        
        updateFilteredCount();

    } catch (error) {
        console.error('Error loading PDS data:', error);
        loading.innerHTML = '<p style="color: red;">Error loading database. Please check console.</p>';
    }
}

function filterData() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const inviteFilter = document.querySelector('input[name="invite-filter"]:checked').value;
    const tableBody = document.getElementById('table-body');
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach((row, index) => {
        const pds = allPDSData[index];
        
        // Apply search filter
        const searchMatch = !searchTerm || 
            pds.url.toLowerCase().includes(searchTerm) ||
            (pds.supportedHandles && pds.supportedHandles.some(h => h.toLowerCase().includes(searchTerm))) ||
            (pds.maintainer && pds.maintainer.toLowerCase().includes(searchTerm));
        
        // Apply invite filter
        const inviteMatch = inviteFilter === 'all' ||
            (inviteFilter === 'yes' && pds.inviteCodeRequired) ||
            (inviteFilter === 'no' && !pds.inviteCodeRequired);
        
        row.style.display = (searchMatch && inviteMatch) ? '' : 'none';
    });
    
    updateFilteredCount();
}

function updateFilteredCount() {
    const tableBody = document.getElementById('table-body');
    const visibleRows = Array.from(tableBody.querySelectorAll('tr')).filter(row => row.style.display !== 'none').length;
    document.getElementById('filtered-count').textContent = visibleRows;
}

function createTableRow(pds) {
    const row = document.createElement('tr');
    
    // URL
    const urlCell = document.createElement('td');
    const urlLink = document.createElement('a');
    urlLink.href = pds.url;
    urlLink.target = '_blank';
    urlLink.textContent = pds.url;
    urlCell.appendChild(urlLink);
    row.appendChild(urlCell);
    
    // Handles - stacked vertically
    const handlesCell = document.createElement('td');
    handlesCell.style.whiteSpace = 'pre-line';
    if (pds.supportedHandles && pds.supportedHandles.length > 0) {
        handlesCell.textContent = pds.supportedHandles.join('\n');
    } else {
        handlesCell.textContent = 'N/A';
    }
    row.appendChild(handlesCell);
    
    // Contact Email
    const emailCell = document.createElement('td');
    if (pds.contactEmail) {
        const link = document.createElement('a');
        link.href = `mailto:${pds.contactEmail}`;
        link.textContent = pds.contactEmail;
        emailCell.appendChild(link);
    } else {
        emailCell.textContent = '—';
    }
    row.appendChild(emailCell);
    
    // Invite Code Required
    const inviteCell = document.createElement('td');
    inviteCell.textContent = pds.inviteCodeRequired ? 'Yes' : 'No';
    row.appendChild(inviteCell);
    
    // Terms of Service
    const tosCell = document.createElement('td');
    if (pds.tosUrl) {
        const link = document.createElement('a');
        link.href = pds.tosUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Link';
        tosCell.appendChild(link);
    } else {
        tosCell.textContent = '—';
    }
    row.appendChild(tosCell);
    
    // Privacy Policy
    const privacyCell = document.createElement('td');
    if (pds.privacyUrl) {
        const link = document.createElement('a');
        link.href = pds.privacyUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Link';
        privacyCell.appendChild(link);
    } else {
        privacyCell.textContent = '—';
    }
    row.appendChild(privacyCell);
    
    return row;
}
