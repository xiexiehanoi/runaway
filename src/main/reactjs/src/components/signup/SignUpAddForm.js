import React, {useEffect, useState} from 'react';
import {useFetchUserInfo, UserInfoAtom} from "../../global/UserInfoAtom";
import {useRecoilValue} from "recoil";

const SignUpAddForm = () => {
  const fetchUserInfo = useFetchUserInfo();
  const userInfo = useRecoilValue(UserInfoAtom);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [userInput, setUserInput] = useState({
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

  const { username, nickname, gender, year, month, day, height, weight } = userInput;  // 구조분해 할당하기

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



  return (
    <>
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
            onChange={handleInput}
            className="userInputName input"
            name="username"
            type="text"
            placeholder="이름을(를) 입력하세요"
            value={userInfo.username || ''} // userInfo.username이 존재하면 해당 값, 없으면 빈 문자열
            disabled={!!userInfo.username}
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
            value={userInfo.nickname || ''} // userInfo.username이 존재하면 해당 값, 없으면 빈 문자열
            disabled={!!userInfo.nickname}
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
              checked={userInfo.gender === 'male' || userInfo.gender === 'M'}
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
              checked={userInfo.gender === 'female' || userInfo.gender === 'W'}
            />
            <span className="text">여자</span>
          </label>
          <hr />
      {/*    /!* 생년월일 입력 *!/*/}
      {/*    <div className="userBirthdate">*/}
      {/*      <p className="title mustInput">생년월일</p>*/}
      {/*      <div className="selectBox">*/}
      {/*        <select className="select" name="year" onChange={handleInput}>*/}
      {/*          <option value="" selected disabled hidden>연도</option>*/}
      {/*          {YEAR.map(y => {*/}
      {/*            return <option key={y}>{y}</option>;*/}
      {/*          })}*/}
      {/*        </select>*/}
      {/*        <select className="select" name="month" onChange={handleInput}>*/}
      {/*          <option value="" selected disabled hidden>월</option>*/}
      {/*          {MONTH.map(m => {*/}
      {/*            return <option key={m}>{m}</option>;*/}
      {/*          })}*/}
      {/*        </select>*/}
      {/*        <select className="select" name="day" onChange={handleInput}>*/}
      {/*          <option value="" selected disabled hidden>일</option>*/}
      {/*          {DAY.map(d => {*/}
      {/*            return <option key={d}>{d}</option>;*/}
      {/*          })}*/}
      {/*        </select>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <hr/>*/}
      {/*    /!* 키 입력 *!/*/}
      {/*    <p className="userHeight title mustInput">키</p>*/}
      {/*    <input*/}
      {/*      onChange={handleInput}*/}
      {/*      className="userInputHeight numInput"*/}
      {/*      name="height"*/}
      {/*      type="number"*/}
      {/*      placeholder="cm"*/}
      {/*    />*/}
      {/*    <hr />*/}
      {/*    /!* 몸무게 입력 *!/*/}
      {/*    <p className="userWeight title mustInput">몸무게</p>*/}
      {/*    <input*/}
      {/*      onChange={handleInput}*/}
      {/*      className="userInputWeight numInput"*/}
      {/*      name="weight"*/}
      {/*      type="number"*/}
      {/*      placeholder="kg"*/}
      {/*    />*/}

      {/*    /!* 개인정보 유효기간 *!/*/}
      {/*    <div className="agree">*/}
      {/*      <p className="name title">약관 동의</p>*/}
      {/*    </div>*/}
      {/*    <div className={`signupBtn ${activeBtn}`} onClick={checkSignUp}>*/}
      {/*      가입하기*/}
      {/*    </div>*/}
        </form>
      </div>
    </>
  );
};

export default SignUpAddForm;