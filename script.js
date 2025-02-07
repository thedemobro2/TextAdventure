const storyText = document.getElementById('story-text');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');

let gameState = {
    currentLocation: "start",
    inventory: [],
    health: 100,
    weapon: null // Start with no weapon
};

const story = {
    start: {
        text: "You awaken in a dark room. You don't remember how you got here. There's a door to the north and a door to the east.",
        options: [
            { direction: "north", location: "northRoom", text: "Go North" },
            { direction: "east", location: "eastRoom", text: "Go East" }
        ]
    },
    northRoom: {
        text: "You enter a dimly lit room. There's a strange glowing orb in the center. And there is a rusty sword on the wall.",
        options: [
            { direction: "south", location: "start", text: "Go South" },
            { action: "takeOrb", text: "Take the orb" },
            { action: "takeSword", text: "Take the sword" }
        ]
    },
    eastRoom: {
        text: "This room is filled with cobwebs. You hear a rustling sound. A giant spider appears!",
        enemy: {
            name: "Giant Spider",
            health: 50,
            attack: 10
        },
        options: [
            { direction: "west", location: "start", text: "Go West" },
            { action: "fight", text: "Fight the spider" }
        ]
    }
};


function displayStory(location) {
    const currentScene = story[location];
    storyText.innerHTML = currentScene.text;

    if (currentScene.enemy) {
        storyText.innerHTML += `<br><b>${currentScene.enemy.name} appears!</b>`;
    }

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
            // Remove the orb option (you can do this more cleanly later)
            currentScene.options = currentScene.options.filter(option => option.action !== "takeOrb");
        } else if (selectedOption.action === "takeSword") {
            gameState.weapon = { name: "Rusty Sword", attack: 15 };
            storyText.innerHTML += "<br>You take the rusty sword.";
            currentScene.options = currentScene.options.filter(option => option.action !== "takeSword");
        } else if (selectedOption.action === "fight") {
            handleCombat();
        }
    }
}

function handleCombat() {
    const currentScene = story[gameState.currentLocation];
    const enemy = currentScene.enemy;

    if (!gameState.weapon) {
        storyText.innerHTML += "<br>You have no weapon! You must find one to fight.";
        return;
    }

    let playerAttack = gameState.weapon.attack;
    let enemyAttack = enemy.attack;

    enemy.health -= playerAttack;
    storyText.innerHTML += `<br>You attack the ${enemy.name} for ${playerAttack} damage.`;

    if (enemy.health <= 0) {
        storyText.innerHTML += `<br>You defeated the ${enemy.name}!`;
        // Remove the enemy from the room
        delete currentScene.enemy;
        currentScene.options = currentScene.options.filter(option => option.action !== "fight");

        return;
    }

    gameState.health -= enemyAttack;
    storyText.innerHTML += `<br>The ${enemy.name} attacks you for ${enemyAttack} damage.`;

    if (gameState.health <= 0) {
        storyText.innerHTML += "<br>You have been defeated!";
        // Game Over logic here (e.g., restart)
        return;
    }

    storyText.innerHTML += `<br>Your health: ${gameState.health}, ${enemy.name}'s health: ${enemy.health}`;
}


displayStory(gameState.currentLocation); // Initialize the game
