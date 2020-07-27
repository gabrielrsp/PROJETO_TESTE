import React, { useState } from 'react';

import { Container } from './styles';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';


export default function Home() {

  const toggleHandler = () => {
    setIsToggled(!isToggled)
  }

  const [isToggled, setIsToggled] = useState(false);

  return (
    <Container>

      <Header
          onToggleSideBar={toggleHandler}
      >
         Página Inicial
      </Header>

      <Sidebar
          toggled={isToggled}
          closeSideBar={() => setIsToggled(false)}
        />

    </Container>
  );
}
