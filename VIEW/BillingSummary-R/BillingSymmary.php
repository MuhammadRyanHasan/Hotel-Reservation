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
    <title>Billing Summary</title>
    <link rel="stylesheet" href="../../ASSET/CSS/BillingSummary-R/BillingSymmary.css">
</head>
<body>
    <div class="container">
        <h1>Billing Summary</h1>
        <div class="bill-details">
            <div class="bill-header">
                <span>Invoice #: INV-2023-001</span>
                <span>Date: <span id="current-date"></span></span>
            </div>
            <div class="charges-section">
                <h2>Charge Breakdown</h2>
                <table class="charges-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Deluxe Room</td>
                            <td>2 nights</td>
                            <td>$150.00</td>
                            <td>$300.00</td>
                        </tr>
                        <tr>
                            <td>Room Service</td>
                            <td>3 orders</td>
                            <td>$25.00</td>
                            <td>$75.00</td>
                        </tr>
                        <tr>
                            <td>Spa Treatment</td>
                            <td>1 session</td>
                            <td>$120.00</td>
                            <td>$120.00</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="3">Subtotal</td>
                            <td>$495.00</td>
                        </tr>
                        <tr>
                            <td colspan="3">Tax (10%)</td>
                            <td>$49.50</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="3">Total Amount</td>
                            <td>$544.50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="split-payment">
                <h2>Split Payment</h2>
                <div class="split-options">
                    <div class="split-option">
                        <label>
                            <input type="radio" name="split" checked>
                            Single Payment
                        </label>
                    </div>
                    <div class="split-option">
                        <label>
                            <input type="radio" name="split">
                            Split Evenly (2 guests)
                        </label>
                    </div>
                    <div class="split-option">
                        <label>
                            <input type="radio" name="split">
                            Custom Split
                        </label>
                        <div class="custom-split" style="display:none;">
                            <input type="number" placeholder="Amount for guest 1">
                            <input type="number" placeholder="Amount for guest 2">
                        </div>
                    </div>
                </div>
            </div>
            <div class="actions">
                <button class="btn-print">Print Receipt</button>
                <button class="btn-email">Email Receipt</button>
            </div>
        </div>
    </div>
    <script src="../../ASSET/JS/BillingSummary-R/BillingSymmary.js"></script>
</body>
</html>
