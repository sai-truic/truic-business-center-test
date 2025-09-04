export const getFeatures = (category) => {
  const bankingFeatures = {
    'No monthly fees': ['Lili', 'Mercury', 'Novo', 'Brex'],
    'High APY': ['Lili', 'Baselane', 'Relay'],
    'Cash back rewards': ['Lili', 'Mercury', 'Baselane'],
    'Multiple debit cards': ['Relay'],
    'Free ATM access': ['Lili', 'Novo'],
    'Mobile check deposit': ['Lili', 'Mercury', 'Novo', 'Chase Bank'],
    'Physical branches': ['Chase Bank'],
    'No minimum balance': ['Lili', 'Mercury', 'Novo', 'Brex'],
    'Overdraft protection': ['Lili'],
    'Sign-up bonus': ['Baselane', 'Chase Bank'],
    'Integrations': ['Mercury', 'Novo', 'Brex'],
    'Unlimited transactions': ['Mercury', 'Novo'],
    'No account fees': ['Mercury', 'Novo', 'Brex'],
    'No transaction fees': ['Mercury', 'Novo', 'Brex'],
    'No deposit fees': ['Novo'],
    'Expedited payments': ['Lili', 'Brex']
  };

  const insuranceFeatures = {
    'Small business focus': ['Next Insurance', 'Tivly', 'Hiscox'],
    'Online quote': ['Next Insurance', 'Hiscox'],
    'Specialized coverage': ['Next Insurance', 'The Hartford', 'CNA'],
    'Marketplace': ['Tivly'],
    'US-based support': ['The Hartford'],
    'Micro-business coverage': ['Hiscox'],
    'Tech company focus': ['CNA'],
    'High-risk business coverage': ['Chubb'],
    'Home business discount': ['Chubb'],
    'Same-day coverage': ['Next Insurance'],
    'Mobile app': ['Next Insurance'],
    'Customizable policies': ['Next Insurance'],
    'Customer service': ['Tivly', 'The Hartford'],
    'Multiple partners': ['Tivly'],
    'Long history': ['The Hartford'],
    'Educational resources': ['Hiscox'],
    'Cyber risk solutions': ['CNA'],
    'Niche business coverage': ['CNA'],
    'Wide range of products': ['Chubb']
  };

  const formationFeatures = {
    'Fast processing': ['Bizee', 'Tailor Brands', 'Swyft Filings'],
    'Registered agent included': ['Bizee', 'Northwest', 'Rocket Lawyer'],
    'Operating agreement included': ['ZenBusiness', 'Tailor Brands', 'LegalZoom', 'Bizee', 'Rocket Lawyer'],
    'EIN registration included': ['ZenBusiness', 'Tailor Brands', 'LegalZoom', 'Bizee', 'Swyft Filings'],
    'Annual compliance service': ['ZenBusiness', 'Tailor Brands', 'LegalZoom', 'Bizee'],
    'Legal consultations': ['LegalZoom', 'Rocket Lawyer'],
    'Web domain included': ['LegalZoom', 'Bizee', 'Swyft Filings'],
    'Accounting consultation': ['ZenBusiness'],
    'Privacy focus': ['Northwest'],
    'Branding services': ['Tailor Brands']
  };

  const pressReleaseFeatures = {
    'SEO services': ['SiteTrail'],
    'Affordable pricing': ['EIN Presswire', 'SiteTrail'],
    'Global distribution': ['EIN Presswire', 'PR Newswire'],
    'Journalist network': ['eReleases', 'Newswire'],
    'Cloud-based service': ['PRWeb'],
    'Analytics reporting': ['PRWeb', 'Newswire', 'PR Newswire'],
    'Writing services': ['SiteTrail', 'Newswire'],
    'Multimedia options': ['Newswire', 'PR Newswire'],
    'Location targeting': ['PR Newswire', 'eReleases'],
    'Same-day distribution': ['EIN Presswire', 'SiteTrail'],
    'Unlimited distribution': ['SiteTrail']
  };

  const businessPhoneFeatures = {
    'Free trial': ['RingCentral'],
    '24/7 support': ['RingCentral', 'Phone.com'],
    'Video conferencing': ['RingCentral'],
    'Team collaboration': ['RingCentral'],
    'Affordable pricing': ['Phone.com', 'Talkroute'],
    'Mobile app': ['Phone.com', 'Talkroute', 'eVoice', 'Grasshopper', 'Kixie'],
    'Unlimited calls': ['Talkroute', 'Grasshopper'],
    'Live receptionist': ['eVoice'],
    'Auto-texting': ['Grasshopper'],
    'CRM integration': ['Kixie'],
    'Call recording': ['RingCentral', 'Kixie'],
    'Voicemail to email': ['Phone.com', 'eVoice'],
    'Custom greetings': ['Talkroute', 'eVoice'],
    'Vanity numbers': ['Grasshopper'],
    'Power dialing': ['Kixie']
  };

  const businessLoanFeatures = {
    'Quick approval': ['UpLyft Capital', 'Lendio'],
    'Small business focus': ['UpLyft Capital', 'Lendio', 'Kabbage'],
    'Established business': ['Lendio', 'Biz2Credit', 'Kabbage'],
    'Online business': ['Uncapped'],
    'Poor credit': ['OnDeck'],
    'Startups': ['Accion'],
    'Short-term needs': ['Fundbox'],
    'No collateral': ['Biz2Credit', 'Kabbage'],
    'Line of credit': ['Kabbage', 'OnDeck', 'Fundbox'],
    'Term loans': ['Lendio', 'Biz2Credit', 'OnDeck'],
    'Revenue-based financing': ['Uncapped'],
    'Low credit score requirement': ['Lendio', 'OnDeck', 'Fundbox'],
    'High loan limits': ['Lendio', 'Biz2Credit', 'Uncapped'],
    'Same-day funding': ['UpLyft Capital', 'Kabbage'],
    'Transparent pricing': ['Lendio', 'Biz2Credit', 'Kabbage'],
    'Advice and support': ['Accion']
  };

  const payrollFeatures = {
    'Full-service payroll': ['ADP', 'Gusto', 'Zenefits', 'OnPay', 'QuickBooks', 'Square'],
    'HR management': ['ADP', 'Gusto', 'Zenefits'],
    'Benefits administration': ['ADP', 'Gusto', 'Zenefits'],
    'Time tracking': ['ADP', 'Gusto', 'Zenefits', 'OnPay', 'QuickBooks', 'Square'],
    'Mobile app': ['ADP', 'Gusto', 'Zenefits', 'OnPay', 'QuickBooks', 'Square'],
    'Tax filing': ['ADP', 'Gusto', 'OnPay', 'QuickBooks', 'Square'],
    'Employee self-service': ['ADP', 'Gusto', 'Zenefits', 'OnPay'],
    'Integrations': ['Gusto', 'OnPay', 'QuickBooks', 'Square'],
    'Unlimited payroll runs': ['OnPay', 'Square'],
    'Contractor payments': ['Gusto', 'Square'],
    'User-friendly interface': ['Gusto', 'Zenefits', 'QuickBooks'],
    'Customizable reports': ['ADP', 'OnPay'],
    'Low cost': ['Zenefits', 'Square'],
    'Large business support': ['ADP', 'OnPay'],
    'Small business focus': ['QuickBooks', 'Square']
  };

  switch (category) {
    case 'Banking':
      return bankingFeatures;
    case 'Insurance':
      return insuranceFeatures;
    case 'Formation':
      return formationFeatures;
    case 'Press Release':
      return pressReleaseFeatures;
    case 'Business Phone':
      return businessPhoneFeatures;
    case 'Business Loans':
      return businessLoanFeatures;
    case 'Payroll':
      return payrollFeatures;
    default:
      return {};
  }
};

export const filterServicesByFeatures = (services, selectedFeatures) => {
  return services.map(service => ({
    ...service,
    items: service.items.filter(item =>
      selectedFeatures.length === 0 || selectedFeatures.every(feature => 
        getFeatures(service.category)[feature]?.includes(item.title)
      )
    )
  }));
};

export const getRelevantFeatures = (category, items) => {
  const allFeatures = getFeatures(category);
  const relevantFeatures = {};

  Object.entries(allFeatures).forEach(([feature, companies]) => {
    const relevantCompanies = companies.filter(company => 
      items.some(item => item.title === company)
    );
    if (relevantCompanies.length > 0) {
      relevantFeatures[feature] = relevantCompanies;
    }
  });

  return relevantFeatures;
};
