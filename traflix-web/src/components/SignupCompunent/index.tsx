import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { UserSignupType } from '../../types/UserType';

import eyeFill from '../../assets/images/eye-fill.svg';
import eyeSlashFill from '../../assets/images/eye-slash-fill.svg';
import traflixLogo from '../../assets/images/logo_traflix_tmp_color.svg';
import kakaoSymbol from '../../assets/images/kakao_symbol.svg';
import kakao from '../../assets/images/kakao_login_large_wide.png';

const enum SignupErrorMessages {
  IllegalID = '아이디는 5~16자의 영문 소문자와 숫자로 이루어져야 합니다',
  NoPW = '비밀번호를 입력해주세요',
  NoPWRe = '비밀번호 확인을 입력해주세요',
  NoEmail = '이메일 주소를 입력해주세요',
  ExistID = '이미 존재하는 ID 입니다',
  IllegalPW = '비밀번호가 조건을 만족하지 않습니다',
  IllegalPWRe = '비밀번호 확인이 일치하지 않습니다',
  IllegalNickname = '닉네임은 최대 30자 이하여야 합니다',
  IllegalEmail = '올바른 이메일 주소가 아닙니다',
}

const SignupComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [signupErrType, setSignupErrType] = useState('');
  const [showPW, setShowPW] = useState(false);
  const [showPWRE, setShowPWRE] = useState(false);
  const [user, setUser] = useState<UserSignupType>({
    id: '',
    pw: '',
    pwRe: '',
    email: '',
    nickname: '',
  });
  const updateSignupInfo = (key: keyof UserSignupType, value: string) => {
    setUser({
      ...user,
      [key]: value,
    });
  };
  const submitInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupErrType('');

    const idReg = /^[a-z\d]{5,16}$/;
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$]{8,16}$/;
    const nicknameReg = /^.{1,30}$/;
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!user.id || !idReg.test(user.id)) {
      setSignupErrType(SignupErrorMessages.IllegalID);
      return;
    } else if (!user.pw) {
      setSignupErrType(SignupErrorMessages.NoPW);
      return;
    } else if (!user.pwRe) {
      setSignupErrType(SignupErrorMessages.NoPWRe);
      return;
    } else if (!user.email) {
      setSignupErrType(SignupErrorMessages.NoEmail);
      return;
    } else if (user.nickname.length && !nicknameReg.test(user.nickname)) {
      // Optional
      setSignupErrType(SignupErrorMessages.IllegalNickname);
      return;
    } else if (user.email.length && !emailReg.test(user.email)) {
      // Optional
      setSignupErrType(SignupErrorMessages.IllegalEmail);
      return;
    }

    if (!passwordReg.test(user.pw)) {
      setSignupErrType(SignupErrorMessages.IllegalPW);
      return;
    } else if (user.pw !== user.pwRe) {
      setSignupErrType(SignupErrorMessages.IllegalPWRe);
      return;
    }

    // 회원가입 기능
  };

  return (
    <div className={styles.main}>
      <img src={traflixLogo} className={styles.logo} />
      <h2>회원가입</h2>
      <Form onSubmit={submitInfo} className={styles.form}>
        <Form.Text className={styles.messageBlock}>* 필수항목</Form.Text>
        <div className={styles.title}></div>
        <Form.Group className="mb-3" controlId="formID">
          <Form.Label>
            아이디 <span>*</span>
          </Form.Label>

          <Form.Control
            type="text"
            placeholder="아이디"
            value={user.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('id', e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            이메일 <span>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="이메일"
            value={user.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('email', e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPW">
          <Form.Label>
            비밀번호 <span>*</span>
          </Form.Label>
          <InputGroup className={styles.groupInput}>
            <Form.Control
              type={showPW ? 'text' : 'password'}
              placeholder="비밀번호"
              value={user.pw}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSignupInfo('pw', e.target.value)
              }
              className={styles.nonBorder}
            />
            <img
              src={showPW ? eyeFill : eyeSlashFill}
              onClick={() => setShowPW(!showPW)}
            />
          </InputGroup>
          <Form.Text>
            영어 소문자 + 대문자 + 숫자 + 특수문자 (!@#$) 조합의 8자리 이상
            16자리 이하 비밀번호
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPW">
          <Form.Label>
            비밀번호 확인 <span>*</span>
          </Form.Label>
          <InputGroup className={styles.groupInput}>
            <Form.Control
              type={showPWRE ? 'text' : 'password'}
              placeholder="비밀번호 확인"
              value={user.pwRe}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSignupInfo('pwRe', e.target.value)
              }
              className={styles.nonBorder}
            />
            <img
              src={showPWRE ? eyeFill : eyeSlashFill}
              onClick={() => setShowPWRE(!showPWRE)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="닉네임"
            value={user.nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('nickname', e.target.value)
            }
          />
        </Form.Group>

        <Form.Text className={styles.messageBlock}>{signupErrType}</Form.Text>

        <Button variant="success" type="submit" className={styles.formButton}>
          가입
        </Button>
      </Form>
      <div>
        계정이 있으신가요?
        <Link to="/mock" title="회원가입" className={styles.signUpLink}>
          로그인
        </Link>
      </div>
    </div>
  );
};

export default SignupComponent;
