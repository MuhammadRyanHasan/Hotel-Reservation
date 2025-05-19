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
    <title>Review System</title>
    <link rel="stylesheet" href="../../ASSET/CSS/ReviewSystem-R/ReviewSystem.css">
</head>
<body>
    <h2>Submit a Review</h2>
    <form onsubmit="return submitReview()">
        <label>Your Name:</label>
        <input type="text" id="name" name="name" value="" required><br><br>
        <label>Rating:</label><br>
        <input type="radio" name="rating" value="1"> 1
        <input type="radio" name="rating" value="2"> 2
        <input type="radio" name="rating" value="3"> 3
        <input type="radio" name="rating" value="4"> 4
        <input type="radio" name="rating" value="5"> 5<br><br>
        <label>Comment:</label><br>
        <textarea id="comment" name="comment" rows="4" cols="50" required></textarea><br><br>
        <label>Traveler Type:</label>
        <select id="traveler-type-input" name="traveler-type">
            <option value="Solo">Solo</option>
            <option value="Couple">Couple</option>
            <option value="Family">Family</option>
            <option value="Business">Business</option>
        </select><br><br>
        <button type="submit">Submit Review</button>
    </form>
    <h2>Filter Reviews</h2>
    <label>Traveler Type:</label>
    <select id="traveler-type" onchange="filterReviews()">
        <option value="All">All</option>
        <option value="Solo">Solo</option>
        <option value="Couple">Couple</option>
        <option value="Family">Family</option>
        <option value="Business">Business</option>
    </select>
    <h2>Reviews</h2>
    <div id="review-output"></div>
    <script src="../../ASSET/JS/ReviewSystem-R/ReviewSystem.js"></script>
</body>
</html>
