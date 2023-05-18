/**
 * Class to handle webcam
 */
export class Webcam {
  /**
   * Open webcam and stream it through video tag.
   * @param {React.MutableRefObject} videoRef video tag reference
   * @param {function} onLoaded callback function to be called when webcam is open
   */
  open = (videoRef, onLoaded) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment",
          },
        })
        .then((stream) => {
          window.localStream = stream;
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            onLoaded();
          };
        });
    } else alert("Can't open Webcam!");
  };

  /**
   * Capture a frame from the webcam stream.
   * @param {React.MutableRefObject} videoRef video tag reference
   * @returns {Promise<ImageData>} a Promise that resolves with the captured ImageData
   */
  async capture(videoRef) {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(
            new ImageData(
              new Uint8ClampedArray(reader.result),
              canvas.width,
              canvas.height
            )
          );
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      }, "image/jpeg");
    });
  }

  /**
   * Close opened webcam.
   * @param {React.MutableRefObject} videoRef video tag reference
   */
  close = (videoRef) => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject = null;
      window.localStream.getTracks().forEach((track) => {
        track.stop();
      });
    } else alert("Please open Webcam first!");
  };
}
