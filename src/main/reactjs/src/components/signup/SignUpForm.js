import React, { useState }  from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");

  // 오류메세지 상태 저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [heightMessage, setHeightMessage] = useState("");
  const [weightMessage, setWeightMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isUsername, setIsUsername] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isWeight, setIsWeight] = useState(false);
  const [isHeight, setIsHeight] = useState(false);

  const navi = useNavigate();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 다릅니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호 확인 완료");
      setIsPasswordConfirm(true);
    }
  };

  const onChangeUsername = (e) => {
    const currentUsername = e.target.value;
    setUsername(currentUsername);
  };

  const onChangeNickname = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);
  };

  const onChangePhone = (e) => {
    const currentPhone = e.target.value;
    setPhone(currentPhone);
  };

  const onChangeBirthdate = (e) => {
    const currentBirthdate = e.target.value;
    setBirthdate(currentBirthdate);
  };

  const onChangeGender = (e) => {
    const currentGender = e.target.value;
    setGender(currentGender);
  };

  const onChangeHeight = (e) => {
    const currentHeight = e.target.value;
    setHeight(currentHeight);
  };

  const onChangeWeight = (e) => {
    const currentWeight = e.target.value;
    setWeight(currentWeight);
  };
  // const handleDuplicateCheck = () => {
  //   // 여기에서 아이디 중복 확인 로직을 추가합니다.
  //   console.log('Checking duplicate for username:', username);
  // };

  const handleSendVerificationCode = () => {
    // 여기에서 이메일 또는 전화번호로 인증번호를 전송하는 로직을 추가합니다.
    console.log('Sending verification code to email or phone number:', email || phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${BASE_URL}/api/user/sign-up`,
      { email, password, username, nickname, phone, gender, birthdate, height, weight })
      .then((res) => {
      // 멤버 추가후 어디로 갈지??
      navi("/home");
    });
    // 여기에서 서버로 회원가입 데이터를 전송하는 로직을 추가합니다.
    console.log('Name:', username);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
    console.log('Verification Code:', verificationCode);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>회원 가입</h3>
          <div className="form">
            {/* 이메일 */}
            <div className="form-el">
              <label htmlFor="email">이메일</label> <br/>
              <input
                id="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
              <p className="message">{emailMessage}</p>
            </div>

            {/* 비밀번호 */}
            <div className="form-el">
              <label htmlFor="password">비밀번호</label> <br/>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
              <p className="message">{passwordMessage}</p>
            </div>

            {/*비밀번호 확인*/}
            <div className="form-el">
              <label htmlFor="passwordConfirm">비밀번호 확인</label> <br/>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
              />
              <p className="message">{passwordConfirmMessage}</p>
            </div>

            <div className="form-el">
              <label htmlFor="name">이름</label> <br/>
              <input id="username" name="username" value={username} onChange={onChangeUsername}/>
              <p className="message">{}</p>
            </div>

            <div className="form-el">
              <label htmlFor="name">닉네임</label> <br/>
              <input id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}/>
              <p className="message">{}</p>
            </div>


            <div className="form-el">
              <label htmlFor="phone">핸드폰</label> <br/>
              <input id="phone" name="phone" value={phone} onChange={onChangePhone}/>
              <p className="message">{}</p>
            </div>

            <div className="form-el">
              <label htmlFor="gender">성별</label> <br/>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={onChangeGender}
              >
                <option value="">선택하세요</option>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
              </select>
            </div>

            <div className="form-el">
              <label htmlFor="birthdate">생년월일</label> <br/>
              <input
                id="birthdate"
                name="birthdate"
                value={birthdate}
                onChange={onChangeBirthdate}
              />
              <p className="message">{}</p>
            </div>

            <div className="form-el">
              <label htmlFor="height">키</label> <br/>
              <input
                id="height"
                name="height"
                value={height}
                onChange={onChangeHeight}
              />
              <p className="message">{}</p>
            </div>

            <div className="form-el">
              <label htmlFor="weight">몸무게</label> <br/>
              <input
                id="weight"
                name="weight"
                value={weight}
                onChange={onChangeWeight}
              />
              <p className="message">{}</p>
            </div>
            <br/>
            <br/>
            <button type="submit">가입 완료</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;