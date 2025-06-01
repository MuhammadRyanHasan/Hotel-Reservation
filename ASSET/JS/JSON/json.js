
            function ajax(){
                let name = document.getElementById('name').value || 'Ryan';
                let email = document.getElementById('email').value || 'r@r.com';
                let password = document.getElementById('password').value || '1234';
                let json = {
                    'name': name,
                    'email': email,
                    'password': password
                }
                let data = JSON.stringify(json);
                let xhttp = new XMLHttpRequest();
                xhttp.open('POST', 'update.php', true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.onreadystatechange = function (){
                    if(this.readyState == 4 && this.status == 200){
                        document.getElementById('default-values').style.display = 'none';
                        document.getElementById('response').innerHTML = this.responseText;
                    }
                }
                xhttp.send('json='+data);
            }
    