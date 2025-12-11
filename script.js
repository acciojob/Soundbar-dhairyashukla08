// List of sound names corresponding to button labels and file names (without the 'stop' sound)
const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong'];
const buttonContainer = document.getElementById('buttons');
const audioElements = [];

// Create a hidden container for all audio elements to ensure they are in the DOM
const audioContainer = document.createElement('div');
audioContainer.id = 'audio-container';
// Add it to the body (it will be hidden, but present for Cypress to find)
document.body.appendChild(audioContainer); 

// --- 1. Dynamic Button and Audio Creation ---

sounds.forEach(sound => {
    // 1. Create Audio Element
    const audio = new Audio(`sounds/${sound}.mp3`);
    audioElements.push(audio); 

    // 2. *** FIX: Append the audio element to the DOM ***
    // This is the crucial step to satisfy the Cypress test.
    audioContainer.appendChild(audio); 

    // 3. Create Button Element
    const button = document.createElement('button');
    button.className = 'btn';
    button.textContent = sound;

    // 4. Add Event Listener to Play Sound
    button.addEventListener('click', () => {
        stopAllSounds();
        // The play() method initiates playback on the DOM element now that it exists
        audio.play(); 
    });

    // 5. Append button to the display container
    buttonContainer.appendChild(button);
});


// --- 2. Stop Button Creation and Logic ---

// Create the 'stop' button
const stopButton = document.createElement('button');
stopButton.className = 'btn stop'; 
stopButton.textContent = 'stop';

// Add Event Listener for the stop button
stopButton.addEventListener('click', stopAllSounds);

// Append the stop button
buttonContainer.appendChild(stopButton);


// --- 3. Core Function to Stop All Audio ---

/**
 * Stops all currently playing audio elements and resets their playback position.
 */
function stopAllSounds() {
    audioElements.forEach(audio => {
        // Pause and reset position for all stored audio elements
        if (!audio.paused || audio.currentTime > 0) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}