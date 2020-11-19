import React, { useState } from "react";
import { css } from "@emotion/core";
import Layout from "../components/layout/Layout";
import { Form, InputBox, InputSubmit, Errors } from "../components/ui/Form";
import firebase from '../firebase'
import useValidated from "../hooks/useValidated";
import validateLogin from "../validation/validateLogin";
import Router from 'next/router';
const STATE_INITIAl = {
  email: "",
  password: "",
};

const Login = () => {
  const [errorFirebase, setErrorFirebase] = useState(false);
  const {
    items,
    errors,
    handleBlur,
    handleSumbit,
    handleChange,
  } = useValidated(STATE_INITIAl, validateLogin, loginF);

  const { password, email } = items;

  async function loginF() {
    try {
      await firebase.login(email,password);
      Router.push('/');
    } catch (e) {
      console.error('There was a error: ', e.message);
      setErrorFirebase(e.message)
    }
  }
  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Login
          </h1>
          <Form onSubmit={handleSumbit}>
         
            <InputBox>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputBox>
            {errors.email && <Errors>{errors.email}</Errors>}


            <InputBox>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputBox>
            {errors.password && <Errors>{errors.password}</Errors>}
            {errorFirebase && <Errors>{errorFirebase}</Errors>} 
            <InputSubmit type="submit" value="Login" />
          </Form>
        </>
      </Layout>
    </div>
  );
};
export default Login;
