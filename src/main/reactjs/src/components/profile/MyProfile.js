import React, {useEffect} from 'react';
import {useFetchUserInfo, UserInfoAtom} from "../../global/UserInfoAtom";
import {useRecoilValue} from "recoil";
import RunawayMaleImage from "./Img/runaway_male_image.jpg";
import RunawayFemaleImage from "./Img/runaway_female_image.jpg";
import "./css/MyProfile.css";
import ChallengerIcon from "./Img/challenger_icon.jpg";
import axios from "axios";
import {useNavigate} from "react-router-dom";
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
        <div className="rank_border">
          <img src={`${IMAGE_URL}${userInfo?.imageUrl}`}
               alt="profile_image"
               className="profile_image"
               onError={handleImageError}/>
          <input type="file" id="file" style={{display: 'none'}} onChange={uploadPhoto}/>
          <label htmlFor="file">
            <ion-icon name="create"></ion-icon>
          </label>
        </div>
        <div className="show_info">
          <span className="user_nickname">{userInfo.nickname}</span>
          <p className="user_email">{userInfo.email}aaaaa@naver.com</p>
        </div>
        <div className="edit_info" style={{marginTop: "9%"}}>
          <button className="edit_button btn primaryButton-outset" onClick={goToEditInfoForm}>편집</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;