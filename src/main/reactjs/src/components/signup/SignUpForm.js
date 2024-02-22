import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "../../CSS/SignUp.css"

const SignUpForm = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const navi = useNavigate();

  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    nickname: '',
    birthdate: '',
    gender: '',
    year: '',
    month: '',
    day: '',
    height: 0,
    weight: 0,
  });

  const { email, password,  passwordConfirm, username, nickname, gender, year, month, day, height, weight } = userInput;  // 구조분해 할당하기

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
  };

  // 이메일 유효성 검사
  const isEmail = email => {
    const emailRegExp = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    return emailRegExp.test(email);
  };
  const isEmailValid = isEmail(email);
  const emailCheck = ( !isEmailValid && email.length > 0 ) ? 'emailCheck' : undefined;

  // 패스워드 유효성 검사
  const isPassword = password => {
    const passwordRegExp =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegExp.test(password);
  };
  const isPasswordValid = isPassword(password);
  const passwordCheck = ( !isPasswordValid && password.length > 0 ) ? 'passwordCheck' : undefined;


  // 패스워드 재확인
  const isPasswordConfirm = password === passwordConfirm;
  const passwordConfirmCheck = ( !isPasswordConfirm && passwordConfirm.length > 0 ) ? 'passwordConfirmCheck' : undefined;

  // 이름 입력여부 확인
  const isUsername = Boolean(username);

  // 성별 체크여부 확인
  const isGender = Boolean(gender);
  
  // 생년월일 입력여부 확인
  const isBirthdate = Boolean(year && month && day);
  
  // 키 입력 여부 확인
  const isHeight = Boolean(height);

  // 몸무게 입력 여부 확인
  const isWeight = Boolean(weight);


  // 개인정보 유효기간
  // const isTimeValid = Boolean(time);
  
  const isAllValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordConfirm &&
    isUsername &&
    isGender &&
    isHeight &&
    isWeight &&
    isBirthdate;

  const activeBtn = isAllValid ? 'undefined' : 'disabled';

  // 통신
  const checkSignUp = async e => {
    e.preventDefault();
    console.log(userInput);

    try {
      const response = await fetch(`${BASE_URL}/api/user/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
          nickname: nickname,
          birthdate: `${year}-${month}-${day}`,
          gender: gender,
          height: parseInt(height),
          weight: parseInt(weight),
        }),
      });

      if (response.ok) {
        alert('회원가입 성공');
        navi('/login');
      } else {
        throw new Error('회원가입 실패');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
      <div className="signUp">
        <h4>회원 가입</h4>
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

          {/* 이메일 비밀번호 입력 */}
          <p className="userEmail title mustInput">이메일</p>
          <input
            onChange={handleInput}
            className={`userInputEmail input ${emailCheck}`}
            name="email"
            type="text"
            placeholder="이메일"
            autoComplete="username"
          />
          {!isEmailValid && (
            <p
              className="inputCheck"
              style={{display: email.length > 0 ? 'block' : 'none'}}
            >
              * 이메일 양식을 맞춰주세요!
            </p>
          )}
          <hr />
          <p className="userPassword title mustInput">비밀번호</p>
          <input
            onChange={handleInput}
            className={`userInputPw input ${passwordCheck}`}
            name="password"
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
          />
          {!isPasswordValid && (
            <p
              className="inputCheck"
              style={{display: password.length > 0 ? 'block' : 'none'}}
            >
              * 비밀번호는 대소문자, 숫자, 특수문자 포함 8자리 이상 적어주세요!
            </p>
          )}
          <input
            onChange={handleInput}
            className={`userInputPwConfirm input ${passwordConfirmCheck}`}
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            autoComplete="current-password"
          />
          <hr />
          {/* 이름 입력 */}
          <p className="userName title mustInput">이름</p>
          <input
            onChange={handleInput}
            className="userInputName input"
            name="username"
            type="text"
            placeholder="이름을(를) 입력하세요"
            autoComplete="username"
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
            autoComplete="username"
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
            />
            <span className="text">여자</span>
          </label>
          <hr />
          {/* 생년월일 입력 */}
          <div className="userBirthdate">
            <p className="title mustInput">생년월일</p>
            <div className="selectBox">
              <select className="select" name="year" onChange={handleInput}>
                <option value="" selected disabled hidden>연도</option>
                {YEAR.map(y => {
                  return <option key={y}>{y}</option>;
                })}
              </select>
              <select className="select" name="month" onChange={handleInput}>
                <option value="" selected disabled hidden>월</option>
                {MONTH.map(m => {
                  return <option key={m}>{m}</option>;
                })}
              </select>
              <select className="select" name="day" onChange={handleInput}>
                <option value="" selected disabled hidden>일</option>
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

export default SignUpForm;