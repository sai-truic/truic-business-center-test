import { AcademicCapIcon, BuildingOfficeIcon, CogIcon, PaintBrushIcon, GlobeAltIcon, MegaphoneIcon, ChatBubbleBottomCenterTextIcon, CurrencyDollarIcon, FlagIcon, ChartBarIcon, LightBulbIcon, MagnifyingGlassIcon, CalculatorIcon, ReceiptPercentIcon, UserGroupIcon, DocumentTextIcon, BanknotesIcon, CreditCardIcon, PresentationChartLineIcon, DocumentChartBarIcon, IdentificationIcon, BuildingStorefrontIcon, ServerIcon, EnvelopeIcon, ClipboardDocumentListIcon, BeakerIcon } from '@heroicons/react/24/outline';

const getChapterIcon = (chapterIndex) => {
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

export default getChapterIcon;

export const getLessonIcon = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('mission')) return FlagIcon;
  if (lowerTitle.includes('profit')) return ChartBarIcon;
  if (lowerTitle.includes('business idea')) return LightBulbIcon;
  if (lowerTitle.includes('market research')) return MagnifyingGlassIcon;
  if (lowerTitle.includes('financial')) return CalculatorIcon;
  if (lowerTitle.includes('revenue')) return CurrencyDollarIcon;
  if (lowerTitle.includes('costs')) return ReceiptPercentIcon;
  if (lowerTitle.includes('labor')) return UserGroupIcon;
  if (lowerTitle.includes('expenses')) return DocumentTextIcon;
  if (lowerTitle.includes('asset')) return BuildingOfficeIcon;
  if (lowerTitle.includes('tax')) return CalculatorIcon;
  if (lowerTitle.includes('cash')) return BanknotesIcon;
  if (lowerTitle.includes('loans')) return CreditCardIcon;
  if (lowerTitle.includes('projections')) return PresentationChartLineIcon;
  if (lowerTitle.includes('statements')) return DocumentChartBarIcon;
  if (lowerTitle.includes('name')) return IdentificationIcon;
  if (lowerTitle.includes('dba')) return BuildingStorefrontIcon;
  if (lowerTitle.includes('domain')) return GlobeAltIcon;
  if (lowerTitle.includes('hosting')) return ServerIcon;
  if (lowerTitle.includes('email')) return EnvelopeIcon;
  if (lowerTitle.includes('plan')) return ClipboardDocumentListIcon;
  return BeakerIcon;
};

