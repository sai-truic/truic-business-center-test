import { AcademicCapIcon, BuildingOfficeIcon, CogIcon, PaintBrushIcon, GlobeAltIcon, MegaphoneIcon, ChatBubbleBottomCenterTextIcon, CurrencyDollarIcon, FlagIcon, ChartBarIcon, LightBulbIcon, MagnifyingGlassIcon, CalculatorIcon, ReceiptPercentIcon, UserGroupIcon, DocumentTextIcon, BanknotesIcon, CreditCardIcon, PresentationChartLineIcon, DocumentChartBarIcon, IdentificationIcon, BuildingStorefrontIcon, ServerIcon, EnvelopeIcon, ClipboardDocumentListIcon, BeakerIcon } from '@heroicons/react/24/outline';

export const getChapterIcon = (chapterIndex) => {
  switch (chapterIndex) {
    case 0: return AcademicCapIcon;
    case 1: return BuildingOfficeIcon;
    case 2: return CogIcon;
    case 3: return PaintBrushIcon;
    case 4: return GlobeAltIcon;
    case 5: return MegaphoneIcon;
    case 6: return ChatBubbleBottomCenterTextIcon;
    case 7: return CurrencyDollarIcon;
    default: return AcademicCapIcon;
  }
};

export const getLessonIcon = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('mission')) return <FlagIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('profit')) return <ChartBarIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('business idea')) return <LightBulbIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('market research')) return <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('financial')) return <CalculatorIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('revenue')) return <CurrencyDollarIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('costs')) return <ReceiptPercentIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('labor')) return <UserGroupIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('expenses')) return <DocumentTextIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('asset')) return <BuildingOfficeIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('tax')) return <CalculatorIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('cash')) return <BanknotesIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('loans')) return <CreditCardIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('projections')) return <PresentationChartLineIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('statements')) return <DocumentChartBarIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('name')) return <IdentificationIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('dba')) return <BuildingStorefrontIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('domain')) return <GlobeAltIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('hosting')) return <ServerIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('email')) return <EnvelopeIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  if (lowerTitle.includes('plan')) return <ClipboardDocumentListIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
  return <BeakerIcon className="w-5 h-5 mr-2 text-[#F7931E] flex-shrink-0" />;
};
