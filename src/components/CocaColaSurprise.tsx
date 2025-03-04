
import React from 'react';
import CocaCola from './CocaCola';
import { toast } from "sonner";

const CocaColaSurprise: React.FC = () => {
  const handleClick = () => {
    toast.success("Sharing a Coke with you makes every moment special!", {
      description: "Here's to creating more sweet memories together 🥤❤️",
      duration: 5000,
    });
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <CocaCola onClick={handleClick} />
    </div>
  );
};

export default CocaColaSurprise;
