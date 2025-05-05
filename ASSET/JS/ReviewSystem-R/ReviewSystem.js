let reviews = [];
let currentPage = 1;
let reviewsPerPage = 10;

function displayReviews() {
    let reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";

    let travelerType = document.getElementById("traveler-type").value;
    let statusFilter = document.getElementById("status-filter").value;
    reviewsPerPage = parseInt(document.getElementById("reviews-per-page").value);

    let filteredReviews = reviews.filter(function(review) {
        let typeMatch = travelerType === "All" || review.travelerType === travelerType;
        let statusMatch = statusFilter === "All" || review.status === statusFilter;
        return typeMatch && statusMatch && review.status === "Approved";
    });

    let startIndex = (currentPage - 1) * reviewsPerPage;
    let endIndex = startIndex + reviewsPerPage;
    let paginatedReviews = filteredReviews.slice(startIndex, endIndex);

    if (paginatedReviews.length === 0) {
        reviewList.innerHTML = "<p>No reviews found.</p>";
    } else {
        paginatedReviews.forEach(function(review) {
            let reviewDiv = document.createElement("div");
            reviewDiv.className = "review approved";

            let responseSection = "";
            if (review.managementResponse) {
                responseSection = '<div class="management-response"><strong>Management Response:</strong><p>' +
                                  review.managementResponse + '</p></div>';
            }

            let stars = '';
            for (let i = 0; i < review.rating; i++) {
                stars += '&#9733';
            }
            for (let j = 0; j < 5 - review.rating; j++) {
                stars += '&#9734';
            }

            let reviewIndex = reviews.indexOf(review);
            reviewDiv.innerHTML = '<strong>' + review.name + '</strong> - ' + review.date + '<br>' +
                                 'Traveler Type: ' + review.travelerType + '<br>' +
                                 'Rating: ' + stars + '<br>' +
                                 '<p>' + review.comment + '</p>' +
                                 responseSection +
                                 '<button onclick="addResponse(' + reviewIndex + ')">Add Response</button>';
            reviewList.appendChild(reviewDiv);
        });
    }

    setupPagination(filteredReviews.length);
    displayPendingReviews();
}

function setupPagination(totalReviews) {
    let paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    let totalPages = Math.ceil(totalReviews / reviewsPerPage);

    if (totalPages > 1) {
        if (currentPage > 1) {
            let prevButton = document.createElement("button");
            prevButton.innerHTML = "Previous";
            prevButton.onclick = function() {
                currentPage--;
                displayReviews();
            };
            paginationDiv.appendChild(prevButton);
        }

        for (let i = 1; i <= totalPages; i++) {
            let pageButton = document.createElement("button");
            pageButton.innerHTML = i;
            if (i === currentPage) {
                pageButton.style.fontWeight = "bold";
            }
            pageButton.onclick = (function(page) {
                return function() {
                    currentPage = page;
                    displayReviews();
                };
            })(i);
            paginationDiv.appendChild(pageButton);
        }

        if (currentPage < totalPages) {
            let nextButton = document.createElement("button");
            nextButton.innerHTML = "Next";
            nextButton.onclick = function() {
                currentPage++;
                displayReviews();
            };
            paginationDiv.appendChild(nextButton);
        }
    }

    let infoSpan = document.createElement("span");
    infoSpan.style.marginLeft = "10px";
    infoSpan.innerHTML = "Showing " + (Math.min((currentPage - 1) * reviewsPerPage + 1, totalReviews)) +
                         " to " + Math.min(currentPage * reviewsPerPage, totalReviews) +
                         " of " + totalReviews + " reviews";
    paginationDiv.appendChild(infoSpan);
}

function displayPendingReviews() {
    let pendingReviewsDiv = document.getElementById("pending-reviews");
    pendingReviewsDiv.innerHTML = "";

    let pendingReviews = reviews.filter(function(review) {
        return review.status === "Pending";
    });

    if (pendingReviews.length === 0) {
        pendingReviewsDiv.innerHTML = "<p>No pending reviews to moderate.</p>";
        return;
    }

    pendingReviews.forEach(function(review) {
        let reviewDiv = document.createElement("div");
        reviewDiv.className = "review pending";

        let stars = '';
        for (let i = 0; i < review.rating; i++) {
            stars += '&#9733';
        }
        for (let j = 0; j < 5 - review.rating; j++) {
            stars += '&#9734';
        }

        let reviewIndex = reviews.indexOf(review);
        reviewDiv.innerHTML = '<strong>' + review.name + '</strong> - ' + review.date + '<br>' +
                             'Traveler Type: ' + review.travelerType + '<br>' +
                             'Rating: ' + stars + '<br>' +
                             '<p>' + review.comment + '</p>' +
                             '<div class="moderation-actions">' +
                             '<button onclick="moderateReview(' + reviewIndex + ', \'Approved\')">Approve</button>' +
                             '<button onclick="moderateReview(' + reviewIndex + ', \'Rejected\')">Reject</button>' +
                             '</div>';
        pendingReviewsDiv.appendChild(reviewDiv);
    });
}

function submitReview() {
    let name = document.getElementById("name").value;
    let ratingInput = document.querySelector('input[name="rating"]:checked');
    let rating = ratingInput ? ratingInput.value : 0;
    let comment = document.getElementById("comment").value;
    let travelerType = document.getElementById("traveler-type-input").value;
    let date = new Date().toLocaleDateString();

    if (name === "" || comment === "" || rating === "0") {
        alert("Please fill out all fields and give a rating.");
        return false;
    }

    reviews.push({
        name: name,
        rating: parseInt(rating),
        comment: comment,
        travelerType: travelerType,
        date: date,
        status: "Pending",
        managementResponse: ""
    });

    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";
    document.getElementById("traveler-type-input").value = "Solo";
    if (ratingInput) {
        ratingInput.checked = false;
    }

    currentPage = 1;
    displayReviews();
    return false;
}

function moderateReview(index, action) {
    if (index >= 0 && index < reviews.length) {
        if (action === "Approved") {
            reviews[index].status = "Approved";
        } else {
            reviews.splice(index, 1);
        }
        currentPage = 1;
        displayReviews();
    }
}

function addResponse(index) {
    if (index >= 0 && index < reviews.length) {
        let response = prompt("Enter the management response:");
        if (response) {
            reviews[index].managementResponse = response;
            displayReviews();
        }
    }
}

window.onload = function() {
    displayReviews();
};
