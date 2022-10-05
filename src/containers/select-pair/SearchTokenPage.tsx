import React, { useState } from "react";
import styled from "styled-components";
import { V3Token } from "../../repos/uniswap";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import Fuse from "fuse.js";

const Container = styled.div`
  width: 370px;
  padding: 15px;

  @media only screen and (max-width: 400px) {
    width: calc(100vw - 30px);
    padding: 10px;
  }
`;
const SearchInput = styled.input`
  border: 0;
  outline: none;
  width: 100%;
  padding: 12px 12px;
  border-radius: 9px;
  font-size: 1rem;
  color: white;
  background: rgba(255, 255, 255, 0.075);
  cursor: pointerk;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.125);
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
`;
const Scrollable = styled.div`
  height: 300px;
  overflow: scroll;
`;
const LoadingContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TokenItem = styled.div`
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  transition: 0.3s;
  padding: 5px 15px;

  @media only screen and (max-width: 400px) {
    padding: 5px 10px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 15px;
  }

  & > div {
    & h5 {
      margin: 0;
      font-weight: normal;
      font-size: 1rem;
      color: white;
    }
    & span {
      font-size: 0.8rem;
      color: #999;
      display: block;
    }
  }
`;

interface SearchTokenPageProps {
  tokens: V3Token[];
  selectToken: (token: V3Token) => void;
}
const SearchTokenPage = ({ tokens, selectToken }: SearchTokenPageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterCSSStyle, setFilterCSSStyle] = useState<string>(``);

  const handleSearch = (value: string) => {
    value = value.trim().toLowerCase();
    if (!value) {
      setFilterCSSStyle(``);
    } else {
      setFilterCSSStyle(
        `.token-item:not([data-filter*="${value}"]) { display: none }`
      );
    }
  };

  return (
    <>
      <style>{filterCSSStyle}</style>
      <Container>
        <SearchInput
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search name or paste address"
        />
      </Container>
      <Divider />
      {(isLoading || tokens.length === 0) && (
        <LoadingContainer>
          <ReactLoading
            type="spin"
            color="rgba(34, 114, 229, 1)"
            height={50}
            width={50}
          />
        </LoadingContainer>
      )}
      {!isLoading && tokens.length > 0 && (
        <Scrollable>
          {tokens.map((token) => {
            return (
              <TokenItem
                onClick={() => selectToken(token)}
                id={`${token.symbol}_${token.name}_${token.id}`}
                data-filter={`${token.id.toLowerCase()} ${token.symbol.toLowerCase()} ${token.name.toLowerCase()}`}
                className="token-item"
              >
                <img
                  src={token.logoURI}
                  alt={token.name}
                  onError={(e: any) => {
                    e.target.src =
                      "https://friconix.com/png/fi-cnsuxl-question-mark.png";
                  }}
                />
                <div>
                  <h5>{token.symbol}</h5>
                  <span>
                    {token.name.length >= 40
                      ? `${token.name.slice(0, 40)}...`
                      : token.name}
                  </span>
                </div>
              </TokenItem>
            );
          })}
        </Scrollable>
      )}
    </>
  );
};

export default SearchTokenPage;
