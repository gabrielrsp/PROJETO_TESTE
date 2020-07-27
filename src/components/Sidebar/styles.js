import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`

    position: fixed;
    z-index: 1;
    width: 250px;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #4E2A77;
    display: block;
    box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.9);


    svg {
      cursor:pointer;
      margin-bottom: -2px;
    }


  .header {
    display: flex;
    padding: 13px 0 13px 13px;
    background-color: #4E2A77;

    hr {
      color: #fff;
      width: 90%;
    }

    h2 {
      color: #fff;
    }
  }

  ul {

    margin: 25px 0 10px;

    li {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      padding: 14px;
      transition: background 0.2s;
      cursor: pointer;

      &:hover {
       background: rgba(0,0,0,0.3);
      }
    }

}


`;



