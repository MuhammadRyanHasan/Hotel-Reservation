let reviews = [];
function submitReview() {
    let name = document.getElementById("name").value;
    let rating = document.querySelector('input[name="rating"]:checked').value;
    let comment = document.getElementById("comment").value;
    let travelerType = document.getElementById("traveler-type-input").value;
    reviews.push({
        name: name,
        rating: rating,
        comment: comment,
        travelerType: travelerType
    });
    showReviews();
    return false; 
}
function ratingToStars(rating) {
    let stars = "";
    for (let i = 0; i < rating; i++) {
        stars += "&#9733";
    }
    return stars;
}
function showReviews() 
{
    let output = "";
    for (let i = 0; i < reviews.length; i++) {
        let stars = ratingToStars(parseInt(reviews[i].rating));
        output += reviews[i].name + " rated it " + stars + " and commented: " + reviews[i].comment + ". Traveler Type: " + reviews[i].travelerType + "<br>";
    }
    document.getElementById("review-output").innerHTML = output;
}
function filterReviews() 
{
    let selectedType = document.getElementById("traveler-type").value;
    let output = "";
    for (let i = 0; i < reviews.length; i++) {
        if (selectedType === "All" || reviews[i].travelerType === selectedType) {
            let stars = ratingToStars(parseInt(reviews[i].rating));
            output += reviews[i].name + " rated it " + stars + " and commented: " + reviews[i].comment + ". Traveler Type: " + reviews[i].travelerType + "<br>";
        }
    }
    document.getElementById("review-output").innerHTML = output;
}