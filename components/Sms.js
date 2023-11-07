import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState, useEffect } from 'react';
import firebaseConfig from '../firebaseConfig.js';

export default function Sms() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'ko';

  // 국가 코드를 추가한 전화번호를 설정
  const phoneNumberWithCountryCode = '+82 '; // 국가 코드

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleSignIn = () => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    signInWithPhoneNumber(auth, phoneNumberWithCountryCode + phoneNumber.slice(1), window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult; // window
      })
      .catch((error) => {
        console.log('fail signInWithPhoneNumber => ', error);
      });
  };

  const onClickHandleSendCode = () => {
    // 한국 휴대폰 번호의 정규식 (예시: 010으로 시작하는 11자리 숫자)
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (phoneNumber === '') {
      alert('휴대폰번호를 입력해 주세요. ex) 01012344321');
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      alert('휴대폰번호 형식이 맞지 않습니다. ex) 01012344321');
      return;
    }

    // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    const recap = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log('tttttt');
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        handleSignIn();
      },
    });

    recap.render().then((widgetId) => {
      grecaptcha.getResponse(widgetId);
      console.log('ssssssssssss', widgetId);
    });
  };

  const onClickHandleVerifyCode = () => {
    window.confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log('hey YOU ARE IN SUCCESS => ', user);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log('fail Verify => ', error);
      });
  };

  return (
    <>
      <div id="sign-in-button"></div>
      <input
        type="text"
        placeholder="휴대폰번호(01012341234)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={onClickHandleSendCode}>인증번호 요청</button>
      <input
        type="text"
        placeholder="인증번호 입력"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <input onChange={(e) => Setvalue(e.target.value)} type="text" />
      <button onClick={onClickHandleVerifyCode}>인증번호 확인</button>
    </>
  );
}
