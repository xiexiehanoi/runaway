import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useSwipeable } from "react-swipeable";

// test 하드코딩
// const videoUrl1 =
//   "https://kr.object.ncloudstorage.com/runaway/runaway_story/3_202402181632_c2e4ecda-f";
// const videoUrl2 =
//   "https://kr.object.ncloudstorage.com/runaway/runaway_story/3_202402181632_c2e4ecda-f";
// const videoUrl3 =
//   "https://kr.object.ncloudstorage.com/runaway/runaway_story/3_202402181748_c100dca0-5";
// const videoUrls = [videoUrl1, videoUrl2, videoUrl3];

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
    <div {...handlers}>
      <VideoPlayer src={videoUrl + storyList[videoIndex].storyContent} />
      <p>User: {storyList.user}</p>
      <p>Upload Time: {storyList.storyUploadTime}</p>
    </div>
  );
};

export default StoryShow;
