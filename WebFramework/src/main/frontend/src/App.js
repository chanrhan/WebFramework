import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import ModalContainer from "./js/common/modal/ModalContainer";
import {Route, Routes} from "react-router-dom";
import {LandingHome} from "./js/landing/LandingHome";

function App() {
  return (
      <div className="App">
          <Helmet>
              <title>TITLE</title>
              <meta name='viewport' content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          </Helmet>
          <ModalContainer/>
          <Routes>
                <Route path='/' element={<LandingHome/>}>

                </Route>
          </Routes>

      </div>
  )
}

export default App;
