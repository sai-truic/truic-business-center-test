import * as React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex flex-col justify-center items-center self-stretch px-5 py-3.5 w-full font-bold bg-[#092426] max-md:pl-5 max-md:max-w-full">
      
      <div className='flex flex-wrap gap-5 justify-between max-w-full w-[940px] lg:w-full'>
        <a href="https://truic.com" className='object-contain shrink-0 my-auto'>
          <img
            loading="lazy"
            src="truic_logo_white.svg"
            alt="Business Logo"
            className="w-[115px]"
          />
        </a>
        <nav className="flex gap-10">
          <Link href="/sign-up" passHref>
              <button
              className="px-5 py-3 text-xl text-white max-md:px-5 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              aria-label="Create Account"
              >
              Create Account
              </button>
          </Link>
          <Link href="/sign-in" passHref>
              <button
              className="px-14 py-3 text-xl text-black bg-[#E0F805] max-md:px-5 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              aria-label="Sign In"
              >
              Sign In
              </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;