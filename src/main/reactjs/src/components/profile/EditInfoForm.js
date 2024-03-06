import React, { useEffect, useState } from 'react';
import { useFetchUserInfo, UserInfoAtom } from "../../global/UserInfoAtom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import "../../CSS/SignUp.css"
import Swal from "sweetalert2";
import ScreenHeader from "../../router/ScreenHeader";

const SignUpAddForm = () => {
  const fetchUserInfo = useFetchUserInfo();
  const userInfo = useRecoilValue(UserInfoAtom);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const navi = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);


  const [userInput, setUserInput] = useState({
    nickname: '',
    height: 0,
    weight: 0,
  });

  const { username,
    nickname,
    height,
    weight } = userInput;  // 구조분해 할당하기

  useEffect(() => {
    const storedUsername = userInfo.username !== null ? userInfo.username : "";
    const storedNickname = userInfo.nickname !== null ? userInfo.nickname : "";
    setUserInput({ ...userInput, 'username': storedUsername, 'nickname': storedNickname });
  }, [userInfo]);

  const handleInput = e => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    // console.log(name);
    // console.log(userInput);
  };

  // 이름 입력여부 확인
  const isUsername = Boolean(username);


  // 키 입력 여부 확인
  const isHeight = Boolean(height);

  // 몸무게 입력 여부 확인
  const isWeight = Boolean(weight);

  // 개인정보 유효기간
  // const isTimeValid = Boolean(time);

  const isAllValid =
    isUsername &&
    isHeight &&
    isWeight;

  const activeBtn = isAllValid ? 'undefined' : 'disabled';

  // 통신
  const checkSignUp = async e => {
    e.preventDefault();
    console.log(userInput);

    try {
      const response = await fetch(`${BASE_URL}/api/user/edit-info/${userInfo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname,
          height: parseInt(height),
          weight: parseInt(weight),
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: '수정 완료',
          confirmButtonText: "OK",
          allowOutsideClick: false,
          customClass: {
            confirmButton: 'sa2-confirm-button-class',
            title: 'sa2-title-class',
            icon: 'sa2-icon-class',
            popup: 'sa2-popup-class',
            container: 'sa2-container-class'
          },
        }).then(result => {
          navi("/my");
        });
      } else {
        throw new Error('회원가입 실패');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="signUp">
      <ScreenHeader title={"정보 수정"} />
      <form className="signUpBox">
        {/* <div className="profileBox">
            <label className="imgBoxLabel" htmlFor="profileImg">
              {imageUrl ? (
                <img className="labelImg" src={imageUrl} alt="uploadImg"/>
              ) : null}
              <div className="imgUploadBtn">
                <i className="fa-sharp fa-solid fa-camera"/>
              </div>
              <input
                id="profileImg"
                className="profileImgInput"
                type="file"
                name="imageUrl"
                ref={imgRef}
                onChange={onChangeImage}
              />
            </label>
          </div> */}

        {/* 이메일 비밀번호 */}
        <p className="userEmail title mustInput">이메일</p>
        <input
          className="userInputEmail input"
          name="email"
          type="text"
          value={userInfo.email}
          disabled
        />
        <hr />
        <p className="userPassword title mustInput">비밀번호</p>
        <input
          className="userInputPw input"
          name="password"
          type="password"
          disabled
        />
        <input
          className="userInputPwConfirm input"
          name="passwordConfirm"
          type="password"
          disabled
        />
        <hr />
        {/* 이름 입력 */}
        <p className="userName title mustInput">이름</p>
        <input
          className="userInputName input"
          name="username"
          type="text"
          placeholder="이름을(를) 입력하세요"
          defaultValue={userInfo.username} // userInfo.username이 존재하면 해당 값, 없으면 빈 문자열
          disabled
        />
        <hr />
        {/* 닉네임 입력 */}
        <p className="userNickname title mustInput">닉네임</p>
        <input
          onChange={handleInput}
          className="userInputNickname input"
          name="nickname"
          type="text"
          placeholder="닉네임을(를) 입력하세요"
          defaultValue={userInfo.nickname} // userInfo.usernickname이 존재하면 해당 값, 없으면 빈 문자열
        />
        <hr />
        <p className="userGender title mustInput">성별</p>
        <div className="form_toggle row-vh d-flex flex-row justify-content-between">
          <div className={`editForm_gender_male ${userInfo.gender === 'male' ? 'gender_selected' : ''}`}>
            남자
          </div>
          <div className={`editForm_gender_female ${userInfo.gender === 'female' ? 'gender_selected' : ''}`}>
            여자
          </div>
        </div>
        {/* 성별 입력 */}
        {/*<p className="userGender title mustInput">성별</p>*/}
        {/*<label className="userMale label">*/}
        {/*  <input*/}
        {/*    onChange={handleInput}*/}
        {/*    className="radio"*/}
        {/*    name="gender"*/}
        {/*    type="radio"*/}
        {/*    value="male"*/}
        {/*    // defaultChecked={userInfo.gender === 'male' || userInfo.gender === 'M'}*/}
        {/*  />*/}
        {/*  <span className="text">남자</span>*/}
        {/*</label>*/}
        {/*<label className="userFemale label">*/}
        {/*  <input*/}
        {/*    onChange={handleInput}*/}
        {/*    className="radio"*/}
        {/*    name="gender"*/}
        {/*    type="radio"*/}
        {/*    value="female"*/}
        {/*    // defaultChecked={userInfo.gender === 'female' || userInfo.gender === 'W'}*/}
        {/*  />*/}
        {/*  <span className="text">여자</span>*/}
        {/*</label>*/}
        <hr />
        {/* 생년월일 입력 */}
        <div className="userBirthdate">
          <p className="title mustInput">생년월일</p>
          <div className="selectBox" style={{ display: "flex" }}>
            <p className="select" name="year" style={{ backgroundColor: "gray" }}>
              {userInfo && userInfo.birthdate && userInfo.birthdate.split('-')[0]}
            </p>
            <p className="select" name="year" style={{ backgroundColor: "gray" }}>
              {userInfo && userInfo.birthdate && userInfo.birthdate.split('-')[1]}
            </p>
            <p className="select" name="year" style={{ backgroundColor: "gray" }}>
              {userInfo && userInfo.birthdate && userInfo.birthdate.split('-')[2]}
            </p>
          </div>
        </div>
        <hr />
        {/* 키 입력 */}
        <div className="userHeightWeightContainer" style={{ display: "flex" }}>
          <div className="userInputContainer">
            <p className="userHeight title mustInput">키</p>
            <input
              onChange={handleInput}
              className="userInputHeight numInput"
              name="height"
              type="number"
              placeholder="cm"
            />
          </div>
          <div className="userInputContainer">
            {/* 몸무게 입력 */}
            <p className="userWeight title mustInput">몸무게</p>
            <input
              onChange={handleInput}
              className="userInputWeight numInput"
              name="weight"
              type="number"
              placeholder="kg"
            />
          </div>
        </div>
        <hr />
        <div className={`signupBtn ${activeBtn}`} onClick={checkSignUp}>
          수정
        </div>
        <div className="editAbort" onClick={() => navi("/my")}>취소</div>
      </form>
    </div>
  );
};

export default SignUpAddForm;