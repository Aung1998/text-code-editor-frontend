import './App.css';
import {EditorPage} from "./pages/EditorPage";
import {LoginPage} from "./pages/LoginPage";

import {
  Route,
  Routes,
  Link as RouteLink,
} from "react-router-dom";
import {SignupPage} from "./pages/SignupPage";

import {
  Grid,
  ChakraBaseProvider,
  theme as chakraTheme,
  GridItem,
} from "@chakra-ui/react";

import {useEffect, useState} from "react";
import {Navbar} from "./components/Navbar";

import {Provider} from "react-redux";
import store from "./store";
import {LogoutPage} from "./pages/LogoutPage";
import CSRFToken from "./util/CSRFToken";
import {PomodoroTimerSettingPage} from "./pages/PomodoroTimerSettingPage";

function App() {
  useEffect(() => {

  }, []);
  return (
    <div className="App">
      <Provider store={store}>
        <ChakraBaseProvider theme={chakraTheme}>
          <Grid>
            <CSRFToken />
            <GridItem>
              <Navbar/>
            </GridItem>
            <GridItem>
              <Routes>
                <Route path='/' element={<EditorPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/logout' element={<LogoutPage/>}/>
                <Route path='/signup' element={<SignupPage/>}/>
                <Route path='/pomodoroSetting' element={<PomodoroTimerSettingPage/>} />
              </Routes>
            </GridItem>
          </Grid>
        </ChakraBaseProvider>
      </Provider>
    </div>
  );
}

export default App;
