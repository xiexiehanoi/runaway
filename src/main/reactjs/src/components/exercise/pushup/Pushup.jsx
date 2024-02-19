import React, { useRef, useState, useEffect, useCallback } from "react";
import "../squat/progress.css";
import Modal from "../MaxInputModal";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const dateToSend = new Date().toISOString().split("T")[0];

const saveCountToDatabase = async (count, exerciseType) => {
  try {
    const token = window.localStorage.getItem("token");
    if (!token) {
      console.log("Token not found.");
      return;
    }

    await axios.post(
      `${BASE_URL}/api/exercise/save`,
      {
        date: dateToSend,
        exerciseCount: count,
        exerciseType: exerciseType,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("Count saved successfully");
    alert("세트 하나 완료");
  } catch (error) {
    console.error("Failed to save count", error.response);
  }
};

const Pushup = () => {
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
  const [maxCount, setMaxCount] = useState(10); // 기본 MAX 값
  const [showModal, setShowModal] = useState(false);
  const [exerciseType, setExerciseType] = useState("");
  const [audios, setAudios] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/squat")) {
      setExerciseType("squat");
    } else if (location.pathname.includes("/situp")) {
      setExerciseType("situp");
    } else if (location.pathname.includes("/pushup")) {
      setExerciseType("pushup");
    }
  }, [location]);

  useEffect(() => {
    if (progress) {
      progress.value = count;
      progress.el.style.setProperty("--progress-value", count / maxCount);
    }
  }, [count, progress, maxCount]);

  useEffect(() => {
    if (cameraActive && !progress && progressRef.current) {
      const newProgress = new window.CircleProgress(progressRef.current, {
        max: maxCount,
        value: count,
        animationDuration: 400,
        textFormat: (val) => `${val}회`,
      });
      setProgress(newProgress); // 생성된 인스턴스를 progress 상태로 설정
    }
    if (!cameraActive && progress) {
      setProgress(null); // progress 인스턴스를 null로 설정하여 제거
    }
  }, [cameraActive, count, maxCount, progress]);

  useEffect(() => {
    if (progress) {
      progress.value = count;
    }
  }, [count, progress]);

  const startExercise = async () => {
    // 카메라 및 관련 기능 시작 로직
    setMessage(
      "지금부터 5초간 자세를 잡아주세요\n푸쉬업은 정면모습으로 진행하여주세요"
    );
    setTimeout(async () => {
      setMessage("");
      await init();
      setCameraActive(true);
      loop();
      if (progressRef.current) {
        progressRef.current.style.display = "block";
        if (!progress) {
          const newProgress = new window.CircleProgress(progressRef.current, {
            max: maxCount, // 사용자가 설정한 maxCount 사용
            value: count,
            animationDuration: 400,
            textFormat: (val) => `${val}회`,
          });
          setProgress(newProgress);
        } else {
          progress.value = count;
        }
      }
    }, 5000);
  };

  const handleModalSave = (value) => {
    setMaxCount(value);
    setShowModal(false);
    startExercise();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleStartButtonClick = () => {
    setShowModal(true);
  };

  const stopCameraAndFunction = () => {
    setMaxCount(0);
    setCount(0);
    setCameraActive(false);

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
    try {
      const URL = "/pushup/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      const webcamWidth = 640;
      const webcamHeight = 480;

      // 모델 로딩 시도
      modelRef.current = await window.tmPose.load(modelURL, metadataURL);

      // 웹캠 설정 시도
      if (!webcamRef.current) {
        webcamRef.current = new window.tmPose.Webcam(
          webcamWidth,
          webcamHeight,
          true
        );
        await webcamRef.current.setup();
      }

      // 웹캠 스트리밍 시작 시도
      await webcamRef.current.play();
    } catch (error) {
      console.error("Failed to initialize the model or webcam", error);
      alert(
        "모델 또는 웹캠을 초기화하는 데 실패했습니다. 자세한 정보는 콘솔을 확인해주세요."
      );
    }

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
    const { pose, posenetOutput } = await modelRef.current.estimatePose(
      webcamRef.current.canvas
    );
    const prediction = await modelRef.current.predict(posenetOutput);

    // label-container 를 위한 것
    const newPredictions = prediction.map((p) => ({
      className: p.className,
      probability: p.probability.toFixed(2),
    }));
    setPredictions(newPredictions);

    if (prediction[2].probability.toFixed(2) === "1.00") {
      setStatus("pushdown");
    } else if (prediction[1].probability.toFixed(2) === "1.00") {
      setStatus("pushup");
    } else if (prediction[0].probability.toFixed(2) === "1.00") {
      setStatus("nothing");
    }
    drawPose(pose);
  };

  useEffect(() => {
    const loadedAudios = [];
    for (let i = 0; i <= 10; i++) {
      loadedAudios[i] = new Audio(`/squat/${i}.mp3`);
      loadedAudios[i].oncanplaythrough = () =>
        (loadedAudios[i].readyToPlay = true);
    }
    setAudios(loadedAudios);
  }, []);

  const playCountAudio = useCallback(
    (newCount) => {
      const audioIndex = newCount % 10;
      if (audios[audioIndex] && audios[audioIndex].readyToPlay) {
        audios[audioIndex].play().catch((e) => {
          console.error("오디오 재생 실패", e);
        });
      }
    },
    [audios]
  );

  useEffect(() => {
    console.log("Status has changed:", status);
  }, [status]);

  useEffect(() => {
    console.log("Count from useEffect:", count);
  }, [count]);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    if (status === "pushup" && countRef.current === "pushdown") {
      const newCount = count + 1;
      setCount(newCount);
      playCountAudio(newCount);

      if (newCount === maxCount) {
        saveCountToDatabase(newCount, exerciseType)
          .then(() => {
            window.location = "/exercise";
          })
          .catch((error) => {
            console.error("Failed to save count", error.response);
          });
      }
    }
    countRef.current = status;
  }, [status, count, maxCount, exerciseType, playCountAudio]);

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
      <div style={squatContextStyle}>pushup</div>
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
            <div
              id="label-container"
              style={{ position: "relative", top: "5%" }}
            >
              {predictions.map((p, index) => (
                <div key={index}>{`${p.className}: ${p.probability}`}</div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={handleStartButtonClick}
          style={squatButtonStyle}
        >
          측정시작
        </button>
      )}

      {showModal && (
        <Modal onSave={handleModalSave} onClose={handleModalClose} />
      )}

      {message && <div style={messageBox}>{message}</div>}
    </div>
  );
};

export default Pushup;
