import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "./components/loader";
import { Webcam } from "./utils/webcam";
import { renderBoxes } from "./utils/renderBox";
import "./style/App.css";

import labels from "./utils/labels.json";



const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [klass, setKlass] = useState();
  const [score, setScore] = useState();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const webcam = new Webcam();

  // configs
  const modelName = "yolov5n";
  const threshold = 0.25;

  /**
   * Function to detect every frame loaded from webcam in video tag.
   * @param {tf.GraphModel} model loaded YOLOv5 tensorflow.js model
   */
  const detectFrame = async (model) => {
    tf.engine().startScope();
    let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);
    const input = tf.tidy(() => {
      return tf.image
        .resizeBilinear(tf.browser.fromPixels(videoRef.current), [modelWidth, modelHeight])
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

          console.log(klass + score);

          if (klass === 'Normal' && score >= 85) {
            setKlass('Normal');
            setScore(score);
          } else if (klass === 'Cataract' && score >= 85) {
            setKlass('Cataract');
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
    tf.loadGraphModel(`${window.location.origin}/${modelName}_web_model/model.json`, {
      onProgress: (fractions) => {
        setLoading({ loading: true, progress: fractions });
      },
    }).then(async (yolov5) => {
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
      <h2>Web application Check for abnormal conditions of the eyes.</h2>
      {loading.loading ? (
        <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
      ) : (
        <p>Currently running model : {modelName.slice(6)}</p>
      )}

      <div className="content">
        <video autoPlay playsInline muted ref={videoRef} />
        <canvas width={640} height={640} ref={canvasRef} />
      </div>

      <div className="textContent">
       
        <table style={{ width: '100%' }}>
          <tr style={{ width: '50%' }}>
            <td style={{ fontSize: '20px', fontWeight: 'bold' }}>ความผิดปกติของดวงตา</td>
            <td style={{ fontSize: '20px', fontWeight: 'bold' }}> : </td>
            <td style={{ fontSize: '20px' }}>{klass}</td>
          </tr>
          <tr style={{ width: '50%' }}>
            <td style={{ fontSize: '20px', fontWeight: 'bold' }}>เปอร์เซ็นความแม่นยำ</td>
            <td style={{ fontSize: '20px', fontWeight: 'bold' }}> : </td>
            <td style={{ fontSize: '20px' }}>{score}%</td>
          </tr>
        </table>
      </div>

    </div>
  );
};

export default App;
