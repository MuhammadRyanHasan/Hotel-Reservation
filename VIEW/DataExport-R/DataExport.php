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
    <title>Data Export Tool</title>
    <link rel="stylesheet" href="../../ASSET/CSS/DataExport-R/DataExport.css">
</head>
<body>
    <div class="container">
        <h1>Data Export Tool</h1>
        <div class="export-form">
            <div class="form-group">
                <label>Select Data Range:</label>
                <select id="data-range">
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
            </div>            
            <div class="form-group">
                <label>Export Format:</label>
                <div class="format-options">
                    <button id="pdf-btn" class="format-btn active">
                        <i class="icon pdf-icon"></i>
                        PDF
                    </button>
                    <button id="csv-btn" class="format-btn">
                        <i class="icon csv-icon"></i>
                        CSV
                    </button>
                </div>
            </div>
            <button id="download-btn" class="download-btn">Download Report</button>
        </div>
    </div>
</body>
</html>