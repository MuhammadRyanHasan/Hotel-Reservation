<?php
session_start();
if (!isset($_SESSION['authenticated']) && !isset($_COOKIE['login_status'])) 
    {
        header('Location:../UserAuthentication-R/Login.html');
    exit();
    }
?>
<html>
 <head>
     <title>Profile Management</title>
     <link rel="stylesheet" href="../../ASSET/CSS/ProfileManagement-R/ProfileManagement.css">
 </head>
 <body>
 <h1>Profile Management</h1>
 <div id="profileView">
     <p><strong>Name:</strong> <span id="displayName"></span></p>
     <p><strong>Email:</strong> <span id="displayEmail"></span></p>
     <p><img id="profileImage" src="" alt="Profile Image" width="100" height="100"></p>
     <button onclick="editProfile()">Edit Profile</button>
     <button onclick="changeAvatar()">Change Avatar</button>
     <button onclick="changePassword()">Change Password</button>
 </div>
 <div id="profileEdit" style="display:none;">
     <input type="text" id="editName" placeholder="Name">
     <input type="email" id="editEmail" placeholder="Email">
     <button onclick="saveProfile()">Save Changes</button>
     <button onclick="cancelEdit()">Cancel</button>
 </div>
 <div id="avatarChange" style="display:none;">
     <input type="file" id="avatarInput" accept="image/*">
     <button onclick="uploadAvatar()">Upload and Set Avatar</button>
     <button onclick="cancelAvatar()">Cancel</button>
 </div>
 <div id="passwordChange" style="display:none;">
     <input type="password" id="newPassword" placeholder="New Password">
     <input type="password" id="confirmPassword" placeholder="Confirm Password">
     <button onclick="updatePassword()">Update Password</button>
     <button onclick="cancelPassword()">Cancel</button>
 </div>
 <script src="../../ASSET/JS/ProfileManagement-R/ProfileManagement.js"></script>
 </body>
 </html>
