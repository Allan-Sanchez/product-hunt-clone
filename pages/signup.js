import React from "react";
import { css } from "@emotion/core";
import Layout from "../components/layout/Layout";
import { Form, InputBox, InputSubmit, Errors } from "../components/ui/Form";

import useValidated from "../hooks/useValidated";
import validateCreateAccount from "../validation/validateCreateAccount";
const STATE_INITIAl = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const {
    items,
    errors,
    handleBlur,
    handleSumbit,
    handleChange,
  } = useValidated(STATE_INITIAl, validateCreateAccount, createAccount);

  const { name, password, email } = items;

  function createAccount() {
    console.log("create account ...");
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

            <InputSubmit type="submit" value="Create account" />
          </Form>
        </>
      </Layout>
    </div>
  );
};
export default SignUp;
