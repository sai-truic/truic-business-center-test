import React from 'react';

const IntroductoryText = () => {
  return (
    <div className="space-y-6">
      <div className="main-content-border p-6 mb-8 shadow-md hover:shadow-xl transition-all duration-300 text-black group">
        <h3 className="text-xl font-bold mb-4">
          <span className="bg-clip-text  ">
            Creating Your Business Plan: A Roadmap to Success
          </span>
        </h3>
        <p className="text-base text-neutral-950 mb-4 leading-relaxed">
          Crafting a business plan is a crucial step in your
          entrepreneurial journey. It serves as a comprehensive
          roadmap, guiding your business through its early
          years and beyond.
        </p>
        <div className="bg-white bg-opacity-50 p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-2">
            <span className="bg-clip-text  ">
              Key Benefits:
            </span>
          </h4>
          <ul className="list-none text-base text-neutral-950 space-y-2">
            <li className="flex items-start">
              <svg
                className="w-5 h-5  mr-2 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span>
                Projects your business trajectory{' '}
                <span className="font-semibold ">3-5 years</span>{' '}
                into the future
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5  mr-2 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span>
                Outlines strategies to achieve{' '}
                <span className="font-semibold ">
                  yearly milestones
                </span>
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5  mr-2 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span>
                Includes detailed{' '}
                <span className="font-semibold ">
                  revenue projections
                </span>
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5  mr-2 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span>
                Facilitates{' '}
                <span className="font-semibold ">
                  objective analysis
                </span>{' '}
                of key business elements
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5  mr-2 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span>
                Guides{' '}
                <span className="font-semibold ">
                  informed decision-making
                </span>{' '}
                throughout your business journey
              </span>
            </li>
          </ul>
        </div>
        <p className="text-base italic font-semibold mt-4">
          <span className="bg-clip-text  ">
            Remember: A well-crafted business plan is the
            foundation of your venture's success, providing
            clarity and direction in every stage of growth.
          </span>
        </p>
      </div>
      <div className="main-content-border p-6 mb-8 shadow-md hover:shadow-xl transition-all duration-300 group">
        <h4 className="text-lg font-bold mb-4">
          <span className="bg-clip-text  ">
            Next Steps: Building Your Business Plan
          </span>
        </h4>
        <ol className="list-decimal list-inside text-base text-neutral-950 space-y-3">
          <li className="flex items-start">
            <span className="font-semibold mr-2 ">1.</span>
            <span>
              Complete the form in the next page to create your
              personalized cover page
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2 ">2.</span>
            <span>
              Click{' '}
              <span className="font-semibold ">
                "Save"
              </span>{' '}
              to preserve your progress (ideal for breaks or
              logging out)
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2 ">3.</span>
            <span>
              Use{' '}
              <span className="font-semibold ">
                "Save & Continue"
              </span>{' '}
              to proceed to the next section of your business
              plan
            </span>
          </li>
        </ol>
        <p className="text-sm mt-4 italic">
          <span className="bg-clip-text  ">
            Tip: Take your time to provide accurate and
            thoughtful information. Your business plan is a
            living document that will guide your company's
            growth.
          </span>
        </p>
      </div>
    </div>
  );
};

export default IntroductoryText;
