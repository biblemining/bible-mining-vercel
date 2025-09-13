// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './Header';
// import HomePage from './HomePage';
// import SongsPage from './SongsPage';
// import VideosPage from './VideosPage';
// import SermonsPage from './SermonsPage';
// import GalleryPage from './GalleryPage';
// // import SubcategoryPage from '.SubcategoryPage';
// // import FinalGalleryPage from './FinalGalleryPage';
// import AddSongPage from './AddSongPage';
// import AddSermonPage from './AddSermonPage';
// import AddPhotoPage from './AddPhotoPage';
// import AddVideoPage from './AddVideoPage';
// import ContactPage from './ContactPage';
// import AddContactPage from './AddContactPage';
// import AddHomepageBackground from './AddHomepageBackground';
// import AddAboutPage from './AddAboutPage';
// import Footer from './Footer';
// import BlogPage from './BlogPage'; // కొత్త కాంపోనెంట్‌ను ఇంపోర్ట్ చేయడం
// import AddLogoPage from './AddLogoPage'; // కొత్త కాంపోనెంట్‌ను ఇంపోర్ట్ చేయడం
// import AddBlogPage from './AddBlogPage'; // కొత్త కాంపోనెంట్‌ను ఇంపోర్ట్ చేయడం
// import LoginPage from './LoginPage';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <main>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/blog" element={<BlogPage />} />
//             <Route path="/songs" element={<SongsPage />} />
//             <Route path="/videos" element={<VideosPage />} />
//             <Route path="/sermons" element={<SermonsPage />} />
//             <Route path="/gallery" element={<GalleryPage />} />
//             {/* <Route path="/gallery/:mainCategoryName" element={<SubcategoryPage />} />
//             <Route path="/gallery/:mainCategoryName/:subName" element={<FinalGalleryPage />} /> */}
//             <Route path="/add-song" element={<AddSongPage />} />
//             <Route path="/add-sermon" element={<AddSermonPage />} />
//             <Route path="/add-photo" element={<AddPhotoPage />} />
//             <Route path="/add-video" element={<AddVideoPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/add-contact" element={<AddContactPage />} />
//             <Route path="/add-homepage-background" element={<AddHomepageBackground />} />
//             <Route path="/add-logo" element={<AddLogoPage />} />
//             <Route path="/add-blog" element={<AddBlogPage />} />
//             <Route path="/add-about" element={<AddAboutPage />} />
//             <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

//             {/* అడ్మిన్ పేజీలకు ప్రైవేట్ రూట్ */}
//             <Route path="/add-song" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddSongPage /></ProtectedRoute>} />
//             <Route path="/add-sermon" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddSermonPage /></ProtectedRoute>} />
//             <Route path="/add-photo" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddPhotoPage /></ProtectedRoute>} />
//             <Route path="/add-video" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddVideoPage /></ProtectedRoute>} />
//             <Route path="/add-contact" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddContactPage /></ProtectedRoute>} />
//             <Route path="/add-homepage-background" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddHomepageBackground /></ProtectedRoute>} />
//             <Route path="/add-logo" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddLogoPage /></ProtectedRoute>} />
//             <Route path="/add-blog" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddBlogPage /></ProtectedRoute>} />
            
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import SongsPage from './SongsPage';
import VideosPage from './VideosPage';
import SermonsPage from './SermonsPage';
import GalleryPage from './GalleryPage';
import AddSongPage from './AddSongPage';
import AddSermonPage from './AddSermonPage';
import AddPhotoPage from './AddPhotoPage';
import AddVideoPage from './AddVideoPage';
import ContactPage from './ContactPage';
import AddContactPage from './AddContactPage';
import AddHomepageBackground from './AddHomepageBackground';
import AddAboutPage from './AddAboutPage';
import Footer from './Footer';
import BlogPage from './BlogPage';
import LoginPage from './LoginPage';
import AddLogoPage from './AddLogoPage';
import AddBlogPage from './AddBlogPage';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/sermons" element={<SermonsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            
            <Route path="/add-song" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddSongPage /></ProtectedRoute>} />
            <Route path="/add-sermon" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddSermonPage /></ProtectedRoute>} />
            <Route path="/add-photo" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddPhotoPage /></ProtectedRoute>} />
            <Route path="/add-video" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddVideoPage /></ProtectedRoute>} />
            <Route path="/add-contact" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddContactPage /></ProtectedRoute>} />
            <Route path="/add-homepage-background" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddHomepageBackground /></ProtectedRoute>} />
            <Route path="/add-logo" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddLogoPage /></ProtectedRoute>} />
            <Route path="/add-blog" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddBlogPage /></ProtectedRoute>} />
            <Route path="/add-about" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddAboutPage /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;