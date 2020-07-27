import React from 'react';
import { FaBars, FaSignOutAlt, FaTimes, FaUser, FaHome, FaInfoCircle, FaShoppingCart, FaChartPie, FaCog } from "react-icons/fa";
import { useSpring } from 'react-spring'

import { Container } from './styles';

function Sidebar({ toggled, closeSideBar }) {

  const { x } = useSpring({
    x: toggled ? 0 : 100
  });

  return (

    <Container style={
      {
        transform: x.interpolate(x =>
          `translate3d(${x * -1}%, 0, 0)`)
      }}
    >

      <div className='header'>
      <FaBars color='#fff' size='22px' style={{ marginTop:'2px', marginRight: '12px' }} />
        <h2>Menu</h2>
        <FaTimes color='#fff' size='22px' style={{ marginRight: '12px', marginLeft: 'auto' }} onClick={closeSideBar} />
      </div>
      <hr />

      <ul>
        <li>
          <FaHome color='#fff' size='17px' style={{ marginRight: '12px' }} />
          Pagina Inicial
        </li>
        <li>
          <FaUser color='#fff' size='17px' style={{ marginRight: '12px' }} />
          Clientes
        </li>

        <li>
          <FaShoppingCart color='#fff' size='17px' style={{ marginRight: '12px' }} />
          Vendas
        </li>

        <li>
          <FaChartPie color='#fff' size='17px' style={{ marginRight: '12px' }} />
          Relatórios
        </li>

        <li>
          <FaCog color='#fff' size='17px' style={{ marginRight: '12px' }} />
          Configurações
        </li>

        <li>
          <FaInfoCircle color='#fff' size='17px' style={{ marginRight: '12px' }} />
          Sobre
        </li>

        <li>
          <FaSignOutAlt color='#fff' size='17px' style={{ marginRight: '12px' }} />
          Sair
        </li>







      </ul>


    </Container>

  );
}

export default Sidebar;
