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
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const productQuery = await firebase.db.collection("products").doc(id);
        const product = await productQuery.get();
        if (product.exists) {
          setProduct(product.data());
          setErrorProduct(false);
        } else {
          setErrorProduct(true);
        }
      };
      getProduct();
    }
  }, [id, product]);

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
  } = product;

  const handleVote = () => {
    if (!user) {
      return router.push("/login");
    }

    const TotalVote = votes + 1;
    if (userVote.includes(user.uid)) return;

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
  };

  const handleMessage = (e) => {
    setProductComment({
      ...productComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (!user) {
      return router.push("/login");
    }
    productComment.userId = user.uid;
    productComment.userName = user.displayName;

    const newComment = [...comments, productComment];

    //update comment firebase
    firebase.db.collection("products").doc(id).update({ comments: newComment });

    //update state commment
    setProductComment({
      ...product,
      comments: newComment,
    });
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

                  <form onSubmit={handleSubmitMessage}>
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
                      <p>
                        <b>Owner</b>: {comment.userName}
                        <br/>
                        <span css={css` margin-left:2rem;`}>{comment.message}</span>
                      </p>
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
                Visit Product Page{" "}
              </Button>
            </aside>
          </CardProduct>
        </div>
      </>
    </Layout>
  );
};

export default Product;
