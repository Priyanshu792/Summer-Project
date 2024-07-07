// Define constants
const videoElement = document.getElementById('camera-stream');
const infoText = document.getElementById('info-text');
const detectionsList = document.getElementById('detections');

// Function to start the camera and perform object detection
async function startCamera() {
    try {
        // Access the camera stream
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;

        // Load the COCO-SSD model
        const model = await cocoSsd.load();

        // Perform object detection on each frame
        function detectFrame() {
            model.detect(videoElement).then(predictions => {
                // Display detected objects
                displayPredictions(predictions);
                requestAnimationFrame(detectFrame);
            });
        }
        detectFrame();
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}

// Function to display predictions
function displayPredictions(predictions) {
    detectionsList.innerHTML = ''; // Clear previous detections
    predictions.forEach(prediction => {
        const { class: objectClass, score } = prediction;
        const listItem = document.createElement('li');
        listItem.textContent = `${objectClass} - confidence: ${Math.round(score * 100)}%`;
        detectionsList.appendChild(listItem);
    });
}

// Start the camera when the page loads
window.onload = startCamera;
