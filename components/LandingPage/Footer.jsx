import * as React from "react"

export default function Footer() {

  const socialIcons = [
    { name: 'Facebook', href: 'https://www.facebook.com/TRUiC/', src: "facebook.svg", alt: "Facebook" },
    { name: 'Youtube', href: 'https://www.youtube.com/c/TRUiC', src: "youtube.svg", alt: "Youtube" },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/truic', src: "linkedln.svg", alt: "LinkedIn" },
    { name: 'Pinterest', href: 'https://www.pinterest.com/reallyusefulinfo/', src: "pinterest.svg", alt: "Pinterest" }
  ];

  return (
    <>
      <div className={`flex flex-col justify-center items-center self-stretch px-16 py-9 w-full bg-zinc-50 max-md:px-5 max-md:mt-10 max-md:max-w-full`} style={{fontFamily: 'Karla'}}>
        <div className="max-w-full w-[939px]">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-xl leading-6 text-black max-md:mt-10">
                <img
                  loading="lazy"
                  src="truic-logo-black-orange-flame.png"
                  alt="Company Logo"
                  className="object-contain max-w-full aspect-[3.18] w-[194px]"
                />
                <div className="mt-4">
                  Helping people succeed by making information accessible and actionable using a values-based approach
                </div>
              </div>
            </div>
            <nav className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
              <div className="grow mt-3 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <ul className="text-xl font-bold leading-8 max-md:mt-6">
                      <li><a href="https://truic.com" target="_blank" rel="noopener noreferrer">Home</a></li>
                      <li><a href="https://truic.com/about-us" target="_blank" rel="noopener noreferrer">About Us</a></li>
                      <li><a href="/" target="_blank" rel="noopener noreferrer">TRUiC Business Center</a></li>
                      <li><a href="https://truic.com/newsletter-signup" target="_blank" rel="noopener noreferrer">Newsletter</a></li>
                      <li><a href="https://howtostartanllc.com/contact-us" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
                    </ul>
                  </div>
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow mt-1.5 max-md:mt-8">
                      <h2 className="text-lg">Our Really Useful Websites</h2>
                      <ul className="mt-2 w-64 text-xl font-bold leading-8 text-[#399FDB]">
                        <li><a href="/" target="_blank" rel="noopener noreferrer">TRUiC Business Center</a></li>
                        <li><a href="https://howtostartanllc.com/" target="_blank" rel="noopener noreferrer">How to Start an LLC</a></li>
                        <li><a href="https://startupsavant.com/" target="_blank" rel="noopener noreferrer">Startup Savant</a></li>
                        <li><a href="https://staterequirement.com/" target="_blank" rel="noopener noreferrer">StateRequirement</a></li>
                        <li><a href="https://nonprofitquest.com/" target="_blank" rel="noopener noreferrer">Nonprofit Quest</a></li>
                        <li><a href="https://howtostartanllc.com/business-ideas" target="_blank" rel="noopener noreferrer">TRUiC Business Ideas</a></li>
                        <li><a href="https://epicbusinessnames.com/" target="_blank" rel="noopener noreferrer">Epic Business Names</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center self-stretch px-16 py-5 w-full bg-[#092426] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between max-w-full w-[940px]">
          <div className="my-auto text-sm text-white max-md:max-w-full">
            © 2025 The Really Useful Information Company |{" "}
            <a href="https://truic.com/privacy" className="hover:underline">
            Privacy Policy
            </a>{" "}
            |{" "}
            <a href="https://truic.com/terms-of-service" className="hover:underline">
            Terms of Service
            </a>
          </div>
          <div className="flex gap-8 items-start">
            {socialIcons.map((icon, index) => (
              <a href={icon.href} target="_blank" rel="noopener noreferrer">
                <img
                key={index}
                loading="lazy"
                src={icon.src}
                alt={icon.alt}
                className="object-contain shrink-0 aspect-square w-[27px]"
              />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}