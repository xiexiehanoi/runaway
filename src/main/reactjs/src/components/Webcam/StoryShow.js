import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useSwipeable } from "react-swipeable";

const videoUrl = "https://kr.object.ncloudstorage.com/runaway/runaway_story/";

const StoryShow = ({ storyList }) => {
  const [videoIndex, setVideoIndex] = useState(0);

  // console.log("Received item:", storyList); // 이 부분을 추가하여 받은 데이터를 확인합니다.

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setVideoIndex((prevIndex) =>
        prevIndex === storyList.length - 1 ? 0 : prevIndex + 1
      );
    },
    onSwipedRight: () => {
      setVideoIndex((prevIndex) =>
        prevIndex === 0 ? storyList.length - 1 : prevIndex - 1
      );
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // storyList 배열이 비어있는 경우 빈 컴포넌트 반환
  if (!storyList || storyList.length === 0) {
    return <div>No stories to display</div>;
  }

  // videoIndex가 유효한 범위 내에 있는지 확인
  if (videoIndex < 0 || videoIndex >= storyList.length) {
    return <div>Invalid video index</div>;
  }

  const reversedStoryList = [...storyList].reverse();
  const currentStory = reversedStoryList[videoIndex];

  // 현재 스토리가 존재하고 storyContent가 존재하는지 확인
  if (!currentStory || !currentStory.storyContent) {
    return <div>Invalid story content</div>;
  }

  // 확장자를 기반으로 MIME 유형을 결정합니다.
  const mimeType = currentStory.storyContent.endsWith('.mp4') ? 'video/mp4' : 'video/webm';

  return (
    <div {...handlers} style={{ width: "100%", height: "100%", overflow: "hidden", position: 'relative' }} >
      <VideoPlayer
        src={videoUrl + currentStory.storyContent}
        mimeType={mimeType}
        currentStory={currentStory}
      // width={100} // 부모 요소인 primaryCard에 가득 차도록 100%로 설정
      // height={100} // 부모 요소인 primaryCard에 가득 차도록 100%로 설정
      >
      </VideoPlayer>
      {/* <span className="primaryCard storyInfoContainer" >
        <p className="storyInfo1">
          User: {currentStory.user.username}
        </p>
        <p className="storyInfo2">
          Upload Time: {currentStory.storyUploadTime}
        </p>
      </span> */}
    </div>

  );
};

export default StoryShow;
