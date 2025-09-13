import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [aboutInfo, setAboutInfo] = useState({});
  const [latestSong, setLatestSong] = useState(null);
  const [latestVideo, setLatestVideo] = useState(null);
  const [latestPhoto, setLatestPhoto] = useState(null);

  // YouTube URL నుండి వీడియో ID ను సంగ్రహించే ఫంక్షన్
  const extractVideoId = (url) => {
    let videoId = '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&\n?#]+)/);
    if (match && match[1]) {
      videoId = match[1];
    }
    return videoId;
  };

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const bgResponse = await axios.get('');
        if (bgResponse.data.image_url) {
          setBackgroundImage(bgResponse.data.image_url);
        }
        const aboutResponse = await axios.get('');
        if (aboutResponse.data) {
          setAboutInfo(aboutResponse.data);
        }

        const songResponse = await axios.get('');
        setLatestSong(songResponse.data);
        
        const videoResponse = await axios.get('');
        setLatestVideo(videoResponse.data);
        
        const photoResponse = await axios.get('');
        setLatestPhoto(photoResponse.data);

      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };
    fetchHomepageData();
  }, []);

  return (
    <div className="homepage-main-container">
      <div className="homepage-container">
        {backgroundImage && (
          <img src={backgroundImage} alt="Homepage background image" className="background-image" />
        )}
        <div className="homepage-content">
          <h1>BIBLE MINING</h1>
          <p><b>మా వెబ్‌సైట్‌కు స్వాగతం! దేవుని వాక్యం, పాటలు, వీడియోలు మరియు ఫోటోల ద్వారా ఆయన మహిమను అనుభవించండి.</b></p>
          <div className="call-to-action">
            <a href="/videos" className="btn-primary">బోధనలు వినండి</a>
            <a href="/songs" className="btn-secondary">పాటలు పాడండి</a>
          </div>
        </div>
      </div>

      <section className="featured-content-section">
        <h2>తాజా కంటెంట్</h2>
        <div className="featured-grid">
          {latestSong && latestSong._id ? (
            <div className="featured-card">
              <h3>తాజా పాట</h3>
              <p>{latestSong.title}</p>
              <a href="/songs" className="featured-btn">వినండి</a>
            </div>
          ) : (
            <div className="featured-card">
              <h3>పాటలు</h3>
              <p>మా తాజా పాటల సేకరణను ఇక్కడ వినండి.</p>
              <a href="/songs" className="featured-btn">పాటల పేజీకి వెళ్ళు</a>
            </div>
          )}
          {latestVideo && latestVideo._id ? (
            <div className="featured-card">
              <h3>తాజా వీడియో</h3>
              {latestVideo.youtube_url && (
                <img 
                  src={`https://img.youtube.com/vi/${extractVideoId(latestVideo.youtube_url)}/hqdefault.jpg`} 
                  alt={latestVideo.title} 
                  className="featured-thumbnail"
                />
              )}
              <p>{latestVideo.title}</p>
              <a href="/videos" className="featured-btn">చూడండి</a>
            </div>
          ) : (
            <div className="featured-card">
              <h3>వీడియోలు</h3>
              <p>మా YouTube ఛానెల్‌లోని తాజా వీడియోలను చూడండి.</p>
              <a href="/videos" className="featured-btn">వీడియోల పేజీకి వెళ్ళు</a>
            </div>
          )}
          {latestPhoto && latestPhoto._id ? (
            <div className="featured-card">
              <h3>తాజా ఫోటో</h3>
              {latestPhoto.image_url && (
                <img 
                  src={latestPhoto.image_url} 
                  alt={latestPhoto.title} 
                  className="featured-thumbnail"
                />
              )}
              <p>{latestPhoto.title}</p>
              <a href="/gallery" className="featured-btn">చూడండి</a>
            </div>
          ) : (
            <div className="featured-card">
              <h3>ఫోటోలు</h3>
              <p>మా గ్యాలరీలోని తాజా ఫోటోలను చూడండి.</p>
              <a href="/gallery" className="featured-btn">గ్యాలరీ పేజీకి వెళ్ళు</a>
            </div>
          )}
        </div>
      </section>

      <section className="about-me-section">
        <div className="about-me-card">
          {aboutInfo.photo_url && (
            <img src={aboutInfo.photo_url} alt="Pastor Hanok Kumar" className="my-photo" />
          )}
          <div className="about-me-info">
            <h2>నా గురించి</h2>
            {aboutInfo.description ? (
              <p>{aboutInfo.description}</p>
            ) : (
              <p>మీ గురించి ఇక్కడ రాయండి.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;