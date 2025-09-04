// utils.js

export const getPlaceholderForCurrentSection = (currentSection) => {
  switch (currentSection) {
    case 1:
      return 'Describe your company and its mission...';
    case 2:
      return 'Outline your executive summary...';
    case 3:
      return 'Detail your company description...';
    case 4:
      return 'Provide your market research findings...';
    case 5:
      return 'Describe your product line...';
    case 6:
      return 'Outline your marketing and sales strategies...';
    case 7:
      return 'Input your financial projections...';
    case 8:
      return 'Add any final points...';
    default:
      return 'Start typing here...';
  }
};
