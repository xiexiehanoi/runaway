import React, {useEffect} from 'react';
import {useFetchUserInfo, UserInfoAtom} from "../../global/UserInfoAtom";
import {useRecoilValue} from "recoil";
import RunawayMaleImage from "./Img/runaway_male_image.jpg";
import RunawayFemaleImage from "./Img/runaway_female_image.jpg";
import "./css/MyProfile.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import RankOutside from "../profile/Img/border_img/flower.png"

const MyProfile = () => {
  const fetchUserInfo = useFetchUserInfo();
  const userInfo = useRecoilValue(UserInfoAtom);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const IMAGE_URL = "https://kr.object.ncloudstorage.com/runaway/profile_image/";
  const navi = useNavigate();

  useEffect(() => {
      fetchUserInfo();
  }, []);

  const handleImageError = (e) => {
    if (userInfo.gender === 'male') {
      e.target.src = `${RunawayMaleImage}`;
    } else {
      e.target.src = `${RunawayFemaleImage}`;
    }
  };

  const goToEditInfoForm = () => {
    navi("/edit-info");
  };

  // 파일 업로드 이벤트
  const uploadPhoto = (e) => {
    const uploadFile = new FormData();
    uploadFile.append("upload", e.target.files[0]);
    axios({
      method: "post",
      url: `${BASE_URL}/api/user/mypage/photo-upload/${userInfo.id}`,
      data: uploadFile,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      console.log(res.data);// 사진 변경-스토리지에 업로드 된 파일명을 서버가 반환
      window.location.reload();
    });
  };

  return (
    <div className="profile_main">
      <div className="my_info">
        <img src={RankOutside} className="rank_outside"/>
        <div className="rank_border">
          <input type="file" id="file" style={{display: 'none'}} onChange={uploadPhoto}/>
          <label htmlFor="file">
            <img src={`${IMAGE_URL}${userInfo?.imageUrl}`}
                 alt="profile_image"
                 className="profile_image"
                 onError={handleImageError}/>
          </label>
        </div>
        <div className="show_info">
          <span className="user_nickname">{userInfo.nickname}</span>
          <button className="edit_button btn primaryButton-outset" onClick={goToEditInfoForm}>편집</button>
          <p className="user_email">{userInfo.email}aaaaaaaa@naver.com</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;