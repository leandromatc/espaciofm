import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className='flex flex-col lg:flex-row gap-5 justify-between items-center p-4 w-full'>
      <div>
        <Link href='/'>
          <Image
            src='/logo.png'
            width={400}
            height={200}
            alt='Logo de 91.5FM Espacio Sport'
            className='max-w-[200px]'
          />
        </Link>
      </div>
      <div className='flex gap-2'>
        <Link
          className='group flex gap-1 bg-neutral-900 px-4 py-2 rounded-full text-neutral-200 hover:text-white'
          href='#'
        >
          programación
          <span>
            <ArrowRight className='group-hover:-rotate-45 transition-all' />
          </span>
        </Link>
        <Link
          className='group flex gap-1 bg-neutral-900 px-4 py-2 rounded-full text-neutral-200 hover:text-white'
          href='#'
        >
          servicios
          <span>
            <ArrowRight className='group-hover:-rotate-45 transition-all' />
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
