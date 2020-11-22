import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { InputBox, InputSubmit } from "../../components/ui/Form";
import Button from "../../components/ui/Button";

const CardProduct = styled.div`
  @media (min-width: 768px) {
    display: grid;
    padding: 0 2rem;
    grid-template-columns: 2fr 1fr;
    grid-gap: 2rem;
  }
`;

const ButtonVote = styled.div`
  display: block;
  padding: 1rem 2rem;
  color: #da552f;
  font-size: 2rem;
  width: 50%;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 5px 5px 15px 5px #e5e7eb;
  /* background-color:#c4c4c4; */
  :hover {
    cursor: pointer;
    box-shadow: 5px 10px 15px 5px #e5e7eb;
    font-size: 2.3rem;
  }
`;

const Product = () => {
  const [product, setProduct] = useState({});
  const [errorProduct, setErrorProduct] = useState(false);
  const [productComment, setProductComment] = useState({});
  const [getDB, setGetDB] = useState(true);
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && getDB) {
      const getProduct = async () => {
        const productQuery = await firebase.db.collection("products").doc(id);
        const product = await productQuery.get();
        if (product.exists) {
          setProduct(product.data());
          setErrorProduct(false);
          setGetDB(false);
        } else {
          setGetDB(false);
          setErrorProduct(true);
        }
      };
      getProduct();
    }
  }, [id,product]);

  if (!errorProduct && Object.keys(product).length === 0) return "Loading...";
  //   if(!errorProduct) return 'Loading...';

  const {
    created_at,
    description,
    company,
    name,
    url,
    urlImage,
    votes,
    comments,
    owner,
    userVote,
    pathName
  } = product;

  const handleVote = () => {
    if (!user) {
      return router.push("/login");
    }

    const TotalVote = votes + 1;
    if (userVote.includes(user.uid)) return;
    console.log('past');

    const newVote = [...userVote, user.uid];
    //update firebase votes
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: TotalVote, userVote: newVote });

    //update state votes
    setProduct({
      ...product,
      votes: TotalVote,
    });
    setGetDB(true);
  };

  const handleMessage = (e) => {
    setProductComment({
      ...productComment,
      [e.target.name]: e.target.value,
    });
  };

  const isOwner = (id) => {
    // if(!user) return false;
    if (owner.id == id) {
      return true;
    }
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if(Object.keys(productComment).length === 0) return;
    if (!user) {
      return router.push("/login");
    }
    productComment.userId = user.uid;
    productComment.userName = user.displayName;

    const newComment = [...comments, productComment];

    //update comment firebase
    await firebase.db.collection("products").doc(id).update({ comments: newComment });

    //update state commment
    setProduct({
      ...product,
      comments: newComment,
    });
    setGetDB(true);
    setProductComment({});
    document.getElementById('formMessage').reset();
  };

  const canDelete = () => {
    if (!user) return false;
    if (owner.id === user.uid) {
      return true;
    }
  };
  const handleDeleteProduct =async () => {
    if(!user){
      return router.push('/login');
    }
    if (owner.id !== user.uid) {
      return router.push('/');
    }

    try {
        await firebase.storage.ref("products").child(pathName).delete();
        await firebase.db.collection('products').doc(id).delete();
        router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <>
        {errorProduct && <Error404></Error404>}

        <div className="contenedor">
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            {name}
          </h1>

          <CardProduct>
            <div>
              <p>
                <b>Published</b>: {formatDistanceToNow(new Date(created_at))}
                <br />
                <b>Owner</b>: {owner.name}{" "}
                <span
                  css={css`
                    padding-left: 2rem;
                  `}
                >
                  <b>Tag</b>:#{company}
                </span>
              </p>
              <img src={urlImage} alt={name} />
              <p>{description}</p>

              {user && (
                <>
                  <h2>Type your comments</h2>

                  <form onSubmit={handleSubmitMessage} id="formMessage">
                    <InputBox>
                      <input
                        type="text"
                        name="message"
                        id="comment"
                        onChange={handleMessage}
                      />
                    </InputBox>

                    <InputSubmit type="submit" value="Add comment" />
                  </form>
                </>
              )}

              <h2
                css={css`
                  margin: 2rem 0;
                `}
              >
                Comments
              </h2>
              {comments.length === 0 ? (
                "Not Message"
              ) : (
                <ul>
                  {comments.map((comment, i) => (
                    <li key={`${comment.userId}-${i}`}>
                      <div>
                        <div
                          css={css`
                            display: flex;
                            width: 26%;
                            justify-content: space-around;
                          `}
                        >
                          <div>
                            <b>Owner</b>: {comment.userName}
                          </div>
                          <div>
                            {isOwner(comment.userId) && (
                              <svg width="20px" viewBox="0 0 507.2 507.2">
                                <title>owner</title>
                                <g>
                                  <circle
                                    cx="253.6"
                                    cy="253.6"
                                    r="253.6"
                                    fill="#da552f"
                                  ></circle>
                                  <path
                                    d="M188.8 368l130.4 130.4c108-28.8 188-127.2 188-244.8v-7.2L404.8 152l-216 216z"
                                    fill="#C44D2A"
                                  ></path>
                                  <path
                                    d="M260 310.4c11.2 11.2 11.2 30.4 0 41.6l-23.2 23.2c-11.2 11.2-30.4 11.2-41.6 0L93.6 272.8c-11.2-11.2-11.2-30.4 0-41.6l23.2-23.2c11.2-11.2 30.4-11.2 41.6 0L260 310.4z"
                                    fill="#FFF"
                                  ></path>
                                  <path
                                    d="M348.8 133.6c11.2-11.2 30.4-11.2 41.6 0l23.2 23.2c11.2 11.2 11.2 30.4 0 41.6l-176 175.2c-11.2 11.2-30.4 11.2-41.6 0l-23.2-23.2c-11.2-11.2-11.2-30.4 0-41.6l176-175.2z"
                                    fill="#FFF"
                                  ></path>
                                </g>
                              </svg>
                            )}
                          </div>
                        </div>
                        <span
                          css={css`
                            margin-left: 4rem;
                          `}
                        >
                          {comment.message}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <aside>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                `}
              >
                <div
                  css={css`
                    margin: 0 auto;
                  `}
                >
                  {votes}
                </div>
                {user && <ButtonVote onClick={handleVote}>Vote</ButtonVote>}
              </div>
              <Button target="_blank" bgColor="true" href={url}>
                Visit Product Page
              </Button>
              {canDelete() && ( <Button
                  css={css`
                    background-color: #c23636;
                    color: #fff;
                  `}
                  onClick={handleDeleteProduct}
                >
                  Delete Page
                </Button>
              )}
            </aside>
          </CardProduct>
        </div>
      </>
    </Layout>
  );
};

export default Product;
