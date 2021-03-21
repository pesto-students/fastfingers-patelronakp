import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeScreen from './Screens/Welcome/WelcomeScreen'
import { KEYS } from './Utilities/constants'
import GameScreen from './Screens/Game/GameScreen';
import storageHelper from './Utilities/storageHelper'
import ResultScreen from './Screens/Result/ResultScreen';


function App() {
  const [activePage, setActivePage] = useState(0);
  const onChangePage = (page) => setActivePage(page);

  useEffect(() => {
    let userInfo = storageHelper.fetch(KEYS.UserInfo);
    if (userInfo != null) {
      setActivePage(2);
    }
  }, [])



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