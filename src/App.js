import React from "react";
import HomePage from "./pages/HomePage";
import AdGeneration from "./pages/AdGeneration";
import CampainPreview from "./pages/CampainPreview";
import { Route, Routes } from "react-router-dom";

const App=()=>{
    return(<div>
        <Routes>
            <Route exact path={"/"} element={<HomePage />}/>
            <Route path={"/adgnr"} element={<AdGeneration />}/>
            <Route path={"/usr"} element={<CampainPreview />}/>

        </Routes>
    </div>)
}
export default App;