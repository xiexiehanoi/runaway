import React, {useEffect} from 'react';
import {useFetchUserInfo, UserInfoAtom} from "../../global/UserInfoAtom";
import {useRecoilValue} from "recoil";
import RunawayProfileImage from "./Img/runaway_male_image.jpg";
import "./css/MyProfile.css";
const MyProfile = () => {
  const fetchUserInfo = useFetchUserInfo();
  const userInfo = useRecoilValue(UserInfoAtom);

  useEffect(() => {
      fetchUserInfo();
  }, []);

  return (
    <div className="profile_main">
      <div className="my_info">
        <img src={RunawayProfileImage} alt="user login"/>
        <p className="edit_button">편집</p>
        <div className="email_info">
          <p>이메일</p>
          <span>{userInfo.email}</span>
        </div>
        <hr/>
        <div>
          <p>닉네임</p>
          <span>{userInfo.nickname}</span>
        </div>
        <hr/>
        <div>
          <p>등급</p>
          <span>{userInfo.grade ? userInfo.grade.level : '등급 정보를 불러오는 중...'}</span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;