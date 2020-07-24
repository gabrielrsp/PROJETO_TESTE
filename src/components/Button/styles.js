import styled from 'styled-components';

export const Container = styled.button`

  display: flex;
  background:  transparent;
  height:  34px;
  border:  2px solid #4E2A77;
  border-radius: 30px;
  text-align:  center;
  padding: 0 10px;
  font-size:  14px;
  color:  #4E2A77;


  span {
    display: flex;
    align-self: center;
    margin-left: 3px;
    flex: 1;
    color: #4E2A77;
    text-align: center;
    font-weight: bold;
  }

  &:hover {
    background: #d9d9d9;
  }
  &:active {
    background: #b3b3b3;
  }
`;
