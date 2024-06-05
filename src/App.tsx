import { Routes, Route } from "react-router-dom";
import MaxWidthWrapper from "./components/max-width-wrapper";
import Home from "./pages/home";
import Post from "./pages/post";
import Nav from "./components/nav";

export default function App() {
  return (
    <MaxWidthWrapper>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Post />} />
      </Routes>
    </MaxWidthWrapper>
  );
}
