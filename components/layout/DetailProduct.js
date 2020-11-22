import React from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Link from "next/link";

const CardProduct = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;

const DescriptionProduct = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const BoxComments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &::last-of-type {
      margin: 0;
    }
  }
`;

const BoxTitle = styled.a`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  :hover {
    cursor: pointer;
  }
`;

const BoxDescription = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`;

const BoxVotes = styled.div`
  flex: 0 1 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const ImageProduct = styled.img`
  width: 200px;
`;

const DetailProduct = ({ product }) => {
  const {
    id,
    created_at,
    description,
    company,
    name,
    url,
    urlImage,
    votes,
    comments,
  } = product;

  return (
    <CardProduct>
      <DescriptionProduct>
        <div>
          <ImageProduct src={urlImage} alt={name} />
        </div>
        <div>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <BoxTitle>{name}</BoxTitle>
          </Link>

          <BoxDescription>{description}</BoxDescription>

          <BoxComments>
            <div>
              <img src="/img/comentario.png" alt="image commets" />
              <p>{comments.length} Comments</p>
            </div>
          </BoxComments>

          <p>Published: {formatDistanceToNow(new Date(created_at))}</p>
        </div>
      </DescriptionProduct>

      <BoxVotes>
        <div>&#9650;</div>
        <p>{votes}</p>
      </BoxVotes>
    </CardProduct>
  );
};

export default DetailProduct;
