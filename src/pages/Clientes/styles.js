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

export const Container = styled.div`

button {
    margin-right: 10px;
  }

  .group_buttons {
     display: flex;
     margin-bottom: 15px;
  }


`;


