const storyText = document.getElementById('story-text');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', () => {
    const input = userInput.value;
    // We'll process the input here later
    storyText.innerHTML += "<br>> " + input; // Display user input
    userInput.value = ""; // Clear input field
});
