import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ResultsSearch from './Results/UI/ResultsSearch';
import ResultsSection from './Results/UI/ResultsSection';
import Container from './Results/UI/Container';
import useInputState from './useInputState';

const BNG = () => {
  const { inputValue, collectedNames } = useInputState();
  const [isMounted, setIsMounted] = useState(false);
  
  // Set component as mounted after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Container>
      <div className="py-2 mb-6">
        <ResultsSearch />
      </div>
      
      {/* Only show results if we have input and names */}
      {isMounted && inputValue && inputValue.trim() !== "" && collectedNames.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResultsSection />
        </motion.div>
      )}
    </Container>
  );
};

export default BNG;