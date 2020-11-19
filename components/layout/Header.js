import React, { useContext } from "react";
import Link from "next/link";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Search from "../ui/Search";
import Navigation from "./Navigation";
import Button from "../ui/Button";

import FirebaseContext from "../../firebase/context";

const ContainerHead = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
`;

const Header = () => {
  const {user,firebase} = useContext(FirebaseContext);
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <ContainerHead>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>
          <Search></Search>
          <Navigation></Navigation>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {/* administracion menu */}
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hello : {user.displayName}
              </p>

              <Button type="button" bgColor="true" onClick={() =>firebase.logout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button bgColor="true">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign UP</Button>
              </Link>
            </>
          )}
        </div>
      </ContainerHead>
    </header>
  );
};

export default Header;
