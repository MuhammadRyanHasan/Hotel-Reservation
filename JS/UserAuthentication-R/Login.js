        function validateLoginForm() 
        {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            if (email == "" || password == "") {
                alert("Please fill out both fields.");
                return false;
            }
            return true;
        }