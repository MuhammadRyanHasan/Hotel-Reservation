
            function ajax(){
                let fname = document.getElementById('fname').value;
                let lname = document.getElementById('lname').value;
                let email = document.getElementById('email').value;
                let password = document.getElementById('password').value;
                let tel = document.getElementById('phone').value;
                let json = {
                    'fname': fname,
                    'lname': lname,
                    'email': email,
                    'password': password,
                    'tel' : tel
                }
                let data = JSON.stringify(json);
                let xhttp = new XMLHttpRequest();
                xhttp.open('POST', 'AJAXJSON.php', true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.onreadystatechange = function (){
                    if(this.readyState == 4 && this.status == 200){
                        document.getElementById('response').innerHTML = this.responseText;
                    }
                }
                xhttp.send('json='+data);
            }
    