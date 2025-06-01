<?php



require_once('../../CONTROLLER/sessioncheck.php');


if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    
    echo "Access denied. Admin privileges required.";
    exit();
}


echo "Welcome, " . htmlspecialchars($_SESSION['email']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Housekeeping Management</title>
  <link rel="stylesheet" href="../../ASSET/CSS/HouseKeepStat-F/styles.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
</head>
<body>
  <div class="container">
    
    <header class="header" role="banner">
      <h1>Housekeeping Management</h1>
      <nav class="tabs" aria-label="Main Tabs">
        <button class="tab-btn active" data-tab="room-status" aria-selected="true">Room Status Board</button>
        <button class="tab-btn" data-tab="maintenance" aria-selected="false">Maintenance Tracker</button>
        <button class="tab-btn" data-tab="turnover" aria-selected="false">Turnover Alert</button>
      </nav>
      <div class="real-time-indicator" aria-live="polite">
        <i class="fas fa-circle" aria-hidden="true"></i>
        <span>Live Updates</span>
      </div>
    </header>

    
    <main class="main-content" role="main">
      
      <section id="room-status" class="tab-content active" aria-labelledby="room-status-tab">
        <form class="status-filters" autocomplete="off">
          <div class="filter-group">
            <label for="floor-filter">Floor:</label>
            <select id="floor-filter">
              <option value="all">All Floors</option>
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="status-filter">Status:</label>
            <select id="status-filter">
              <option value="all">All Statuses</option>
              <option value="dirty">Dirty</option>
              <option value="in-progress">In Progress</option>
              <option value="clean">Clean</option>
              <option value="inspected">Inspected</option>
            </select>
          </div>
          <button id="refresh-btn" class="refresh-btn" type="button">
            <i class="fas fa-sync-alt"></i> Refresh
          </button>
        </form>
        <div class="room-grid" id="room-grid"></div>
      </section>

      <!-- Maintenance Tracker -->
      <section id="maintenance" class="tab-content" aria-labelledby="maintenance-tab">
        <div class="maintenance-actions">
          <button id="new-issue-btn" class="new-issue-btn" type="button">
            <i class="fas fa-plus"></i> Report New Issue
          </button>
          <div class="maintenance-filters">
            <select id="priority-filter">
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select id="maintenance-status-filter">
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
        <div class="issues-list" id="issues-list"></div>
      </section>

      <!-- Turnover Alert -->
      <section id="turnover" class="tab-content" aria-labelledby="turnover-tab">
        <div class="turnover-header">
          <h2>Upcoming Room Turnovers</h2>
          <div class="time-filter">
            <label for="time-window">Show turnovers within:</label>
            <select id="time-window">
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="4" selected>4 hours</option>
              <option value="8">8 hours</option>
            </select>
          </div>
        </div>
        <div class="turnover-list" id="turnover-list"></div>
      </section>
    </main>

    <!-- Maintenance Issue Modal -->
    <dialog id="issue-modal" class="modal" aria-modal="true">
      <div class="modal-content">
        <button class="close-btn" aria-label="Close">&times;</button>
        <h2>Report Maintenance Issue</h2>
        <form id="issue-form" autocomplete="off">
          <div class="form-group">
            <label for="room-number">Room Number</label>
            <input type="text" id="room-number" required />
          </div>
          <div class="form-group">
            <label for="issue-type">Issue Type</label>
            <select id="issue-type" required>
              <option value="">Select issue type</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="furniture">Furniture</option>
              <option value="appliance">Appliance</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="issue-priority">Priority</label>
            <select id="issue-priority" required>
              <option value="high">High</option>
              <option value="medium" selected>Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div class="form-group">
            <label for="issue-description">Description</label>
            <textarea id="issue-description" rows="4" required></textarea>
          </div>
          <div class="form-group">
            <label for="issue-image">Upload Image (Optional)</label>
            <input type="file" id="issue-image" accept="image/*" />
          </div>
          <button type="submit" class="submit-btn">Submit Issue</button>
        </form>
      </div>
    </dialog>

    <!-- Room Detail Modal -->
    <dialog id="room-modal" class="modal" aria-modal="true">
      <div class="modal-content">
        <button class="close-btn" aria-label="Close">&times;</button>
        <div class="modal-header">
          <h2 id="room-modal-title">Room 101</h2>
          <div class="room-status-badge" id="room-status-badge">Clean</div>
        </div>
        <div class="modal-body">
          <div class="room-info">
            <div class="info-item"><span class="info-label">Floor:</span><span class="info-value" id="room-floor">1</span></div>
            <div class="info-item"><span class="info-label">Type:</span><span class="info-value" id="room-type">Standard</span></div>
            <div class="info-item"><span class="info-label">Last Cleaned:</span><span class="info-value" id="room-last-cleaned">Today, 10:30 AM</span></div>
            <div class="info-item"><span class="info-label">Inspected By:</span><span class="info-value" id="room-inspected-by">Maria G.</span></div>
          </div>
          <div class="cleaning-progress">
            <h3>Cleaning Progress</h3>
            <div class="progress-steps">
              <div class="step completed"><div class="step-icon"><i class="fas fa-check"></i></div><div class="step-label">Bathroom</div></div>
              <div class="step completed"><div class="step-icon"><i class="fas fa-check"></i></div><div class="step-label">Bedding</div></div>
              <div class="step in-progress"><div class="step-icon"><i class="fas fa-spinner"></i></div><div class="step-label">Vacuuming</div></div>
              <div class="step pending"><div class="step-icon"><i class="fas fa-clock"></i></div><div class="step-label">Inspection</div></div>
            </div>
          </div>
          <div class="action-buttons">
            <button class="action-btn mark-clean"><i class="fas fa-broom"></i> Mark as Clean</button>
            <button class="action-btn mark-inspected"><i class="fas fa-clipboard-check"></i> Mark as Inspected</button>
            <button class="action-btn request-maintenance"><i class="fas fa-tools"></i> Request Maintenance</button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
  <a href="../../CONTROLLER/Logout_F.php" class="logout-btn">Logout</a>
  <script src="../../ASSET/JS/HouseKeepStat-F/script.js"></script>
</body>
</html>