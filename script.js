let storyData;
fetch("stories.json")
    .then(response => response.json())
    .then(data => {
        storyData = data;
        showStory("start");
    });

function showStory(scene) {
    const storyText = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");
    
    storyText.textContent = storyData[scene].text;
    choicesDiv.innerHTML = ""; // Clear old choices

    storyData[scene].choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => showStory(choice.next);
        choicesDiv.appendChild(button);
    });

    // Save progress to localStorage
    localStorage.setItem("storyProgress", scene);
}

// Load saved progress if available
window.onload = () => {
    const savedProgress = localStorage.getItem("storyProgress");
    if (savedProgress) {
        showStory(savedProgress);
    }
};