export const courseData = [
  {
    title: "Chapter 1: Planning and Ideation",
    lessons: [
      { 
        title: "Intro: How to Plan and Kickstart Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/kickstart-your-small-business",
        content: [
          {
            type: "text",
            content: "Starting a small business can be an exciting yet daunting journey. This introductory lesson will guide you through the essential steps to plan and kickstart your small business effectively."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of planning",
                  "Identifying your business idea",
                  "Conducting market research",
                  "Creating a business plan",
                  "Understanding legal requirements",
                  "Securing funding",
                  "Setting up your business structure"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/T3PpsfaklCA"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a clear roadmap for launching your small business and be ready to dive deeper into each aspect of the startup process."
          }
        ]
      },
      { 
        title: "Lesson 1.01: How to Craft a Powerful Operational Mission Statement", 
        url: "https://howtostartanllc.com/small-business-startup-course/craft-a-mission-statement",
        content: [
          {
            type: "text",
            content: "A powerful operational mission statement is crucial for guiding your business. This lesson will teach you how to craft an effective mission statement that aligns with your business goals and values."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the purpose and importance of a mission statement",
                  "The difference between a mission statement and a vision statement",
                  "Components of an effective mission statement",
                  "Steps to create your mission statement",
                  "Examples of strong mission statements from successful companies",
                  "Common mistakes to avoid when crafting your mission statement",
                  "How to use your mission statement to guide business decisions"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have the knowledge and tools to create a compelling mission statement that will serve as a foundation for your business's identity and decision-making processes."
          }
        ]
      },
      { 
        title: "Lesson 1.02: How to Set Your Business Profit Goals", 
        url: "https://howtostartanllc.com/small-business-startup-course/set-business-profit-goals",
        content: [
          {
            type: "text",
            content: "Setting clear and achievable profit goals is crucial for the success of your small business. This lesson will guide you through the process of establishing realistic profit targets that align with your business objectives."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of profit goals",
                  "Differentiating between revenue and profit",
                  "Factors to consider when setting profit goals",
                  "Steps to set realistic profit targets",
                  "Short-term vs. long-term profit goals",
                  "Strategies for achieving your profit goals",
                  "Monitoring and adjusting your profit goals"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/6rXY5HQtpLs"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a clear understanding of how to set, track, and achieve profit goals that will drive your business towards financial success."
          }
        ]
      },
      { 
        title: "Lesson 1.03: How to Find the Right Business Idea - The Ikigai Approach", 
        url: "https://howtostartanllc.com/small-business-startup-course/find-the-right-business-idea",
        content: [
          {
            type: "text",
            content: "Finding the right business idea is crucial for long-term success and personal fulfillment. This lesson introduces the Ikigai approach, a Japanese concept that can help you discover your ideal business idea by aligning your passions, skills, market needs, and potential for profit."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the Ikigai concept and its four components",
                  "Identifying your passions and skills",
                  "Analyzing market needs and potential for profit",
                  "Using the Ikigai framework to generate business ideas",
                  "Evaluating and refining your business ideas",
                  "Common pitfalls to avoid when choosing a business idea",
                  "Additional resources and tools for idea generation"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/HTDGlg0RTyw"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a clear understanding of how to use the Ikigai approach to find a business idea that not only has market potential but also aligns with your personal strengths and passions."
          }
        ]
      },
      { 
        title: "Lesson 1.04: How to Put a Mission Statement Into Practice", 
        url: "https://howtostartanllc.com/small-business-startup-course/put-a-mission-statement-into-practice",
        content: [
          {
            type: "text",
            content: "Creating a mission statement is just the first step. The real challenge lies in implementing it effectively throughout your business operations. This lesson will guide you on how to put your mission statement into practice."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of living your mission statement",
                  "Strategies for communicating your mission to employees and stakeholders",
                  "Aligning business decisions with your mission statement",
                  "Incorporating your mission into daily operations",
                  "Using your mission statement in marketing and branding",
                  "Measuring the impact of your mission statement",
                  "Regularly reviewing and updating your mission statement"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/3BrPVRL9SCg"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have practical strategies to ensure your mission statement becomes a living, breathing part of your business, guiding your decisions and actions on a daily basis."
          }
        ]
      },
      { 
        title: "Lesson 1.05: 10-Step Guide on How to Do Market Research & Business Planning", 
        url: "https://howtostartanllc.com/small-business-startup-course/market-research",
        content: [
          {
            type: "text",
            content: "Effective market research and business planning are crucial for the success of your small business. This comprehensive 10-step guide will walk you through the process of conducting thorough market research and creating a solid business plan."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of market research",
                  "Identifying your target market and customer demographics",
                  "Analyzing your competitors and industry trends",
                  "Conducting surveys and gathering customer feedback",
                  "Evaluating market size and potential growth",
                  "Creating buyer personas",
                  "Analyzing pricing strategies",
                  "Identifying distribution channels",
                  "SWOT analysis (Strengths, Weaknesses, Opportunities, Threats)",
                  "Incorporating research findings into your business plan"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/0SerSh8bggk"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a comprehensive understanding of how to conduct effective market research and use those insights to create a robust business plan that will guide your small business towards success."
          }
        ]
      },
      { 
        title: "Lesson 1.06: Practical Example of a Barbershop's Market Research & Business Planning", 
        url: "https://howtostartanllc.com/small-business-startup-course/market-research-example",
        content: [
          {
            type: "text",
            content: "This lesson provides a practical, real-world example of how to conduct market research and business planning for a barbershop. By walking through this example, you'll gain insights into applying the concepts learned in previous lessons to a specific business scenario."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Defining the barbershop's target market and customer demographics",
                  "Analyzing competitors in the local area",
                  "Conducting a SWOT analysis for the barbershop",
                  "Estimating startup costs and ongoing expenses",
                  "Projecting revenue and profit margins",
                  "Creating a marketing strategy for the barbershop",
                  "Developing a business plan based on the research findings"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/zvXqzbyrZXQ"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a clear understanding of how to apply market research and business planning techniques to a real business scenario, which you can then adapt to your own business idea."
          }
        ]
      },
      { 
        title: "Lesson 1.07: Basics of Small Business Financial Planning", 
        url: "https://howtostartanllc.com/small-business-startup-course/small-business-financial-planning",
        content: [
          {
            type: "text",
            content: "Financial planning is crucial for the success and sustainability of your small business. This lesson will introduce you to the basics of small business financial planning and help you create a solid financial foundation for your venture."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of financial planning for small businesses",
                  "Key components of a financial plan",
                  "Creating financial projections and forecasts",
                  "Budgeting for your small business",
                  "Managing cash flow effectively",
                  "Understanding and analyzing financial statements",
                  "Planning for taxes and other financial obligations",
                  "Strategies for financial growth and sustainability"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/1-hGgR7iXqk"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a solid understanding of small business financial planning principles and be equipped with the knowledge to create a robust financial plan for your business."
          }
        ]
      },
      { 
        title: "Lesson 1.08: How to Project Business Revenue for Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/project-business-revenue",
        content: [
          {
            type: "text",
            content: "Projecting business revenue is a crucial step in financial planning for your small business. This lesson will guide you through the process of creating realistic revenue projections to help you make informed business decisions."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of revenue projections",
                  "Different methods for projecting revenue",
                  "Factors to consider when projecting revenue",
                  "Steps to create a revenue projection",
                  "Common mistakes to avoid in revenue forecasting",
                  "Using revenue projections for business planning and decision-making",
                  "Tools and software for revenue projection"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/Hm-p5_G23nE"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have the knowledge and tools to create accurate revenue projections for your small business, helping you set realistic goals and make informed financial decisions."
          }
        ]
      },
      { 
        title: "Lesson 1.09: How to Project Direct Costs for Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/project-direct-costs",
        content: [
          {
            type: "text",
            content: "Understanding and projecting direct costs is crucial for accurate financial planning and pricing strategies in your small business. This lesson will guide you through the process of identifying and estimating your direct costs."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding what direct costs are and their importance",
                  "Identifying different types of direct costs in various industries",
                  "Methods for estimating and projecting direct costs",
                  "Calculating cost of goods sold (COGS)",
                  "Differentiating between fixed and variable direct costs",
                  "Strategies for managing and reducing direct costs",
                  "Using direct cost projections in pricing and profitability analysis"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/7iXYfbZst-A"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a clear understanding of how to project direct costs for your small business, enabling you to make more informed decisions about pricing, production, and overall business strategy."
          }
        ]
      },
      { 
        title: "Lesson 1.10: How to Estimate Labor Costs for Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/estimate-labor-costs",
        content: [
          {
            type: "text",
            content: "Accurately estimating labor costs is crucial for the financial health of your small business. This lesson will guide you through the process of calculating and projecting labor expenses."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the components of labor costs",
                  "Differentiating between direct and indirect labor costs",
                  "Calculating hourly labor rates",
                  "Estimating labor hours for projects or production",
                  "Factoring in overtime, benefits, and taxes",
                  "Using labor cost estimation tools and software",
                  "Strategies for managing and optimizing labor costs"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/B0vX6y_lSkY"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a comprehensive understanding of how to estimate labor costs accurately, helping you make informed decisions about pricing, budgeting, and overall business strategy."
          }
        ]
      },
      { 
        title: "Lesson 1.11: How to Forecast Business Expenses for Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/forecast-business-expenses",
        content: [
          {
            type: "text",
            content: "Forecasting business expenses is a critical part of financial planning for your small business. This lesson will guide you through the process of predicting and managing your business costs effectively."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of expense forecasting",
                  "Identifying different types of business expenses",
                  "Methods for forecasting expenses accurately",
                  "Creating a comprehensive expense budget",
                  "Strategies for managing and reducing business expenses",
                  "Using expense forecasts in financial decision-making",
                  "Tools and software for expense tracking and forecasting"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/vV1FMhoJbsQ"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a solid understanding of how to forecast and manage your business expenses, helping you maintain financial stability and make informed decisions for your small business."
          }
        ]
      },
      { 
        title: "Lesson 1.12: How to Do Asset Planning for Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/asset-planning",
        content: [
          {
            type: "text",
            content: "Asset planning is a crucial aspect of managing your small business finances. This lesson will guide you through the process of identifying, valuing, and managing your business assets effectively."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding what constitutes a business asset",
                  "Different types of assets: current, fixed, and intangible",
                  "Importance of asset planning for small businesses",
                  "Methods for valuing business assets",
                  "Creating an asset register or inventory",
                  "Strategies for asset management and optimization",
                  "Tax implications of business assets",
                  "Asset depreciation and its impact on your finances"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/OocBZsMWr9Y"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a comprehensive understanding of how to plan for, manage, and optimize your business assets to support your company's financial health and growth."
          }
        ]
      },
      { 
        title: "Lesson 1.13: How to Do Tax Planning for Your Small Businesses", 
        url: "https://howtostartanllc.com/small-business-startup-course/tax-planning",
        content: [
          {
            type: "text",
            content: "Effective tax planning is crucial for the financial success of your small business. This lesson will guide you through the process of understanding and implementing tax strategies to minimize your tax liability and maximize your business's financial efficiency."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding different types of business taxes",
                  "Importance of tax planning for small businesses",
                  "Key tax deductions and credits for small businesses",
                  "Strategies for minimizing tax liability",
                  "Choosing the right business structure for tax purposes",
                  "Record-keeping and documentation for tax purposes",
                  "Working with tax professionals",
                  "Year-round tax planning strategies"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/KDrFIzqmwpg"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a solid understanding of tax planning principles for small businesses and be equipped with strategies to optimize your tax position while staying compliant with tax laws and regulations."
          }
        ]
      },
      { 
        title: "Lesson 1.14: Understanding Business Cash Distributions", 
        url: "https://howtostartanllc.com/small-business-startup-course/business-cash-distributions",
        content: [
          {
            type: "text",
            content: "Understanding how to manage and distribute cash in your business is crucial for financial stability and growth. This lesson will guide you through the concept of business cash distributions and how to handle them effectively."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "What are business cash distributions",
                  "Types of cash distributions: dividends, draws, and distributions",
                  "How cash distributions affect your business's financial health",
                  "Tax implications of different types of distributions",
                  "Strategies for managing cash distributions",
                  "Legal considerations for cash distributions",
                  "Best practices for documenting and tracking distributions"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/p6JVWeV-gLU"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a clear understanding of how to handle cash distributions in your business, ensuring you maintain financial stability while rewarding yourself and any partners or shareholders appropriately."
          }
        ]
      },
      { 
        title: "Lesson 1.15: Understanding Cash Flow Basics for Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/cash-flow-basics",
        content: [
          {
            type: "text",
            content: "Understanding and managing cash flow is crucial for the success and sustainability of your small business. This lesson will introduce you to the basics of cash flow and how to effectively manage it."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "What is cash flow and why it's important",
                  "The difference between cash flow and profit",
                  "Components of cash flow: operating, investing, and financing activities",
                  "Creating a cash flow statement",
                  "Strategies for improving cash flow",
                  "Common cash flow problems and how to avoid them",
                  "Using cash flow projections for business planning"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/C1EXY2WkDiI"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a solid understanding of cash flow principles and be equipped with strategies to manage and improve your small business's cash flow."
          }
        ]
      },
      { 
        title: "Lesson 1.16: How to Do Loans and Investment Projections of Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/loans-and-investment-projections",
        content: [
          {
            type: "text",
            content: "Understanding how to project loans and investments is crucial for the financial planning of your small business. This lesson will guide you through the process of creating accurate projections for both loans and investments."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of loan and investment projections",
                  "Different types of loans and investments for small businesses",
                  "How to project loan repayments and interest",
                  "Calculating return on investment (ROI) for potential investors",
                  "Creating realistic investment projections",
                  "Tools and software for loan and investment projections",
                  "Common mistakes to avoid in financial projections",
                  "Using projections to make informed financial decisions"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/VvPSE_m1Qlc"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a solid understanding of how to create accurate loan and investment projections for your small business, helping you make informed decisions about financing and growth strategies."
          }
        ]
      },
      { 
        title: "Lesson 1.17: Demo: Entering Business Financial Projections on Liveplan", 
        url: "https://howtostartanllc.com/small-business-startup-course/business-financial-projections",
        content: [
          {
            type: "text",
            content: "This lesson provides a practical demonstration of how to enter business financial projections using Liveplan, a popular business planning software. You'll learn how to input and organize your financial data effectively."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Introduction to Liveplan's financial projection tools",
                  "Setting up your business profile in Liveplan",
                  "Entering revenue projections",
                  "Inputting direct costs and expenses",
                  "Projecting personnel costs",
                  "Creating cash flow projections",
                  "Generating financial statements (Income Statement, Balance Sheet, Cash Flow Statement)",
                  "Analyzing and interpreting your financial projections"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/md6lIc5IQ6A"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have hands-on experience with entering financial projections into a professional business planning tool, which will help you create more accurate and comprehensive financial plans for your small business."
          }
        ]
      },
      { 
        title: "Lesson 1.18: How to Understand Business Financial Statements for Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/business-financial-statements",
        content: [
          {
            type: "text",
            content: "Understanding financial statements is crucial for managing your small business effectively. This lesson will guide you through the basics of reading and interpreting key financial statements."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "The three main types of financial statements: Income Statement, Balance Sheet, and Cash Flow Statement",
                  "How to read and interpret an Income Statement",
                  "Understanding the components of a Balance Sheet",
                  "Analyzing the Cash Flow Statement",
                  "Key financial ratios and what they mean for your business",
                  "How to use financial statements for decision-making",
                  "Common mistakes to avoid when interpreting financial statements"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/15Jb_rUvkjE"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a solid understanding of how to read and interpret financial statements, enabling you to make informed decisions about your small business's financial health and future."
          }
        ]
      },
      { 
        title: "Lesson 1.19: Choosing a Memorable Business Name", 
        url: "https://howtostartanllc.com/small-business-startup-course/choosing-a-business-name",
        content: [
          {
            type: "text",
            content: "Choosing the right name for your business is a crucial step in establishing your brand identity. This lesson will guide you through the process of selecting a memorable and effective business name."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of a good business name",
                  "Characteristics of effective business names",
                  "Brainstorming techniques for generating name ideas",
                  "Considering your target audience and industry",
                  "Checking for name availability and trademark conflicts",
                  "Testing your business name ideas",
                  "Common mistakes to avoid when naming your business"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/itfgL83EpfQ"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have the knowledge and tools to create a compelling and legally sound name for your small business, setting the foundation for your brand's success."
          }
        ]
      },
      { 
        title: "Lesson 1.20: What You Need to Know About DBAs", 
        url: "https://howtostartanllc.com/small-business-startup-course/dba",
        content: [
          {
            type: "text",
            content: "A DBA, or 'Doing Business As', is an important concept for small business owners to understand. This lesson will cover everything you need to know about DBAs and how they can affect your business operations."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "What is a DBA and why it's important",
                  "When you need to file for a DBA",
                  "The benefits of using a DBA",
                  "How to file for a DBA",
                  "Legal considerations when using a DBA",
                  "DBA vs. LLC: Understanding the differences",
                  "Common mistakes to avoid when using a DBA"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/1n8DGPOH2yo"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a comprehensive understanding of DBAs and be able to determine if filing for one is the right choice for your small business."
          }
        ]
      },
      { 
        title: "Lesson 1.21: 5 Things to Consider When Choosing Your Business Domain", 
        url: "https://howtostartanllc.com/small-business-startup-course/choosing-a-domain-name",
        content: [
          {
            type: "text",
            content: "Choosing the right domain name for your business is crucial for your online presence. This lesson will guide you through the key considerations when selecting a domain name."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of a good domain name",
                  "Keeping your domain name short and memorable",
                  "Using keywords relevant to your business",
                  "Choosing the right domain extension (.com, .net, .org, etc.)",
                  "Avoiding trademark infringement and legal issues",
                  "Considering the long-term implications of your domain choice"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/-H4hbHUZS9k"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll be equipped with the knowledge to choose a domain name that aligns with your business goals and enhances your online brand identity."
          }
        ]
      },
      { 
        title: "Lesson 1.22: How to Brainstorm Domain Names", 
        url: "https://howtostartanllc.com/small-business-startup-course/brainstorm-domain-name",
        content: [
          {
            type: "text",
            content: "Brainstorming domain names is a crucial step in establishing your online presence. This lesson will guide you through effective techniques to generate creative and relevant domain name ideas for your business."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of a good domain name",
                  "Techniques for brainstorming domain names",
                  "Using keyword research for domain name ideas",
                  "Leveraging domain name generators and tools",
                  "Considering different domain extensions",
                  "Avoiding common domain name mistakes",
                  "Checking domain name availability and alternatives"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/b1xtCQpDuKk"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a variety of techniques and tools at your disposal to brainstorm and select the perfect domain name for your small business website."
          }
        ]
      },
      { 
        title: "Lesson 1.23: Introduction to Domains, Hosting, and Ecommerce", 
        url: "https://howtostartanllc.com/small-business-startup-course/domains-hosting-ecommerce",
        content: [
          {
            type: "text",
            content: "Understanding domains, hosting, and ecommerce is crucial for establishing your small business's online presence. This lesson provides an introduction to these key concepts and how they work together."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "What is a domain name and how does it work",
                  "Understanding web hosting and its importance",
                  "Different types of web hosting services",
                  "Introduction to ecommerce platforms",
                  "Choosing the right domain, hosting, and ecommerce solution for your business",
                  "Security considerations for your online presence",
                  "Best practices for managing your website and online store"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/dU5X_kjJAko"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a solid understanding of domains, hosting, and ecommerce, enabling you to make informed decisions about your small business's online presence."
          }
        ]
      },
      { 
        title: "Lesson 1.24: How to Set Up Your Domain and Email with GoDaddy and Google Workspace", 
        url: "https://howtostartanllc.com/small-business-startup-course/set-up-your-domain-and-email",
        content: [
          {
            type: "text",
            content: "Setting up your domain and professional email is a crucial step in establishing your business's online presence. This lesson will guide you through the process of setting up your domain with GoDaddy and configuring your email with Google Workspace."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Purchasing a domain name from GoDaddy",
                  "Configuring DNS settings for your domain",
                  "Setting up Google Workspace (formerly G Suite) for your business",
                  "Creating professional email addresses with your domain",
                  "Configuring email clients and mobile devices",
                  "Best practices for managing your domain and email accounts",
                  "Troubleshooting common issues during setup"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/RwUg-rORfas"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have a professional domain name and email setup, enhancing your business's credibility and communication capabilities."
          }
        ]
      },
      { 
        title: "Lesson 1.25: How to Put Together a Professional Business Plan for Your Small Business", 
        url: "https://howtostartanllc.com/small-business-startup-course/professional-business-plan",
        content: [
          {
            type: "text",
            content: "A well-crafted business plan is essential for the success of your small business. This lesson will guide you through the process of creating a professional and comprehensive business plan."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the importance of a business plan",
                  "Key components of a professional business plan",
                  "Writing an executive summary",
                  "Describing your business and its structure",
                  "Conducting and presenting market analysis",
                  "Outlining your products or services",
                  "Developing marketing and sales strategies",
                  "Creating financial projections",
                  "Tips for formatting and presenting your business plan"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/3-ZbCE75CSY"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll have the knowledge and tools to create a professional business plan that can help you secure funding, guide your business operations, and set your small business up for success."
          }
        ]
      },
    ],
    downloads: [
      { title: "Mission Statement Worksheet", url: "https://howtostartanllc.com/mission-statement-worksheet" },
      { title: "Small Business Research & Planning Worksheet", url: "https://howtostartanllc.com/small-business-research-and-planning" },
      { title: "Competitive Analysis Matrix", url: "https://howtostartanllc.com/competitive-analysis-matrix" },
    ]
  },
  {
    title: "Chapter 2: Business Formation",
    lessons: [
      {
        title: "Intro: Introduction to Business Formation",
        url: "https://howtostartanllc.com/small-business-startup-course/business-formation",
        content: [
          {
            type: "text",
            content: "This lesson covers the essential steps for forming a business entity, including discussing partnerships, hiring professionals, and creating legal documents such as Articles of Organization."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Discussing partnerships and ownership",
                  "Hiring accountants and lawyers",
                  "Creating Articles of Organization",
                  "Filing legal documents",
                  "Opening a business bank account"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know how to legally establish your business and open a business bank account."
          }
        ]
      }
      ,
      {
        title: "Lesson 2.01: How to Form Effective Business Partnership Agreements",
        url: "https://howtostartanllc.com/small-business-startup-course/partnership-agreements",
        content: [
          {
            type: "text",
            content: "This lesson covers the importance of establishing a clear partnership agreement, discussing ownership percentages, roles, and responsibilities for each partner."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Negotiating ownership percentages",
                  "Assigning roles and responsibilities",
                  "Handling partnership termination",
                  "Valuing contributions beyond financial investments"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end, you'll understand how to navigate partnership agreements, ensuring fairness and clarity in business ownership."
          }
        ]
      },
      {
        title: "Lesson 2.02: How to Choose the Right Business Structure",
        url: "https://howtostartanllc.com/small-business-startup-course/business-structure",
        content: [
          {
            type: "text",
            content: "This lesson explains the importance of selecting the right business structure, such as sole proprietorship, partnership, LLC, or corporation, and the implications for asset protection, taxes, and legal standing."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Informal vs formal business structures",
                  "Sole proprietorships and partnerships",
                  "LLCs and corporations",
                  "Tax classifications and implications"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll be able to choose the right business structure for your needs, balancing complexity and asset protection."
          }
        ]
      },
      {
        title: "Lesson 2.03: The Essential Guide to Understanding Registered Agents",
        url: "https://howtostartanllc.com/small-business-startup-course/registered-agent",
        content: [
          {
            type: "text",
            content: "This lesson explains the role of a registered agent, who handles legal documents on behalf of a business. It discusses whether you should hire a professional service or act as your own registered agent."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Responsibilities of a registered agent",
                  "Hiring a professional vs. acting as your own",
                  "Privacy and availability considerations",
                  "Costs of registered agent services"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end, you'll know the importance of a registered agent and decide whether to hire a service or take on the role yourself."
          }
        ]
      },
      {
        title: "Lesson 2.04: Legal Documents You Need to Officially File Your Business",
        url: "https://howtostartanllc.com/small-business-startup-course/file-your-business",
        content: [
          {
            type: "text",
            content: "This lesson explains the essential legal documents required to officially file your business, including Articles of Organization and operating agreements, to ensure asset protection and legal standing."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Articles of Organization vs. Articles of Incorporation",
                  "The importance of operating agreements",
                  "Benefits of formal business documentation"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll understand how to file the necessary documents to legitimize your business and protect personal assets."
          }
        ]
      },
      {
        title: "Lesson 2.05: Forming an LLC: A Comprehensive Step-by-Step Guide",
        url: "https://howtostartanllc.com/small-business-startup-course/forming-an-llc",
        content: [
          {
            type: "text",
            content: "This lesson explains the step-by-step process of forming an LLC, including choosing your state, naming your business, nominating a registered agent, filing the Articles of Organization, drafting an operating agreement, and obtaining an EIN."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Choosing a state",
                  "Finalizing business name",
                  "Designating a registered agent",
                  "Filing LLC formation documents",
                  "Creating an operating agreement",
                  "Getting an EIN"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll be able to form an LLC and legally protect your business."
          }
        ]
      },
      {
        title: "Lesson 2.06: A Comprehensive Guide to Forming a Corporation",
        url: "https://howtostartanllc.com/small-business-startup-course/form-a-corporation",
        content: [
          {
            type: "text",
            content: "This lesson guides you through the steps to form a corporation, including choosing a business name, appointing a registered agent, holding an organizational meeting, filing incorporation documents, and obtaining an EIN."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Selecting a corporate name",
                  "Appointing a registered agent",
                  "Holding an organizational meeting",
                  "Filing state-required incorporation documents",
                  "Getting an EIN"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you will be able to form a corporation and meet state legal requirements."
          }
        ]
      },
      {
        title: "Lesson 2.07: Obtaining an Employer Identification Number (EIN)",
        url: "https://howtostartanllc.com/small-business-startup-course/get-an-ein",
        content: [
          {
            type: "text",
            content: "This lesson covers the importance of an EIN, how to apply for it through the IRS, and why it is necessary for businesses, even those without employees. It also outlines the application process and benefits like obtaining a business bank account and building credit."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Understanding the EIN",
                  "Application process on the IRS website",
                  "EIN benefits for business accounts and credit"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know how to obtain an EIN and why it's vital for your business's legal and financial standing."
          }
        ]
      },
    ]
  },
  {
    title: "Chapter 3: Back Office Setup",
    lessons: [
      {
        title: "Lesson 3.01: Opening a Business Bank Account",
        url: "https://howtostartanllc.com/small-business-startup-course/business-bank-account",
        content: [
          {
            type: "text",
            content: "This lesson explains the importance of a business bank account for separating personal and business assets. It covers researching banks, gathering documents, applying, and making an initial deposit."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Researching the right bank",
                  "Necessary documents",
                  "Application process",
                  "Initial deposit"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know how to open a business bank account and the steps involved."
          }
        ]
      },
      {
        title: "Lesson 3.02: How to Pick a Business Credit Card",
        url: "https://howtostartanllc.com/small-business-startup-course/business-credit-card",
        content: [
          {
            type: "text",
            content: "This lesson explains how to choose a business credit card, considering factors like credit limits, repayment terms, and benefits. It covers the importance of building business credit and keeping personal and business finances separate."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Credit limits and repayment terms",
                  "Building business credit",
                  "Choosing a card based on rewards and benefits"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll understand how to pick the right business credit card for your needs."
          }
        ]
      },
      {
        title: "Lesson 3.03: Business Insurance for Your Small Business",
        url: "https://howtostartanllc.com/small-business-startup-course/business-insurance",
        content: [
          {
            type: "text",
            content: "This lesson covers various types of business insurance, including general liability, workers' compensation, and professional liability insurance. It also explains how these policies protect your business from financial risk due to accidents, lawsuits, and other liabilities."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "General liability insurance",
                  "Workers' compensation",
                  "Professional liability",
                  "Specialized policies for businesses"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll understand the different types of insurance and how they protect your business from potential liabilities."
          }
        ]
      },
      {
        title: "Lesson 3.04: Getting a Business Phone Number",
        url: "https://howtostartanllc.com/small-business-startup-course/business-phone-number",
        content: [
          {
            type: "text",
            content: "This lesson explains how to get a business phone number, highlighting its benefits for credibility, privacy, and professionalism. It covers the different types of phone numbers available, such as local, toll-free, vanity, and VoIP, and their key features."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Types of business phone numbers",
                  "Multi-device access",
                  "Call management features",
                  "Virtual business number benefits"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll understand how to set up a business phone number to enhance your brand's credibility."
          }
        ]
      },
      {
        title: "Lesson 3.05: Guide to Business Bookkeeping",
        url: "https://howtostartanllc.com/small-business-startup-course/accounting-and-bookkeeping",
        content: [
          {
            type: "text",
            content: "This lesson covers essential bookkeeping and accounting concepts for small business owners. It explains bookkeeping methods, setting up accounts, and recording transactions. It also highlights common bookkeeping mistakes and the difference between bookkeeping and accounting."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Choosing a bookkeeping method",
                  "Setting up a chart of accounts",
                  "Recording transactions",
                  "Common bookkeeping mistakes"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll understand bookkeeping fundamentals and how they contribute to business success."
          }
        ]
      },
      {
        title: "Lesson 3.06: How to set Up QuickBooks for your Small Business",
        url: "https://howtostartanllc.com/small-business-startup-course/quickbooks-accounting-setup",
        content: [
          {
            type: "text",
            content: "This lesson provides an overview of QuickBooks Online, guiding small business owners through selecting the right plan, initial setup, connecting bank accounts, and managing finances. It emphasizes the importance of involving an accountant for optimal setup and monthly tasks."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Choosing a QuickBooks plan",
                  "Dashboard overview and setup",
                  "Connecting accounts",
                  "Monthly bookkeeping tasks"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you’ll understand how to use QuickBooks for your small business bookkeeping."
          }
        ]
      },
      {
        title: "Lesson 3.07: How to Pay Yourself as a Small Business Owner",
        url: "https://howtostartanllc.com/small-business-startup-course/how-to-pay-yourself",
        content: [
          {
            type: "text",
            content: "This lesson explains how to pay yourself based on your business structure, covering draws, distributions, and salaries. It also outlines the steps for determining how much to pay yourself and the methods to use, including setting up a payroll system."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Business entity types",
                  "Owner’s draws vs. distributions vs. salaries",
                  "How much to pay yourself",
                  "Payment methods and consistency"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know how to pay yourself legally and responsibly as a small business owner."
          }
        ]
      },
      {
        title: "Lesson 3.08: Hiring for Your Small Business",
        url: "https://howtostartanllc.com/small-business-startup-course/hiring",
        content: [
          {
            type: "text",
            content: "This lesson walks through the process of hiring for a small business, including planning, types of employees, finding candidates, and legal considerations. It also covers the steps for interviewing, onboarding, and setting up payroll while ensuring compliance with federal and state laws."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Hiring needs and budgeting",
                  "Types of employees (1099 vs W-2)",
                  "Interviewing best practices",
                  "Legal considerations"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll understand how to hire and manage employees legally and efficiently."
          }
        ]
      },
      {
        title: "Lesson 3.09: Sources of Funding for your Business",
        url: "https://howtostartanllc.com/small-business-startup-course/business-funding",
        content: [
          {
            type: "text",
            content: "This lesson covers various business funding options such as self-funding, small business loans, crowdfunding, grants, and angel or venture capital investments. It explains the pros and cons of each method and guides how to choose the best funding source for your business."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Self-funding",
                  "Small business loans",
                  "Crowdfunding",
                  "Business grants",
                  "Angel and venture capital"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know the best funding options for your small business."
          }
        ]
      },
    ],
    downloads: [
      { title: "Quickbooks Logo Template", url: "https://howtostartanllc.com/quickbooks-logo-template" },
    ]
  },
  {
    title: "Chapter 4: Branding",
    lessons: [
      {
        title: "Intro: Introduction to Branding",
        url: "https://howtostartanllc.com/small-business-startup-course/intro-to-branding",
        content: [
          {
            type: "text",
            content: "This lesson introduces the concept of branding, emphasizing that a brand is more than just a logo or name. It guides businesses in creating a cohesive brand identity that leaves a memorable impression, distinguishes them from competitors, and establishes a uniform experience for customers."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Defining brand identity",
                  "The impact of a brand on customers",
                  "Brand cohesion and consistency"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you’ll understand the basics of branding and its importance for your business."
          }
        ]
      },
      {
        title: "Lesson 4.01: Defining Your Business's Brand Identity and Personality",
        url: "https://howtostartanllc.com/small-business-startup-course/brand-identity",
        content: [
          {
            type: "text",
            content: "This lesson covers the importance of defining your business's brand identity and personality. It focuses on selecting key adjectives that represent your brand, how customers should feel when interacting with your business, and the significance of brand consistency."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Choosing brand adjectives",
                  "Establishing brand identity",
                  "Creating a cohesive brand personality"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know how to define and implement your brand's personality effectively."
          }
        ]
      },
      {
        title: "Lesson 4.02: Selecting Brand Adjectives for Your Small Business",
        url: "https://howtostartanllc.com/small-business-startup-course/brand-adjectives",
        content: [
          {
            type: "text",
            content: "This lesson helps small businesses choose adjectives to shape their brand identity. It explains the significance of selecting the right descriptors and how to balance brand traits to match customer perceptions and business values."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Choosing brand adjectives",
                  "Creating a brand personality spectrum",
                  "Balancing brand traits"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know how to select adjectives that reflect your brand effectively."
          }
        ]
      },
      {
        title: "Lesson 4.03: Understanding StoryBrand",
        url: "https://howtostartanllc.com/small-business-startup-course/storybrand",
        content: [
          {
            type: "text",
            content: "This lesson introduces the StoryBrand framework, explaining how to clarify your brand message by positioning your customer as the hero and your business as their guide. It focuses on creating a simple, compelling narrative that resonates with customers."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Overview of the StoryBrand framework",
                  "Positioning the customer as the hero",
                  "Creating a clear brand message"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll be able to craft a customer-centric brand story."
          }
        ]
      },
      {
        title: "Lesson 4.04: Applying StoryBrand for Your Small Business",
        url: "https://howtostartanllc.com/small-business-startup-course/apply-storybrand",
        content: [
          {
            type: "text",
            content: "This lesson explains how to apply the StoryBrand framework to your business, ensuring that your brand message resonates with customers by positioning them as the hero in your narrative. It covers the practical steps to implement StoryBrand concepts in marketing and communication."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "StoryBrand application strategies",
                  "Customer-focused messaging",
                  "Building clear marketing narratives"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll be able to create a compelling brand story using the StoryBrand framework."
          }
        ]
      },
      {
        title: "Lesson 4.05: Understanding What Fonts Convey",
        url: "https://howtostartanllc.com/small-business-startup-course/understanding-brand-fonts",
        content: [
          {
            type: "text",
            content: "This lesson explores how fonts impact a brand's identity, explaining how font types like serif, sans-serif, script, and decorative communicate different traits such as trustworthiness, modernity, and creativity. It provides guidelines for selecting fonts that align with brand personality."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Font psychology",
                  "Choosing the right font style",
                  "Pairing fonts effectively"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you’ll understand how to select fonts that convey the right message for your brand."
          }
        ]
      },
      {
        title: "Lesson 4.06: Selecting Brand Fonts for Your Small Business",
        url: "https://howtostartanllc.com/small-business-startup-course/selecting-brand-fonts",
        content: [
          {
            type: "text",
            content: "This lesson provides guidance on selecting fonts that reflect your brand's personality. It emphasizes the importance of font consistency across all branding materials to maintain a cohesive identity."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Choosing primary and secondary fonts",
                  "Font pairings for different contexts",
                  "Creating a font hierarchy"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll be able to choose the right fonts to enhance your brand identity."
          }
        ]
      },
      {
        title: "Lesson 4.07: What is the Significance of Brand Colors?",
        url: "https://howtostartanllc.com/small-business-startup-course/brand-color-theory",
        content: [
          {
            type: "text",
            content: "This lesson explains the psychological impact of colors on brand perception and how different colors evoke specific emotions. It guides businesses in choosing colors that align with their brand values and appeal to their target audience."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Color psychology",
                  "Selecting brand colors",
                  "Creating a cohesive color palette"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll understand how to use color effectively in your branding."
          }
        ]
      },
      {
        title: "Lesson 4.08 How to Generate a Color Palette for Your Small Business",
        url: "https://howtostartanllc.com/small-business-startup-course/select-a-color-palette",
        content: [
          {
            type: "text",
            content: "This lesson provides a step-by-step guide to creating a brand color palette. It discusses how to choose primary, secondary, and accent colors that reflect your brand’s personality and appeal to your target audience."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Color selection tips",
                  "Creating a color hierarchy",
                  "Ensuring color consistency"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know how to build a cohesive and impactful color palette."
          }
        ]
      },
      {
        title: "Lesson 4.09: Basics of Logo Design",
        url: "https://howtostartanllc.com/small-business-startup-course/basics-of-logo-design",
        content: [
          {
            type: "text",
            content: "This lesson covers the basics of creating a memorable logo, including simplicity, versatility, and relevance. It explains how a well-designed logo should align with your brand identity and appeal to your target audience."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Logo design principles",
                  "Choosing logo elements",
                  "Ensuring versatility across media"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you will understand the fundamentals of creating an effective logo."
          }
        ]
      },
      {
        title: "Lesson 4.10: Getting a Professional Logo for Your Business",
        url: "https://howtostartanllc.com/small-business-startup-course/getting-a-professional-logo",
        content: [
          {
            type: "text",
            content: "This lesson discusses how to get a professional logo for your business, either by hiring a designer or using online tools. It covers the importance of a high-quality logo that aligns with your brand identity and resonates with your target audience."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Hiring a designer vs DIY logo creation",
                  "What to include in a professional logo",
                  "Online logo tools"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know how to create or commission a professional logo."
          }
        ]
      },
      {
        title: "Lesson 4.11: Branding Your Small Business Through Images",
        url: "https://howtostartanllc.com/small-business-startup-course/branding-through-images",
        content: [
          {
            type: "text",
            content: "This lesson explains how to effectively use images to reinforce your brand. It covers sourcing product and lifestyle images, ensuring they align with your brand identity, and creating a consistent visual experience for customers across platforms."
          },
          {
            type: "flex",
            items: [
              {
                type: "list",
                title: "Key Topics Covered:",
                items: [
                  "Sourcing brand images",
                  "Ensuring visual consistency",
                  "Creating a cohesive brand aesthetic"
                ]
              },
              {
                type: "video",
                url: "https://www.youtube.com/embed/8VyWR6-s6X4"
              }
            ]
          },
          {
            type: "text",
            content: "By the end of this lesson, you'll know how to use images effectively to build your brand."
          }
        ]
      },  
    ],
    downloads: [
      { title: "Brand Personality Spectrum", url: "https://howtostartanllc.com/brand-personality-spectrum" },
      { title: "Brand Story Template", url: "https://howtostartanllc.com/small-business-storybrand-template" },
      { title: "Brand Font Selection", url: "https://howtostartanllc.com/branding-font-selection" },
      { title: "Brand Color Theory", url: "https://howtostartanllc.com/brand-color-theory" },
      { title: "Logo Design Email Template", url: "https://docs.google.com/document/d/1AXC70NoLQqJDsWEtLI0fhjsKxMbffJohuj7YSzz3Q1s/edit?usp=sharing" },
    ]
  },
  {
    title: "Chapter 5: Building a Website (Coming Soon)",
    lessons: []
  },
  {
    title: "Chapter 6: Lead Generation & Conversion (Coming Soon)",
    lessons: []
  },
  {
    title: "Chapter 7: Social Media (Coming Soon)",
    lessons: []
  },
  {
    title: "Chapter 8: Paid Advertising (Coming Soon)",
    lessons: []
  }
];
