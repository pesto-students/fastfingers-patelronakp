import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './Screens/Welcome/WelcomeScreen'
import GameScreen from './Screens/Game/GameScreen';
import ResultScreen from './Screens/Result/ResultScreen';


function App() {

  const [activePage, setActivePage] = useState(0);
  const onChangePage = (page) => setActivePage(page);



  return (
    <div className="App">
      {/* <WelcomeScreen /> */}
      {
        activePage === 0 ?
          <WelcomeScreen changePage={onChangePage} /> :
          activePage === 1 ? <GameScreen changePage={onChangePage} /> :
            <ResultScreen changePage={onChangePage} />
      }
    </div>
  );
}

export default App;



//few resources 
//https://www.w3schools.com/howto/howto_css_flip_card.asp