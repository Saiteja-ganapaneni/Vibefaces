import React, { useState, useEffect } from 'react';
import '../Styles/Avatar.css';

const previewAvatars = [
  "https://api.dicebear.com/6.x/avataaars/svg?seed=Alpha",
  "https://api.dicebear.com/6.x/micah/svg?seed=Beta",
  "https://api.dicebear.com/6.x/pixel-art/svg?seed=Gamma",
  "https://api.dicebear.com/6.x/thumbs/svg?seed=Delta",
  "https://api.dicebear.com/6.x/bottts/svg?seed=Epsilon"
];

const allSprites = [
  { label: "Avataaars", value: "avataaars" },
  { label: "Micah", value: "micah" },
  { label: "Lorelei", value: "lorelei" },
  { label: "Fun Emoji", value: "fun-emoji" },
  { label: "Bottts", value: "bottts" },
  { label: "Thumbs", value: "thumbs" },
  { label: "Pixel-art", value: "pixel-art" },
  { label: "Croodles", value: "croodles" },
  { label: "Adventurer", value: "adventurer" },
  { label: "Emoji", value: "thumbs" }
];

const boySeeds = [100, 201, 303, 405, 507];
const girlSeeds = [110, 220, 330, 440, 550];
const emojiSeeds = [1, 2, 3, 4, 5];

const Avatar = () => {
  const [gender, setGender] = useState(null);
  const [sprite, setSprite] = useState(null);
  const [seed, setSeed] = useState(null);
  const [themeClass, setThemeClass] = useState('default-theme');

  useEffect(() => {
    if (gender === 'boys') {
      setThemeClass('boys-theme');
      setSprite('avataaars');
      setSeed(boySeeds[0]);
    } else if (gender === 'girls') {
      setThemeClass('girls-theme');
      setSprite('avataaars');
      setSeed(girlSeeds[0]);
    } else {
      setThemeClass('default-theme');
      setSprite(null);
      setSeed(null);
    }
  }, [gender]);

  const handleGender = (g) => {
    setGender(g);
  };

  const handleSprite = (type) => {
    setSprite(type);
    if (gender === 'boys') {
      setSeed(boySeeds[Math.floor(Math.random() * boySeeds.length)]);
    } else if (gender === 'girls') {
      setSeed(girlSeeds[Math.floor(Math.random() * girlSeeds.length)]);
    } else if (type === 'thumbs' || type === 'fun-emoji') {
      setSeed(emojiSeeds[Math.floor(Math.random() * emojiSeeds.length)]);
    } else {
      setSeed(Math.floor(Math.random() * 1000));
    }
  };

  const handleGenerate = () => {
    if (gender === 'boys') {
      setSeed(boySeeds[Math.floor(Math.random() * boySeeds.length)]);
    } else if (gender === 'girls') {
      setSeed(girlSeeds[Math.floor(Math.random() * girlSeeds.length)]);
    } else {
      setSeed(Math.floor(Math.random() * 1000));
    }
  };

  const downloadImage = () => {
    fetch(`https://api.dicebear.com/6.x/${sprite}/svg?seed=${seed}`)
      .then(resp => resp.text())
      .then(data => {
        const blob = new Blob([data], { type: 'image/svg+xml' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${seed}.svg`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      });
  };

  if (!gender) {
    return (
      <div className="container default-theme">
        <div className="nav">
          <h1 className="title main-logo">VibeFaces</h1>
        </div>
        <div className="preview-avatars">
          {previewAvatars.map(url => (
            <img src={url} key={url} alt="Preview Avatar" />
          ))}
        </div>
        <h2 className="subtitle">Choose Your Style</h2>
        <div className="big-buttons">
          <button onClick={() => handleGender('boys')}>For Boys</button>
          <button onClick={() => handleGender('girls')}>For Girls</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${themeClass}`}>
      <div className="nav">
        <h1 className="title main-logo">VibeFaces</h1>
      </div>

      <div className="gender-row">
        <button
          className={gender === 'boys' ? 'active boys-active' : ''}
          onClick={() => handleGender('boys')}
        >
          Boys
        </button>
        <button
          className={gender === 'girls' ? 'active' : ''}
          onClick={() => handleGender('girls')}
        >
          Girls
        </button>
      </div>

      <div className="category-cards">
        {allSprites.map(({ label, value }) => (
          <div
            key={value}
            className={`card ${sprite === value ? 'selected' : ''} ${sprite === value && gender ? gender + '-selected' : ''}`}
            onClick={() => handleSprite(value)}
          >
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="avatar-controls">
        <button id="gen" onClick={handleGenerate} disabled={!sprite}>
          Next
        </button>
        <div className="avatar-display">
          {sprite && seed ? (
            <img
              src={`https://api.dicebear.com/6.x/${sprite}/svg?seed=${seed}`}
              alt="Your Avatar"
            />
          ) : (
            <p>Select style to generate avatar</p>
          )}
        </div>
        <button id="down" onClick={downloadImage} disabled={!sprite || !seed}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Avatar;
