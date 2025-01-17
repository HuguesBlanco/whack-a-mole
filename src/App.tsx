import React from 'react';
import Mole from './ui/Mole';

function App(): React.JSX.Element {
  return (
    <>
      <Mole isActive></Mole>
      <Mole isActive={false}></Mole>
    </>
  );
}

export default App;
