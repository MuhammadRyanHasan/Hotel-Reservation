function editProfile() {
    document.getElementById('profileView').style.display = 'none';
    document.getElementById('profileEdit').style.display = 'block';
    document.getElementById('editName').value = document.getElementById('displayName').innerText;
    document.getElementById('editEmail').value = document.getElementById('displayEmail').innerText;
}

function saveProfile() {
    document.getElementById('displayName').innerText = document.getElementById('editName').value;
    document.getElementById('displayEmail').innerText = document.getElementById('editEmail').value;
    document.getElementById('profileEdit').style.display = 'none';
    document.getElementById('profileView').style.display = 'block';
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
