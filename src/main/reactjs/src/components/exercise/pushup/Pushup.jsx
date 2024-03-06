import React, { useRef, useState, useEffect, useCallback } from "react";
import "../squat/progress.css";
import Modal from "../MaxInputModal";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import xButtonImage from "../../../image/close-white.png";
import ProgressBar from "../progressBar";
import Swal from "sweetalert2";

const blinkAnimation = keyframes`
  0% { color: transparent; }
  50% { color: white; }
  100% { color: transparent; }
`;

const MessageBox = styled.div`
  width: 83%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: pre-line;
  text-align: center;
  font-size: 18px;
  opacity: 0.6;
  font-weight: 900;
  animation: ${blinkAnimation} 2.5s infinite linear forwards;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const dateToSend = new Date().toISOString().split("T")[0];

const calculateCalories = (count, exerciseType) => {
  switch (exerciseType) {
    case "squat":
      return count * 1.2;
    case "situp":
      return count * 0.9;
    case "pushup":
      return count * 0.7;
    default:
      return 0;
  }
};

const saveCountToDatabase = async (count, exerciseType) => {
  try {
    const token = window.localStorage.getItem("token");
    if (!token) {
      console.log("Token not found.");
      return;
    }

    const calories = calculateCalories(count, exerciseType);
    await axios.post(
      `${BASE_URL}/api/exercise/save`,
      {
        date: dateToSend,
        exerciseCount: count,
        exerciseType: exerciseType,
        calories: calories,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("Count saved successfully");
  } catch (error) {
    console.error("Failed to save count", error.response);
  }
};

const Pushup = () => {
  const squatBoxContainer = {
    position: "relative",
    width: "100%",
    height: "102%",
    textAlign: "center",
  };

  const stopButtonStyle = {
    position: "absolute",
    zIndex: 100,
    width: "45px",
    height: "45px",
    border: "none",
    left: "43%",
    top: "80%",
    backgroundColor: "transparent",
  };

  const canvasBox = {
    height: "100%",
    width: "100%",
    overflowY: "hidden",
  };

  const canvasStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    top: "0%",
  };

  const successCheck = {
    width: '150px',
    height: '150px',
    position: "absolute",
    transform: 'translate(-50%, -50%)',
    top: "50%",
    left: "50%",
    backgroundColor: "transparent",
  }

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
  const [showStartButton, setShowStartButton] = useState(true);

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
        textFormat: (val) => `${val}%`,
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
    await init();
    setCameraActive(true);
    loop();
    if (progressRef.current) {
      progressRef.current.style.display = "block";
      if (!progress) {
        const newProgress = new window.CircleProgress(progressRef.current, {
          max: maxCount,
          value: count,
          animationDuration: 400,
          textFormat: (val) => `${val}%`,
        });
        setProgress(newProgress);
      } else {
        progress.value = count;
      }
    }
  };

  const handleModalSave = (value) => {
    setMaxCount(value);
    setShowModal(false);
    setShowStartButton(false);
    setMessage(
      "지금부터 5초간 자세를 잡아주세요\n푸쉬업은 엎드린 상태로\n정면을 바라보고 진행해주세요"
    );
    setTimeout(() => {
      setMessage("");
      startExercise();
    }, 5000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowStartButton(true);
  };

  const handleStartButtonClick = () => {
    setShowModal(true);
    setShowStartButton(true);
  };

  const stopCameraAndFunction = useCallback(() => {
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
    setShowStartButton(true);
  }, [
    // 상태 업데이트 함수들
    setMaxCount,
    setCount,
    setCameraActive,
    setProgress,
    setShowStartButton,
  
    // ref의 current 값들
    webcamRef,
    animationFrameId,
    canvasRef,
    progressRef,
  ]);

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
            setMessage({ type: "image", value: "/squat/SuccessCheck3.gif" });
            setTimeout(() => {
              setMessage(""); // 또는 setMessage(null); 로 상태를 비워 GIF를 제거
            }, 2400);
            setTimeout(() => {
              window.location = "/exercise";
            }, 3400);
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

  const CloseCanvasCam = useCallback(() => {
    Swal.fire({
      icon: "warning",
      title: "정말로 나가시겠습니까?",
      confirmButtonText: "네, 나가겠습니다",
      cancelButtonText: "아니요, 돌아가겠습니다",
      showCancelButton: true,
      customClass: {
        confirmButton: "sa2-confirm-button-class",
        cancelButton: "sa2-cancel-button-class",
        title: "sa2-title-class",
        icon: "sa2-icon-class",
        popup: "sa2-popup-class",
        container: "sa2-container-class",
      },
      html: "이대로 나가신다면<br/>지금까지 수행한 운동 기록은<br/>지워질 수 있습니다.",
    }).then((result) => {
      if (result.isConfirmed) {
        stopCameraAndFunction();
      } else {
      }
    });
  }, [stopCameraAndFunction]);

  return (
    <>
      <div style={squatBoxContainer}>
        {showStartButton && (
          <div
            className="playButton-container"
            onClick={handleStartButtonClick}
          >
            <div className="playButton-triangle"></div>
          </div>
        )}

        {cameraActive && (
          <button
            type="button"
            onClick={CloseCanvasCam}
            style={stopButtonStyle}
          >
            <img src={xButtonImage} alt="" />
          </button>
        )}

        <div style={canvasBox}>
          {cameraActive && (
            <>
              {/* <div
                ref={progressRef}
                className="progress"
                style={{ display: "block" }}
              ></div> */}
              <ProgressBar maxCount={maxCount} count={count} />
              <canvas
                ref={canvasRef}
                width="640px"
                height="480px"
                style={canvasStyle}
              ></canvas>
              {/* <div
                id="label-container"
                style={{ position: "relative", top: "5%" }}
              >
                {predictions.map((p, index) => (
                  <div key={index}>{`${p.className}: ${p.probability}`}</div>
                ))}
              </div> */}
            </>
          )}
        </div>

        {showModal && (
          <Modal onSave={handleModalSave} onClose={handleModalClose} />
        )}

        {message && message.type === "text" && (
          <div className="message-container">
            <MessageBox>{message.value}</MessageBox>
          </div>
        )}

        {message && message.type === "image" && (
          <div style={{ textAlign: "center" }}>
            <img src={message.value} alt="" style={successCheck} />
          </div>
        )}
      </div>
    </>
  );
};

export default Pushup;
