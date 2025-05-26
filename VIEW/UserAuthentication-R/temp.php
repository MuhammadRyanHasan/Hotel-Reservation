<?php
session_start();
if (!isset($_SESSION['authenticated']) && !isset($_COOKIE['login_status'])) 
    {
    header('Location: Login.html');
    exit();
    }
?>
<html>
<body>
<br>
<a href="../BillingSummary-R/BillingSymmary.php">BillingSummary</a> <br>
<a href="../LandingPage-R/LandingPage.html">LandingPage</a><br>
<a href="../ReviewSystem-R/ReviewSystem.php">ReviewSystem</a><br>
<a href="../ProfileManagement-R/ProfileManagement.php">ProfileManagement</a><br>
<a href="../DataExport-R/DataExport.php">DataExport</a><br>
<a href="../CancellationPolicy-R/CancellationPolicy.php">CancellationPolicy</a><br>
<a href="../ConciergeRequests-R/ConciergeRequests.php">ConciergeRequests</a><br>
<a href="../../CONTROLLER/Logout.php">Logout</a><br>
<a href="../JSON-R/Json.html">JSON</a><br>
<form method="post" action="../../CONTROLLER/Update.php" >
    Email of user : <input type="text" name="email" value=""/>
    Update Fname : <input type="text" name="fname" value=""/>
    <input type="submit" name="submit" value="submit" />
</form>
<form method="post" action="../../CONTROLLER/Delete.php" >
    Delete Fname
    Email of user : <input type="text" name="email" value=""/>
    <input type="submit" name="submit" value="submit" />
</form>







<body>
</html>