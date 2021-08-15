import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';

const ErrorMessage = styled.div`
    color: red;
`


const SignUp = () => {
    const [id, onChangeId] = useInput("");
    const [nickname, onChangeNickname] = useInput("");
    const [password, onChangePassword] = useInput("");
    
    const [passwordCheck, setPasswordCheck] = useState("");  
    const [passwordError, setPasswordError] = useState(false);

    const onChangePasswordCheck = useCallback((e) => {        
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, []);
    
    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false)
    }, []);  

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true)
        }
        if (!term) {
            return setTermError(true);
        }
        console.log(id, nickname, password);
    }, [password, passwordCheck, term])

    return (
        <AppLayout>
            <Head>
                <meta charset="utf-8" />
                <title>회원가입 | NodeBird</title>
            </Head>

            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input 
                        name="user-password" 
                        type="password" 
                        value={password} 
                        onChange={onChangePassword} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 체크</label>
                    <br />                    
                    <Input 
                        name="user-password-check" 
                        type="password" 
                        value={passwordCheck} 
                        onChange={onChangePasswordCheck} 
                        required 
                    />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage> }
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>내 말에 복종할 것</Checkbox>
                    {termError && <ErrorMessage style={{ color: 'red '}}>약관에 동의하셔야 합니다.</ErrorMessage>}
                </div>
                <div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </div>
            </Form>
            
        </AppLayout>
    )
    
};

export default SignUp;