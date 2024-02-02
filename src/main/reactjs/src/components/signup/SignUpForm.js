import React, { useState } from 'react';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handleDuplicateCheck = ()=> {
        // 여기에서 아이디 중복 확인 로직을 추가합니다.
        console.log('Checking duplicate for username:', username);
    };

    const handleSendVerificationCode = () => {
        // 여기에서 이메일 또는 전화번호로 인증번호를 전송하는 로직을 추가합니다.
        console.log('Sending verification code to email or phone number:', email || phoneNumber);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 여기에서 서버로 회원가입 데이터를 전송하는 로직을 추가합니다.
        console.log('Name:', name);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Email:', email);
        console.log('Birth Date:', birthDate);
        console.log('Phone Number:', phoneNumber);
        console.log('Verification Code:', verificationCode);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="button" onClick={handleDuplicateCheck}>Check Duplicate</button>
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="button" onClick={handleSendVerificationCode}>Get Verification Code</button>
            </div>

            <div>
                <label htmlFor="birthDate">Birth Date:</label>
                <input
                    type="text"
                    id="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    required
                />
            </div>

            <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <button type="button" onClick={handleSendVerificationCode}>Get Verification Code</button>
            </div>

            <div>
                <label htmlFor="verificationCode">Verification Code:</label>
                <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
            </div>

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;