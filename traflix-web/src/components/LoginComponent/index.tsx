import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import eyeFill from '../../assets/images/eye-fill.svg';
import eyeSlashFill from '../../assets/images/eye-slash-fill.svg';
import traflixLogo from '../../assets/images/logo_traflix_tmp_color.svg';
import kakaoSymbol from '../../assets/images/kakao_symbol.svg';

const LoginComponent = () => {
  const { screenClass, kakaoIsLogin, kakaoLogin, kakaoRefresh } = useRootData(
    ({ appStore, kakaoStore }) => ({
      screenClass: appStore.screenClass.get(),
      kakaoIsLogin: kakaoStore.kakaoIsLogin.get(),
      kakaoLogin: kakaoStore.kakaoLogin,
      kakaoRefresh: kakaoStore.kakaoRefresh,
    }),
  );

  const navigate = useNavigate();
  const isDesktop = screenClass === 'xl';

  const [loginErrType, setLoginErrType] = useState('');
  const [loginErr, setLoginErr] = useState(false);

  const [usrID, setUsrID] = useState('');
  const inputID = (event: any) => {
    setLoginErr(false);
    setUsrID(event.currentTarget.value);
  };

  // f8ae006a1b9a4181f97ab6017c8bd095
  const [usrPW, setUsrPW] = useState('');
  const inputPW = (event: any) => {
    setLoginErr(false);
    setUsrPW(event.currentTarget.value);
  };

  const [showPW, setShowPW] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const tryLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!usrID || !usrPW) {
      setLoginErrType(`${!usrID ? '아이디' : '비밀번호'}를 입력해주세요`);
      setLoginErr(true);
      return;
    }
    alert(
      `아이디: ${usrID} 비번: ${usrPW} 자동로그인: ${
        autoLogin ? '켜짐' : '꺼짐'
      }`,
    );
    setAutoLogin(false);
  };

  const tryKakaoLogin = async () => {
    const REST_API_KEY = process.env.REST_API_KEY;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoURL;
    const code = new URL(document.location.toString()).searchParams.get('code');
  };

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.main}>
      <img src={traflixLogo} className={styles.logo} />
      <h2>로그인</h2>
      <Form onSubmit={(e) => tryLogin(e)} className={styles.form}>
        <div className={styles.title}></div>
        <Form.Group className="mb-3" controlId="formID">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID"
            value={usrID}
            onChange={(e) => inputID(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPW">
          <Form.Label>비밀번호</Form.Label>
          <InputGroup className={styles.groupInput}>
            <Form.Control
              type={showPW ? 'text' : 'password'}
              placeholder="비밀번호"
              value={usrPW}
              onChange={(e) => inputPW(e)}
              className={styles.nonBorder}
            />
            <img
              src={showPW ? eyeFill : eyeSlashFill}
              onClick={() => setShowPW(!showPW)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAuto">
          <Form.Check
            onChange={() => setAutoLogin(!autoLogin)}
            type="checkbox"
            label="자동 로그인"
            checked={autoLogin}
          />
          {loginErr && (
            <Form.Text className={styles.errMessage}>{loginErrType}</Form.Text>
          )}
        </Form.Group>
        <Button variant="success" type="submit" className={styles.formButton}>
          로그인
        </Button>
      </Form>
      <Button className={styles.kakaoButton} onClick={tryKakaoLogin}>
        <img src={kakaoSymbol} className={styles.kakaoSymbol} />
        Login with Kakao
      </Button>
      <div>
        계정이 없으신가요?
        <Link to="/mock" title="회원가입" className={styles.signUpLink}>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
