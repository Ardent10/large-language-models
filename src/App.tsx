import { LoginPage } from "@modules/auth/pages/login";
import { Home } from "@modules/home/pages";
import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./modules/auth/pages/signup";
import {
  AllModels,
  BookmarkModels,
  CreateModel,
  FeaturedModels,
  LLM,
  SubModel,
  GenerateModels,
} from "./modules/models";
import { GenerateModelsByModelName } from "./modules/models/pages/generate";


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
      <Route path="models/generate" element={<GenerateModels />} />
      <Route path="models/generate/:modelName" element={<GenerateModelsByModelName />} />
      <Route path="models/featured" element={<FeaturedModels />} />
    </Routes>
  );
}

export default App;
