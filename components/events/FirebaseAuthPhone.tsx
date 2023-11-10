import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState, useEffect } from 'react';
import firebaseConfig from '../../firebaseConfig.js';
import Link from 'next/link.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'ko';

// 국가 코드를 추가한 전화번호를 설정
const phoneNumberWithCountryCode = '+82 '; // 국가 코드

const Sms = () => {
  console.log(firebaseConfig);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');

  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (isCounting) {
      const interval = setInterval(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          clearInterval(interval);
          window.location.reload(); // 페이지 새로 고침
          alert('인증 오류 발생. ChangSol에게 문의해 주세요.');
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [countdown, isCounting]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const startCountdown = () => {
    setCountdown(180); // 3 minutes in seconds
    setIsCounting(true);
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

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
          callback: (response: any) => {},
        },
        auth
      );
    }
    window.recaptchaVerifier.render();

    signInWithPhoneNumber(auth, phoneNumberWithCountryCode + phoneNumber.slice(1), window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult; // window
        startCountdown();
      })
      .catch((error) => {
        console.log(error);
        window.location.reload(); // 페이지 새로 고침
        alert('인증번호 요청 실패. ChangSol에게 문의해 주세요.');
      });
  };

  const onClickHandleVerifyCode = () => {
    window.confirmationResult
      .confirm(verificationCode)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        alert('인증번호 확인완료');
      })
      .catch((error: any) => {
        // User couldn't sign in (bad verification code?)
        console.log(error);
        window.location.reload(); // 페이지 새로 고침
        alert('인증번호 확인 실패. ChangSol에게 문의해 주세요.');
      });
  };
  return (
    <>
      <Link
        href={{
          pathname: '/events/success',
          query: { phone: `${phoneNumber}` },
        }}
        as={`/events/success`}
      >
        <button>인증번호 확인</button>
      </Link>
      <div id="sign-in-button" />
      <div>
        {!isCounting ? (
          <div>
            <input
              type="text"
              placeholder="휴대폰번호(01012341234)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={onClickHandleSendCode}>인증번호 요청</button>
          </div>
        ) : (
          <div>
            <p>
              {minutes < 10 ? '0' : ''}
              {minutes}:{seconds < 10 ? '0' : ''}
              {seconds}
            </p>
            <input
              type="text"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />

            <Link
              href={{
                pathname: '/events/success',
                query: { phone: `${phoneNumber}` },
              }}
              as={`/events/success`}
            >
              <button onClick={onClickHandleVerifyCode}>인증번호 확인</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Sms;
