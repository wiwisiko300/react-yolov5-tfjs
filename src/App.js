import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { Webcam } from "./utils/webcam";
import { renderBoxes } from "./utils/renderBox";
import "./style/App.css";
import labels from "./utils/labels.json";
import Camera from "./components/camera_";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [klass, setKlass] = useState();
  const [score, setScore] = useState();
  const [NormalEye, setNormalEye] = useState([]);
  const [CataractEye, setCataractEye] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const webcam = new Webcam();

  let photoRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const newScore = new URLSearchParams(location.search).get("newScore");

  const [capturedImage, setCapturedImage] = useState("");

  // configs
  const modelName = "yolov5n";
  const threshold = 0.25;

  const takeSnapshot = () => {
    let width = 300;
    let height = width / (16 / 9);

    let photo = photoRef.current;
    let video = videoRef.current;

    photo.width = width;
    photo.height = height;
    let cxt = photo.getContext("2d");
    cxt.drawImage(video, 0, 0, photo.width, photo.height);
  };

  /**
   * Function to detect every frame loaded from webcam in video tag.
   * @param {tf.GraphModel} model loaded YOLOv5 tensorflow.js model
   */
  const detectFrame = async (model) => {
    tf.engine().startScope();
    let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);
    const input = tf.tidy(() => {
      return tf.image
        .resizeBilinear(tf.browser.fromPixels(videoRef.current), [
          modelWidth,
          modelHeight,
        ])
        .div(255.0)
        .expandDims(0);
    });

    await model.executeAsync(input).then((res) => {
      const [boxes, scores, classes] = res.slice(0, 3);
      const boxes_data = boxes.dataSync();
      const scores_data = scores.dataSync();
      const classes_data = classes.dataSync();

      for (let i = 0; i < scores_data.length; ++i) {
        if (scores_data[i] > threshold) {
          const klass = labels[classes_data[i]];
          const score = (scores_data[i] * 100).toFixed(1);

          if (klass === "Normal" && score >= 50) {
            setKlass("Normal");
            setScore(score);
          } else if (klass === "Cataract" && score >= 50) {
            setKlass("Cataract");
            setScore(score);
          }
        }
      }

      renderBoxes(canvasRef, threshold, boxes_data, scores_data, classes_data);
      tf.dispose(res);
    });

    requestAnimationFrame(() => detectFrame(model)); // get another frame
    tf.engine().endScope();
  };

  useEffect(() => {
    if (klass === "Normal" && score >= 55) {
      const newObject = {
        Normal: "Normal",
        score: score,
      };
      setNormalEye((prevArray) => [...prevArray, newObject]);
    } else if (klass === "Cataract" && score >= 55) {
      const newObject = {
        Cataract: "Cataract",
        score: score,
      };
      setCataractEye((prevArray) => [...prevArray, newObject]);
    }
  }, [klass, score]);

  useEffect(() => {
    if (NormalEye.length > 50) {
      takeSnapshot();
      const NormalEyeString = JSON.stringify(NormalEye);
      const capturedImage = photoRef.current.toDataURL(); // Get the captured image as a data URL
      navigate(
        `/Conclusion?NormalEye=${NormalEyeString}&newScore=${newScore}&capturedImage=${encodeURIComponent(
          capturedImage
        )}`
      );
    } else if (CataractEye.length > 50) {
      takeSnapshot();
      const CataractEyeString = JSON.stringify(CataractEye);
      const capturedImage = photoRef.current.toDataURL(); // Get the captured image as a data URL
      navigate(
        `/Conclusion?CataractEye=${CataractEyeString}&newScore=${newScore}&capturedImage=${encodeURIComponent(
          capturedImage
        )}`
      );
    }
  }, [NormalEye, CataractEye]);

  useEffect(() => {
    tf.loadGraphModel(
      `${window.location.origin}/${modelName}_web_model/model.json`,
      {
        onProgress: (fractions) => {
          setLoading({ loading: true, progress: fractions });
        },
      }
    ).then(async (yolov5) => {
      // Warmup the model before using real data.
      const dummyInput = tf.ones(yolov5.inputs[0].shape);
      await yolov5.executeAsync(dummyInput).then((warmupResult) => {
        tf.dispose(warmupResult);
        tf.dispose(dummyInput);

        setLoading({ loading: false, progress: 1 });
        webcam.open(videoRef, () => detectFrame(yolov5));
      });
    });
  }, []);

  return (
    <div className="App">
      <Camera
        loading={loading}
        modelName={modelName}
        videoRef={videoRef}
        canvasRef={canvasRef}
        klass={klass}
        score={score}
        newScore={newScore}
      />
      {/* <button onClick={takeSnapshot}>Save</button> */}
      {}
      <canvas ref={photoRef}></canvas>
    </div>
  );
};

export default App;
