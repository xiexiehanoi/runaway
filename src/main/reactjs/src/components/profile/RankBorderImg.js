import React, {useEffect} from 'react';
// import {useFetchUserInfo, UserInfoAtom} from "../../global/UserInfoAtom";
// import {useRecoilValue} from "recoil";


const RankBorderImg = ({}) => {
  // const fetchUserInfo = useFetchUserInfo();
  // const userInfo = useRecoilValue(UserInfoAtom);
  //
  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

  // 등급에 따른 이미지 소스와 클래스 이름을 저장하는 Map 객체
  const gradeMap = new Map();
  gradeMap.set("신입", {src: GoldBorder, classname: "rank_outside"});

  // userInfo.grade.level 값에 따라 적절한 이미지를 반환
  if (gradeMap.has(userInfo.grade.level)) {
    const {src, classname} = gradeMap.get(userInfo.grade.level);
    return (
      <img src={src} className={classname} alt="1"/>
    );
  }

  {"신입", {src, classname},
    "신입", {src, classname},
    "신입", {src, classname}}
  // }
  if (userInfo.grade.level === "신입") {
    return (
      <img src={GoldBorder} className="rank_outside" alt="1"/>
    );
  } if (userInfo.grade.level === "신입") {
    return (
      <img src={GoldBorder} className="rank_outside" alt="1"/>
    );
  } if (userInfo.grade.level === "신입") {
    GoldBorder = ""
  }

  return (
    <img src={GoldBorder} className="rank_outside" alt="1"/>
  );
};

export default RankBorderImg;