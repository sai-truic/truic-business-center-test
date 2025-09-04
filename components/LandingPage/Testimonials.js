import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ quote, author, company, location }) => (
    <motion.div 
        whileHover={{ scale: 1.05 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100"
    >
        <svg className="w-8 h-8 text-indigo-400 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="text-gray-600 italic mb-4">"{quote}"</p>
        <p className="text-indigo-800 font-semibold">{author}</p>
        <p className="text-gray-500">{company}, {location}</p>
    </motion.div>
);

const Testimonials = () => {
    return (
        <div id="testimonials" className="mt-32">
            <h2 className="text-4xl font-bold text-center mb-16 text-indigo-800">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <TestimonialCard 
                    quote="The Business Center has been instrumental in helping us launch and grow our startup in [Your City]. Their tools and support are unparalleled."
                    author="Jane Doe"
                    company="CEO of TechStart"
                    location="[Your City]"
                />
                <TestimonialCard 
                    quote="I couldn't have navigated the complexities of forming my LLC without the Business Center. Their expert guidance made the process smooth and stress-free."
                    author="John Smith"
                    company="Founder of SmithCo"
                    location="[Your City]"
                />
                <TestimonialCard 
                    quote="As a local business owner, I found TRUiC's resources invaluable. They truly understand the unique challenges we face in [Your City]."
                    author="Emily Johnson"
                    company="Owner of Green Leaf Cafe"
                    location="[Your City]"
                />
                <TestimonialCard 
                    quote="The personalized support from TRUiC helped me turn my side hustle into a thriving full-time business. I'm grateful for their expertise."
                    author="Michael Chen"
                    company="Founder of CodeCraft Solutions"
                    location="[Your City]"
                />
            </div>
        </div>
    );
};

export default Testimonials;
