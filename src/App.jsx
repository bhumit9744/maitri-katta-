import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EditorialExperience from './components/EditorialExperience';
import MenuSection from './components/MenuSection';
import Footer from './components/Footer';
import SpaceModal from './components/SpaceModal';
import BookingModal from './components/BookingModal';
import './App.css';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [spaceModalOpen, setSpaceModalOpen] = useState(false);

  const handleOpenBooking = () => setBookingModalOpen(true);
  const handleCloseBooking = () => setBookingModalOpen(false);

  const handleOpenSpace = () => setSpaceModalOpen(true);
  const handleCloseSpace = () => setSpaceModalOpen(false);

  return (
    <div className="maitri-app">
      {/* Editorial Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main id="main-content">
        {/* Section 1: Cinematic Editorial Hero */}
        <Hero onOpenSpace={handleOpenSpace} />

        {/* Section 2: Editorial Experience — Made for Together */}
        <EditorialExperience onOpenSpace={handleOpenSpace} />

        {/* Section 3: The Culinary Repertoire / Menu Showcase */}
        <MenuSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* Footer & Location Anchor */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Interactive Modals */}
      <SpaceModal
        isOpen={spaceModalOpen}
        onClose={handleCloseSpace}
        onBookTable={handleOpenBooking}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
      />
    </div>
  );
}
