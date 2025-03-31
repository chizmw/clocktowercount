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

// Default values
const DEFAULT_VALUES = {
  PLAYERS: 10,
  TRAVELLERS: 0,
};

// Storage keys
const STORAGE_KEYS = {
  PLAYERS: 'botc-player-count',
  TRAVELLERS: 'botc-traveller-count',
};

// Function to update character counts based on player count
function updateCharacterCounts(playerCount) {
  const [townsfolk, outsiders, minions, demons] = characterAmounts[playerCount];

  // Update the display for each character type
  document.querySelector('.townsfolk .number').textContent = townsfolk;
  document.querySelector('.outsiders .number').textContent = outsiders;
  document.querySelector('.minions .number').textContent = minions;
  document.querySelector('.demons .number').textContent = demons;

  // Update the title
  document.getElementById(
    'player-count-title'
  ).textContent = `${playerCount} Players`;
}

// Function to save values to localStorage
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, value.toString());
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

// Function to load values from localStorage
function loadFromStorage(key, defaultKey) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      // If no value found, save and return the default
      const defaultValue = DEFAULT_VALUES[defaultKey];
      saveToStorage(key, defaultValue);
      return defaultValue;
    }
    return parseInt(value, 10);
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
    return DEFAULT_VALUES[defaultKey];
  }
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

// Handle the controls
function adjustValue(type, change) {
  const element = document.getElementById(`${type}-value`);
  let value = parseInt(element.textContent);

  // Apply minimum and maximum values
  if (type === 'players') {
    value = Math.min(15, Math.max(5, value + change)); // Between 5 and 15 players
    updateCharacterCounts(value);
    saveToStorage(STORAGE_KEYS.PLAYERS, value);
  } else if (type === 'travellers') {
    value = Math.min(5, Math.max(0, value + change)); // Between 0 and 5 travellers
    saveToStorage(STORAGE_KEYS.TRAVELLERS, value);
  }

  element.textContent = value;
}

// Initialize values from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Load and set player count
  const playerCount = loadFromStorage(STORAGE_KEYS.PLAYERS, 'PLAYERS');
  document.getElementById('players-value').textContent = playerCount;
  updateCharacterCounts(playerCount);

  // Load and set traveller count
  const travellerCount = loadFromStorage(STORAGE_KEYS.TRAVELLERS, 'TRAVELLERS');
  document.getElementById('travellers-value').textContent = travellerCount;
});
