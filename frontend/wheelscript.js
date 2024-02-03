document.addEventListener("DOMContentLoaded", function() {
    const wheel = document.getElementById("wheel");
    const spinButton = document.getElementById("spinButton");

    let rotationCount = 0;
    const totalRotations = 5;
    const rotationIncrement = 5;
    const maxRotations = totalRotations * 360 / rotationIncrement;
    let isSpinning = false;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function rotateWheel(startTime) {
        const currTime = Date.now();
        const elapsedTime = currTime - startTime;
        let accelerate = easeInOutQuad(elapsedTime / 6000);
        wheel.style.transform = `rotate(${(accelerate * 2000)}deg)`;
        rotationCount++;

        if (elapsedTime < 5000) {
            requestAnimationFrame(() => rotateWheel(startTime));
        } else {
            isSpinning = false;
            displayResult();
        }
    }

    function spinWheel() {
        if (!isSpinning) {
            isSpinning = true;
            rotateWheel(Date.now());
        }
    }

    function displayResult() {
        const result = Math.floor(Math.random() * 37);
        var event = new CustomEvent('spinCompleted', { 'detail': result });
        document.dispatchEvent(event);
        console.log(result);
    }

    spinButton.addEventListener("click", spinWheel);
});