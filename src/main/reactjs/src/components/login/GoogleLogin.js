import React from "react";

const GoogleLogin = () => {
  const REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const GOOGLE_AUTH_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;

  return (
    <>
      <a href={GOOGLE_AUTH_URI}>
        <button
          className="btn-social-login"
          style={{ backgroundColor: "#D93025" }}
        >
          <i className="xi-2x xi-google"></i>
        </button>
      </a>
    </>
  );
};

export default GoogleLogin;
