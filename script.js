// Character amounts mapping for different player counts
const characterAmounts = {
  5: [3, 0, 1, 1],
  6: [3, 1, 1, 1],
  7: [5, 0, 1, 1],
  8: [5, 1, 1, 1],
  9: [5, 2, 1, 1],
  10: [7, 0, 2, 1],
  11: [7, 1, 2, 1],
  12: [7, 2, 2, 1],
  13: [9, 0, 3, 1],
  14: [9, 1, 3, 1],
  15: [9, 2, 3, 1],
};

// Function to update character counts based on player count
function updateCharacterCounts(playerCount) {
  const [townsfolk, outsiders, minions, demons] = characterAmounts[playerCount];

  // Update the display for each character type
  document.querySelector('.townsfolk .number').textContent = townsfolk;
  document.querySelector('.outsiders .number').textContent = outsiders;
  document.querySelector('.minions .number').textContent = minions;
  document.querySelector('.demons .number').textContent = demons;
}

// Add click handlers to increment/decrement numbers
document.querySelectorAll('.box').forEach((box) => {
  box.addEventListener('click', (e) => {
    const numberElement = box.querySelector('.number');
    const currentValue = parseInt(numberElement.textContent);

    // Left click to increment, right click to decrement
    if (e.button === 2) {
      // Right click
      if (currentValue > 0) {
        numberElement.textContent = currentValue - 1;
      }
    } else {
      // Left click
      numberElement.textContent = currentValue + 1;
    }
  });

  // Prevent context menu on right click
  box.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

// Handle the new controls
function adjustValue(type, change) {
  const element = document.getElementById(`${type}-value`);
  let value = parseInt(element.textContent);

  // Apply minimum and maximum values
  if (type === 'players') {
    value = Math.min(15, Math.max(5, value + change)); // Between 5 and 15 players
    updateCharacterCounts(value); // Update character counts when player count changes
  } else if (type === 'travellers') {
    value = Math.min(5, Math.max(0, value + change)); // Between 0 and 5 travellers
  }

  element.textContent = value;
}

// Initialize character counts based on default player count
document.addEventListener('DOMContentLoaded', () => {
  const initialPlayerCount = parseInt(
    document.getElementById('players-value').textContent
  );
  updateCharacterCounts(initialPlayerCount);
});
