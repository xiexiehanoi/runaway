import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const Squat = () => {
  const squatBoxContainer = {
    position: 'relative',
    width: '100%',
    height: '110%',
    textAlign: 'center',
  };

  const squatContextStyle = {
    textAlign: 'center',
    position: 'relative',
  };

  const squatButtonStyle = {
    position: 'relative',
    margin: '0 auto',
    display: 'inline-block',
    top: '2%',
  };

  const canvasBox = {
    height: '92%',
    width: '100%',
  };

  const canvasStyle = {
    width: '90%',
    height: '90%',
    position: 'relative',
    top: '5%',
  };

  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const canvasRef = useRef(null); // 캔버스 레퍼런스 추가
  const [status, setStatus] = useState("nothing");
  const [count, setCount] = useState(0);
  const [predictions, setPredictions] = useState([]);
  const [cameraActive, setCameraActive] = useState(false);
  const animationFrameId = useRef();

  const startCameraAndFunction = async () => {
    await init();
    setCameraActive(true);
    loop();
  };

  const stopCameraAndFunction = () => {
    if (webcamRef.current) {
      webcamRef.current.stop();
      webcamRef.current = null; 
    }
    setCameraActive(false);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const playAudioAfterDelay = (audioFile) => {
    setTimeout(() => {
      const audio = new Audio(audioFile);
      audio.play();
    }, 3000);
  };

  const init = async () => {
    const URL = "/squat/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    const webcamWidth = 640;
    const webcamHeight = 480;

    modelRef.current = await window.tmPose.load(modelURL, metadataURL);

    if (!webcamRef.current) {
      webcamRef.current = new window.tmPose.Webcam(webcamWidth, webcamHeight, true);
      await webcamRef.current.setup();
    }
    await webcamRef.current.play();

    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(webcamRef.current.canvas, 0, 0);
    }

    loop();
    playAudioAfterDelay("/squat/letsgowork.mp3");
  };

  const loop = async () => {
    if (!webcamRef.current) {
      return; 
    }

    webcamRef.current.update();
    await predict();
    animationFrameId.current = requestAnimationFrame(loop);
  };

  const predict = async () => {
    const { pose, posenetOutput } = await modelRef.current.estimatePose(webcamRef.current.canvas);
    const prediction = await modelRef.current.predict(posenetOutput);

    setPredictions(
      prediction.map((p) => `${p.className}: ${p.probability.toFixed(2)}`)
    );

    if (prediction[0].probability.toFixed(2) === 1.0) {
      setStatus("nothing");
    } else if (prediction[1].probability.toFixed(2) === 1.0) {
      if (status === "squat") {
        setCount((c) => c + 1);
        new Audio(`${count % 10}.mp3`).play();
      }
      setStatus("stand");
    } else if (prediction[2].probability.toFixed(2) === 1.0) {
      setStatus("squat");
    }

    drawPose(pose);
  };

  const drawPose = (pose) => {
    if (canvasRef.current && webcamRef.current && webcamRef.current.canvas) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(webcamRef.current.canvas, 0, 0);
      if (pose) {
        const minPartConfidence = 0.5;
        window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div style={squatBoxContainer}>
      <div style={squatContextStyle}>squat</div>
      {cameraActive ? (
        <button type="button" onClick={stopCameraAndFunction} style={squatButtonStyle}>
          중단하기
        </button>
      ) : (
        <button type="button" onClick={startCameraAndFunction} style={squatButtonStyle}>
          측정시작
        </button>
      )}

      {cameraActive && (
        <div style={canvasBox}>
          <canvas ref={canvasRef} width="640px" height="480px" style={canvasStyle}/>
        </div>
      )}
    </div>
  );
};

export default Squat;
