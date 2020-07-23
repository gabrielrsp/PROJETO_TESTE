import styled from 'styled-components';

export const Overlay = styled.div`
position: fixed;
display: flex;
width: 100%;
height: 100%;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0,0,0,0.7);
z-index: 1;
flex-direction: column;
`;



export const AddButton = styled.button`

  display: flex;
  background:  transparent;
  margin-left: 20px;
  height:  36px;
  border:  2px solid #4E2A77;
  border-radius: 30px;
  text-align:  center;
  width:  150px;
  font-size:  16px;
  color:  #4E2A77;
  margin-bottom: 20px;

  span {
    display: flex;
    align-self: center;
    margin: auto;
    margin-left: 5px;
    margin-top: 8px;
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