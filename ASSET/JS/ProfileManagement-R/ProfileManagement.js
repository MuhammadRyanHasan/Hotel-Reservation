function editProfile() {
     document.getElementById('profileView').style.display = 'none';
     document.getElementById('profileEdit').style.display = 'block';
     document.getElementById('editEmail').value = document.getElementById('displayEmail').innerText;
 }
 function saveProfile(){
    const email=document.getElementById('editEmail').value;
    function isValidEmail(email)
    {
    const atIndex=email.indexOf('@');
    const dotIndex=email.lastIndexOf('.');
    if(atIndex<=0||atIndex===email.length-1)
        {return false;}
    if(dotIndex<atIndex+2||dotIndex===email.length-1)
        {return false;}
    if(email.indexOf('@',atIndex+1)!==-1)
        {return false;}
    return true;
    }
    if(!isValidEmail(email))
    {alert('Please enter a valid email address.');return;}
    document.getElementById('displayName').innerText=document.getElementById('editName').value;
    document.getElementById('displayEmail').innerText=email;
    document.getElementById('profileEdit').style.display='none';
    document.getElementById('profileView').style.display='block';
 }
 function cancelEdit() {
     document.getElementById('profileEdit').style.display = 'none';
     document.getElementById('profileView').style.display = 'block';
 }
 function changeAvatar() {
     document.getElementById('profileView').style.display = 'none';
     document.getElementById('avatarChange').style.display = 'block';
 }
 function uploadAvatar() {
     let file = document.getElementById('avatarInput').files[0];
     if (file) {
         let reader = new FileReader();
         reader.onload = function(e) {
             document.getElementById('profileImage').src = e.target.result;
         }
         reader.readAsDataURL(file);
     }
     document.getElementById('avatarChange').style.display = 'none';
     document.getElementById('profileView').style.display = 'block';
 }
 function cancelAvatar() {
     document.getElementById('avatarChange').style.display = 'none';
     document.getElementById('profileView').style.display = 'block';
 }
 function changePassword() {
     document.getElementById('profileView').style.display = 'none';
     document.getElementById('passwordChange').style.display = 'block';
 }
 function updatePassword() {
     let newPassword = document.getElementById('newPassword').value;
     let confirmPassword = document.getElementById('confirmPassword').value;
     if (newPassword === '' || confirmPassword === '') {
         alert('Please fill out both fields.');
         return;
     }
     if (newPassword !== confirmPassword) {
         alert('Passwords do not match.');
         return;
     }
     alert('Password updated.');
     document.getElementById('passwordChange').style.display = 'none';
     document.getElementById('profileView').style.display = 'block';
 }
 function cancelPassword() {
     document.getElementById('passwordChange').style.display = 'none';
     document.getElementById('profileView').style.display = 'block';
 }
