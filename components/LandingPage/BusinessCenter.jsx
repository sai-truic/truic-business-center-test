import * as React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import Footer from "./Footer.jsx";
import Link from "next/link";

function BusinessCenter() {
  const features = {
    businessTools: {
      title: "Free Business Tools",
      description: "A suite of free AI-powered tools to help your business run smoothly.",
      backgroundImageName: "blue_feature_highlight.png",
      iconName: "BriefcaseIcon",
      features: [
        {
          title: "Operating Agreement Creator",
          description: "Create a custom operating agreement to meet your business needs."
        },
        {
          title: "Business Plan Generator",
          description: "We'll walk you through getting your business plan down on paper."
        },
        {
          title: "Business Name Generator",
          description: "Find the best name for your business with a matching domain."
        },
        {
          title: "QR Code Generator",
          description: "Create free QR codes for marketing and communication for your business."
        }
      ]
    },
    businessCourse: {
      title: "Small Business Course",
      description: "A comprehensive learning experience designed to guide you through every aspect of business ownership.",
      backgroundImageName: "purple_feature_highlight.png",
      iconName: "AcademicCapIcon",
      features: [
        {
          title: "Over 100 Videos",
          description: "In-depth video content covering all aspects of business management."
        },
        {
          title: "Downloadable Worksheets",
          description: "Practical resources to apply what you learn."
        },
        {
          title: "Discounts on Business Services",
          description: "Exclusive deals on essential business tools and services."
        },
        {
          title: "Interactive Learning",
          description: "Engage with practical exercises and real-world scenarios."
        }
      ]
    },
    recommendedServices: {
      title: "Recommended Services & Exclusive Discounts",
      description: "Get personalized recommendations and exclusive discounts on essential business services.",
      backgroundImageName: "pink_feature_highlight.png",
      iconName: "TagIcon",
      features: [
        {
          title: "Business Formation",
          description: "Professional LLC and corporation formation services."
        },
        {
          title: "Banking and Credit Cards",
          description: "Exclusive financial solutions for your business."
        },
        {
          title: "Accounting",
          description: "Professional accounting and bookkeeping services."
        },
        {
          title: "Insurance",
          description: "Comprehensive business insurance coverage."
        }
      ]
    },
    legalForms: {
      title: "Free Legal Forms",
      description: "Access a wide range of customizable legal forms and templates for your business needs.",
      backgroundImageName: "yellow_feature_highlight.png",
      iconName: "NewspaperIcon",
      features: [
        {
          title: "Operating Agreement",
          description: "Customizable LLC operating agreement templates."
        },
        {
          title: "Hiring Documents",
          description: "Essential employment and contractor agreements."
        },
        {
          title: "LLC Resolution",
          description: "Standard and custom LLC resolution templates."
        },
        {
          title: "Business Contracts",
          description: "Common business contract templates and forms."
        }
      ]
    }
  };

  return (
    <main className="flex overflow-hidden flex-col items-center bg-white">
      <Header />
      <HeroSection />
      <section className="text-center px-4 max-w-4xl mx-auto">
        <h2 className='mt-28 text-3xl text-black tracking-[3px] max-md:mt-10 font-bold' style={{fontFamily: 'PermanentMarker'}}>
          how we help your business grow
        </h2>
        <p className="mt-12 text-lg leading-6 text-black max-md:mt-10">
          We provide a comprehensive suite of small business tools and resources
          designed to support your entrepreneurial journey, from LLC formation to
          ongoing growth. Our expert-crafted solutions empower you to build,
          manage, and scale your business with confidence.
        </p>
      </section>
      <FeatureSection {...features.businessTools} />
      <FeatureSection {...features.businessCourse} />
      <FeatureSection {...features.recommendedServices} />
      <FeatureSection {...features.legalForms} />
      <section className="w-full mb-14 pb-14"
        style={{
          backgroundImage : `url('/chaos_background.webp')`,
          backgroundPosition: 'top',
          backgroundSize: 'auto 500px',
          backgroundRepeat: 'repeat-x',
        }}
      >
        <div className='max-w-4xl px-4 mx-auto text-center'>
          <h2 className='mt-28 text-3xl text-black tracking-[3px] max-md:mt-10 font-bold' style={{fontFamily: 'PermanentMarker'}}>
            Let's Grow Your Business Together
          </h2>
          <p className="mt-12 text-xl leading-6 text-black max-md:mt-10 font-normal">
            At The Really Useful Information Company we're dedicated to empowering
            entrepreneurs with the knowledge and tools they need to succeed. Our mission is to
            make business information accessible, actionable, and free for everyone.
          </p>
          <Link href="/sign-in" passHref>
            <button className="px-9 py-5 mt-12 font-bold text-center bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 max-md:px-5 max-md:mt-10">
              Get Started
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default BusinessCenter;