import { LoginPage } from "@modules/auth/pages/login";
import { Home } from "@modules/home/pages";
import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./modules/auth/pages/signup";
import {
  AllModels,
  CreateModel,
  LLM,
  SubModel,
  BookmarkModels
} from "./modules/models";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="models" element={<AllModels />} />
      <Route path="models/create" element={<CreateModel />} />
      <Route path="models/:modelId" element={<LLM />} />
      <Route path="models/:modelName/:subModelName" element={<SubModel />} />
      <Route path="models/bookmarks" element={<BookmarkModels />} />
    </Routes>
  );
}

export default App;
