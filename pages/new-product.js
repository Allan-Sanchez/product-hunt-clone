import React, { useState } from "react";
import { css } from "@emotion/core";
import Layout from "../components/layout/Layout";
import { Form, InputBox, InputSubmit, Errors } from "../components/ui/Form";
import firebase from '../firebase'
import useValidated from "../hooks/useValidated";
import validareCreateProduct from "../validation/validateCreateProduct";
import Router from 'next/router';
const STATE_INITIAl = {
  name: "",
  company:"",
  url:"",
  description:""
};

const NewProduct = () => {
  const [errorFirebase, setErrorFirebase] = useState(false);
  const {
    items,
    errors,
    handleBlur,
    handleSumbit,
    handleChange,
  } = useValidated(STATE_INITIAl, validareCreateProduct, createProduct);

  const { name, company, image, url, description } = items;

  async function createProduct() {
     
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
            New Product
          </h1>
          <Form onSubmit={handleSumbit}>
            <fieldset>
              <legend> General Information</legend>
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
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                placeholder="Your company name"
                name="company"
                value={company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputBox>
            {errors.company && <Errors>{errors.company}</Errors>}

            {/* <InputBox>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                value={image}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputBox>
            {errors.image && <Errors>{errors.image}</Errors>} */}

            <InputBox>
              <label htmlFor="url">Url</label>
              <input
                type="url"
                id="url"
                placeholder="Type url product"
                name="url"
                value={url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputBox>
            {errors.url && <Errors>{errors.url}</Errors>}

            </fieldset>

            <fieldset>
              <legend>About your Product</legend>

              <InputBox>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Your description"
                name="description"
                value={description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputBox>
            {errors.description && <Errors>{errors.description}</Errors>}

            </fieldset>

            {errorFirebase && <Errors>{errorFirebase}</Errors>} 
            <InputSubmit type="submit" value="Create account" />
          </Form>
        </>
      </Layout>
    </div>
  );
};
export default NewProduct;
