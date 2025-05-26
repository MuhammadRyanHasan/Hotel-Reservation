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
<table border="1">
  <tr>
    <th colspan="2">Navigation</th>
  </tr>
  <tr>
    <td><a href="../LandingPage-R/LandingPage.html">Landing Page</a></td>
    <td><a href="../ProfileManagement-R/ProfileManagement.php">Profile Management</a></td>
  </tr>
  <tr>
    <td><a href="../BillingSummary-R/BillingSymmary.php">Billing Summary</a></td>
    <td><a href="../DataExport-R/DataExport.php">Data Export</a></td>
  </tr>
  <tr>
    <td><a href="../ReviewSystem-R/ReviewSystem.php">Review System</a></td>
    <td><a href="../CancellationPolicy-R/CancellationPolicy.php">Cancellation Policy</a></td>
  </tr>
  <tr>
    <td><a href="../ConciergeRequests-R/ConciergeRequests.php">Concierge Requests</a></td>
    <td><a href="../JSON-R/Json.html">JSON</a></td>
  </tr>
  <tr>
    <td colspan="2"><a href="../../CONTROLLER/Logout.php">Logout</a></td>
  </tr>
</table>
<table border="1">
  <tr>
    <th colspan="2">User MGT</th>
  </tr>
  <tr>
    <td>
      <h3>Update User</h3>
      <form method="post" action="../../MODEL/Update.php">
        <table>
          <tr>
            <td><label>Email of user:</label></td>
            <td><input type="text" name="email" value=""/></td>
          </tr>
          <tr>
            <td><label>Update First Name:</label></td>
            <td><input type="text" name="fname" value=""/></td>
          </tr>
          <tr>
            <td colspan="2">
              <input type="submit" name="submit" value="Submit Update"/>
            </td>
          </tr>
        </table>
      </form>
    </td>
    <td>
      <h3>Delete User</h3>
      <form method="post" action="../../MODEL/Delete.php">
        <table>
          <tr>
            <td><label>Email of user:</label></td>
            <td><input type="text" name="email" value=""/></td>
          </tr>
          <tr>
            <td colspan="2">
              <input type="submit" name="submit" value="Submit Delete"/>
            </td>
          </tr>
        </table>
      </form>
    </td>
  </tr>
</table>
<body>
</html>