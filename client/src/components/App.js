import Topbar from "./Topbar";
import { Route, Routes } from "react-router-dom";
import R089_router from "./R089_router";
import R089_router2 from "./R089_router2";
import ApiGetJson from "./ApiGetJson";
import ApiPostJson from "./ApiPostJson";
import Proxy01 from "./Proxy01";

function App() {
  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route exact path="/" element={<R089_router />} />
        <Route exact path="/r089router2" element={<R089_router2 />} />
        <Route exact path="/ApiGetJson" element={<ApiGetJson />} />
        <Route exact path="/ApiPostJson" element={<ApiPostJson />} />
        <Route exact path="/reactProxy" element={<Proxy01 />} />
      </Routes>
    </div>
  );
}

export default App;
