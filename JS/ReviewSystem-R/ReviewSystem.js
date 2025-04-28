        let reviews = [];
        
		function displayReviews() {
			const reviewList = document.getElementById("review-list");
			reviewList.innerHTML = "";
			const travelerType = document.getElementById("traveler-type").value;
			const filteredReviews = reviews.filter(review => 
				travelerType === "All" || review.travelerType === travelerType
			);
			filteredReviews.forEach(review => {
				const reviewDiv = document.createElement("div");
				reviewDiv.classList.add("review");
				reviewDiv.innerHTML = `
					<strong>${review.name}</strong> - ${review.date}<br>
					Rating: ${'&#9733;'.repeat(review.rating)}${'&#9734;'.repeat(5 - review.rating)}<br>
					<p>${review.comment}</p>
				`;
				reviewList.appendChild(reviewDiv);
			});
		}


        
        function submitReview() {
            const name = document.getElementById("name").value;
            const rating = document.querySelector('input[name="rating"]:checked') ? document.querySelector('input[name="rating"]:checked').value : 0;
            const comment = document.getElementById("comment").value;
            const travelerType = document.getElementById("traveler-type-input").value;
            const date = new Date().toLocaleDateString();

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
                managementResponse: ""
            });

            document.getElementById("name").value = "";
            document.getElementById("comment").value = "";
            document.getElementById("traveler-type-input").value = "Solo";
            document.querySelector('input[name="rating"]:checked').checked = false;
            displayReviews();
            return false;
        }
        
        function addResponse(index) {
            const response = prompt("Enter the management response:");
            if (response) {
                reviews[index].managementResponse = response;
                displayReviews();
            }
        }
        
        window.onload = function() {
            displayReviews();
        }