(() => {
  const lanes = {
  "all": {
    "label": "Everything",
    "color": "#102a34"
  },
  "work": {
    "label": "Work",
    "color": "#a43a42"
  },
  "education": {
    "label": "Education",
    "color": "#476d78"
  },
  "clinical": {
    "label": "Clinical",
    "color": "#2f6b5f"
  },
  "credentials": {
    "label": "Credentials",
    "color": "#8a5a24"
  },
  "business": {
    "label": "Business",
    "color": "#66538d"
  },
  "projects": {
    "label": "Projects",
    "color": "#28728a"
  },
  "leadership": {
    "label": "Leadership",
    "color": "#9b4a64"
  },
  "recognition": {
    "label": "Recognition",
    "color": "#9a6a17"
  },
  "culture": {
    "label": "Culture",
    "color": "#42705b"
  },
  "competition": {
    "label": "Competition",
    "color": "#7b475c"
  }
};
  const events = [
  {
    "year": 2011,
    "lane": "competition",
    "title": "StarCraft II — Gold",
    "org": "Ranked ladder",
    "type": "Competitive gaming",
    "date": "Season 1 · 2011",
    "body": "Reached Gold for the first time during StarCraft II’s first ranked season.",
    "details": [
      "This was the first step in a rank progression that eventually reached Masters."
    ],
    "skills": [
      "Strategy",
      "Adaptation",
      "Competitive Progression"
    ]
  },
  {
    "year": 2012,
    "lane": "education",
    "title": "Graduated high school",
    "org": "Class of 2012",
    "type": "Education",
    "date": "2012",
    "body": "Graduated high school in 2012, before the college and work chapters that follow.",
    "details": [],
    "skills": [
      "Academic Foundation",
      "Transition"
    ]
  },
  {
    "year": 2012,
    "lane": "work",
    "title": "Sales Representative",
    "org": "Vector Marketing",
    "type": "Early Sales",
    "date": "2012",
    "body": "Sold Cutco through one-on-one demonstrations and learned how to start conversations, answer objections, and follow up.",
    "details": [
      "Marketed Cutco products through personalized demonstrations.",
      "Got more comfortable presenting and talking with potential customers.",
      "Developed presentation and negotiation fundamentals."
    ],
    "skills": [
      "Presentation",
      "Prospecting",
      "Direct Sales"
    ]
  },
  {
    "year": 2013,
    "lane": "competition",
    "title": "StarCraft II — Platinum",
    "org": "Heart of the Swarm ranked ladder",
    "type": "Competitive gaming",
    "date": "Season 4 · 2013",
    "body": "Reached Platinum in Heart of the Swarm during the fourth ranked season of 2013.",
    "details": [
      "Continued moving up the ladder after first reaching Gold in 2011."
    ],
    "skills": [
      "Game Sense",
      "Practice",
      "Adaptation"
    ]
  },
  {
    "year": 2014,
    "lane": "competition",
    "title": "StarCraft II — Diamond",
    "org": "Heart of the Swarm ranked ladder",
    "type": "Competitive gaming",
    "date": "Season 2 · 2014",
    "body": "Reached Diamond in the second ranked season of 2014.",
    "details": [
      "The next step after reaching Platinum in 2013."
    ],
    "skills": [
      "Decision-Making",
      "Pattern Recognition",
      "Consistency"
    ]
  },
  {
    "year": 2014,
    "lane": "competition",
    "title": "Pokémon VGC tournament semifinalist",
    "org": "Fanime",
    "type": "Competition",
    "date": "2014",
    "body": "Reached the semifinals in a Pokémon Video Game Championship tournament at Fanime.",
    "details": [
      "A small but real part of the archive: strategy, preparation, adapting under pressure, and enjoying a complicated system."
    ],
    "skills": [
      "Strategy",
      "Adaptation",
      "Competition"
    ]
  },
  {
    "year": 2015,
    "lane": "competition",
    "title": "Naruto Ultimate Ninja Storm 4 tournament semifinalist",
    "org": "PlayStation Experience 2015",
    "type": "Competition",
    "date": "December 2015",
    "body": "Reached the semifinals in the Naruto Ultimate Ninja Storm 4 tournament at PlayStation Experience in San Francisco.",
    "details": [
      "PlayStation officially called the event PlayStation Experience, often shortened to PSX."
    ],
    "skills": [
      "Competition",
      "Composure",
      "Adaptation"
    ]
  },
  {
    "year": 2015,
    "lane": "recognition",
    "title": "Honors research presentation",
    "org": "Stanford University",
    "type": "Academic presentation",
    "date": "May 2015",
    "body": "Presented honors research at Stanford University through the Los Medanos College honors program.",
    "details": [
      "I kept this certificate on the site because it is part of the story."
    ],
    "skills": [
      "Research",
      "Public Speaking",
      "Academic Writing"
    ],
    "proof": "assets/stanford-honors-certificate.webp",
    "proofAlt": "Certificate documenting John Villanueva’s honors research presentation at Stanford University"
  },
  {
    "year": 2015,
    "lane": "leadership",
    "title": "Honors and student-organization leadership",
    "org": "Los Medanos College",
    "type": "Campus involvement",
    "date": "2012–2015",
    "body": "Served as Honors Club historian and Anime Club secretary, helped host a Chinese New Year event, and stayed involved beyond coursework.",
    "details": [
      "These roles belong in the archive even though they are not résumé headline material."
    ],
    "skills": [
      "Organization",
      "Community",
      "Event Support"
    ]
  },
  {
    "year": 2015,
    "lane": "recognition",
    "title": "Academic competition placement",
    "org": "Los Medanos College",
    "type": "Recognition",
    "date": "2015",
    "body": "Placed fifth in an academic competition during the Los Medanos honors years.",
    "details": [],
    "skills": [
      "Academic Competition",
      "Preparation"
    ]
  },
  {
    "year": 2015,
    "lane": "education",
    "title": "Associate of Liberal Arts",
    "org": "Los Medanos College",
    "type": "Degree",
    "date": "2015",
    "body": "Completed concentrations in Math & Science, Behavioral Science, and Arts & Humanities with Honors Scholar recognition.",
    "details": [
      "Completed interdisciplinary study across science, behavioral science, and the humanities.",
      "Honors Scholar Award at the highest level of academic distinction.",
      "Built a broad base for later business and nursing education."
    ],
    "skills": [
      "Academic Foundation",
      "Interdisciplinary Thinking",
      "Communication"
    ]
  },
  {
    "year": 2015,
    "lane": "recognition",
    "title": "Honors Scholar Award",
    "org": "Los Medanos College",
    "type": "Award",
    "date": "2015",
    "body": "Received highest-level academic distinction at Los Medanos College.",
    "details": [
      "Recognized for academic achievement."
    ],
    "skills": [
      "Academic Recognition",
      "Discipline",
      "Scholarship"
    ]
  },
  {
    "year": 2015,
    "lane": "recognition",
    "title": "Intramural Speech Competition",
    "org": "Los Medanos College",
    "type": "Award",
    "date": "2015",
    "body": "Won 1st place in an intramural speech competition.",
    "details": [
      "Demonstrated early communication and presentation strength."
    ],
    "skills": [
      "Public Speaking",
      "Presentation",
      "Confidence"
    ]
  },
  {
    "year": 2015,
    "lane": "work",
    "title": "Dishwasher",
    "org": "Bob Sang Korean BBQ",
    "type": "Restaurant",
    "date": "2015–2016",
    "body": "Back-of-house restaurant role building speed, humility, cleanliness, and team reliability.",
    "details": [
      "Maintained restaurant cleanliness and efficiency.",
      "Supported the dining experience from behind the scenes.",
      "Built respect for operational work and team dependency."
    ],
    "skills": [
      "Grit",
      "Sanitation",
      "Team Support"
    ]
  },
  {
    "year": 2016,
    "lane": "clinical",
    "title": "Personal Care Assistant",
    "org": "Kindred at Home",
    "type": "Healthcare",
    "date": "2016",
    "body": "Early exposure to patient care standards, documentation, CPR/TB requirements, and home-care professionalism.",
    "details": [
      "Completed orientation on care standards and company procedures.",
      "Learned documentation and healthcare compliance basics.",
      "Built early exposure to professional care environments."
    ],
    "skills": [
      "Care Standards",
      "Compliance",
      "Patient Support"
    ]
  },
  {
    "year": 2016,
    "lane": "work",
    "title": "Retail Associate",
    "org": "Party City",
    "type": "Seasonal Retail",
    "date": "2016",
    "body": "High-demand Halloween retail role focused on customer service, fast adaptation, and seasonal operations.",
    "details": [
      "Supported customers during seasonal demand.",
      "Learned fast retail operations and customer flow.",
      "Built flexibility in short-term, high-volume work."
    ],
    "skills": [
      "Service Recovery",
      "Adaptability",
      "High-Volume Retail"
    ]
  },
  {
    "year": 2018,
    "lane": "recognition",
    "title": "Honors Consortium presentation",
    "org": "University of California, Berkeley",
    "type": "Academic presentation",
    "date": "April 2018",
    "body": "Presented honors work at the UC Berkeley Honors Research Symposium.",
    "details": [
      "A second public academic-research receipt, following the Stanford presentation in 2015."
    ],
    "skills": [
      "Research",
      "Presentation",
      "Communication"
    ],
    "proof": "assets/berkeley-honors-certificate.webp",
    "proofAlt": "Certificate documenting John Villanueva’s honors presentation at the University of California, Berkeley"
  },
  {
    "year": 2018,
    "lane": "work",
    "title": "TargetTech Specialist",
    "org": "MarketSource / Target",
    "type": "Tech Sales",
    "date": "2018",
    "body": "Electronics and cellular sales consultation role matching customer needs to practical technology choices.",
    "details": [
      "Provided electronics and phone sales consultations.",
      "Translated product details into customer-friendly recommendations.",
      "Learned to explain technology without burying customers in jargon."
    ],
    "skills": [
      "Tech Sales",
      "Needs Discovery",
      "Product Knowledge"
    ]
  },
  {
    "year": 2018,
    "lane": "leadership",
    "title": "Customer Service Supervisor III",
    "org": "Fry’s Electronics",
    "type": "Leadership",
    "date": "2018–2019",
    "body": "Promoted into supervision quickly, managing customer flow, team support, paperwork, and Black Friday pressure.",
    "details": [
      "Promoted to supervisor within three weeks.",
      "Acted as lead supervisor during high-traffic situations such as Black Friday.",
      "Managed customer relations, funds, paperwork, and team coordination."
    ],
    "skills": [
      "Leadership",
      "Customer Operations",
      "Pressure Management"
    ]
  },
  {
    "year": 2019,
    "lane": "work",
    "title": "Sales Associate",
    "org": "Bay Area Premiere Marketing",
    "type": "Sales",
    "date": "2019",
    "body": "Worked in a customer-facing sales role during a year that also included insurance, retail leadership, and restaurant work.",
    "details": [
      "Part of a deliberately complete work-history archive rather than a curated résumé selection."
    ],
    "skills": [
      "Sales",
      "Customer Service",
      "Adaptability"
    ]
  },
  {
    "year": 2019,
    "lane": "credentials",
    "title": "10 Facebook Marketing Strategies That Make Me 6-Figures",
    "org": "Udemy",
    "type": "Certificate",
    "date": "2019",
    "body": "Completed a Facebook marketing course dated February 20, 2019.",
    "details": [
      "Instructor: Nik Swami.",
      "Certificate image shows date: February 20, 2019.",
      "Length shown: 3 total hours."
    ],
    "skills": [
      "Facebook Marketing",
      "Social Ads",
      "Digital Marketing"
    ]
  },
  {
    "year": 2019,
    "lane": "credentials",
    "title": "10 Instagram Marketing Strategies That Make Me 6-Figures",
    "org": "Udemy",
    "type": "Certificate",
    "date": "2019",
    "body": "Completed an Instagram marketing strategy course dated February 25, 2019.",
    "details": [
      "Instructor: Nik Swami.",
      "Certificate image shows date: February 25, 2019.",
      "Length shown: 2.5 total hours."
    ],
    "skills": [
      "Instagram Marketing",
      "Social Media",
      "Digital Marketing"
    ]
  },
  {
    "year": 2019,
    "lane": "business",
    "title": "Life Insurance Agent",
    "org": "Primerica Financial Services",
    "type": "Insurance",
    "date": "2019",
    "body": "Insurance and financial guidance role focused on term life policies, client education, networking, and sales discipline.",
    "details": [
      "Educated clients on policy options and financial protection.",
      "Built early financial sales experience.",
      "Learned to ask what people needed before talking about a product."
    ],
    "skills": [
      "Insurance",
      "Financial Guidance",
      "Networking"
    ]
  },
  {
    "year": 2019,
    "lane": "leadership",
    "title": "Assistant Store Manager",
    "org": "Spirit Halloween",
    "type": "Retail Leadership",
    "date": "2019",
    "body": "Seasonal management experience supporting store operations, merchandising, inventory, layout, and team coordination.",
    "details": [
      "Supported daily store operations and seasonal setup/teardown.",
      "Assisted with staff, inventory, and merchandising.",
      "Built hands-on leadership in a seasonal retail environment."
    ],
    "skills": [
      "Store Operations",
      "Merchandising",
      "Team Coordination"
    ]
  },
  {
    "year": 2019,
    "lane": "work",
    "title": "Cashier / Environmental Support",
    "org": "Gott’s Roadside",
    "type": "Restaurant",
    "date": "2019–2020",
    "body": "Restaurant cashier and service support role with Toast POS, food handling, sanitation, and guest support.",
    "details": [
      "Provided cashier and environmental support.",
      "Built competence with Toast POS and food handling standards.",
      "Supported staff, guests, and clean service environments."
    ],
    "skills": [
      "POS",
      "Food Handling",
      "Guest Service"
    ]
  },
  {
    "year": 2020,
    "lane": "business",
    "title": "Marketing Intern",
    "org": "Brightsity",
    "type": "Marketing",
    "date": "2020",
    "body": "Supported growth and organization for an online education platform, developing digital marketing and teamwork habits.",
    "details": [
      "Assisted with an online education platform.",
      "Gained experience with marketing teamwork and organizational support.",
      "Connected education, content, and digital growth."
    ],
    "skills": [
      "Digital Marketing",
      "Teamwork",
      "Education Platform"
    ]
  },
  {
    "year": 2021,
    "lane": "culture",
    "title": "Japanese Teacher Assistant & Tutor",
    "org": "CSU East Bay",
    "type": "Education",
    "date": "2021–2022",
    "body": "Tutored Elementary Japanese students, graded homework, and provided practice sessions for language learners.",
    "details": [
      "Tutored Elementary Japanese I and II students.",
      "Graded homework and supported practice sessions.",
      "Built teaching, patience, and explanation skills."
    ],
    "skills": [
      "Teaching",
      "Japanese",
      "Feedback"
    ]
  },
  {
    "year": 2021,
    "lane": "culture",
    "title": "Global Academy Speaking Volunteer",
    "org": "CSU East Bay",
    "type": "Volunteer",
    "date": "2021–2022",
    "body": "Supported language and cultural exchange with Japanese university students and American university students.",
    "details": [
      "Supported Japanese university students in conversation practice.",
      "Built confidence communicating across cultures.",
      "Connected language learning with service and international exchange."
    ],
    "skills": [
      "Cross-Cultural Communication",
      "Language Exchange",
      "Global Mindset"
    ]
  },
  {
    "year": 2021,
    "lane": "leadership",
    "title": "Marketing Director",
    "org": "COPMORE Partners",
    "type": "Marketing Leadership",
    "date": "2021",
    "body": "Built branding and marketing strategy for a startup consulting firm focused on value and underrepresented entrepreneurs.",
    "details": [
      "Helped establish brand growth and marketing strategy.",
      "Focused on underrepresented communities and entrepreneurs.",
      "Translated business goals into marketing direction."
    ],
    "skills": [
      "Brand Strategy",
      "Entrepreneurship",
      "Campaign Thinking"
    ]
  },
  {
    "year": 2021,
    "lane": "work",
    "title": "Cashier",
    "org": "See’s Candies",
    "type": "Retail",
    "date": "2021",
    "body": "Seasonal retail role supporting product selection, sales transactions, cash handling, restocking, and customer satisfaction.",
    "details": [
      "Assisted customers with product selection.",
      "Handled transactions and merchandise restocking.",
      "Supported a welcoming retail environment."
    ],
    "skills": [
      "Cash Handling",
      "Customer Service",
      "Retail Quality"
    ]
  },
  {
    "year": 2022,
    "lane": "work",
    "title": "Retail Sales Advisor",
    "org": "Best Buy, Pleasant Hill",
    "type": "Retail technology",
    "date": "2022",
    "body": "Supported customers across mobile, gaming, computers, point-of-sale, pickup, returns, and exchanges before moving into business banking.",
    "details": [
      "Returned to Best Buy in Antioch for a second seasonal period in 2023–2024."
    ],
    "skills": [
      "Technology Sales",
      "Service Recovery",
      "Teamwork"
    ]
  },
  {
    "year": 2022,
    "lane": "culture",
    "title": "Guest Services volunteer",
    "org": "Tokyo Night Festival",
    "type": "Community event",
    "date": "November 2022",
    "body": "Supported guest services at a Japanese cultural festival.",
    "details": [
      "A direct connection between Japanese-language study, community participation, and event service."
    ],
    "skills": [
      "Guest Services",
      "Japanese Culture",
      "Events"
    ]
  },
  {
    "year": 2022,
    "lane": "culture",
    "title": "Member",
    "org": "Filipino Young Professionals",
    "type": "Professional community",
    "date": "October 2022–October 2023",
    "body": "Participated in a Filipino professional community while working in business banking.",
    "details": [],
    "skills": [
      "Community",
      "Filipino Heritage",
      "Networking"
    ]
  },
  {
    "year": 2022,
    "lane": "education",
    "title": "BS Business Administration",
    "org": "California State University, East Bay",
    "type": "Degree",
    "date": "2022",
    "body": "Completed a BS in Business Administration with a Marketing Management concentration, Japanese minor, 3.82 GPA, and AMA chapter presidency.",
    "details": [
      "Degree image shows conferral date: May 14, 2022.",
      "Concentration in Marketing Management and minor in Japanese Language & Culture.",
      "Served as President of the American Marketing Association chapter."
    ],
    "skills": [
      "Marketing Management",
      "Leadership",
      "Japanese Minor"
    ],
    "proof": "assets/photos/john-graduation-2022.webp",
    "proofAlt": "John Villanueva smiling in his cap and gown at his CSU East Bay graduation",
    "proofWidth": 900,
    "proofHeight": 1200,
    "proofCaption": "CSU East Bay graduation, 2022."
  },
  {
    "year": 2022,
    "lane": "leadership",
    "title": "American Marketing Association President",
    "org": "CSU East Bay",
    "type": "Leadership",
    "date": "January–May 2022",
    "body": "Served as chapter president of the American Marketing Association.",
    "details": [
      "Led local AMA chapter activity.",
      "Led the campus chapter rather than simply listing membership."
    ],
    "skills": [
      "Leadership",
      "Professional Organization",
      "Marketing Community"
    ]
  },
  {
    "year": 2022,
    "lane": "recognition",
    "title": "Smith Center Pitch Day Finalist",
    "org": "CSU East Bay",
    "type": "Award",
    "date": "2022",
    "body": "Reached the final round of Smith Center Pitch Day after presenting a business idea to judges.",
    "details": [
      "Finalist recognition through CSUEB Smith Center Pitch Day."
    ],
    "skills": [
      "Pitching",
      "Entrepreneurship",
      "Public Speaking"
    ]
  },
  {
    "year": 2022,
    "lane": "credentials",
    "title": "Leading with Finance",
    "org": "Harvard Business School Online",
    "type": "Certificate",
    "date": "2022",
    "body": "Completed Harvard Business School Online Leading with Finance, dated July 13, 2022.",
    "details": [
      "Certificate image shows date: July 13, 2022.",
      "Program provides an approach to principles and practice of finance."
    ],
    "skills": [
      "Finance",
      "Business Analysis",
      "Capital Thinking"
    ]
  },
  {
    "year": 2022,
    "lane": "credentials",
    "title": "Alternative Investments",
    "org": "Harvard Business School Online",
    "type": "Certificate",
    "date": "2022",
    "body": "Completed Harvard Business School Online Alternative Investments, dated July 13, 2022.",
    "details": [
      "Certificate image shows date: July 13, 2022.",
      "Focuses on assessing opportunities in alternative investments and portfolio diversification."
    ],
    "skills": [
      "Investments",
      "Portfolio Thinking",
      "Finance"
    ]
  },
  {
    "year": 2022,
    "lane": "credentials",
    "title": "Financial Accounting",
    "org": "Harvard Business School Online",
    "type": "Certificate",
    "date": "2022",
    "body": "Completed Harvard Business School Online Financial Accounting, dated July 20, 2022.",
    "details": [
      "Certificate image shows date: July 20, 2022.",
      "Focuses on building, interpreting, and analyzing financial statements."
    ],
    "skills": [
      "Accounting",
      "Financial Statements",
      "Analysis"
    ]
  },
  {
    "year": 2022,
    "lane": "credentials",
    "title": "Certificate of Specialization in Finance and Accounting",
    "org": "Harvard Business School Online",
    "type": "Specialization",
    "date": "2022",
    "body": "Earned Harvard Business School Online Certificate of Specialization in Finance and Accounting, dated August 1, 2022.",
    "details": [
      "Certificate image shows date: August 1, 2022.",
      "Awarded after successful completion of three courses in finance and accounting."
    ],
    "skills": [
      "Finance",
      "Accounting",
      "Specialization"
    ]
  },
  {
    "year": 2022,
    "lane": "business",
    "title": "Business Banking Development Associate",
    "org": "PNC Bank",
    "type": "Business Banking",
    "date": "August 2022–August 2023",
    "body": "Worked with business banking teams using Salesforce, client acquisition, CRM, credit/lending concepts, treasury, merchant services, underwriting, and healthcare banking exposure.",
    "details": [
      "Worked with $1–5M revenue business clientele.",
      "Shadowed Merchant Services, Treasury Management, Underwriting, Business Banking, and Healthcare Banking.",
      "Earned Certified Minority Business Advocate and Certified Women’s Business Advocate recognition."
    ],
    "skills": [
      "Salesforce",
      "Credit & Lending",
      "Client Acquisition"
    ]
  },
  {
    "year": 2022,
    "lane": "recognition",
    "title": "PNC Certified Minority Business Advocate",
    "org": "PNC Bank",
    "type": "Recognition",
    "date": "November 2022",
    "body": "Earned PNC’s internal Minority Business Advocate recognition while working in business banking.",
    "details": [
      "Certification through PNC Bank.",
      "Studied some of the barriers and business needs that can affect minority-owned companies.",
      "Applied that context in conversations with business clients."
    ],
    "skills": [
      "Inclusive Banking",
      "Client Advocacy",
      "Community Business"
    ]
  },
  {
    "year": 2023,
    "lane": "competition",
    "title": "StarCraft II — Masters",
    "org": "Ranked ladder",
    "type": "Competitive gaming",
    "date": "Season 3 · 2023",
    "body": "Finally reached Masters in Season 3 after first making Gold back in 2011.",
    "details": [
      "The full progression was Gold in 2011, Platinum in 2013, Diamond in 2014, and Masters in 2023."
    ],
    "skills": [
      "Long-Term Progress",
      "Strategy",
      "Persistence"
    ]
  },
  {
    "year": 2023,
    "lane": "recognition",
    "title": "PNC Certified Women’s Business Advocate",
    "org": "PNC Bank",
    "type": "Recognition",
    "date": "February 2023",
    "body": "Earned PNC’s internal Women’s Business Advocate recognition while supporting business-banking clients.",
    "details": [
      "Recognition through PNC Bank.",
      "Studied business needs and barriers that can affect women-owned companies.",
      "Adds inclusive advocacy to business banking background."
    ],
    "skills": [
      "Business Advocacy",
      "Relationship Banking",
      "Inclusive Finance"
    ]
  },
  {
    "year": 2023,
    "lane": "projects",
    "title": "Founder",
    "org": "Assist GPT",
    "type": "AI / Startup",
    "date": "2023",
    "body": "Founded an innovation services firm helping small businesses use AI, automation systems, services, and custom chatbots.",
    "details": [
      "Built a founder identity around AI-enabled business support.",
      "Focus on automation systems and custom chatbot services.",
      "Pulled marketing, web, and small-business consulting into one experiment."
    ],
    "skills": [
      "AI Systems",
      "Chatbots",
      "Automation"
    ]
  },
  {
    "year": 2023,
    "lane": "projects",
    "title": "Lead Web Development Associate",
    "org": "3STEPS4WARD",
    "type": "Web / Marketing",
    "date": "2023",
    "body": "Applied web development and digital marketing across Google Ads, WordPress, GoDaddy, Webflow, Google Business tools, YouTube, BuzzSprout, Spotify, Monday.com, SEO, and more.",
    "details": [
      "Worked with a mission-driven marketing consulting group.",
      "Used WordPress, Webflow, Google Ads, Monday.com, and SEO tools.",
      "Worked directly with common web, advertising, and project-management tools."
    ],
    "skills": [
      "WordPress",
      "Webflow",
      "Google Ads",
      "SEO"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "ChatGPT Masterclass: A Complete ChatGPT Guide for Beginners",
    "org": "Udemy",
    "type": "AI Certificate",
    "date": "2023",
    "body": "Completed an introductory ChatGPT masterclass dated May 20, 2023.",
    "details": [
      "Instructor: Lance Junck.",
      "Certificate image shows date: May 20, 2023.",
      "Length shown: 8 total hours."
    ],
    "skills": [
      "ChatGPT",
      "Prompting",
      "AI Fundamentals"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "ChatGPT 101: Supercharge Your Work & Life",
    "org": "Udemy",
    "type": "AI Certificate",
    "date": "2023",
    "body": "Completed a practical ChatGPT productivity course dated May 21, 2023.",
    "details": [
      "Instructor: Sean Melis.",
      "Certificate image shows date: May 21, 2023.",
      "Length shown: 3 total hours."
    ],
    "skills": [
      "ChatGPT",
      "Productivity",
      "Prompting"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "ChatGPT Complete Guide: Learn Midjourney, ChatGPT 4 & More",
    "org": "Udemy",
    "type": "AI Certificate",
    "date": "2023",
    "body": "Completed a ChatGPT and Midjourney course dated May 23, 2023.",
    "details": [
      "Instructors shown: Julian Melanson, Benza Maman, Leap Year Learning.",
      "Certificate image shows date: May 23, 2023.",
      "Length shown: 11 total hours."
    ],
    "skills": [
      "Generative AI",
      "Midjourney",
      "ChatGPT 4"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "ChatGPT Marketing: Create Complete Campaigns with ChatGPT AI",
    "org": "Udemy",
    "type": "AI Marketing Certificate",
    "date": "2023",
    "body": "Completed a ChatGPT marketing campaign course dated June 22, 2023.",
    "details": [
      "Instructors shown: Diego Davila, 800,000+ Students, Backyard Courses.",
      "Certificate image shows date: June 22, 2023.",
      "Length shown: 5 total hours."
    ],
    "skills": [
      "AI Marketing",
      "Campaigns",
      "ChatGPT"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Facebook Ads & Facebook Marketing Mastery 2023",
    "org": "Udemy",
    "type": "Marketing Certificate",
    "date": "2023",
    "body": "Completed Facebook Ads & Facebook Marketing Mastery, dated May 19, 2023.",
    "details": [
      "Instructor shown: Course Envy.",
      "Certificate image shows date: May 19, 2023.",
      "Length shown: 12.5 total hours."
    ],
    "skills": [
      "Facebook Ads",
      "Paid Social",
      "Marketing"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Learning to Write Marketing Copy",
    "org": "LinkedIn Learning",
    "type": "Marketing Certificate",
    "date": "2023",
    "body": "Completed a marketing copywriting course dated May 19, 2023.",
    "details": [
      "Certificate image shows completion date/time: May 19, 2023 at 03:13PM UTC.",
      "Length shown: 1 hour 27 minutes."
    ],
    "skills": [
      "Copywriting",
      "Marketing",
      "Messaging"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Advance as a Digital Marketing Specialist",
    "org": "LinkedIn Learning",
    "type": "Marketing Learning Path",
    "date": "2023",
    "body": "Completed a LinkedIn Learning path for digital marketing specialist development, dated May 19, 2023.",
    "details": [
      "Certificate image shows completion date/time: May 19, 2023 at 01:02PM UTC.",
      "Top skill covered: Digital Marketing.",
      "Length shown: 9 hours 45 minutes."
    ],
    "skills": [
      "Digital Marketing",
      "Specialist Path",
      "Marketing"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Master Digital Marketing",
    "org": "LinkedIn Learning",
    "type": "Marketing Learning Path",
    "date": "2023",
    "body": "Completed the Master Digital Marketing learning path dated May 19, 2023.",
    "details": [
      "Certificate image shows completion date/time: May 19, 2023 at 04:08AM UTC.",
      "Top skills include Digital Marketing, Social Media Marketing, Social Media Advertising, SEO, and Content Marketing.",
      "Length shown: 9 hours 36 minutes."
    ],
    "skills": [
      "Digital Marketing",
      "SEO",
      "Content Marketing"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Finance Essentials for Small Business",
    "org": "LinkedIn Learning",
    "type": "Finance Certificate",
    "date": "2023",
    "body": "Completed a small-business finance course dated May 19, 2023.",
    "details": [
      "Certificate image shows completion date/time: May 19, 2023 at 01:26PM UTC.",
      "Length shown: 51 minutes."
    ],
    "skills": [
      "Small Business Finance",
      "Finance",
      "Business Literacy"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Digital Marketing Masterclass: Get Your First 1,000 Customers",
    "org": "Udemy",
    "type": "Marketing Certificate",
    "date": "2023",
    "body": "Completed a customer acquisition marketing masterclass dated May 23, 2023.",
    "details": [
      "Instructor: Evan Kimbrell.",
      "Certificate image shows date: May 23, 2023.",
      "Length shown: 26 total hours."
    ],
    "skills": [
      "Customer Acquisition",
      "Marketing Strategy",
      "Digital Marketing"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "The Complete Digital Marketing Course - 12 Courses in 1",
    "org": "Udemy",
    "type": "Marketing Certificate",
    "date": "2023",
    "body": "Completed a 12-in-1 digital marketing course dated May 26, 2023.",
    "details": [
      "Instructors include Rob Percival, Daragh Walsh, Codestars.",
      "Certificate image shows date: May 26, 2023.",
      "Length shown: 22.5 total hours."
    ],
    "skills": [
      "Digital Marketing",
      "Multi-Channel Marketing",
      "Marketing Stack"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Instagram Marketing 2023: Hashtags, Live, Stories, Ads & More",
    "org": "Udemy",
    "type": "Marketing Certificate",
    "date": "2023",
    "body": "Completed an Instagram marketing course dated May 29, 2023.",
    "details": [
      "Instructor: Evan Kimbrell.",
      "Certificate image shows date: May 29, 2023.",
      "Length shown: 23 total hours."
    ],
    "skills": [
      "Instagram Marketing",
      "Social Media",
      "Ads"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Digital Marketing Masterclass - 23 Marketing Courses in 1",
    "org": "Udemy",
    "type": "Marketing Certificate",
    "date": "2023",
    "body": "Completed a 23-course digital marketing masterclass dated June 4, 2023.",
    "details": [
      "Instructors include Phil Ebiner, Diego Davila, Video School, Backyard Courses.",
      "Certificate image shows date: June 4, 2023.",
      "Length shown: 46.5 total hours."
    ],
    "skills": [
      "Digital Marketing",
      "Marketing Stack",
      "Campaigns"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Growing as a Marketing Manager",
    "org": "LinkedIn Learning",
    "type": "Marketing Learning Path",
    "date": "2023",
    "body": "Completed a marketing management learning path dated June 8, 2023.",
    "details": [
      "Certificate image shows completion date/time: June 8, 2023 at 05:00PM UTC.",
      "Top skills covered: Marketing Leadership and Marketing Management.",
      "Length shown: 4 hours 30 minutes."
    ],
    "skills": [
      "Marketing Leadership",
      "Marketing Management",
      "Leadership"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Essential New Skills in Marketing",
    "org": "LinkedIn Learning",
    "type": "Marketing Learning Path",
    "date": "2023",
    "body": "Completed a LinkedIn Learning path for new marketing skills dated June 9, 2023.",
    "details": [
      "Certificate image shows completion date/time: June 9, 2023 at 03:34PM UTC.",
      "Top skills include Marketing, Social Media Marketing, and Marketing Communications.",
      "Length shown: 3 hours 58 minutes."
    ],
    "skills": [
      "Marketing",
      "Social Media Marketing",
      "Marketing Communications"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Digital Marketing",
    "org": "Cornell University / eCornell",
    "type": "Certificate",
    "date": "2023",
    "body": "Completed Cornell University Digital Marketing certificate, dated August 22, 2023.",
    "details": [
      "Certificate image shows date: August 22, 2023.",
      "Issued through eCornell."
    ],
    "skills": [
      "Digital Marketing",
      "Cornell",
      "Marketing Strategy"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Leading Workplace Diversity",
    "org": "Rice University / RiceX",
    "type": "Leadership Certificate",
    "date": "2023",
    "body": "Completed RiceX Leading Workplace Diversity, issued October 2023.",
    "details": [
      "Certificate image shows issued date: October 2023.",
      "Professional Certificate through RiceX in collaboration with edX."
    ],
    "skills": [
      "Diversity",
      "Leadership",
      "Workplace Inclusion"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Storytelling for Aspiring Entrepreneurs",
    "org": "Davidson College / DavidsonX",
    "type": "Entrepreneurship Certificate",
    "date": "2023",
    "body": "Completed Storytelling for Aspiring Entrepreneurs, issued November 2023.",
    "details": [
      "Certificate image shows issued date: November 2023.",
      "Professional Certificate through DavidsonX in collaboration with edX."
    ],
    "skills": [
      "Storytelling",
      "Entrepreneurship",
      "Pitching"
    ]
  },
  {
    "year": 2023,
    "lane": "credentials",
    "title": "Innovation and Entrepreneurship",
    "org": "University System of Maryland / UMD & USMx",
    "type": "Entrepreneurship Certificate",
    "date": "2023",
    "body": "Completed Innovation and Entrepreneurship, issued November 2023.",
    "details": [
      "Certificate image shows issued date: November 2023.",
      "Professional Certificate through UMD and USMx in collaboration with edX."
    ],
    "skills": [
      "Innovation",
      "Entrepreneurship",
      "Venture Thinking"
    ]
  },
  {
    "year": 2023,
    "lane": "work",
    "title": "Retail Sales Advisor",
    "org": "Best Buy",
    "type": "Retail / Tech",
    "date": "2023–2024",
    "body": "Provided customer service, POS support, curbside pickup, returns/exchanges, and expertise in mobile, gaming, computers, and Alienware.",
    "details": [
      "Worked across Mobile, Gaming, Computers, and Alienware-related customer needs.",
      "Supported sales personnel and customer service workflows.",
      "Built more electronics and consumer tech fluency."
    ],
    "skills": [
      "Consumer Tech",
      "Customer Service",
      "POS"
    ]
  },
  {
    "year": 2024,
    "lane": "credentials",
    "title": "Leading in a Remote Environment",
    "org": "HarvardX",
    "type": "Leadership Certificate",
    "date": "2024",
    "body": "Completed Leading in a Remote Environment, issued January 2024.",
    "details": [
      "Certificate image shows issued date: January 2024.",
      "Professional Certificate through HarvardX in collaboration with edX."
    ],
    "skills": [
      "Remote Leadership",
      "Management",
      "Distributed Teams"
    ]
  },
  {
    "year": 2024,
    "lane": "work",
    "title": "Team Member",
    "org": "Kinder’s Meat & BBQ",
    "type": "Restaurant",
    "date": "2024",
    "body": "Prepared sandwiches and meal plates, bussed tables, prepped food, restocked supplies, and supported sanitation workflows.",
    "details": [
      "Supported restaurant operations and food service.",
      "Handled prepping, restocking, bussing, and cleaning duties.",
      "Reinforced service-work humility and operational stamina."
    ],
    "skills": [
      "Food Prep",
      "Restocking",
      "Sanitation"
    ]
  },
  {
    "year": 2024,
    "lane": "clinical",
    "title": "BSN Student",
    "org": "Nightingale College",
    "type": "Nursing Education",
    "date": "2024–April 2027 expected",
    "body": "Began the Bachelor of Science in Nursing program at Nightingale College, with an expected April 2027 completion.",
    "details": [
      "Current GPA: 3.84.",
      "Coursework, simulation, and supervised clinical practice focus on assessment, medication safety, clinical judgment, and patient-centered care."
    ],
    "skills": [
      "Clinical Judgment",
      "Patient-Centered Care",
      "SBAR"
    ]
  },
  {
    "year": 2024,
    "lane": "credentials",
    "title": "Fundamentals of Financial Analysis",
    "org": "Babson College / BabsonX",
    "type": "Finance Certificate",
    "date": "2024",
    "body": "Completed BabsonX Fundamentals of Financial Analysis, issued May 2024.",
    "details": [
      "Certificate image shows issued date: May 2024.",
      "Professional Certificate offered by BabsonX in collaboration with edX."
    ],
    "skills": [
      "Financial Analysis",
      "Finance",
      "Decision-Making"
    ]
  },
  {
    "year": 2024,
    "lane": "credentials",
    "title": "Leadership and Communication",
    "org": "HarvardX",
    "type": "Leadership Certificate",
    "date": "2024",
    "body": "Completed Leadership and Communication, issued May 2024.",
    "details": [
      "Certificate image shows issued date: May 2024.",
      "Professional Certificate through HarvardX in collaboration with edX."
    ],
    "skills": [
      "Leadership",
      "Communication",
      "Influence"
    ]
  },
  {
    "year": 2024,
    "lane": "credentials",
    "title": "Personal Finance",
    "org": "Indiana University / IUx",
    "type": "Finance Certificate",
    "date": "2024",
    "body": "Completed IUx Personal Finance, issued June 2024.",
    "details": [
      "Certificate image shows issued date: June 2024.",
      "Professional Certificate through IUx in collaboration with edX."
    ],
    "skills": [
      "Personal Finance",
      "Financial Literacy",
      "Money Management"
    ]
  },
  {
    "year": 2025,
    "lane": "competition",
    "title": "Marvel Rivals rank progression",
    "org": "Competitive ranked play",
    "type": "Competitive gaming",
    "date": "January–October 2025",
    "body": "Climbed from Gold in Season 1 to Platinum in Season 1.5, then reached Diamond in Season 4.5.",
    "details": [
      "Gold — Season 1, which began January 10, 2025.",
      "Platinum — Season 1.5, which began February 21, 2025.",
      "Diamond — Season 4.5, which began October 10, 2025."
    ],
    "skills": [
      "Team Play",
      "Adaptation",
      "Competitive Progression"
    ]
  },
  {
    "year": 2025,
    "lane": "clinical",
    "title": "Student Nurse Clinical Rotation",
    "org": "Pikes Peak Post Acute",
    "type": "Clinical",
    "date": "2025",
    "body": "Completed long-term care and rehabilitation clinical training: head-to-toe assessments, focused systems assessments, cranial nerve assessment, SBAR, vitals, wound care, risk tools, and emergency protocol exposure.",
    "details": [
      "Conducted head-to-toe and focused assessments.",
      "Used Braden, Morse Fall Scale, CIWA, and RASS.",
      "Observed emergency protocols including Code Blue, BVM, and epinephrine administration."
    ],
    "skills": [
      "Assessments",
      "SBAR",
      "Wound Care"
    ]
  },
  {
    "year": 2025,
    "lane": "clinical",
    "title": "Student Nurse Clinical Rotation",
    "org": "Berthoud Care and Rehabilitation",
    "type": "Clinical",
    "date": "2025",
    "body": "Completed skilled nursing and rehabilitation rotation focused on vitals, blood glucose testing, assessments, therapeutic feeding, hygiene assistance, wound care observation, PointClickCare, medication safety, and SBAR.",
    "details": [
      "Performed vital sign collection and capillary blood glucose testing.",
      "Observed wound tunneling, wound vac systems, Hoyer lifts, IV therapy, and medication administration under RN supervision.",
      "Developed time management, SBAR communication, and care plan skills."
    ],
    "skills": [
      "Vitals",
      "Blood Glucose",
      "PointClickCare"
    ]
  },
  {
    "year": 2026,
    "lane": "credentials",
    "title": "California CNA certification",
    "org": "California Department of Public Health",
    "type": "Active credential",
    "date": "January 2026–April 2028",
    "body": "Earned active California Certified Nursing Assistant status after passing the required examinations in January 2026.",
    "details": [
      "I keep the certificate number off the public site."
    ],
    "skills": [
      "Patient Care",
      "Safety",
      "State Certification"
    ]
  },
  {
    "year": 2026,
    "lane": "credentials",
    "title": "AHA Basic Life Support Provider",
    "org": "American Heart Association",
    "type": "Current credential",
    "date": "Current through October 2026",
    "body": "Maintains current Basic Life Support provider status.",
    "details": [
      "I can provide the credential card when it is needed."
    ],
    "skills": [
      "BLS",
      "CPR",
      "Emergency Response"
    ]
  },
  {
    "year": 2026,
    "lane": "clinical",
    "title": "Clinical rotation",
    "org": "Pines of Sarasota Healthcare",
    "type": "Supervised clinical practice",
    "date": "March–April 2026",
    "body": "Completed supervised clinical days in a healthcare setting as part of the Nightingale College BSN program.",
    "details": [
      "A clinical log records 45 hours across March 30 through April 2.",
      "Clinical hours remain separate from paid CNA hours."
    ],
    "skills": [
      "Clinical Practice",
      "Accountability",
      "Patient Care"
    ]
  },
  {
    "year": 2026,
    "lane": "clinical",
    "title": "Acute-care clinical experience",
    "org": "Shenandoah Memorial Hospital",
    "type": "Supervised clinical practice",
    "date": "2026",
    "body": "Completed supervised learning in a small community-hospital setting, including point-of-care glucose checks and interdisciplinary observation.",
    "details": [
      "The experience added acute-care context, exposure to physical therapy, and a more realistic understanding of rural hospital workflow.",
      "Clinical reflection completed in July 2026."
    ],
    "skills": [
      "Acute Care",
      "Glucose Monitoring",
      "Interdisciplinary Care"
    ]
  },
  {
    "year": 2026,
    "lane": "clinical",
    "title": "Transferred to sub-acute care",
    "org": "Rosewood Post Acute",
    "type": "Unit transition",
    "date": "August 3, 2026",
    "body": "Moved from long-term care into sub-acute work while continuing as a CNA at the same facility.",
    "details": [
      "The transition adds higher-acuity bedside exposure while preserving continuity with the same employer."
    ],
    "skills": [
      "Sub-acute Care",
      "Adaptation",
      "Continuity"
    ]
  },
  {
    "year": 2026,
    "lane": "leadership",
    "title": "Sigma Theta Tau induction",
    "org": "Sigma Theta Tau International Honor Society of Nursing",
    "type": "Academic honor",
    "date": "August 2026",
    "body": "Inducted into the international nursing honor society while completing the BSN program.",
    "details": [],
    "skills": [
      "Nursing Scholarship",
      "Academic Achievement"
    ]
  },
  {
    "year": 2026,
    "lane": "credentials",
    "title": "ACLS and PALS certification; Basic EKG training",
    "org": "California BRN-approved continuing-education provider",
    "type": "Completed training",
    "date": "August 2026",
    "body": "Completed Basic EKG Interpretation and earned current ACLS and PALS provider status in August 2026.",
    "details": [
      "ACLS and PALS completed August 12, 2026.",
      "Credential identifiers stay off the public site."
    ],
    "skills": [
      "Advanced Life Support",
      "Pediatric Response",
      "Rhythm Interpretation"
    ]
  },
  {
    "year": 2026,
    "lane": "projects",
    "title": "Browser project library reaches 23 experiences",
    "org": "johnfvillanueva.com/play",
    "type": "Project milestone",
    "date": "2026",
    "body": "Expanded the site to 23 playable browser experiences, including a kart racer, nursing pharmacology practice, math practice, and language quizzes.",
    "details": [
      "The pharmacology tools include multiple routes and answer rationales.",
      "Language practice includes Japanese, Spanish, and Filipino/Tagalog."
    ],
    "skills": [
      "JavaScript",
      "Learning Design",
      "Testing"
    ],
    "link": "play/",
    "linkLabel": "Open the Play Hub"
  },
  {
    "year": 2026,
    "lane": "clinical",
    "title": "Certified Nursing Assistant",
    "org": "Rosewood Post Acute (formerly Windsor Rosewood Care Center)",
    "type": "Healthcare Work",
    "date": "January 2026–present",
    "body": "Started in long-term care and now works across skilled-nursing and sub-acute care while completing the BSN program.",
    "details": [
      "Provides hands-on support with ADLs, mobility, transfers, repositioning, vital signs, intake and output, comfort, and infection prevention.",
      "Documents in PointClickCare and reports changes in condition to licensed nurses.",
      "Transferred to the sub-acute unit in August 2026."
    ],
    "skills": [
      "Direct Care",
      "PointClickCare",
      "Bedside Communication"
    ]
  }
];
  const years = Array.from({ length: 16 }, (_, index) => 2011 + index);
  const currentYear = 2026;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const root = document.querySelector('[data-archive]');
  if (!root) return;

  const searchInput = root.querySelector('[data-archive-search]');
  const laneSelect = root.querySelector('[data-archive-lane]');
  const laneButtons = root.querySelector('[data-archive-lanes]');
  const yearRail = root.querySelector('[data-year-rail]');
  const yearTitle = root.querySelector('[data-selected-year]');
  const yearSummary = root.querySelector('[data-selected-summary]');
  const yearCategories = root.querySelector('[data-selected-categories]');
  const eventList = root.querySelector('[data-event-list]');
  const status = root.querySelector('[data-archive-status]');
  const playButton = root.querySelector('[data-archive-play]');
  const emptyState = root.querySelector('[data-archive-empty]');
  const countAll = document.querySelector('[data-archive-total]');
  const countCredentials = document.querySelector('[data-archive-credentials]');

  let selectedYear = currentYear;
  let activeLane = 'all';
  let query = '';
  let activeEventId = '';
  let playTimer = null;

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const slugify = (value) => String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);

  events.forEach((event, index) => {
    event.id = `year-${event.year}--${slugify(event.title)}-${index + 1}`;
    event.filters = [event.lane];
    if (
      /(sales|retail|restaurant|healthcare work|business banking|marketing|web \/ marketing|ai \/ startup|insurance)/i.test(event.type)
      || /(assistant store manager|customer service supervisor|personal care assistant|teacher assistant|tutor|certified nursing assistant)/i.test(event.title)
    ) {
      event.filters.push('work');
    }
    if (event.title === 'BSN Student') event.filters.push('education');
    if (/clinical|healthcare/i.test(event.type) || /nursing|patient care/i.test(event.body)) {
      event.filters.push('clinical');
    }
    event.filters = [...new Set(event.filters)];
    event.searchText = [
      event.year, event.date, ...event.filters, event.title, event.org, event.type,
      event.body, ...(event.details || []), ...(event.skills || [])
    ].join(' ').toLowerCase();
  });

  const updateHash = (hash) => {
    if (window.location.hash === `#${hash}`) return;
    history.replaceState(null, '', `#${hash}`);
  };

  const readHash = () => {
    const raw = window.location.hash.replace(/^#/, '');
    const yearMatch = raw.match(/^year-(20\d{2}|201\d)/);
    if (yearMatch) selectedYear = Math.min(currentYear, Math.max(2011, Number(yearMatch[1])));
    activeEventId = raw.includes('--') ? raw : '';
  };

  const filteredEvents = () => events.filter((event) => {
    const laneMatch = activeLane === 'all' || event.filters.includes(activeLane);
    const searchMatch = !query || event.searchText.includes(query);
    return laneMatch && searchMatch;
  });

  const eventsForYear = (year, list = filteredEvents()) =>
    list.filter((event) => event.year === year);

  const setSelectedYear = (year, { updateUrl = true, stopPlayback = true } = {}) => {
    selectedYear = year;
    activeEventId = '';
    if (stopPlayback) stopPlay();
    if (updateUrl) updateHash(`year-${year}`);
    render();
    centerSelectedYear();
  };

  const renderLaneControls = () => {
    laneSelect.innerHTML = Object.entries(lanes)
      .map(([id, lane]) => `<option value="${id}">${escapeHtml(lane.label)}</option>`)
      .join('');
    laneSelect.value = activeLane;

    laneButtons.innerHTML = Object.entries(lanes)
      .map(([id, lane]) => `
        <button class="filter-button archive-lane-button" type="button"
          data-archive-lane-button="${id}" aria-pressed="${id === activeLane}">
          <span class="archive-lane-dot" style="--lane-color:${lane.color}" aria-hidden="true"></span>
          ${escapeHtml(lane.label)}
        </button>`)
      .join('');
  };

  const renderYearRail = (visibleEvents) => {
    yearRail.innerHTML = years.map((year) => {
      const count = eventsForYear(year, visibleEvents).length;
      const selected = year === selectedYear;
      return `
        <button class="archive-year-button${count ? '' : ' is-empty'}" type="button"
          data-archive-year="${year}" aria-current="${selected ? 'true' : 'false'}"
          aria-label="${year}: ${count} matching ${count === 1 ? 'entry' : 'entries'}">
          <strong>${year}</strong>
          <span>${count}</span>
        </button>`;
    }).join('');
  };

  const renderEvent = (event) => {
    const lane = lanes[event.lane] || lanes.all;
    const detailItems = (event.details || []).length
      ? `<ul>${event.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul>`
      : '';
    const skills = (event.skills || []).length
      ? `<div class="chip-row" aria-label="What this added">${event.skills.map((skill) =>
          `<span class="chip">${escapeHtml(skill)}</span>`).join('')}</div>`
      : '';
    const proofSize = {
      width: event.proofWidth || (event.proof?.includes('stanford') ? 1000 : 800),
      height: event.proofHeight || (event.proof?.includes('stanford') ? 707 : 614),
    };
    const proofClass = event.proof?.includes('/photos/')
      ? 'archive-proof archive-proof-personal'
      : 'archive-proof';
    const proofCaption = event.proofCaption || 'A certificate image I chose to keep on the site.';
    const proof = event.proof
      ? `<figure class="${proofClass}">
          <img src="${escapeHtml(event.proof)}" alt="${escapeHtml(event.proofAlt || '')}"
            width="${proofSize.width}" height="${proofSize.height}" loading="lazy">
          <figcaption>${escapeHtml(proofCaption)}</figcaption>
        </figure>`
      : '';
    const outbound = event.link
      ? `<a class="card-link" href="${escapeHtml(event.link)}">${escapeHtml(event.linkLabel || 'Open related page')} →</a>`
      : '';
    const open = event.id === activeEventId ? ' open' : '';
    const statusPill = event.status === 'scheduled'
      ? '<span class="archive-status-pill">Scheduled</span>'
      : '';
    return `
      <details class="archive-event"${open} id="${event.id}" style="--lane-color:${lane.color}">
        <summary>
          <span class="archive-event-marker" aria-hidden="true"></span>
          <span class="archive-event-heading">
            <span class="archive-event-meta">${escapeHtml(event.type)} · ${escapeHtml(event.date)}</span>
            <strong>${escapeHtml(event.title)}</strong>
            <span>${escapeHtml(event.org)}</span>
          </span>
          ${statusPill}
        </summary>
        <div class="archive-event-body">
          <p>${escapeHtml(event.body)}</p>
          ${detailItems}
          ${skills}
          ${proof}
          <div class="archive-event-links">
            ${outbound}
            <a class="archive-permalink" href="#${event.id}" data-event-link="${event.id}">Link to this entry</a>
          </div>
        </div>
      </details>`;
  };

  const renderSelectedYear = (visibleEvents) => {
    const yearEvents = eventsForYear(selectedYear, visibleEvents);
    const categoryIds = [...new Set(yearEvents.map((event) => event.lane))];
    yearTitle.textContent = selectedYear;
    yearSummary.textContent = yearEvents.length
      ? `${yearEvents.length} ${yearEvents.length === 1 ? 'entry' : 'entries'} in this view. Open any entry for the details.`
      : 'No entries in this year match the current search and filter.';
    yearCategories.innerHTML = categoryIds
      .map((id) => `<span class="timeline-tag" style="--lane-color:${lanes[id].color}">
        <i aria-hidden="true"></i>${escapeHtml(lanes[id].label)}
      </span>`)
      .join('');
    eventList.innerHTML = yearEvents.map(renderEvent).join('');
    emptyState.hidden = yearEvents.length > 0;

    eventList.querySelectorAll('.archive-event').forEach((details) => {
      details.addEventListener('toggle', () => {
        if (!details.open) return;
        activeEventId = details.id;
        updateHash(details.id);
      });
    });
  };

  const renderStatus = (visibleEvents) => {
    const yearCount = new Set(visibleEvents.map((event) => event.year)).size;
    const visibleInYear = eventsForYear(selectedYear, visibleEvents).length;
    status.textContent = `${visibleEvents.length} matching ${visibleEvents.length === 1 ? 'entry' : 'entries'} across ${yearCount} ${yearCount === 1 ? 'year' : 'years'}; ${visibleInYear} shown for ${selectedYear}.`;
  };

  const render = () => {
    const visibleEvents = filteredEvents();
    if (!eventsForYear(selectedYear, visibleEvents).length && visibleEvents.length && (query || activeLane !== 'all')) {
      selectedYear = visibleEvents[0].year;
      activeEventId = '';
      updateHash(`year-${selectedYear}`);
    }
    renderYearRail(visibleEvents);
    renderSelectedYear(visibleEvents);
    renderStatus(visibleEvents);
    laneSelect.value = activeLane;
    laneButtons.querySelectorAll('[data-archive-lane-button]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.archiveLaneButton === activeLane));
    });

    if (activeEventId) {
      requestAnimationFrame(() => {
        const target = document.getElementById(activeEventId);
        target?.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    }
  };

  const centerSelectedYear = () => {
    requestAnimationFrame(() => {
      const selected = yearRail.querySelector('[aria-current="true"]');
      selected?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
    });
  };

  const stopPlay = () => {
    if (playTimer) window.clearInterval(playTimer);
    playTimer = null;
    playButton.setAttribute('aria-pressed', 'false');
    playButton.textContent = 'Play years';
  };

  const startPlay = () => {
    const availableYears = years.filter((year) => eventsForYear(year).length);
    if (availableYears.length < 2) return;
    stopPlay();
    playButton.setAttribute('aria-pressed', 'true');
    playButton.textContent = 'Pause';
    playTimer = window.setInterval(() => {
      const index = availableYears.indexOf(selectedYear);
      selectedYear = availableYears[(index + 1) % availableYears.length];
      activeEventId = '';
      updateHash(`year-${selectedYear}`);
      render();
      centerSelectedYear();
    }, 3200);
  };

  renderLaneControls();
  readHash();

  if (countAll) countAll.textContent = events.length;
  if (countCredentials) {
    countCredentials.textContent = events.filter((event) => event.lane === 'credentials').length;
  }

  yearRail.addEventListener('click', (event) => {
    const button = event.target.closest('[data-archive-year]');
    if (!button) return;
    setSelectedYear(Number(button.dataset.archiveYear));
    requestAnimationFrame(() => {
      yearRail.querySelector('[aria-current="true"]')?.focus({ preventScroll: true });
    });
  });

  yearRail.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const buttons = [...yearRail.querySelectorAll('[data-archive-year]')];
    const currentIndex = buttons.findIndex((button) => button.getAttribute('aria-current') === 'true');
    let nextIndex = currentIndex;
    if (event.key === 'ArrowLeft') nextIndex = Math.max(0, currentIndex - 1);
    if (event.key === 'ArrowRight') nextIndex = Math.min(buttons.length - 1, currentIndex + 1);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = buttons.length - 1;
    buttons[nextIndex]?.focus();
    buttons[nextIndex]?.click();
  });

  laneButtons.addEventListener('click', (event) => {
    const button = event.target.closest('[data-archive-lane-button]');
    if (!button) return;
    activeLane = button.dataset.archiveLaneButton;
    stopPlay();
    render();
    centerSelectedYear();
  });

  laneSelect.addEventListener('change', () => {
    activeLane = laneSelect.value;
    stopPlay();
    render();
    centerSelectedYear();
  });

  searchInput.addEventListener('input', () => {
    query = searchInput.value.trim().toLowerCase();
    stopPlay();
    render();
    centerSelectedYear();
  });

  root.querySelector('[data-archive-reset]').addEventListener('click', () => {
    searchInput.value = '';
    query = '';
    activeLane = 'all';
    setSelectedYear(currentYear);
    renderLaneControls();
    render();
  });

  root.querySelector('[data-expand-all]').addEventListener('click', () => {
    eventList.querySelectorAll('details').forEach((details) => { details.open = true; });
  });

  root.querySelector('[data-collapse-all]').addEventListener('click', () => {
    eventList.querySelectorAll('details').forEach((details) => { details.open = false; });
  });

  root.querySelector('[data-year-scroll="back"]').addEventListener('click', () => {
    yearRail.scrollBy({ left: -Math.max(280, yearRail.clientWidth * 0.7), behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  root.querySelector('[data-year-scroll="forward"]').addEventListener('click', () => {
    yearRail.scrollBy({ left: Math.max(280, yearRail.clientWidth * 0.7), behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  root.querySelectorAll('[data-era-year]').forEach((button) => {
    button.addEventListener('click', () => setSelectedYear(Number(button.dataset.eraYear)));
  });

  playButton.addEventListener('click', () => {
    if (playTimer) stopPlay();
    else startPlay();
  });

  eventList.addEventListener('click', (event) => {
    const link = event.target.closest('[data-event-link]');
    if (!link) return;
    activeEventId = link.dataset.eventLink;
    updateHash(activeEventId);
  });

  window.addEventListener('hashchange', () => {
    stopPlay();
    readHash();
    render();
    centerSelectedYear();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopPlay();
  });

  render();
  centerSelectedYear();
})();
