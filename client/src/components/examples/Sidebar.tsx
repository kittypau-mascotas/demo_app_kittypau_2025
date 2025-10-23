import { useState } from 'react';
import Sidebar from '../Sidebar';

export default function SidebarExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
