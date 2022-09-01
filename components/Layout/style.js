import styled from "styled-components";

export const DivContainer = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: ${(props) => props.theme.colors.header};
  }

  li {
    float: left;
    border-right: 1px solid #bbb;
  }

  li:last-child {
    border-right: none;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    background-color: #ff7c7c;
  }

  .active {
    background-color: #b9005b;
  }
`;
