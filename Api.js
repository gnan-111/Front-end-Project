// Select elements from the HTML
const searchBtn = document.getElementById('search-btn');
const inpWord = document.getElementById('inp-word');
const resultContainer = document.getElementById('result');
const audio = document.getElementById('sound');

// Set the result container to be hidden initially
resultContainer.style.display = 'none';

// API base URL
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Function to fetch and display word details
async function fetchWordDetails() {
    const word = inpWord.value.trim();
    
    if (!word) {
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = "<p>Please enter a word.</p>";
        return;
    }
    
    try {
        const response = await fetch(`${url}${word}`);
        if (!response.ok) throw new Error("Word not found");
        
        const data = await response.json();
        const wordData = data[0];

        // Extracting details from API response
        const phonetics = wordData.phonetics[0]?.text || "N/A";
        const audioSrc = wordData.phonetics[0]?.audio || "";
        const meaning = wordData.meanings[0]?.definitions[0]?.definition || "No definition available";
        const example = wordData.meanings[0]?.definitions[0]?.example || "No example available";

        // Display the result container and update HTML with the details
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <h2>${wordData.word}</h2>
            <p><strong>Phonetics:</strong> ${phonetics}</p>
            <p><strong>Meaning:</strong> ${meaning}</p>
            <p><strong>Example:</strong> ${example}</p>
            ${audioSrc ? '<button onclick="playSound()"><i class="Play Sound"></i>Play</button>' : ''}
        `;

        // Set the audio source for pronunciation
        audio.src = audioSrc;

    } catch (error) {
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = "<p>Word not found. Please try another word.</p>";
    }
}

// Function to play pronunciation audio
function playSound() {
    audio.play();
}

// Event listener for search button click
searchBtn.addEventListener('click', fetchWordDetails);

// Event listener for "Enter" key press on the input field
inpWord.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWordDetails();
    }
});
