import styled from 'styled-components';

export const PaginationComponentStyled = styled.div`
  /* pagination.module.css */
  .paginationComponentWrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    color: #888;
    font-size: 14px;
    ul {
      list-style: none;
    }
    li {
      float: left;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    a {
      height: 25px;
      line-height: 25px;
    }
    .page {
      margin: 0 5px;
      cursor: pointer;
      width: 25px;
      border-radius: 30px;
      border: solid 1px rgba(0, 0, 0, 0);
      text-align: center;
    }
    .page:hover {
      border: solid 1px #aaa;
    }
    .icon,
    .move:last-child::after,
    .move:first-child::before {
      position: absolute;
      font-size: 20px;
      padding: 0 7px 0px;
    }

    .move {
      position: relative;
      cursor: pointer;
      margin: 0 10px;
    }
    .move a {
      width: 50px;
      display: block;
      z-index: 10;
    }
    .move a:hover {
      text-decoration: underline;
    }
    .move:first-child {
      text-align: right;
    }
    .move:first-child::before {
      content: '<';
      left: 0;
    }
    .move:last-child::after {
      content: '>';
      right: 0;
    }

    .invisible {
      visibility: hidden;
    }

    .active {
      font-weight: 700;
      background: #2f5d62;
      color: white;
    }
  }
`;
