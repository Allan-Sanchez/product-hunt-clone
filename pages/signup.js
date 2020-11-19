import React, { useState } from "react";
import { css } from "@emotion/core";
import Layout from "../components/layout/Layout";
import { Form, InputBox, InputSubmit, Errors } from "../components/ui/Form";
import firebase from '../firebase'
import useValidated from "../hooks/useValidated";
import validateCreateAccount from "../validation/validateCreateAccount";
import Router from 'next/router';
const STATE_INITIAl = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [errorFirebase, setErrorFirebase] = useState(false);
  const {
    items,
    errors,
    handleBlur,
    handleSumbit,
    handleChange,
  } = useValidated(STATE_INITIAl, validateCreateAccount, createAccount);

  const { name, password, email } = items;

  async function createAccount() {
      try {
        await firebase.register(name,email,password);
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
            Sign up
          </h1>
          <Form onSubmit={handleSumbit}>
            <InputBox>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputBox>
            {errors.name && <Errors>{errors.name}</Errors>}

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
            <InputSubmit type="submit" value="Create account" />
          </Form>
        </>
      </Layout>
    </div>
  );
};
export default SignUp;
