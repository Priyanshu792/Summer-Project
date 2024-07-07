// Get access to the camera
function startCamera() {
    const video = document.getElementById('camera-stream');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Specify constraints to select the camera
        const constraints = {
            video: {
                facingMode: 'environment'  // 'user' for front camera, 'environment' for back camera
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(error) {
                console.error('Error accessing the camera:', error);
            });
    }
}

window.onload = function() {
    startCamera();
};

