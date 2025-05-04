function openTab(tabName) {
    let i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}
function showPolicy(rateType) {
    let policyDisplay = document.getElementById("policy-display");
    let policyText = "";
    switch(rateType) {
        case "nonrefundable":
            policyText = "<h3>Non-Refundable Rate</h3>" +
                         "<p>This rate is 100% non-refundable. No refunds will be issued for cancellations or modifications.</p>" +
                         "<p>Penalty: 100% of booking total</p>";
            break;
        case "standard":
            policyText = "<h3>Standard Rate</h3>" +
                         "<p>Cancellations made more than 7 days before check-in: Full refund</p>" +
                         "<p>Cancellations made 3-7 days before check-in: 50% penalty</p>" +
                         "<p>Cancellations made less than 3 days before check-in: 100% penalty</p>";
            break;
        case "flexible":
            policyText = "<h3>Flexible Rate</h3>" +
                         "<p>Cancellations made more than 24 hours before check-in: Full refund</p>" +
                         "<p>Cancellations made less than 24 hours before check-in: 1 night penalty</p>" +
                         "<p>Free modifications up to 48 hours before check-in</p>";
            break;
    }
    policyDisplay.innerHTML = policyText;
}
function calculateFee() {
    let rateType = document.getElementById("rate-type").value;
    let nights = parseInt(document.getElementById("nights").value);
    let price = parseFloat(document.getElementById("price").value);
    let daysBefore = parseInt(document.getElementById("days-before").value);
    let feeResult = document.getElementById("fee-result");
    let fee = 0;
    let message = "";
    if (!rateType || isNaN(nights) || isNaN(price) || isNaN(daysBefore)) {
        alert("Please fill all fields with valid values");
        return;
    }
    switch(rateType) {
        case "nonrefundable":
            fee = price;
            message = "Non-refundable rate: Full amount will be charged (" + fee.toFixed(2) + ")";
            break;
        case "standard":
            if (daysBefore > 7) {
                fee = 0;
                message = "No cancellation fee. Full refund available.";
            } else if (daysBefore >= 3) {
                fee = price * 0.5;
                message = "50% cancellation fee: " + fee.toFixed(2);
            } else {
                fee = price;
                message = "100% cancellation fee: " + fee.toFixed(2);
            }
            break;
        case "flexible":
            if (daysBefore > 1) {
                fee = 0;
                message = "No cancellation fee. Full refund available.";
            } else {
                let nightlyRate = price / nights;
                fee = nightlyRate;
                message = "1 night penalty: " + fee.toFixed(2);
            }
            break;
    }
    feeResult.innerHTML = "<h3>Cancellation Fee</h3>" +
                         "<p>" + message + "</p>" +
                         "<p>Refund amount: " + (price - fee).toFixed(2) + "</p>";
    feeResult.style.display = "block";
}
function checkModification() {
    let bookingId = document.getElementById("booking-id").value;
    let email = document.getElementById("email").value;
    let newDate = document.getElementById("new-date").value;
    let modifyResult = document.getElementById("modify-result");

    if (!bookingId || !email || !newDate) {
        alert("Please fill all fields");
        return;
    }
    modifyResult.innerHTML = "<h3>Modification Request</h3>" +
                            "<p>Booking ID: " + bookingId + "</p>" +
                            "<p>New check-in date: " + newDate + "</p>" +
                            "<p>We've sent a confirmation to " + email + "</p>" +
                            "<p>Our team will contact you shortly to confirm your modification.</p>";
    modifyResult.style.display = "block";
    document.getElementById("modify-booking").reset();
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("terms").style.display = "block";
});
