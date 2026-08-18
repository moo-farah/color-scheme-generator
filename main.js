// Get DOM Elements
const seedColorInput = document.getElementById('seedColor');
const SchemeModeSelect = document.getElementById('SchemeMode');
const generateBtn = document.getElementById('generateBtn');
const colorContainer = document.getElementById('colorContainer');

// handling the button click
generateBtn.addEventListener('click', generateColorSchema)

async function generateColorSchema () {
    const seedColor = seedColorInput.value.replace('#', '')
    const mode = SchemeModeSelect.value;
    const count = 5;

    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=${count}`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log('Color Scheme Data:', data)
        console.log('Colors:', data.colors)

        displayColorSchema(data.colors);
    } catch(e) {
        console.error('Error fetching color scheme:', e);
        colorContainer.innerHTML = '<p class="error">Failed to fetch color schema. Please try again.</p>';
    }
}

 // Display colors on the page
 function displayColorSchema(colors) {
    colorContainer.innerHTML = '';  // It clears previous results
    // looping the colors 
    colors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.style.background = color.hex.value;

        const hexValue = color.hex.value;
        const hexDisplay  = document.createElement('div');
        hexDisplay.className = 'hex-value';
        hexDisplay.textContent = hexValue;
        hexDisplay.title = 'Click to copy';
    })
 }

 // Copy hex value to clipboard
 function copyToClipboard(hexValue) {
    navigator.clipboard.writeText(hexValue).then(() => {
        console.log(`Copied ${hexValue} to clipboard`);
        // show a brief notification
        showCopyNotification(hexValue);
    }).catch(err => {
        console.log('Failed to copy', err);
    })
 }