const storyText = document.getElementById('story-text');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');

let gameState = {
    currentLocation: "start",
    inventory: [] // We can add items to the inventory later
};

const story = {
    start: {
        text: "You awaken in a dark room. You don't remember how you got here.  There's a door to the north and a door to the east.",
        options: [
            { direction: "north", location: "northRoom" },
            { direction: "east", location: "eastRoom" }
        ]
    },
    northRoom: {
        text: "You enter a dimly lit room. There's a strange glowing orb in the center.",
        options: [
            { direction: "south", location: "start" },
            { action: "takeOrb", text: "Take the orb" }
        ]
    },
    eastRoom: {
        text: "This room is filled with cobwebs. You hear a rustling sound.",
        options: [
            { direction: "west", location: "start" }
        ]
    }
};

function displayStory(location) {
    const currentScene = story[location];
    storyText.innerHTML = currentScene.text;

    // Display options as buttons
    let optionsHTML = "";
    if (currentScene.options) {
      currentScene.options.forEach(option => {
        optionsHTML += `<button onclick="handleOption('${option.direction || option.action}')">${option.text}</button> `;
      });
    }
    storyText.innerHTML += "<br>" + optionsHTML;
}

function handleOption(choice) {
  const currentScene = story[gameState.currentLocation];
  const selectedOption = currentScene.options.find(option => (option.direction || option.action) === choice);
  if (selectedOption) {
      if (selectedOption.direction) {
          gameState.currentLocation = selectedOption.location;
          displayStory(gameState.currentLocation);
      } else if (selectedOption.action === "takeOrb") {
          gameState.inventory.push("glowingOrb");
          storyText.innerHTML += "<br>You take the glowing orb.";
          // You might want to remove the orb option here
      }
  }
}


displayStory(gameState.currentLocation); // Initialize the game
