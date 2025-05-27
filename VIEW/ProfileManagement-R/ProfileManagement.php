<?php
require_once('../../MODEL/userModel.php'); 
session_start();
if (!isset($_SESSION['authenticated']) && !isset($_COOKIE['login_status'])) {
    header('Location: Login.html');
    exit();
} 
$email = $_SESSION['email'];
$useremail = ['email'=> $email];
$status = mysqli_fetch_assoc(user($useremail));
?>


<?php if ($status) {?>
    <H1>Profile Information</h1>
<table border="1"> 
    <tr>
        <td>ID</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Password</td>
        <td>Role</td>
    </tr>
    <?php if ($status) { ?>
    <tr>
        <td><?php echo $status['user_id']; ?></td>
        <td><?=$status['fname']?></td>
        <td><?=$status['lname']?></td>
        <td><?=$status['email']?></td>
        <td><?=$status['phone']?></td>
        <td><?=$status['password']?></td>
        <td><?=$status['role']?></td>
    </tr>
    <?php } ?>
</table>

<br>
<form method="post" action="../../MODEL/Update.php">
    <input type="hidden" name="email" value="<?=$status['email']?>">
    <h1> Update Profile </h1>
    <table border="1">
        <tr>
            <td>First Name:</td>
            <td><input type="text" name="fname" value=""></td>
        </tr>
        <tr>
            <td>Last Name:</td>
            <td><input type="text" name="lname" value=""></td>
        </tr>
        <tr>
            <td>Phone:</td>
            <td><input type="text" name="phone" value=""></td>
        </tr>
        <tr>
            <td>Password:</td>
            <td><input type="password" name="password" value=""></td>
        </tr>
        <tr>
            <td colspan="2"><button type="submit" name="submit" value="submit">Update</button></td>
        </tr>
    </table>
</form>
<h1> Delete USER! <h1>
    <form method="post" action="../../MODEL/Delete.php">
        <table>
          <tr>
            <td><label>Enter Email for Confirmation!</label></td>
            <td><input type="text" name="email" value=""/></td>
          </tr>
          <tr>
            <td colspan="2">
              <input type="submit" name="submit" value="Delete"/>
            </td>
          </tr>
        </table>
      </form>
<?php }
else
{echo "NO SUCH USERS EXIST!";} ?>