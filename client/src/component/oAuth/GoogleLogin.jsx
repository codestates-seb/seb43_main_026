// import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Google = () => {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  //   const googleRedirectUrl = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
  //   const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${googleRedirectUrl}`;

  const successGoogle = (res) => {
    console.log(res);
  };

  const failGoogle = (res) => {
    console.log(res);
  };

  return (
    <>
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleLogin
          buttonText="google"
          onSuccess={successGoogle}
          onError={failGoogle}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default Google;
