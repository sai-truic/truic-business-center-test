/**
 * Input placeholders for BNG form fields
 */

export const inputBoxPlaceholder = "Enter keywords (e.g., creative, digital marketing)";

export const locationBoxPlaceholder = "Enter location (optional)";

export const getIndustryPlaceholder = (industry = '', language = 'english') => {
  if (industry && industry.trim() !== '') {
    return industry;
  }
  
  return "Select your industry (optional)";
};