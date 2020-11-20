import React, { useState, useContext } from "react";
import { css } from "@emotion/core";
import Layout from "../components/layout/Layout";
import { Form, InputBox, InputSubmit, Errors } from "../components/ui/Form";
import { FirebaseContext } from "../firebase";
import useValidated from "../hooks/useValidated";
import validareCreateProduct from "../validation/validateCreateProduct";
import Router, { useRouter } from "next/router";

const STATE_INITIAl = {
  name: "",
  company: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  const router = useRouter();
  const { user, firebase } = useContext(FirebaseContext);
  const [errorFirebase, setErrorFirebase] = useState(false);

  //input file
  const [imageInput, setImageInput] = useState(null);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");

  const {
    items,
    errors,
    handleBlur,
    handleSumbit,
    handleChange,
  } = useValidated(STATE_INITIAl, validareCreateProduct, createProduct);

  const { name, company, url, description } = items;

  async function createProduct() {
    if (!user) {
      return router.push("/login");
    }

    //created objet for save firebase
    const product = {
      name,
      company,
      url,
      urlImage,
      description,
      votes: 0,
      comments: [],
      created_at: Date.now(),
    };

    //saved data
    firebase.db.collection("products").add(product);

    return router.push('/');
  }


  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      let image = e.target.files[0];
      image.fullname = `${Date.now()}-${image.name}`;

      // setImageInput(image);
      // console.log(image);
      const uploadTask = firebase.storage
        .ref(`products/${image.fullname}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress({ progress });
        },
        (error) => {
          // Error function ...
          console.error(error);
        },
        () => {
          // complete function ...
          firebase.storage
            .ref("products")
            // .child(imageInput.fullname)
            .child(image.fullname)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setUrlImage({ url });
            });
        }
      );
    }
  };

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

              <InputBox>
                <label htmlFor="image">Image</label>

                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChangeImage}
                />
              </InputBox>

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
