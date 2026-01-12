<?php
// Start the session
session_start();

// Check if user is already logged in
/*if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: cart.html");
    exit;
}
*/
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Check if the user clicked the sign up button
    if(isset($_POST["login"])){
        header("location: register.php");
        exit;
    }

    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }

    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }

    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Create connection to MySQL database
        $servername = "localhost";
        $username_db = "userphp"; // Change this to your MySQL username
        $password_db = "sql123"; // Change this to your MySQL password
        $dbname = "Userdatabase"; // Change this to your MySQL database name

        $conn = mysqli_connect($servername, $username_db, $password_db, $dbname);

        // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        // Prepare a select statement
        $sql = "SELECT id, password FROM users WHERE username = ?";

        // Check if statement was successfully prepared
        if($stmt = mysqli_prepare($conn, $sql)){

            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            // Set parameters
            $param_username = $username;

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);

                // Check if username exists
                if(mysqli_stmt_num_rows($stmt) == 1){
                    // Bind the result variables
                    mysqli_stmt_bind_result($stmt, $id, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        // Verify password
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, start a new session
                            session_start();

                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;

                            // Redirect user to welcome page
                            header("location: cart.html");
                        } else{
                            // Password is not correct
                            $password_err = "The password you entered was not valid.";
                        }
                    }
                } else{
                    // Username doesn't exist
                    $username_err = "No account found with that username.";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }

        // Close connection
        mysqli_close($conn);
    }
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        .wrapper{ width: 350px; padding: 20px; }
    </style>
</head>
<body>
    <div class="wrapper">
    Sign Up</h2>
<p>Please fill in this form to create an account.</p>
<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
<div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
<label>Username:<sup></sup></label>
<input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
<span class="help-block"><?php echo $username_err; ?></span>
</div>
<div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
<label>Password:<sup></sup></label>
<input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
<span class="help-block"><?php echo $password_err; ?></span>
</div>
<div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
<label>Confirm Password:<sup>*</sup></label>
<input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>">
<span class="help-block"><?php echo $confirm_password_err = ""; ?></span>
</div>
<div class="form-group">
<input type="submit" class="btn btn-primary" value="Submit">
<input type="reset" class="btn btn-default" value="Reset">
</div>
</form>
</div>

</body>
</html>