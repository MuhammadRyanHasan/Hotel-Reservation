<?php

require_once('../../CONTROLLER/sessioncheck.php');
echo "Welcome, " . htmlspecialchars($_SESSION['email']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Reservation - Guest Profiles</title>
    <link rel="stylesheet" href="../../ASSET/CSS/GuestProfiles-F/guestprofile.css">
    
</head>
<body>
    <div class="container">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="user-profile">
                <div class="avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <h3 class="user-name">John Doe</h3>
                <p class="user-status">Gold Member</p>
            </div>
            <nav class="side-menu">
                <ul>
                    <li>
                        <a href="#" id="preference-tab" class="active">
                            <i class="fas fa-sliders-h"></i>
                            <span>Preference Center</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" id="history-tab">
                            <i class="fas fa-history"></i>
                            <span>Stay History</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" id="loyalty-tab">
                            <i class="fas fa-award"></i>
                            <span>Loyalty Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" id="profile-tab">
                            <i class="fas fa-user"></i>
                            <span>My Profile</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>

        
        <main class="main-content">
            
            <section id="user-profile" class="profile-section">
                <div class="profile-header">
                    <h2>My Profile</h2>
                    <button class="edit-btn">Edit Profile</button>
                </div>
                
                <div class="photo-upload-section">
                    <div class="current-photo">
                        <?php if (isset($_SESSION['profile_photo']) && !empty($_SESSION['profile_photo'])): ?>
                            <img src="../../<?php echo htmlspecialchars($_SESSION['profile_photo']); ?>" alt="Profile Photo" class="profile-photo-large">
                        <?php else: ?>
                            <div class="no-photo">
                                <i class="fas fa-camera"></i>
                                <p>No photo uploaded</p>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="photo-upload-controls">
                        <input type="file" id="photo-upload" accept="image/*" style="display:none;">
                        <button type="button" class="upload-btn" id="upload-btn">
                            <i class="fas fa-upload"></i> Upload Photo
                        </button>
                        <?php if (isset($_SESSION['profile_photo']) && !empty($_SESSION['profile_photo'])): ?>
                            <button type="button" class="remove-btn" id="remove-photo-btn">
                                <i class="fas fa-trash"></i> Remove Photo
                            </button>
                        <?php endif; ?>
                        <div class="upload-progress" id="upload-progress" style="display:none;">
                            <div class="progress-bar">
                                <div class="progress-fill"></div>
                            </div>
                            <span class="progress-text"></span>
                        </div>
                    </div>
                </div>
                <div class="profile-details">
                    <div class="detail-row">
                        <span class="detail-label">Full Name:</span>
                        <span class="detail-value">John Michael Doe</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">john.doe@example.com</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value">+88012345678901</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date of Birth:</span>
                        <span class="detail-value">May 15, 1985</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Address:</span>
                        <span class="detail-value">House-10, Road-2, Block-D, Mirpur-20, Dhaka-1216</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Nationality:</span>
                        <span class="detail-value">Bangladesh</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Passport Number:</span>
                        <span class="detail-value">BD12345678</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Member Since:</span>
                        <span class="detail-value">January 2018</span>
                    </div>
                </div>
            </section>

            
            <section id="preference-center" class="profile-section active">
                <h2>Preference Center</h2>
                <form id="preference-form">
                    <div class="form-group">
                        <label for="room-type">Preferred Room Type:</label>
                        <select id="room-type" name="room-type">
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="suite">Suite</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Floor Preference:</label>
                        <div class="radio-group">
                            <label><input type="radio" name="floor" value="low"> Lower floors (1-5)</label>
                            <label><input type="radio" name="floor" value="mid"> Middle floors (6-15)</label>
                            <label><input type="radio" name="floor" value="high"> Higher floors (16+)</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>View Preference:</label>
                        <div class="radio-group">
                            <label><input type="radio" name="view" value="city"> City View</label>
                            <label><input type="radio" name="view" value="park"> Park View</label>
                            <label><input type="radio" name="view" value="ocean"> Ocean View</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="allergies">Allergies/Special Needs:</label>
                        <textarea id="allergies" name="allergies" placeholder="List any allergies or special needs..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="accessibility">Accessibility Requirements:</label>
                        <select id="accessibility" name="accessibility" multiple>
                            <option value="wheelchair">Wheelchair accessible room</option>
                            <option value="hearing">Hearing accessible</option>
                            <option value="visual">Visual aids</option>
                            <option value="service-animal">Service animal accommodation</option>
                        </select>
                        <small>Hold Ctrl/Cmd to select multiple options</small>
                    </div>
                    <button type="submit" class="save-btn">Save Preferences</button>
                </form>
            </section>

            
            <section id="stay-history" class="profile-section">
                <h2>Stay History</h2>
                <div class="history-container">
                    <div class="history-filter">
                        <label for="history-year">Filter by Year:</label>
                        <select id="history-year">
                            <option value="all">All Years</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                        </select>
                    </div>
                    <div class="history-list">
                       
                    </div>
                </div>
            </section>

            
            <section id="loyalty-dashboard" class="profile-section">
                <h2>Loyalty Dashboard</h2>
                <div class="loyalty-status">
                    <div class="tier-display">
                        <div class="tier-icon gold"></div>
                        <h3>Gold Member</h3>
                        <p>Next tier: Platinum (5,000 more points)</p>
                    </div>
                    <div class="points-display">
                        <h3>Your Points</h3>
                        <div class="points-meter">
                            <div class="points-progress" style="width: 60%;"></div>
                        </div>
                        <p class="points-total">7,500 / 12,500 points</p>
                    </div>
                </div>
                <div class="benefits-container">
                    <h3>Your Benefits</h3>
                    <ul class="benefits-list">
                        <li>Late checkout (2pm)</li>
                        <li>Room upgrade when available</li>
                        <li>Welcome amenity</li>
                        <li>10% discount on dining</li>
                    </ul>
                </div>
                <div class="upcoming-rewards">
                    <h3>Upcoming Rewards</h3>
                    <div class="rewards-grid">
                        <div class="reward-card">
                            <div class="reward-icon">🏨</div>
                            <h4>Free Night</h4>
                            <p>15,000 points</p>
                        </div>
                        <div class="reward-card">
                            <div class="reward-icon">🍽️</div>
                            <h4>Dining Credit</h4>
                            <p>5,000 points</p>
                        </div>
                        <div class="reward-card">
                            <div class="reward-icon">🛎️</div>
                            <h4>Spa Treatment</h4>
                            <p>8,000 points</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    <a href="../../CONTROLLER/Logout_F.php" class="logout-btn">Logout</a>
    <script src="../../ASSET/JS/GuestProfile-F/guestprofile.js"></script>
</body>
</html>