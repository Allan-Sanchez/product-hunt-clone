import React,{useState} from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Router from "next/router";

const InputText = styled.input`
  border: 1px solid var(--gray3);
  padding: 1rem;
  min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;

  &::hover{
      cursor: pointer;
  }
`;
const Search = () => {
  const [searchType, setSearchType] = useState('');

  const handleSearchForm = (e) =>{
    e.preventDefault();

    if(searchType.trim() === '') return;

    Router.push({
      pathname:'/search',
      query:{q:searchType}
    });
  }
  return (
    <form
      onSubmit={handleSearchForm}
      css={css`
        position: relative;
      `}
    >
      <InputText type="text" name="search" id="search" onChange={ (e) => setSearchType(e.target.value)} placeholder="search product"/>
      <InputSubmit type="submit">Search</InputSubmit>
    </form>
  );
};

export default Search;
