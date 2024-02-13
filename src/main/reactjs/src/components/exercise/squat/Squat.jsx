import React, { useRef, useState, useEffect } from "react";
import "./progress.css";

const MAX = 10;

const Squat = () => {
  const squatBoxContainer = {
    position: "relative",
    width: "100%",
    height: "110%",
    textAlign: "center",
  };

  const squatContextStyle = {
    textAlign: "center",
    position: "relative",
  };

  const squatButtonStyle = {
    position: "relative",
    margin: "0 auto",
    display: "inline-block",
    top: "2%",
  };

  const canvasBox = {
    height: "92%",
    width: "100%",
  };

  const canvasStyle = {
    width: "90%",
    height: "90%",
    position: "relative",
    top: "5%",
  };

  const messageBox = {
    position: "relative",
    top: "5%",
    whiteSpace: "pre-line",
  };

  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("nothing");
  const [count, setCount] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [message, setMessage] = useState("");
  const animationFrameId = useRef();
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const countRef = useRef(count);

  useEffect(() => {
    if (progress) {
      progress.value = count;
      progress.el.style.setProperty("--progress-value", count / MAX);
    }
  }, [count, progress]);

  useEffect(() => {
    if (cameraActive && !progress && progressRef.current) {
      const newProgress = new window.CircleProgress(progressRef.current, {
        max: MAX,
        value: count,
        animationDuration: 400,
        textFormat: (val) => `${val}회`,
      });
      setProgress(newProgress); // 생성된 인스턴스를 progress 상태로 설정
    }
    if (!cameraActive && progress) {
      setProgress(null); // progress 인스턴스를 null로 설정하여 제거
    }
  }, [cameraActive, count]);

  useEffect(() => {
    if (progress) {
      progress.value = count;
    }
  }, [count, progress]);

  const startCameraAndFunction = async () => {
    setMessage(
        "지금부터 5초간 자세를 잡아주세요\n스쿼트는 옆모습으로 진행하여주세요"
    );
    setTimeout(async () => {
      setMessage("");
      await init();
      setCameraActive(true);
      loop();
      if (progressRef.current) {
        progressRef.current.style.display = "block";
        if (!progress) {
          // CircleProgress 인스턴스가 없으면 새로 생성
          const newProgress = new window.CircleProgress(progressRef.current, {
            max: MAX,
            value: count,
            animationDuration: 400,
            textFormat: (val) => `${val}°`,
          });
          setProgress(newProgress);
        } else {
          // CircleProgress 인스턴스가 이미 있으면 value를 업데이트
          progress.value = count;
        }
      }
    }, 5000);
  };

  const stopCameraAndFunction = () => {
    if (webcamRef.current) {
      webcamRef.current.stop();
      webcamRef.current = null;
    }
    setCameraActive(false);
    setCount(0);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    if (progressRef.current) {
      progressRef.current.style.display = "none";
    }
    setProgress(null);
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
      webcamRef.current = new window.tmPose.Webcam(
          webcamWidth,
          webcamHeight,
          true
      );
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

    // label-container 를 위한 것
    const newPredictions = prediction.map((p) => ({
      className: p.className,
      probability: p.probability.toFixed(2),
    }));
    setPredictions(newPredictions);

    if (prediction[2].probability.toFixed(2) === "1.00") {
      setStatus("squat");
    } else if (prediction[1].probability.toFixed(2) === "1.00") {
      setStatus("stand");
    } else if (prediction[0].probability.toFixed(2) === "1.00") {
      setStatus("nothing");
    }

    drawPose(pose);
  };

  const playCountAudio = (newCount) => {
    new Audio(`${newCount % 10}.mp3`).play();
  };

  useEffect(() => {
    console.log('Status has changed:', status);
  }, [status]);

  useEffect(() => {
    console.log('Count from useEffect:', count); // count 상태가 변경될 때마다 로그 출력
  }, [count]);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    if (status === "stand" && countRef.current === "squat") {
      const newCount = count + 1;
      setCount(newCount);
      // console.log('New Count:', newCount);
      playCountAudio(newCount);
    }
    countRef.current = status;
  }, [status, count]);

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
            <>
              <button
                  type="button"
                  onClick={stopCameraAndFunction}
                  style={squatButtonStyle}
              >
                중단하기
              </button>
              <div style={canvasBox}>
                <div
                    ref={progressRef}
                    className="progress"
                    style={{ display: "block" }}
                ></div>
                <canvas
                    ref={canvasRef}
                    width="640px"
                    height="480px"
                    style={canvasStyle}
                ></canvas>
                <div id="label-container" style={{ position: "relative", top: "5%" }}>
                  {predictions.map((p, index) => (
                      <div key={index}>{`${p.className}: ${p.probability}`}</div>
                  ))}
                </div>
              </div>
            </>
        ) : (
            <button
                type="button"
                onClick={startCameraAndFunction}
                style={squatButtonStyle}
            >
              측정시작
            </button>
        )}

        {message && (
            <div style={messageBox}>{message}</div>
        )}
      </div>
  );

};

export default Squat;