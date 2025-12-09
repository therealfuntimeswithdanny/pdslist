// Load PDS data and populate table
document.addEventListener('DOMContentLoaded', function() {
    loadPDSData();
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

    } catch (error) {
        console.error('Error loading PDS data:', error);
        loading.innerHTML = '<p style="color: red;">Error loading database. Please check console.</p>';
    }
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
    
    // Handles
    const handlesCell = document.createElement('td');
    if (pds.supportedHandles && pds.supportedHandles.length > 0) {
        handlesCell.textContent = pds.supportedHandles.join(', ');
    } else {
        handlesCell.textContent = 'N/A';
    }
    row.appendChild(handlesCell);
    
    // Maintainer
    const maintainerCell = document.createElement('td');
    if (pds.maintainer) {
        const link = document.createElement('a');
        link.href = `https://bsky.app/profile/${pds.maintainer}`;
        link.target = '_blank';
        link.textContent = pds.maintainer;
        maintainerCell.appendChild(link);
    } else {
        maintainerCell.textContent = 'N/A';
    }
    row.appendChild(maintainerCell);
    
    // Contact Email
    const emailCell = document.createElement('td');
    if (pds.contactEmail) {
        const link = document.createElement('a');
        link.href = `mailto:${pds.contactEmail}`;
        link.textContent = pds.contactEmail;
        emailCell.appendChild(link);
    } else {
        emailCell.textContent = 'N/A';
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
