import React, { useState } from 'react';
import FromTheKitchen from './FromTheKitchen';
import MenuModal from './MenuModal';

export default function MenuSection({ onOpenBooking }) {
  const [menuModalOpen, setMenuModalOpen] = useState(false);

  const handleOpenMenuModal = () => setMenuModalOpen(true);
  const handleCloseMenuModal = () => setMenuModalOpen(false);

  return (
    <>
      <FromTheKitchen
        onOpenBooking={onOpenBooking}
        onOpenFullMenu={handleOpenMenuModal}
      />

      <MenuModal
        isOpen={menuModalOpen}
        onClose={handleCloseMenuModal}
        onBookTable={onOpenBooking}
      />
    </>
  );
}
