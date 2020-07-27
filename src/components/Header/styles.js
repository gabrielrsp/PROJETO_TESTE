import styled from 'styled-components';



export const Wrapper = styled.div `
  display: flex;
  place-content: space-between;
  margin: 8px 20px;

  svg {
        cursor:pointer;
      }
`;

  export const Container = styled.header`
  display: block;
  height: 70px;
  width: 100%;
  background: #fff;

  top: 50px;
  margin-top: 10px;
  margin-bottom: 30px;


  h2 {
    font-size: 36px;
    color: #4E2A77;
  }

  h3 {
    font-size: 24px;
    color: #4E2A77;
    margin-left: 10px;
    margin-right: auto;

  }

  hr {
    margin-bottom: 8px;
    display: block; height: 1px;
    border: 0; border-top: 1px solid ;
    color: #4E2A77;
    margin-top: 5px;
    max-width: 99%;
  }

`;
