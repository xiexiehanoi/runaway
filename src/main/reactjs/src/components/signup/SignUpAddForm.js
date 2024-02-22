import React, {useEffect, useState} from 'react';
import {useFetchUserInfo, UserInfoAtom} from "../../global/UserInfoAtom";
import {useRecoilValue} from "recoil";
import {useNavigate} from "react-router-dom";

const SignUpAddForm = () => {
  const fetchUserInfo = useFetchUserInfo();
  const userInfo = useRecoilValue(UserInfoAtom);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const navi = useNavigate();
  const isEnoughInfo = userInfo.height !== null && userInfo.weight !== null;

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (isEnoughInfo) {
      navi("/");
    }
  }, [isEnoughInfo, navi]);

  const [userInput, setUserInput] = useState({
    username: '',
    nickname: '',
    gender: '',
    year: '',
    month: '',
    day: '',
    height: 0,
    weight: 0,
  });

  const { username,
    nickname,
    year,
    month,
    day,
    height,
    weight } = userInput;  // 구조분해 할당하기

  useEffect(() => {
    const storedUsername = userInfo.username !== null ? userInfo.username : "";
    const storedNickname = userInfo.nickname !== null ? userInfo.nickname : "";
    setUserInput({...userInput, 'username': storedUsername, 'nickname': storedNickname});
  }, [userInfo]);

  // 상수 데이터
  // 년
  const YEAR = [];

  const nowYear = new Date().getFullYear();
  for (let i = 1980; i <= nowYear; i++) {
    YEAR.push(i);
  }

  // 월
  const MONTH = [];

  for (let i = 1; i <= 12; i++) {
    let m = String(i).padStart(2, '0');
    MONTH.push(m);
  }

  // 일
  const DAY = [];
  for (let i = 1; i <= 31; i++) {
    let d = String(i).padStart(2, '0');
    DAY.push(d);
  }

  const handleInput = e => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    // console.log(name);
    // console.log(userInput);
  };

  // 이름 입력여부 확인
  const isUsername = Boolean(username);

  // 생년월일 입력여부 확인
  const isBirthdate = Boolean(year && month && day);

  // 키 입력 여부 확인
  const isHeight = Boolean(height);

  // 몸무게 입력 여부 확인
  const isWeight = Boolean(weight);

  // 개인정보 유효기간
  // const isTimeValid = Boolean(time);

  const isAllValid =
    isUsername &&
    isHeight &&
    isWeight &&
    isBirthdate;

  const activeBtn = isAllValid ? 'undefined' : 'disabled';

  // 통신
  const checkSignUp = async e => {
    e.preventDefault();
    console.log(userInput);

    try {
      const response = await fetch(`${BASE_URL}/api/user/sign-up/add/${userInfo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          nickname: nickname,
          birthdate: `${year}-${month}-${day}`,
          gender: document.querySelector('input[name="gender"]:checked').value,
          height: parseInt(height),
          weight: parseInt(weight),
        }),
      });

      if (response.ok) {
        alert('수정 완료');
        navi('/');
      } else {
        throw new Error('회원가입 실패');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
      <div className="signUp">
        <h4>정보 수정</h4>
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
            onChange={
              (userInfo.username === "" || userInfo.username === null) ?
                handleInput : undefined}
            className="userInputName input"
            name="username"
            type="text"
            placeholder="이름을(를) 입력하세요"
            defaultValue={userInfo.username} // userInfo.username이 존재하면 해당 값, 없으면 빈 문자열
            disabled={userInfo.username ? true : false}
          />
          <hr />
          {/* 닉네임 입력 */}
          <p className="userNickname title mustInput">닉네임</p>
          <input
            onChange={
              (userInfo.nickname === "" || userInfo.nickname === null) ?
                handleInput : undefined}
            className="userInputNickname input"
            name="nickname"
            type="text"
            placeholder="닉네임을(를) 입력하세요"
            defaultValue={userInfo.nickname} // userInfo.usernickname이 존재하면 해당 값, 없으면 빈 문자열
            disabled={userInfo.nickname ? true : false}
          />
          <hr />
          {/* 성별 입력 */}
          <p className="userGender title mustInput">성별</p>
          <label className="userMale label">
            <input
              onChange={handleInput}
              className="radio"
              name="gender"
              type="radio"
              value="male"
              // defaultChecked={userInfo.gender === 'male' || userInfo.gender === 'M'}
            />
            <span className="text">남자</span>
          </label>
          <label className="userFemale label">
            <input
              onChange={handleInput}
              className="radio"
              name="gender"
              type="radio"
              value="female"
              // defaultChecked={userInfo.gender === 'female' || userInfo.gender === 'W'}
            />
            <span className="text">여자</span>
          </label>
          <hr />
          {/* 생년월일 입력 */}
          <div className="userBirthdate">
            <p className="title mustInput">생년월일</p>
            <div className="selectBox">
              <select className="select" name="year" onChange={handleInput} defaultValue="연도">
                  <option disabled hidden>연도</option>
                {YEAR.map(y => {
                  return <option key={y}>{y}</option>;
                })}
              </select>
              <select className="select" name="month" onChange={handleInput} defaultValue="월">
                <option defaultValue="" disabled hidden>월</option>
                {MONTH.map(m => {
                  return <option key={m}>{m}</option>;
                })}
              </select>
              <select className="select" name="day" onChange={handleInput} defaultValue="일">
                <option disabled hidden>일</option>
                {DAY.map(d => {
                  return <option key={d}>{d}</option>;
                })}
              </select>
            </div>
          </div>
          <hr/>
          {/* 키 입력 */}
          <p className="userHeight title mustInput">키</p>
          <input
            onChange={handleInput}
            className="userInputHeight numInput"
            name="height"
            type="number"
            placeholder="cm"
          />
          <hr />
          {/* 몸무게 입력 */}
          <p className="userWeight title mustInput">몸무게</p>
          <input
            onChange={handleInput}
            className="userInputWeight numInput"
            name="weight"
            type="number"
            placeholder="kg"
          />

          {/* 개인정보 유효기간 */}
          <div className="agree">
            <p className="name title">약관 동의</p>
          </div>
          <div className={`signupBtn ${activeBtn}`} onClick={checkSignUp}>
            가입하기
          </div>
        </form>
      </div>
  );
};

export default SignUpAddForm;