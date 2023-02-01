const container = document.querySelector(".container");
const refreshButton = document.querySelector(".refresh-btn");
const body = document.querySelector("body");

// generating random hex value 
const generateRandomHexColor = () => {
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16)
    return `#${randomHex.padStart(6, '0')}`;
}

const maxPaletteBoxes = 15;
const generatePalette = () => {
    container.innerHTML = ""; // clearing the container
    for (let i = 0; i < maxPaletteBoxes; i++) {
        let randomHex = generateRandomHexColor();
        // creating li element to append to container
        const color = document.createElement('li');
        color.classList.add('color');
        color.innerHTML = `<div class="rect-box" style="background:${randomHex}"></div>
        <span class="hex-value">
            ${randomHex}
        </span>`
        // adding click event to current li element to copy the color
        color.addEventListener("click", () => copyHex(color, randomHex))
        container.appendChild(color)
    }
}

const copyHex = (elem, hexValue) => {
    const hexElement = elem.querySelector(".hex-value");
    // copy the color code in clipboard and set it as copied
    // after 1 sec, again showing the hex color value
    navigator.clipboard.writeText(hexValue).then(() => {
        hexElement.innerText = "Copied";
        body.style.backgroundColor = hexValue;
        body.style.transition = "2s";
        setTimeout(() => {
            hexElement.innerText = hexValue;
            body.style.backgroundColor = "#E3F2FD";
        }, 2000)
    }).catch(() => {
        // showing alert while copying color code
        alert("Failed to copy the color code!")
    })
}

generatePalette();
refreshButton.addEventListener("click", generatePalette);