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
background-color: rgba(0,0,0,0.5);
z-index: 1;
flex-direction: column;
`;


export const UserList = styled.ul`

    list-style-type: none;
`;

export const Item = styled.li`
  width: 100%;
  align-content: center;
  padding: 5px 15px 10px;
  margin-bottom: 15px;
    background: rgba(240,240,240,9);
  border: 0;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
  background: rgba(225,225,225,9);
    transition: 0.33s;
  }
  }

  h2 {
    margin: 10px 0;
    list-style-type: none;
  }

  h4 {
    margin-top: 10px;
  }

  .strongBlock {
    display: inline-block;
  }
  strong {
    margin-bottom: 10px;
    font-size: 18px;
  }
`;