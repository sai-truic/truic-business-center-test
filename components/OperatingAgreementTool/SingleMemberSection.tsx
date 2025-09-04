import React from 'react';
import { motion } from 'framer-motion';
import SingleMemberOwnerDetails from './SingleMemberOwnerDetails';
import SingleMemberReviewAndAccept from './SingleMemberReviewAndAccept';

const SingleMemberSection: React.FC<{ register: any }> = ({ register }) => {
  return (
    <motion.div
      key="single-member"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl p-6 border border-[#E4E4E7]"
    >
      <SingleMemberOwnerDetails register={register} />
      <SingleMemberReviewAndAccept register={register} />
    </motion.div>
  );
};

export default SingleMemberSection;
