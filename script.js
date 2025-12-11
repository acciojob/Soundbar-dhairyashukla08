//your JS code here. If required.
const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong'];
const buttonContainer = document.getElementById('buttons');
const audioElements = [];

sounds.forEach(sound => {
    const audio = new Audio(`sounds/${sound}.mp3`);
    audioElements.push(audio); 
    const button = document.createElement('button');
    button.className = 'btn';
    button.textContent = sound; 
    button.addEventListener('click', () => {
        stopAllSounds();
        audio.play();
    });
    buttonContainer.appendChild(button);
});
const stopButton = document.createElement('button');
stopButton.className = 'btn stop'; 
stopButton.textContent = 'stop';
stopButton.addEventListener('click', stopAllSounds);

buttonContainer.appendChild(stopButton);


function stopAllSounds() {
    audioElements.forEach(audio => {
        if (!audio.paused || audio.currentTime > 0) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}