import React from "react";
import googleLogin from '../../image/Google_login.png';

const GoogleLogin = () => {
  const REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const GOOGLE_AUTH_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;

  return (
    <>
      <a href={GOOGLE_AUTH_URI}>
        {/* <button
          className="btn-social-login"
          style={{ backgroundColor: "#D93025" }}
        > */}
        <button className='btn-social-login CommonContainer'>

          {/* <i className="xi-2x xi-google"></i> */}
          <img alt='kakaotalk' src={googleLogin}
            style={{ width: '26px' }} />

        </button>
      </a>
    </>
  );
};

export default GoogleLogin;
