import "./App.css";
import Reward from "./pages/Reward/Reward";
import InvestBasicInfo from "./Component/InvestMake/InvestBasicInfo";
import { Route, Routes } from "react-router-dom";
import Story from "./Component/RewardDetail/Detail/Story";
import Contact from "./Component/RewardDetail/Detail/Contact";
import Guide from "./Component/RewardDetail/Detail/Guide";
import Fund from "./pages/Fund/Fund";
import FundStory from "./Component/FundDetail/Detail/FundStroy";
import FundContact from "./Component/FundDetail/Detail/FundContact";
import FundGuide from "./Component/FundDetail/Detail/FundGuide";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route exact path="/" element={<Main />} /> */}
        <Route exact path="/reward" element={<Reward />} />
      </Routes>
      <Routes>
        <Route exact path="/reward-detail/story" element={<Story />} />
        <Route exact path="/reward-detail/contact" element={<Contact />} />
        <Route exact path="/reward-detail/guide" element={<Guide />} />
      </Routes>
      <Routes>
        <Route exact path="/fund" element={<Fund />} />
      </Routes>
      <Routes>
        <Route exact path="/fund-detail/story" element={<FundStory />} />
        <Route exact path="/fund-detail/contact" element={<FundContact />} />
        <Route exact path="/fund-detail/guide" element={<FundGuide />} />
      </Routes>
      {/* <InvestBasicInfo /> */}
    </div>
  );
}

export default App;
