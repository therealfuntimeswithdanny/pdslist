// Load PDS data and populate tables
let allPDSData = []; // Store all data for filtering
let normalPDSData = []; // Regular PDSes
let bskyNetworkData = []; // PDSes with bsky.network

document.addEventListener('DOMContentLoaded', function() {
    loadPDSData();
    
    // Add event listeners for search and filters
    document.getElementById('search-input').addEventListener('input', filterData);
    document.querySelectorAll('input[name="invite-filter"]').forEach(radio => {
        radio.addEventListener('change', filterData);
    });
    
    // Add toggle button listeners
    document.getElementById('toggle-pds').addEventListener('click', function() {
        const section = document.getElementById('pds-section');
        const button = this;
        if (section.style.display === 'none') {
            section.style.display = 'block';
            button.textContent = '▼ PDSes';
        } else {
            section.style.display = 'none';
            button.textContent = '▶ PDSes';
        }
    });
    
    document.getElementById('toggle-bsky').addEventListener('click', function() {
        const section = document.getElementById('bsky-section');
        const button = this;
        if (section.style.display === 'none') {
            section.style.display = 'block';
            button.textContent = '▼ PDSes ran by Bluesky';
        } else {
            section.style.display = 'none';
            button.textContent = '▶ PDSes ran by Bluesky';
        }
    });
});

async function loadPDSData() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');
    const tableBody = document.getElementById('table-body');
    const bskyTableBody = document.getElementById('bsky-table-body');
    const noData = document.getElementById('no-data');
    const serverCount = document.getElementById('server-count');

    try {
        const response = await fetch('./pdslist.json');
        const pdsData = await response.json();
        allPDSData = pdsData; // Store for filtering

        // Separate PDSes by type
        normalPDSData = pdsData.filter(pds => !pds.supportedHandles.some(h => h.includes('bsky.network')));
        bskyNetworkData = pdsData.filter(pds => pds.supportedHandles.some(h => h.includes('bsky.network')));

        // Hide loading
        loading.style.display = 'none';
        content.style.display = 'block';

        if (pdsData.length === 0) {
            noData.style.display = 'block';
            return;
        }

        // Update server count
        serverCount.textContent = pdsData.length;

        // Populate normal PDSes table
        normalPDSData.forEach(pds => {
            const row = createTableRow(pds);
            tableBody.appendChild(row);
        });

        // Populate bsky.network PDSes table
        bskyNetworkData.forEach(pds => {
            const row = createTableRow(pds);
            bskyTableBody.appendChild(row);
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
    
    // Filter normal PDSes table
    const tableBody = document.getElementById('table-body');
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        const pds = normalPDSData[index];
        row.style.display = shouldShowRow(pds, searchTerm, inviteFilter) ? '' : 'none';
    });
    
    // Filter bsky.network PDSes table
    const bskyTableBody = document.getElementById('bsky-table-body');
    const bskyRows = bskyTableBody.querySelectorAll('tr');
    bskyRows.forEach((row, index) => {
        const pds = bskyNetworkData[index];
        row.style.display = shouldShowRow(pds, searchTerm, inviteFilter) ? '' : 'none';
    });
    
    updateFilteredCount();
}

function shouldShowRow(pds, searchTerm, inviteFilter) {
    // Apply search filter
    const searchMatch = !searchTerm || 
        pds.url.toLowerCase().includes(searchTerm) ||
        (pds.supportedHandles && pds.supportedHandles.some(h => h.toLowerCase().includes(searchTerm))) ||
        (pds.maintainer && pds.maintainer.toLowerCase().includes(searchTerm));
    
    // Apply invite filter
    const inviteMatch = inviteFilter === 'all' ||
        (inviteFilter === 'yes' && pds.inviteCodeRequired) ||
        (inviteFilter === 'no' && !pds.inviteCodeRequired);
    
    return searchMatch && inviteMatch;
}

function updateFilteredCount() {
    const tableBody = document.getElementById('table-body');
    const bskyTableBody = document.getElementById('bsky-table-body');
    const visibleRows = Array.from(tableBody.querySelectorAll('tr')).filter(row => row.style.display !== 'none').length;
    const visibleBskyRows = Array.from(bskyTableBody.querySelectorAll('tr')).filter(row => row.style.display !== 'none').length;
    document.getElementById('filtered-count').textContent = visibleRows + visibleBskyRows;
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
