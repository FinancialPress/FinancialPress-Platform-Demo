
import { useState } from 'react';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import FinalCTA from '../components/FinalCTA';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNavigate = (screen: number) => {
    setCurrentScreen(screen);
  };

  const screens = [
    <LandingPage key="landing" onNavigate={handleNavigate} />,
    <FinalCTA key="cta" />
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onNavigate={handleNavigate} />
      {screens[currentScreen]}
    </div>
  );
};

export default Index;
