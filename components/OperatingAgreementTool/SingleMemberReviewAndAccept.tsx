import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ExclamationCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface Props {
  register: UseFormRegister<any>;
}

const SingleMemberReviewAndAccept: React.FC<Props> = ({ register }) => {
  return (
    <div className="mb-6 sm:mb-8 p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-950 mb-4 sm:mb-6 text-center">
        <span className="bg-clip-text text-neutral-950 bg-gradient-to-r from-[#F7931E] to-orange-600">
          Please review and accept the following terms in order to print:
        </span>
      </h3>
      <div className="w-full mx-auto">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center mb-3 sm:mb-4">
            <ExclamationCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-[#F7931E] mr-2 sm:mr-3 flex-shrink-0" />
            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-950">Terms and Conditions</h4>
          </div>
          <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed">
            The Operating Agreement created through this tool is a draft document for you to revise and rework as you see fit. Please note the following important points:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm md:text-base space-y-1 sm:space-y-2 mb-4 sm:mb-6">
            <li>This draft document does not constitute legal advice, tax advice, or similar professional guidance.</li>
            <li>It is provided for informational purposes only and may not be suitable for all circumstances.</li>
            <li>This sample document may have legal or tax consequences that should be discussed with an attorney and/or accountant prior to execution.</li>
            <li>Use of this draft document is at your own risk.</li>
          </ul>

          <div className="bg-white border-l-4 border-[#F7931E] p-2 sm:p-3 md:p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-2 sm:mr-3">
                <LightBulbIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#F7931E]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs sm:text-sm md:text-base text-neutral-950 font-semibold">
                  Important Recommendation
                </p>
                <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-700">
                  We strongly recommend consulting with appropriate professionals (such as attorneys and accountants) before finalizing and implementing this document.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-4 sm:mt-6 md:mt-8">
          <div className="p-3 sm:p-4 md:p-6 transition-all duration-300 w-full max-w-2xl">
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <input
                type="checkbox"
                id="singleMemberAgreeTerms"
                className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#F7931E] rounded border-orange-300 focus:ring-[#F7931E] transition duration-150 ease-in-out cursor-pointer"
                {...register("singleMemberAgreeTerms")}
              />
              <label htmlFor="singleMemberAgreeTerms" className="font-medium text-sm sm:text-base md:text-xl text-center cursor-pointer">
                I have read and agree to the terms and conditions
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMemberReviewAndAccept;
