import React, { useEffect } from 'react';
import Head from 'next/head';
import Hero from './Hero';
import Features from './Features';
import Services from './Services';
import LegalForms from './LegalForms';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

const LandingPage = () => {
    useEffect(() => {
        const smoothScroll = (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        };

        const links = document.querySelectorAll('nav a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });

        return () => {
            links.forEach(link => {
                link.removeEventListener('click', smoothScroll);
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
            <Head>
                <title>TRUiC Small Business Center | Expert Tools & Resources for [Your City] Entrepreneurs</title>
                <meta name="description" content="Discover comprehensive small business tools and expert guidance tailored for [Your City] entrepreneurs. From LLC formation to growth strategies, TRUiC is your local partner in business success." />
            </Head>
            <nav className="container mx-auto px-6 py-4 sticky top-0 bg-white bg-opacity-90 z-10">
                <ul className="flex justify-center space-x-6">
                    <li><a href="/features" className="text-indigo-800 hover:text-indigo-600 font-medium transition duration-300">Features</a></li>
                    <li><a href="/services" className="text-indigo-800 hover:text-indigo-600 font-medium transition duration-300">Services</a></li>
                    <li><a href="/why-choose-us" className="text-indigo-800 hover:text-indigo-600 font-medium transition duration-300">Why Choose Us</a></li>
                    <li><a href="/testimonials" className="text-indigo-800 hover:text-indigo-600 font-medium transition duration-300">Testimonials</a></li>
                    <li><a href="/contact" className="text-indigo-800 hover:text-indigo-600 font-medium transition duration-300">Contact</a></li>
                </ul>
            </nav>

            <div className="container mx-auto px-6 py-20">
                <Hero />
                <Features />
                <Services />
                <LegalForms />
                <Testimonials />
                <Contact />
            </div>

            <Footer />
        </div>
    );
};

export default LandingPage;
