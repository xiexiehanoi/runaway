import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useSwipeable } from "react-swipeable";

const videoUrl = "https://kr.object.ncloudstorage.com/runaway/runaway_story/";

const StoryShow = ({ storyList }) => {
  const [videoIndex, setVideoIndex] = useState(0);

  console.log("Received item:", storyList); // 이 부분을 추가하여 받은 데이터를 확인합니다.

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

  // item이 배열이 아니거나 length 속성이 존재하지 않는 경우를 확인합니다.
  if (!Array.isArray(storyList) || !storyList.length) {
    console.log("No stories to display");
    return <div>No stories to display</div>;
  } else {
    console.log("storyList Array : " + storyList);
  }

  // item 배열이 비어 있는 경우를 확인하고 반환합니다.
  if (!storyList || storyList.length === 0) {
    console.log("No stories to display");
    return <div>No stories to display</div>;
  } else {
    console.log("storyList length : " + storyList.length);
  }

  // videoIndex가 유효한 범위 내에 있는지 확인합니다.
  if (videoIndex < 0 || videoIndex >= storyList.length) {
    console.log("Invalid video index");
    return <div>Invalid video index</div>;
  } else {
    console.log("video index : " + videoIndex);
  }

  // storyContent가 정의되어 있는지 확인합니다.
  if (!storyList[videoIndex] || !storyList[videoIndex].storyContent) {
    console.log("Invalid story content");
    return <div>Invalid story content</div>;
  } else {
    console.log("storyList [VideoIndex] : " + storyList[videoIndex]);
  }

  return (
    <div {...handlers} style={{width: "100%", height: "100%"}} >
      <div {...handlers} style={{width: "100%", height: "100%"}} >
        <VideoPlayer
          src={videoUrl + storyList[videoIndex].storyContent}
        />
      </div>
        <p style={{
          color: '#f5f5f5', fontWeight: '500', fontSize: '1.1em', margin: '2% 4%'
        }}>User: {storyList[videoIndex].user.username}</p>
        <p style={{
          color: '#f5f5f5', fontWeight: '500', fontSize: '1.1em', margin: '2% 4%'
        }}>Upload Time: {storyList[videoIndex].storyUploadTime}</p>
    </div>
  );
};

export default StoryShow;
