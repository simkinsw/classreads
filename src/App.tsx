import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FullLayout from "./layouts/FullLayout";
import Book from "./views/Book";
import BookDefault from "./views/BookDefault";
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ProfileDefault from "./views/ProfileDefault";
import Review from "./views/Review";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<FullLayout children={<Home />} />} />
                <Route path="/review" element={<FullLayout children={<Review />} />} />
                <Route path="/profile" element={<FullLayout children={<ProfileDefault />} />} />
                <Route path="/profile/:name" element={<FullLayout children={<Profile />} />} />
                <Route path="/book" element={<FullLayout children={<BookDefault />} />} />
                <Route path="/book/:title" element={<FullLayout children={<Book />} />} />
            </Routes>
        </Router>
    );
}

export default App;
