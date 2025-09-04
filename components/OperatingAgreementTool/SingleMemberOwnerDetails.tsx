import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';

interface Props {
  register: UseFormRegister<any>;
}

const SingleMemberOwnerDetails: React.FC<Props> = ({ register }) => {
  return (
    <div className="mb-6 sm:mb-8 bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-4">
        <span className="bg-clip-text text-neutral-950">
          Owner Details
        </span>
      </h3>
      <div className="relative">
        <label htmlFor="singleOwnersName" className="block text-neutral-950 font-semibold mb-2 text-sm sm:text-base">
          Owner&apos;s Name
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F7931E] text-lg sm:text-xl" />
          <input
            type="text"
            id="singleOwnersName"
            className="pl-10 pr-4 py-3 w-full rounded-lg bg-orange-50 border-2 border-orange-200 focus:border-[#F7931E] focus:ring-2 focus:ring-orange-200 text-sm sm:text-base transition-all duration-200"
            placeholder="Full Name"
            {...register("singleOwnersName")}
          />
        </div>
        <p className="mt-2 text-xs sm:text-sm text-[#F7931E]">
          Enter the full name of the single LLC member
        </p>
      </div>
    </div>
  );
};

export default SingleMemberOwnerDetails;
