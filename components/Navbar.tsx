import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 w-full'>
      <div className='flex gap-2'>
        <Link href='#'>programación</Link>
        <Link href='#'>servicios</Link>
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;
