// ----------------------------------------------------------------------
const fieldNames = [
  {
    id: 0,
    label: "",
    dts: []
  },
  {
    id: 1,
    label: "Airport Management",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration"]
  }, {
    id: 2,
    label: "Database Management",
    dts: ["Bachelor of Science", "Master of Information Science"]
  }, {
    id: 3,
    label: "Bachelor of University Studies (BUS)",
    dts: []
  }, {
    id: 4,
    label: "National Security Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 5,
    label: "Clinical Social Work (CSW)",
    dts: ["Master of Social Work", "Bachelor of Arts", "Bachelor of Social Work"]
  }, {
    id: 6,
    label: "Dairy Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 7,
    label: "American Literature (United States)",
    dts: ["Bachelor of Arts"]
  }, {
    id: 8,
    label: "Romance Languages",
    dts: ["Bachelor of Arts"]
  }, {
    id: 9,
    label: "Applied Geology",
    dts: ["Bachelor of Science"]
  }, {
    id: 10,
    label: "International Business",
    dts: ["Bachelor of Business Administration", "Bachelor of Science", "Master of Business Administration", "Bachelor of Arts"]
  }, {
    id: 11,
    label: "Culinary Arts",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Business Administration"]
  }, {
    id: 12,
    label: "Geology",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Doctor of Philosophy", "Master of Arts", "Bachelor of Arts and Science"]
  }, {
    id: 13,
    label: "Social Policy",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Social Work"]
  }, {
    id: 14,
    label: "Pharmacology",
    dts: ["Bachelor of Science", "Doctor of Philosophy", "Master of Science"]
  }, {
    id: 15,
    label: "Air Transport Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 16,
    label: "Hospitality Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 17,
    label: "Master of Library and Information Science (MLIS)",
    dts: []
  }, {
    id: 18,
    label: "Communication",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science", "Master of Business Administration", "Bachelor of Liberal Arts", "Master of Mass Communications", "Bachelor of Arts and Science", "Bachelor of Business Administration", "Master of Education", "Bachelor of Fine Arts", "Master of Public Administration", "Doctor of Philosophy", "Bachelor of Commerce", "Master of Social Work", "Master of Fine Arts"]
  }, {
    id: 19,
    label: "Emergency Management",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Public Administration", "Master of Arts"]
  }, {
    id: 20,
    label: "Ethnic Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Bachelor of Liberal Arts"]
  }, {
    id: 21,
    label: "Poetry",
    dts: ["Master of Fine Arts", "Bachelor of Arts"]
  }, {
    id: 22,
    label: "Employment Law",
    dts: ["Master of Legal Studies", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 23,
    label: "Classical Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 24,
    label: "Intelligence Analysis",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 25,
    label: "Direct Practice",
    dts: ["Master of Social Work"]
  }, {
    id: 26,
    label: "Foreign Service",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 27,
    label: "Business Management",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration", "Bachelor of Arts", "Bachelor of Business", "Master of Science"]
  }, {
    id: 28,
    label: "Latin American Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Master of Business Administration", "Bachelor of Science", "Master of Science", "Bachelor of Liberal Arts", "Bachelor of Arts and Science"]
  }, {
    id: 29,
    label: "Building Construction Management Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 30,
    label: "Software Development",
    dts: ["Bachelor of Science"]
  }, {
    id: 31,
    label: "Pre-Medicine",
    dts: ["Bachelor of Science"]
  }, {
    id: 32,
    label: "Computer Engineering Technology (CET)",
    dts: ["Bachelor of Science"]
  }, {
    id: 33,
    label: "Illustration",
    dts: ["Bachelor of Fine Arts"]
  }, {
    id: 34,
    label: "Mental Health Counseling",
    dts: ["Bachelor of Arts", "Master of Arts", "Master of Science", "Bachelor of Science"]
  }, {
    id: 35,
    label: "Political Science and Public Service",
    dts: ["Bachelor of Arts"]
  }, {
    id: 36,
    label: "Neurology",
    dts: ["Bachelor of Science"]
  }, {
    id: 37,
    label: "Music Teacher Education",
    dts: ["Bachelor of Music Education", "Bachelor of Music", "Bachelor of Arts"]
  }, {
    id: 38,
    label: "Preaching",
    dts: ["Bachelor of Arts", "Doctor of Ministry", "Master of Divinity"]
  }, {
    id: 39,
    label: "Pediatrics",
    dts: ["Master of Science in Nursing", "Bachelor of Science in Nursing", "Bachelor of Science", "Master of Occupational Therapy", "Master of Science", "Doctorate"]
  }, {
    id: 40,
    label: "Ministry",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Divinity", "Doctor of Ministry"]
  }, {
    id: 41,
    label: "Bachelor of Applied Arts and Science (BApAS)",
    dts: []
  }, {
    id: 42,
    label: "Culinary Arts and Culinary Management",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Business Administration", "Bachelor of Professional Studies"]
  }, {
    id: 43,
    label: "Higher Education Administration",
    dts: ["Bachelor of Arts", "Master of Education", "Bachelor of Science", "Master of Arts", "Master of Science", "Doctor of Education"]
  }, {
    id: 44,
    label: "Occupational Health and Safety",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Public Health"]
  }, {
    id: 45,
    label: "Integrated Marketing Communications",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Arts"]
  }, {
    id: 46,
    label: "Production Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 47,
    label: "Wildlife Management",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 48,
    label: "Master of Fine Arts (MFA)",
    dts: []
  }, {
    id: 49,
    label: "Environmental Science and Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 50,
    label: "Education Policy",
    dts: ["Bachelor of Arts", "Master of Education", "Bachelor of Science", "Master of Arts", "Doctor of Philosophy"]
  }, {
    id: 51,
    label: "Religious Education",
    dts: ["Bachelor of Arts"]
  }, {
    id: 52,
    label: "English Language and Literature",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Liberal Arts", "Master of Education", "Master of Fine Arts", "Doctor of Philosophy", "Master of Library and Information Science", "Bachelor of Education", "Master of Arts in Teaching", "Bachelor of Arts and Science", "Bachelor of Fine Arts", "Master of Public Administration", "Master of Social Work", "Master of Mass Communications", "Master of Journalism", "Master of Liberal Arts", "Bachelor of Humanities"]
  }, {
    id: 53,
    label: "Business and Marketing",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration", "Bachelor of Arts"]
  }, {
    id: 54,
    label: "Psychology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Arts", "Master of Business Administration", "Master of Social Work", "Master of Education", "Doctor of Philosophy", "Bachelor of Arts and Science", "Bachelor of Liberal Arts", "Master of Public Health", "Bachelor of Business Administration", "Master of Public Administration", "Master of Occupational Therapy", "Doctorate of Psychology", "Master of Health Administration", "Master of Human Services", "Doctorate", "Bachelor of Fine Arts", "Bachelor of Science in Nursing", "Doctor of Physical Therapy", "Master of Management", "Bachelor of General Studies", "Bachelor of Social Work", "Master of Science in Nursing", "Doctor of Psychology", "Master of Professional Studies", "Master of Divinity", "Bachelor of Liberal Studies", "Doctor of Education", "Master of Information Science", "Bachelor of Applied Science", "Bachelor of Education", "Master of Fine Arts", "Master of Accounting", "Bachelor of Philosophy"]
  }, {
    id: 55,
    label: "Environmental Policy Analysis and Planning",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Arts", "Master of Public Administration", "Master of Public Policy", "Master of Regional Planning", "Master of Environmental Management", "Master of Environmental Science"]
  }, {
    id: 56,
    label: "Radio/Television and Film Production",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Bachelor of Fine Arts"]
  }, {
    id: 57,
    label: "Pharmacy",
    dts: ["Bachelor of Science"]
  }, {
    id: 58,
    label: "Sport Psychology",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 59,
    label: "Computer Graphics Technology (CGT)",
    dts: ["Bachelor of Science"]
  }, {
    id: 60,
    label: "Information Technology (IT)",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Technology", "Bachelor of Arts", "Master of Information Science", "Bachelor of Business Administration", "Bachelor of Engineering", "Master of Computer Science", "Bachelor of Applied Science"]
  }, {
    id: 61,
    label: "Civil and Environmental Engineering",
    dts: ["Bachelor of Science", "Bachelor of Engineering", "Master of Science", "Master of Civil Engineering"]
  }, {
    id: 62,
    label: "English and History",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Bachelor of Liberal Arts"]
  }, {
    id: 63,
    label: "Hispanic Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 64,
    label: "Rhetoric",
    dts: ["Bachelor of Arts"]
  }, {
    id: 65,
    label: "Flight Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 66,
    label: "Physics and Astronomy",
    dts: ["Bachelor of Science"]
  }, {
    id: 67,
    label: "Bachelor of Liberal Arts (BLA)",
    dts: []
  }, {
    id: 68,
    label: "Library and Information Science",
    dts: ["Bachelor of Arts", "Master of Library and Information Science", "Bachelor of Science", "Master of Science", "Master of Library Science", "Master of Information Science", "Bachelor of Liberal Arts", "Master of Arts", "Bachelor of Education", "Bachelor of Liberal Studies", "Master of Education"]
  }, {
    id: 69,
    label: "Forestry Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 70,
    label: "Astrophysics",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Doctor of Philosophy", "Master of Science"]
  }, {
    id: 71,
    label: "Home Economics",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 72,
    label: "Environmental Health and Safety",
    dts: ["Bachelor of Science"]
  }, {
    id: 73,
    label: "Art History",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Fine Arts"]
  }, {
    id: 74,
    label: "Organizational Psychology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science", "Doctor of Philosophy", "Master of Business Administration"]
  }, {
    id: 75,
    label: "Business Administration",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 76,
    label: "Arts and Science",
    dts: ["Bachelor of Arts", "Bachelor of Arts and Science"]
  }, {
    id: 77,
    label: "Fashion Merchandising",
    dts: ["Bachelor of Science"]
  }, {
    id: 78,
    label: "Psychology and Social Behavior",
    dts: ["Bachelor of Arts"]
  }, {
    id: 79,
    label: "Research Methodology and Quantitative Methods",
    dts: ["Bachelor of Arts"]
  }, {
    id: 80,
    label: "Advertising",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Arts", "Master of Business Administration", "Bachelor of Fine Arts", "Bachelor of Business Administration"]
  }, {
    id: 81,
    label: "Fire Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 82,
    label: "Information Technology (IT) and Systems",
    dts: ["Bachelor of Science"]
  }, {
    id: 83,
    label: "Watershed Hydrology and Management",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 84,
    label: "Environmental Design",
    dts: ["Bachelor of Science", "Master of Architecture", "Bachelor of Arts", "Bachelor of Architecture", "Bachelor of Design", "Master of Science"]
  }, {
    id: 85,
    label: "Family and Consumer Science",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 86,
    label: "Forensic Science",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 87,
    label: "Horticulture",
    dts: ["Bachelor of Science", "Master of Science", "Master of Landscape Architecture", "Bachelor of Arts", "Bachelor of Arts and Science"]
  }, {
    id: 88,
    label: "Plastics Engineering Technology",
    dts: ["Bachelor of Science", "Bachelor of Engineering Technology"]
  }, {
    id: 89,
    label: "Fire Protection Engineering",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 90,
    label: "Management Information Systems (MIS)",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 91,
    label: "Film Production",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts"]
  }, {
    id: 92,
    label: "Zoology",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 93,
    label: "Applied Behavior Analysis",
    dts: ["Bachelor of Arts", "Master of Science", "Bachelor of Science", "Master of Education", "Master of Arts"]
  }, {
    id: 94,
    label: "Cell Biology",
    dts: ["Bachelor of Science"]
  }, {
    id: 95,
    label: "Food Safety",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 96,
    label: "History and Philosophy of Science and Technology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Master of Arts"]
  }, {
    id: 97,
    label: "Landscape Design",
    dts: ["Bachelor of Science"]
  }, {
    id: 98,
    label: "Master of Information Science (MIS)",
    dts: []
  }, {
    id: 99,
    label: "Modern Languages",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 100,
    label: "Geography",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Arts"]
  }, {
    id: 101,
    label: "Liberal Studies",
    dts: ["Bachelor of Arts", "Bachelor of Liberal Studies", "Bachelor of Science", "Bachelor of Liberal Arts", "Master of Arts", "Master of Education", "Master of Liberal Arts", "Bachelor of Arts and Science"]
  }, {
    id: 102,
    label: "Organic Chemistry",
    dts: ["Bachelor of Science", "Doctor of Philosophy", "Master of Science"]
  }, {
    id: 103,
    label: "Building Construction (BC)",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Engineering", "Bachelor of Architecture", "Bachelor of Arts", "Master of Architecture"]
  }, {
    id: 104,
    label: "Mortuary Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 105,
    label: "Multimedia and Web Design",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 106,
    label: "Broadcast Communication",
    dts: ["Bachelor of Arts"]
  }, {
    id: 107,
    label: "Ecology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 108,
    label: "Community Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 109,
    label: "Family Nurse Practitioner (FNP) Studies",
    dts: ["Master of Science in Nursing", "Bachelor of Science in Nursing", "Master of Science", "Bachelor of Science"]
  }, {
    id: 110,
    label: "Computer Science (CS)",
    dts: ["Bachelor of Science", "Master of Science", "Master of Computer Science", "Bachelor of Arts", "Bachelor of Engineering", "Master of Business Administration", "Bachelor of Technology", "Doctor of Philosophy", "Master of Engineering", "Bachelor of Arts and Science", "Master of Information Science", "Master of Computer Applications", "Bachelor of Business Administration", "Master of Arts", "Doctor of Science"]
  }, {
    id: 111,
    label: "Visual Communication Design",
    dts: ["Bachelor of Fine Arts", "Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 112,
    label: "Foreign Affairs",
    dts: ["Bachelor of Arts"]
  }, {
    id: 113,
    label: "Textile and Apparel Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Fine Arts", "Master of Science"]
  }, {
    id: 114,
    label: "Astronomy",
    dts: ["Bachelor of Science", "Doctor of Philosophy"]
  }, {
    id: 115,
    label: "Biopsychology",
    dts: ["Bachelor of Science"]
  }, {
    id: 116,
    label: "Music Engineering Technology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 117,
    label: "East Asian Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Bachelor of Liberal Arts"]
  }, {
    id: 118,
    label: "Human Resources Management (HRM)",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 119,
    label: "Computational and Applied Mathematics",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 120,
    label: "Advanced Military and Operational Studies",
    dts: ["Master of Arts", "Master of Science"]
  }, {
    id: 121,
    label: "Family Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 122,
    label: "Japanese Language",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Business Administration", "Master of Science"]
  }, {
    id: 123,
    label: "Early Childhood Education",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Education", "Master of Education", "Master of Science"]
  }, {
    id: 124,
    label: "Master of Civil Engineering (MCE)",
    dts: []
  }, {
    id: 125,
    label: "Visual Arts (VA)",
    dts: ["Bachelor of Arts"]
  }, {
    id: 126,
    label: "Letters",
    dts: ["Bachelor of Arts"]
  }, {
    id: 127,
    label: "Supply Chain Management",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration"]
  }, {
    id: 128,
    label: "Foreign Languages",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Business Administration"]
  }, {
    id: 129,
    label: "Chinese Literature",
    dts: ["Bachelor of Arts"]
  }, {
    id: 130,
    label: "Apparel and Textile Manufacture",
    dts: ["Bachelor of Science"]
  }, {
    id: 131,
    label: "Community Development",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Social Work", "Master of Regional Planning", "Master of Arts"]
  }, {
    id: 132,
    label: "Early Childhood and Elementary Education",
    dts: ["Bachelor of Education", "Bachelor of Science", "Master of Education", "Bachelor of Arts"]
  }, {
    id: 133,
    label: "Nuclear Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 134,
    label: "Computer Networking Systems",
    dts: ["Bachelor of Science"]
  }, {
    id: 135,
    label: "Journalism",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science", "Master of Journalism", "Bachelor of Liberal Arts"]
  }, {
    id: 136,
    label: "Elementary Education",
    dts: ["Bachelor of Science", "Bachelor of Education", "Bachelor of Arts", "Master of Education", "Master of Science", "Master of Arts", "Master of Arts in Teaching"]
  }, {
    id: 137,
    label: "Divinity",
    dts: ["Master of Divinity", "Bachelor of Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 138,
    label: "Bachelor of Business Studies (BBS)",
    dts: []
  }, {
    id: 139,
    label: "Occupational Education",
    dts: ["Bachelor of Science"]
  }, {
    id: 140,
    label: "Human Nutrition",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 141,
    label: "Legal Assistant Studies",
    dts: ["Bachelor of Science"]
  }, {
    id: 142,
    label: "Physics",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Bachelor of Arts", "Master of Engineering", "Doctorate", "Master of Computer Science", "Master of Mechanical Engineering", "Master of Arts", "Bachelor of Arts and Science", "Bachelor of Engineering", "Master of Computer Applications"]
  }, {
    id: 143,
    label: "Physician Assistant Studies",
    dts: ["Bachelor of Science", "Master of Physician Assistant Studies"]
  }, {
    id: 144,
    label: "Hydrology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 145,
    label: "Communication Design",
    dts: ["Bachelor of Fine Arts"]
  }, {
    id: 146,
    label: "Women&#x27;s Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Social Work", "Master of Science", "Bachelor of Liberal Arts", "Master of Public Health", "Master of Public Administration", "Bachelor of Arts and Science", "Doctor of Philosophy", "Master of Public Policy", "Bachelor of Liberal Studies", "Master of Fine Arts", "Bachelor of General Studies", "Bachelor of Social Work", "Bachelor of Fine Arts"]
  }, {
    id: 147,
    label: "Special Education",
    dts: ["Master of Education", "Bachelor of Science", "Bachelor of Arts", "Bachelor of Education", "Master of Science", "Master of Arts"]
  }, {
    id: 148,
    label: "School Counseling",
    dts: ["Bachelor of Arts", "Master of Education", "Bachelor of Science", "Master of Science", "Master of Arts"]
  }, {
    id: 149,
    label: "Integrated Science and Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 150,
    label: "Political Economy",
    dts: ["Bachelor of Arts"]
  }, {
    id: 151,
    label: "Theatre Arts",
    dts: ["Bachelor of Arts"]
  }, {
    id: 152,
    label: "Theology",
    dts: ["Bachelor of Arts", "Master of Divinity", "Master of Arts", "Bachelor of Science", "Master of Theological Studies", "Bachelor of Theology", "Doctor of Philosophy", "Bachelor of Business Administration", "Bachelor of Liberal Arts", "Doctor of Ministry", "Master of Sacred Theology", "Master of Science", "Master of Education"]
  }, {
    id: 153,
    label: "Architectural Studies",
    dts: ["Bachelor of Science", "Master of Architecture", "Bachelor of Arts", "Bachelor of Architecture"]
  }, {
    id: 154,
    label: "Culinary Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 155,
    label: "Rhetoric and Composition",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 156,
    label: "Educational Studies (ED)",
    dts: ["Bachelor of Arts"]
  }, {
    id: 157,
    label: "Printing and Publishing",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 158,
    label: "English Literature",
    dts: ["Bachelor of Arts", "Master of Arts", "Master of Business Administration", "Bachelor of Science", "Master of Science", "Bachelor of Liberal Arts", "Master of Education", "Master of Fine Arts", "Doctor of Philosophy", "Master of Library and Information Science", "Bachelor of Fine Arts", "Master of Public Administration", "Bachelor of Arts and Science", "Master of Social Work", "Bachelor of Education", "Master of Arts in Teaching", "Master of Journalism", "Master of Divinity", "Master of Liberal Arts", "Master of Mass Communications", "Bachelor of General Studies", "Bachelor of Humanities", "Bachelor of Business Administration", "Doctorate", "Bachelor of Liberal Studies"]
  }, {
    id: 159,
    label: "Environmental Health and Safety Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 160,
    label: "Advertising and Graphic Design",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts", "Bachelor of Science"]
  }, {
    id: 161,
    label: "Architectural Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 162,
    label: "Individualized",
    dts: ["Bachelor of Arts"]
  }, {
    id: 163,
    label: "Quality Assurance",
    dts: ["Bachelor of Science"]
  }, {
    id: 164,
    label: "Emergency Medical Services (EMS)",
    dts: ["Bachelor of Science"]
  }, {
    id: 165,
    label: "Instructional Design and Technology",
    dts: ["Master of Education", "Bachelor of Arts", "Bachelor of Science", "Master of Science"]
  }, {
    id: 166,
    label: "Addiction Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Social Work", "Bachelor of Social Work", "Master of Arts"]
  }, {
    id: 167,
    label: "Child Development",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Education", "Master of Arts", "Master of Social Work", "Bachelor of Education"]
  }, {
    id: 168,
    label: "Electrical Engineering (BSEE)",
    dts: ["Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science"]
  }, {
    id: 169,
    label: "Intelligence Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science"]
  }, {
    id: 170,
    label: "Gerontology",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Social Work", "Master of Science", "Master of Science in Nursing", "Bachelor of Science in Nursing"]
  }, {
    id: 171,
    label: "Sociology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science", "Master of Social Work", "Bachelor of Arts and Science", "Bachelor of Liberal Arts", "Master of Education", "Doctor of Philosophy", "Master of Public Administration", "Bachelor of Social Work", "Master of Public Health"]
  }, {
    id: 172,
    label: "Culinary Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 173,
    label: "Evolution",
    dts: ["Bachelor of Science"]
  }, {
    id: 174,
    label: "Viticulture and Enology",
    dts: ["Bachelor of Science"]
  }, {
    id: 175,
    label: "Speech-Language Pathology",
    dts: ["Master of Science", "Bachelor of Science", "Bachelor of Arts", "Master of Arts"]
  }, {
    id: 176,
    label: "Bachelor of Business (BB)",
    dts: []
  }, {
    id: 177,
    label: "Theater Appreciation and Skills",
    dts: ["Bachelor of Arts"]
  }, {
    id: 178,
    label: "Animal/Livestock Husbandry and Production",
    dts: ["Bachelor of Science"]
  }, {
    id: 179,
    label: "Earth and Space Sciences (ESS)",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 180,
    label: "Russian and Eastern European Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 181,
    label: "Bachelor of Accountancy (BAcc)",
    dts: []
  }, {
    id: 182,
    label: "Youth Ministry",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Divinity"]
  }, {
    id: 183,
    label: "Engineering Management",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Engineering", "Master of Engineering Management", "Master of Engineering", "Master of Business Administration"]
  }, {
    id: 184,
    label: "Ergonomics",
    dts: ["Bachelor of Science"]
  }, {
    id: 185,
    label: "Anesthiology",
    dts: ["Bachelor of Science", "Bachelor of Science in Nursing"]
  }, {
    id: 186,
    label: "Public History",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 187,
    label: "Archives Management",
    dts: ["Bachelor of Arts", "Master of Library and Information Science", "Master of Library Science", "Master of Arts", "Master of Information Science", "Master of Science"]
  }, {
    id: 188,
    label: "Atmospheric Science",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 189,
    label: "Leadership",
    dts: ["Bachelor of Science", "Master of Business Administration", "Bachelor of Arts"]
  }, {
    id: 190,
    label: "Mathematical and Scientific Computation",
    dts: ["Bachelor of Science"]
  }, {
    id: 191,
    label: "Marine Transportation Management",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Business Administration"]
  }, {
    id: 192,
    label: "Cinema Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 193,
    label: "French Language",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Bachelor of Business Administration", "Bachelor of Liberal Arts", "Master of Education", "Doctor of Philosophy", "Bachelor of Arts and Science", "Bachelor of Fine Arts"]
  }, {
    id: 194,
    label: "Culture Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 195,
    label: "Facilities Management",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 196,
    label: "Music Performance",
    dts: ["Bachelor of Music", "Master of Music", "Bachelor of Arts"]
  }, {
    id: 197,
    label: "Business and Healthcare Management",
    dts: ["Bachelor of Science", "Master of Business Administration"]
  }, {
    id: 198,
    label: "Welding Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 199,
    label: "Energy Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 200,
    label: "History and Political Science",
    dts: ["Bachelor of Arts"]
  }, {
    id: 201,
    label: "Sound Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 202,
    label: "Human Biology",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 203,
    label: "Theater",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts"]
  }, {
    id: 204,
    label: "Molecular Biology",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 205,
    label: "Computer Forensics",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 206,
    label: "Crop Science",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 207,
    label: "Dietetics",
    dts: ["Bachelor of Science"]
  }, {
    id: 208,
    label: "Applied Statistics",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Bachelor of Business Administration", "Master of Arts", "Doctor of Philosophy", "Master of Business Administration"]
  }, {
    id: 209,
    label: "Materials Science and Engineering",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Bachelor of Engineering"]
  }, {
    id: 210,
    label: "Japanese Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 211,
    label: "Mechanical Engineering Technology (MET)",
    dts: ["Bachelor of Science", "Bachelor of Engineering Technology", "Master of Business Administration", "Master of Science"]
  }, {
    id: 212,
    label: "Manufacturing Engineering Technology",
    dts: ["Bachelor of Science", "Bachelor of Engineering Technology", "Master of Business Administration", "Master of Science"]
  }, {
    id: 213,
    label: "Modern Language Spanish",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 214,
    label: "Automotive Technology and Service Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 215,
    label: "Environmental Resource Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 216,
    label: "Management and Ethics",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration", "Bachelor of Arts"]
  }, {
    id: 217,
    label: "Dance",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts"]
  }, {
    id: 218,
    label: "College Student Personnel",
    dts: ["Master of Education", "Master of Science"]
  }, {
    id: 219,
    label: "Environmental Biology",
    dts: ["Bachelor of Science"]
  }, {
    id: 220,
    label: "Chemical and Biomolecular Engineering",
    dts: ["Bachelor of Science"]
  }, {
    id: 221,
    label: "Industrial Distribution",
    dts: ["Bachelor of Science"]
  }, {
    id: 222,
    label: "Architecture",
    dts: ["Master of Architecture", "Bachelor of Architecture", "Bachelor of Science", "Bachelor of Arts", "Master of Science", "Bachelor of Fine Arts", "Bachelor of Design", "Master of Arts", "Master of Business Administration", "Bachelor of Arts and Science", "Bachelor of Engineering", "Master of Regional Planning", "Master of Landscape Architecture", "Bachelor of Professional Studies", "Master of Engineering", "Master of Fine Arts", "Master of Design", "Master of Civil Engineering", "Master of Environmental Design", "Bachelor of Business Administration"]
  }, {
    id: 223,
    label: "Industrial Engineering (IE)",
    dts: ["Bachelor of Science", "Bachelor of Engineering", "Master of Science", "Master of Engineering", "Master of Business Administration"]
  }, {
    id: 224,
    label: "Communications Technology",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 225,
    label: "Manufacturing Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 226,
    label: "Cybersecurity",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 227,
    label: "Air Traffic Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 228,
    label: "Nanotechnology",
    dts: ["Bachelor of Science"]
  }, {
    id: 229,
    label: "Human Dimensions of Natural Resource Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 230,
    label: "Audio Engineering",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Music", "Bachelor of Applied Science", "Bachelor of Engineering", "Bachelor of Fine Arts"]
  }, {
    id: 231,
    label: "Electrical Engineering (EE)",
    dts: ["Bachelor of Science", "Master of Science", "Master of Engineering", "Bachelor of Engineering", "Doctor of Philosophy", "Master of Business Administration"]
  }, {
    id: 232,
    label: "Aviation Technology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 233,
    label: "Baking",
    dts: ["Bachelor of Science"]
  }, {
    id: 234,
    label: "Fashion",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts", "Bachelor of Science"]
  }, {
    id: 235,
    label: "Clinical Psychology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Doctor of Philosophy", "Master of Science", "Doctorate of Psychology", "Doctor of Psychology"]
  }, {
    id: 236,
    label: "Agriculture",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Arts", "Master of Education", "Bachelor of Engineering"]
  }, {
    id: 237,
    label: "Biblical Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Divinity", "Bachelor of Theology", "Master of Theological Studies", "Bachelor of Business Administration", "Doctor of Ministry", "Master of Science"]
  }, {
    id: 238,
    label: "Computer Aided Drafting and Design (CADD)",
    dts: ["Bachelor of Science"]
  }, {
    id: 239,
    label: "Jurisprudence",
    dts: ["Bachelor of Arts", "Master of Science"]
  }, {
    id: 240,
    label: "International Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Liberal Arts", "Master of Public Administration", "Master of Public Policy", "Master of Education"]
  }, {
    id: 241,
    label: "Manufacturing Engineering",
    dts: ["Bachelor of Science"]
  }, {
    id: 242,
    label: "Environmental Science",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Environmental Science", "Master of Business Administration", "Doctor of Philosophy", "Master of Environmental Management", "Master of Arts", "Master of Public Health", "Bachelor of Arts and Science", "Master of Engineering", "Master of Public Administration", "Master of Education", "Bachelor of Engineering", "Master of Regional Planning", "Master of Landscape Architecture", "Bachelor of Business Administration", "Bachelor of Liberal Arts", "Master of Public Policy", "Doctorate", "Bachelor of Education", "Doctor of Science"]
  }, {
    id: 243,
    label: "American Sign Language Interpreting",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 244,
    label: "Police Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 245,
    label: "Earth Science",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 246,
    label: "Optics",
    dts: ["Bachelor of Science", "Doctor of Philosophy", "Master of Science"]
  }, {
    id: 247,
    label: "Printmaking",
    dts: ["Bachelor of Fine Arts"]
  }, {
    id: 248,
    label: "Records Management",
    dts: ["Master of Library and Information Science", "Master of Library Science"]
  }, {
    id: 249,
    label: "International Security and Conflict Resolution",
    dts: ["Bachelor of Arts"]
  }, {
    id: 250,
    label: "Outdoor Education",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 251,
    label: "Polymer Chemistry",
    dts: ["Bachelor of Science", "Doctor of Philosophy", "Master of Science"]
  }, {
    id: 252,
    label: "Christian Education",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Divinity", "Bachelor of Religious Education"]
  }, {
    id: 253,
    label: "Culinary Nutrition",
    dts: ["Bachelor of Science"]
  }, {
    id: 254,
    label: "Church Ministries",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Divinity", "Master of Arts", "Doctor of Ministry"]
  }, {
    id: 255,
    label: "Emergency Medicine",
    dts: ["Bachelor of Science", "Master of Physician Assistant Studies"]
  }, {
    id: 256,
    label: "Ecological Management and Restoration",
    dts: ["Bachelor of Science"]
  }, {
    id: 257,
    label: "Marketing and Mass Communications",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 258,
    label: "Professional Golf Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 259,
    label: "Forensic Psychology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science"]
  }, {
    id: 260,
    label: "Strategy",
    dts: ["Master of Business Administration"]
  }, {
    id: 261,
    label: "Secondary English Teacher Education",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Education", "Bachelor of Education"]
  }, {
    id: 262,
    label: "Bachelor of Design (BDes)",
    dts: []
  }, {
    id: 263,
    label: "Quality Management",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 264,
    label: "Retail and Consumer Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 265,
    label: "Business Law",
    dts: ["Bachelor of Business Administration", "Bachelor of Science", "Bachelor of Arts", "Master of Business Administration", "Master of Studies in Law", "Bachelor of Civil Law", "Bachelor of Commerce"]
  }, {
    id: 266,
    label: "Tax Law",
    dts: ["Master of Taxation"]
  }, {
    id: 267,
    label: "Space Operations",
    dts: ["Bachelor of Science", "Master of Science", "Master of Engineering"]
  }, {
    id: 268,
    label: "Scandinavian Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 269,
    label: "International Affairs",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 270,
    label: "New Media",
    dts: ["Bachelor of Arts"]
  }, {
    id: 271,
    label: "Secondary Education",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Education", "Bachelor of Education", "Master of Arts", "Master of Science"]
  }, {
    id: 272,
    label: "Cell and Molecular Biology",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Bachelor of Arts"]
  }, {
    id: 273,
    label: "Athletic Training",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 274,
    label: "Digital Forensics",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 275,
    label: "Building Construction Management",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Technology", "Bachelor of Architecture", "Bachelor of Engineering"]
  }, {
    id: 276,
    label: "Dermatology",
    dts: ["Master of Physician Assistant Studies"]
  }, {
    id: 277,
    label: "Music Production and Engineering",
    dts: ["Bachelor of Music", "Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 278,
    label: "Microbiology",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Bachelor of Arts", "Master of Business Administration"]
  }, {
    id: 279,
    label: "Islamic Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 280,
    label: "Forensic Accounting",
    dts: ["Bachelor of Science", "Master of Accounting", "Bachelor of Accountancy", "Master of Science", "Master of Business Administration", "Bachelor of Business Administration"]
  }, {
    id: 281,
    label: "Latin American and Caribbean Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 282,
    label: "Classical Civilization",
    dts: ["Bachelor of Arts"]
  }, {
    id: 283,
    label: "Aviation Management",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Business Administration", "Bachelor of Arts", "Master of Public Administration", "Bachelor of Applied Arts and Science", "Master of Management", "Bachelor of Arts and Science", "Bachelor of Technology"]
  }, {
    id: 284,
    label: "English Teacher Education",
    dts: ["Bachelor of Arts"]
  }, {
    id: 285,
    label: "Peace Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 286,
    label: "Computer Engineering (CE)",
    dts: ["Bachelor of Science", "Bachelor of Engineering", "Master of Science", "Master of Engineering", "Master of Computer Science"]
  }, {
    id: 287,
    label: "Biophysics",
    dts: ["Bachelor of Science"]
  }, {
    id: 288,
    label: "Toxicology",
    dts: ["Bachelor of Science"]
  }, {
    id: 289,
    label: "Art",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts", "Bachelor of Science", "Master of Fine Arts"]
  }, {
    id: 290,
    label: "Native American Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 291,
    label: "Security Management",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 292,
    label: "Accounting",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Bachelor of Accountancy", "Master of Business Administration", "Master of Accounting", "Bachelor of Arts", "Master of Science", "Master of Professional Accountancy"]
  }, {
    id: 293,
    label: "Psychobiology",
    dts: ["Bachelor of Science"]
  }, {
    id: 294,
    label: "Cultural Anthropology",
    dts: ["Bachelor of Arts"]
  }, {
    id: 295,
    label: "Public Affairs",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Public Affairs", "Master of Public Administration"]
  }, {
    id: 296,
    label: "Computer Science and Information Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 297,
    label: "Security Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 298,
    label: "Psychology and Sociology",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 299,
    label: "Merchant Marine Officer Studies",
    dts: ["Bachelor of Science"]
  }, {
    id: 300,
    label: "Educational Psychology",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 301,
    label: "Law",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Bachelor of Civil Law", "Master of Studies in Law", "Master of Business Administration", "Master of Science", "Master of Legal Studies", "Bachelor of Business Administration", "Master of Arts", "Bachelor of Liberal Arts"]
  }, {
    id: 302,
    label: "Christian Ministry",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Divinity", "Master of Arts"]
  }, {
    id: 303,
    label: "Sociology and Anthropology",
    dts: ["Bachelor of Arts"]
  }, {
    id: 304,
    label: "Media Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 305,
    label: "Strategic Studies",
    dts: ["Bachelor of Science", "Master of Arts", "Master of Science"]
  }, {
    id: 306,
    label: "Construction Trades",
    dts: ["Bachelor of Science"]
  }, {
    id: 307,
    label: "Ecosystem Restoration and Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 308,
    label: "Human Resources (HR)",
    dts: ["Bachelor of Business Administration", "Bachelor of Science", "Master of Business Administration"]
  }, {
    id: 309,
    label: "Pharmaceutical Sciences (PS)",
    dts: ["Bachelor of Science"]
  }, {
    id: 310,
    label: "Master of Divinity (MDiv)",
    dts: []
  }, {
    id: 311,
    label: "Agricultural Systems Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 312,
    label: "Range Science and Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 313,
    label: "Human Services Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 314,
    label: "Sports Studies",
    dts: ["Bachelor of Science"]
  }, {
    id: 315,
    label: "Public Health (PH)",
    dts: ["Bachelor of Science", "Master of Public Health", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 316,
    label: "Public Policy Analysis",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Public Administration", "Master of Public Policy", "Master of Science", "Master of Arts", "Master of Public Affairs", "Master of Business Administration", "Master of Social Work", "Bachelor of Business Administration", "Doctor of Philosophy", "Master of Public Health"]
  }, {
    id: 317,
    label: "Sports Management",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Business Administration", "Bachelor of Business Administration", "Master of Arts", "Master of Education", "Bachelor of Education", "Bachelor of Arts and Science", "Master of Management", "Bachelor of Business", "Master of Professional Studies", "Master of Public Administration"]
  }, {
    id: 318,
    label: "International Economics",
    dts: ["Bachelor of Arts"]
  }, {
    id: 319,
    label: "Human Ecology",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 320,
    label: "Health Care Administration",
    dts: ["Bachelor of Science", "Master of Business Administration", "Master of Health Administration", "Bachelor of Business Administration", "Bachelor of Arts", "Master of Science", "Bachelor of Science in Nursing"]
  }, {
    id: 321,
    label: "Intelligence Operations",
    dts: ["Bachelor of Applied Science", "Bachelor of Arts"]
  }, {
    id: 322,
    label: "Consumer Economics",
    dts: ["Bachelor of Science"]
  }, {
    id: 323,
    label: "National Security Strategy",
    dts: ["Master of Arts", "Bachelor of Arts"]
  }, {
    id: 324,
    label: "Radio and Television",
    dts: ["Bachelor of Arts"]
  }, {
    id: 325,
    label: "General Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 326,
    label: "Coaching",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 327,
    label: "Hydrogeology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 328,
    label: "Econometrics",
    dts: ["Bachelor of Science"]
  }, {
    id: 329,
    label: "American History (United States)",
    dts: ["Bachelor of Arts", "Master of Arts", "Doctor of Philosophy", "Bachelor of Science", "Master of Science", "Bachelor of Liberal Arts", "Bachelor of Arts and Science", "Bachelor of Humanities"]
  }, {
    id: 330,
    label: "Cyber/Electronic Operations and Warfare",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 331,
    label: "Information Science (IS)",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 332,
    label: "Glass-Working",
    dts: ["Master of Fine Arts", "Bachelor of Fine Arts"]
  }, {
    id: 333,
    label: "Educational Leadership",
    dts: ["Master of Education", "Bachelor of Science", "Bachelor of Arts", "Doctor of Education", "Master of Arts"]
  }, {
    id: 334,
    label: "Packaging Science",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 335,
    label: "Civil Engineering Technology (CET)",
    dts: ["Bachelor of Science", "Bachelor of Engineering Technology"]
  }, {
    id: 336,
    label: "Human Development",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Arts", "Master of Science", "Master of Education", "Master of Social Work", "Bachelor of Humanities"]
  }, {
    id: 337,
    label: "Youth Library Services",
    dts: ["Master of Library and Information Science", "Master of Library Science"]
  }, {
    id: 338,
    label: "Aviation Science and Administration (AVA)",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Business Administration"]
  }, {
    id: 339,
    label: "Automotive Engineering",
    dts: ["Master of Science", "Bachelor of Engineering", "Master of Engineering", "Master of Mechanical Engineering", "Bachelor of Science"]
  }, {
    id: 340,
    label: "Human Relations",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 341,
    label: "Bioinformatics",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 342,
    label: "Petroleum Engineering",
    dts: ["Bachelor of Science"]
  }, {
    id: 343,
    label: "Biostatistics",
    dts: ["Bachelor of Science", "Master of Public Health", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 344,
    label: "Social Services",
    dts: ["Bachelor of Arts"]
  }, {
    id: 345,
    label: "Electrical and Computer Engineering (ECE)",
    dts: ["Bachelor of Science", "Master of Science", "Master of Engineering", "Bachelor of Engineering"]
  }, {
    id: 346,
    label: "Animal Nutrition",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 347,
    label: "Public Relations and Communication",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 348,
    label: "Sustainability",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Business Administration", "Master of Science", "Master of Arts"]
  }, {
    id: 349,
    label: "Film",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 350,
    label: "Architectural Engineering",
    dts: ["Bachelor of Science"]
  }, {
    id: 351,
    label: "Real Estate Development",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Business Administration", "Bachelor of Business Administration"]
  }, {
    id: 352,
    label: "History",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Business Administration", "Master of Science", "Bachelor of Liberal Arts", "Master of Education", "Doctor of Philosophy", "Master of Library and Information Science", "Master of Public Administration", "Bachelor of Arts and Science", "Bachelor of Education", "Bachelor of Humanities", "Master of Arts in Teaching", "Master of Divinity", "Master of Public Policy", "Bachelor of Fine Arts", "Master of Liberal Arts", "Bachelor of General Studies", "Master of Fine Arts", "Master of Library Science", "Bachelor of Business Administration", "Bachelor of Liberal Studies", "Master of Journalism", "Master of Philosophy", "Master of Accounting", "Doctorate", "Master of Theological Studies", "Doctor of Education", "Master of Health Administration", "Bachelor of Individualized Studies", "Master of Regional Planning", "Bachelor of Philosophy", "Bachelor of Music", "Bachelor of Special Studies", "Bachelor of University Studies", "Bachelor of Engineering", "Bachelor of Religious Education", "Bachelor of Social Work", "Bachelor of Accountancy", "Bachelor of Applied Arts and Science", "Bachelor of Applied Science", "Bachelor of Architecture"]
  }, {
    id: 353,
    label: "Biological Sciences",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Doctor of Philosophy"]
  }, {
    id: 354,
    label: "Accounting and Finance",
    dts: ["Bachelor of Science", "Master of Business Administration", "Bachelor of Business Administration", "Bachelor of Accountancy", "Master of Accounting", "Bachelor of Arts"]
  }, {
    id: 355,
    label: "Religious Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Divinity", "Master of Science", "Master of Theological Studies", "Bachelor of Liberal Arts", "Bachelor of Religious Education", "Doctor of Philosophy", "Bachelor of Arts and Science", "Bachelor of General Studies", "Bachelor of Fine Arts"]
  }, {
    id: 356,
    label: "Orthopedic Surgery Residency Program",
    dts: ["Bachelor of Science"]
  }, {
    id: 357,
    label: "Computer Programming",
    dts: ["Bachelor of Science"]
  }, {
    id: 358,
    label: "Computer Games and Programming Skills",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 359,
    label: "Fisheries Science",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 360,
    label: "Bachelor of Finance (BFin)",
    dts: []
  }, {
    id: 361,
    label: "Art Teacher Education",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts", "Bachelor of Science"]
  }, {
    id: 362,
    label: "Marine Science",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 363,
    label: "Finance",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration", "Bachelor of Finance", "Bachelor of Arts", "Master of Science", "Master of Finance"]
  }, {
    id: 364,
    label: "Movement Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 365,
    label: "Agricultural Journalism",
    dts: ["Bachelor of Science"]
  }, {
    id: 366,
    label: "African Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 367,
    label: "Family Life Education",
    dts: ["Bachelor of Arts"]
  }, {
    id: 368,
    label: "Chinese Language",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Bachelor of Business Administration"]
  }, {
    id: 369,
    label: "Space Systems Operations",
    dts: ["Bachelor of Science", "Master of Science", "Master of Engineering"]
  }, {
    id: 370,
    label: "Museum Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 371,
    label: "Health Policy",
    dts: ["Master of Public Health", "Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 372,
    label: "Communication Sciences and Disorders",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Arts"]
  }, {
    id: 373,
    label: "Agricultural Economics",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 374,
    label: "Food Science and Technology",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Master of Business Administration", "Bachelor of Engineering", "Bachelor of Arts"]
  }, {
    id: 375,
    label: "Acting",
    dts: ["Bachelor of Fine Arts"]
  }, {
    id: 376,
    label: "Drama",
    dts: ["Bachelor of Arts"]
  }, {
    id: 377,
    label: "Community Health",
    dts: ["Bachelor of Science"]
  }, {
    id: 378,
    label: "Creative Writing",
    dts: ["Bachelor of Arts", "Master of Fine Arts", "Master of Arts", "Bachelor of Fine Arts", "Bachelor of Science", "Bachelor of Liberal Arts", "Bachelor of Creative Arts", "Master of Science", "Bachelor of Arts and Science"]
  }, {
    id: 379,
    label: "English Language",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Liberal Arts", "Master of Education", "Bachelor of Education"]
  }, {
    id: 380,
    label: "Health Promotion",
    dts: ["Bachelor of Science"]
  }, {
    id: 381,
    label: "Urban Design",
    dts: ["Bachelor of Architecture", "Master of Architecture", "Bachelor of Arts", "Bachelor of Science", "Master of Regional Planning", "Master of Science"]
  }, {
    id: 382,
    label: "Construction Engineering Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 383,
    label: "Turfgrass Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 384,
    label: "Master of Arts in Teaching (MAT)",
    dts: []
  }, {
    id: 385,
    label: "Strategic Intelligence",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Arts"]
  }, {
    id: 386,
    label: "Agricultural Equipment Systems Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 387,
    label: "Health Care Management",
    dts: ["Bachelor of Science", "Master of Business Administration"]
  }, {
    id: 388,
    label: "Social Work (SW)",
    dts: ["Master of Social Work", "Bachelor of Social Work", "Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Arts", "Master of Education", "Doctor of Philosophy", "Master of Business Administration", "Bachelor of Arts and Science", "Bachelor of Liberal Arts", "Master of Public Administration", "Master of Public Health", "Master of Human Services"]
  }, {
    id: 389,
    label: "Counseling Psychology",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 390,
    label: "Network and Communications Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 391,
    label: "Human Rights",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 392,
    label: "Social Psychology",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 393,
    label: "Middle Eastern Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science"]
  }, {
    id: 394,
    label: "Painting",
    dts: ["Bachelor of Fine Arts"]
  }, {
    id: 395,
    label: "Product Design Engineering",
    dts: ["Bachelor of Science"]
  }, {
    id: 396,
    label: "Printing Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 397,
    label: "Hospitality and The Culinary Arts",
    dts: ["Bachelor of Science"]
  }, {
    id: 398,
    label: "English Literature (Britain and Commonwealth)",
    dts: ["Bachelor of Arts"]
  }, {
    id: 399,
    label: "Nursing Science",
    dts: ["Bachelor of Science in Nursing"]
  }, {
    id: 400,
    label: "Italian Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 401,
    label: "American Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Bachelor of Liberal Arts", "Doctor of Philosophy", "Bachelor of Arts and Science", "Bachelor of Liberal Studies"]
  }, {
    id: 402,
    label: "Social Ecology",
    dts: ["Bachelor of Arts"]
  }, {
    id: 403,
    label: "Automotive Technology",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Technology", "Bachelor of Applied Science", "Master of Mechanical Engineering", "Master of Engineering", "Bachelor of Engineering"]
  }, {
    id: 404,
    label: "Conflict Resolution",
    dts: ["Bachelor of Arts", "Master of Arts", "Master of Science"]
  }, {
    id: 405,
    label: "Master of Public Policy (MPP)",
    dts: []
  }, {
    id: 406,
    label: "Air Traffic Control",
    dts: ["Bachelor of Science", "Bachelor of Applied Science"]
  }, {
    id: 407,
    label: "Nutrition and Dietetics",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 408,
    label: "Professional and Technical Writing",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science"]
  }, {
    id: 409,
    label: "Agribusiness",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Business Administration", "Bachelor of Arts", "Bachelor of Business"]
  }, {
    id: 410,
    label: "Public Relations (PR)",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science", "Master of Business Administration", "Master of Mass Communications", "Bachelor of Arts and Science", "Bachelor of Liberal Arts"]
  }, {
    id: 411,
    label: "Data Processing",
    dts: ["Bachelor of Science"]
  }, {
    id: 412,
    label: "Forestry",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Master of Forestry", "Doctor of Philosophy"]
  }, {
    id: 413,
    label: "Audio Production",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Fine Arts", "Bachelor of Music"]
  }, {
    id: 414,
    label: "Computer Information Systems (CIS)",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Science", "Master of Business Administration", "Bachelor of Arts", "Master of Computer Science", "Master of Information Science"]
  }, {
    id: 415,
    label: "Interpreting",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 416,
    label: "Viticulture",
    dts: ["Bachelor of Science"]
  }, {
    id: 417,
    label: "Law and Society",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 418,
    label: "Structural Engineering (SE)",
    dts: ["Bachelor of Science", "Master of Science", "Master of Civil Engineering", "Bachelor of Engineering"]
  }, {
    id: 419,
    label: "Educational Technology (EDT)",
    dts: ["Master of Education"]
  }, {
    id: 420,
    label: "Bachelor of Social Work (BSW / BSocW)",
    dts: []
  }, {
    id: 421,
    label: "Neurological Surgery/Neurosurgery",
    dts: ["Bachelor of Science"]
  }, {
    id: 422,
    label: "Master of Business Administration (MBA)",
    dts: []
  }, {
    id: 423,
    label: "Spanish and Iberian Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 424,
    label: "Comparative History of Ideas",
    dts: ["Bachelor of Arts"]
  }, {
    id: 425,
    label: "Economic Crime and Fraud Management",
    dts: ["Master of Business Administration", "Bachelor of Science"]
  }, {
    id: 426,
    label: "Reading",
    dts: ["Master of Education", "Bachelor of Education", "Bachelor of Science", "Bachelor of Arts", "Master of Arts", "Master of Science"]
  }, {
    id: 427,
    label: "Philosophy and Religious Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Philosophy", "Doctor of Philosophy"]
  }, {
    id: 428,
    label: "Applied Mathematics",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Doctor of Philosophy", "Bachelor of Applied Science", "Master of Computer Science", "Master of Arts", "Bachelor of Engineering", "Doctorate", "Master of Engineering", "Bachelor of Business Administration", "Bachelor of Arts and Science"]
  }, {
    id: 429,
    label: "Genetics",
    dts: ["Bachelor of Science", "Doctor of Philosophy", "Master of Science"]
  }, {
    id: 430,
    label: "Nonprofit Management",
    dts: ["Bachelor of Arts"]
  }, {
    id: 431,
    label: "Funeral Service Education",
    dts: ["Bachelor of Science"]
  }, {
    id: 432,
    label: "Public Administration",
    dts: ["Bachelor of Arts", "Master of Public Administration", "Bachelor of Science", "Master of Business Administration", "Bachelor of Business Administration", "Master of Science", "Master of Arts", "Master of Public Policy", "Bachelor of Arts and Science", "Doctor of Philosophy", "Master of Social Work"]
  }, {
    id: 433,
    label: "Alcohol and Drug Studies",
    dts: ["Bachelor of Science", "Master of Social Work", "Bachelor of Social Work"]
  }, {
    id: 434,
    label: "Classics",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 435,
    label: "Army ROTC",
    dts: ["Bachelor of Arts"]
  }, {
    id: 436,
    label: "Textile Technology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 437,
    label: "Human Development and Family Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Social Work", "Master of Education", "Master of Arts", "Bachelor of Humanities", "Doctor of Philosophy", "Bachelor of Arts and Science", "Master of Public Health"]
  }, {
    id: 438,
    label: "Directed Energy Systems",
    dts: ["Master of Engineering"]
  }, {
    id: 439,
    label: "Health",
    dts: ["Bachelor of Science"]
  }, {
    id: 440,
    label: "Software Engineering",
    dts: ["Bachelor of Science", "Master of Science", "Master of Computer Science", "Bachelor of Engineering"]
  }, {
    id: 441,
    label: "Sculpture",
    dts: ["Bachelor of Fine Arts"]
  }, {
    id: 442,
    label: "German Language and Literature",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Doctor of Philosophy"]
  }, {
    id: 443,
    label: "Studio Art",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts", "Master of Fine Arts"]
  }, {
    id: 444,
    label: "Bioengineering (BioE)",
    dts: ["Bachelor of Science"]
  }, {
    id: 445,
    label: "Engineering Technology (ET)",
    dts: ["Bachelor of Science", "Bachelor of Engineering Technology", "Master of Science"]
  }, {
    id: 446,
    label: "Construction Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 447,
    label: "Historic Preservation",
    dts: ["Bachelor of Arts", "Master of Science"]
  }, {
    id: 448,
    label: "Fitness Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 449,
    label: "Human Services (HS)",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Arts", "Master of Social Work", "Bachelor of Humanities", "Master of Human Services", "Master of Business Administration", "Master of Education", "Bachelor of Social Work", "Master of Public Administration", "Bachelor of Arts and Science"]
  }, {
    id: 450,
    label: "Agronomy",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 451,
    label: "Military History",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 452,
    label: "Neuroscience",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Doctor of Philosophy", "Master of Science"]
  }, {
    id: 453,
    label: "Biomedical Sciences",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 454,
    label: "Communication Arts",
    dts: ["Bachelor of Arts"]
  }, {
    id: 455,
    label: "Mathematical Statistics and Probability",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 456,
    label: "Nursing",
    dts: ["Bachelor of Science in Nursing", "Master of Science in Nursing", "Bachelor of Science", "Master of Science", "Master of Business Administration", "Master of Nursing", "Doctor of Nursing Practice"]
  }, {
    id: 457,
    label: "Industrial Psychology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Arts"]
  }, {
    id: 458,
    label: "Pastoral Counseling",
    dts: ["Master of Divinity", "Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 459,
    label: "Digital Media",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Bachelor of Fine Arts", "Master of Science", "Master of Arts"]
  }, {
    id: 460,
    label: "Food Science",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 461,
    label: "Strategic Communication",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science"]
  }, {
    id: 462,
    label: "Wildlife Biology",
    dts: ["Bachelor of Science"]
  }, {
    id: 463,
    label: "Government and Politics",
    dts: ["Bachelor of Arts"]
  }, {
    id: 464,
    label: "Judaic Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 465,
    label: "Pastoral Ministry",
    dts: ["Bachelor of Arts", "Master of Divinity", "Bachelor of Science", "Master of Arts", "Doctor of Ministry", "Bachelor of Theology", "Master of Theological Studies"]
  }, {
    id: 466,
    label: "Human Performance",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 467,
    label: "Immunology",
    dts: ["Bachelor of Science"]
  }, {
    id: 468,
    label: "Secondary and Middle School Mathematics Teacher Education",
    dts: ["Bachelor of Science"]
  }, {
    id: 469,
    label: "Adult Education and Training",
    dts: ["Master of Education", "Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 470,
    label: "Media Arts",
    dts: ["Bachelor of Arts"]
  }, {
    id: 471,
    label: "Spanish Literature",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Liberal Arts", "Doctor of Philosophy"]
  }, {
    id: 472,
    label: "Funeral Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 473,
    label: "Nutrition Science",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 474,
    label: "Chemistry",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Doctor of Philosophy", "Master of Business Administration", "Doctorate", "Bachelor of Arts and Science", "Master of Arts", "Doctor of Pharmacy", "Master of Public Health", "Master of Engineering", "Bachelor of Engineering", "Doctor of Science", "Master of Education"]
  }, {
    id: 475,
    label: "French Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Bachelor of Liberal Arts"]
  }, {
    id: 476,
    label: "Curriculum and Instruction",
    dts: ["Master of Education", "Bachelor of Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 477,
    label: "Wildlife",
    dts: ["Bachelor of Science"]
  }, {
    id: 478,
    label: "Applied Linguistics",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 479,
    label: "Asian History",
    dts: ["Bachelor of Arts"]
  }, {
    id: 480,
    label: "Master of Human Services (MHS)",
    dts: []
  }, {
    id: 481,
    label: "Agricultural Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 482,
    label: "Behavioral Science",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Public Health", "Master of Arts"]
  }, {
    id: 483,
    label: "Chinese Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 484,
    label: "Asian Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Master of Business Administration", "Bachelor of Science", "Master of Science"]
  }, {
    id: 485,
    label: "Master of Education (MEd)",
    dts: []
  }, {
    id: 486,
    label: "Criminal Justice Administration",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Business Administration", "Master of Arts", "Master of Public Administration"]
  }, {
    id: 487,
    label: "Arabic Language",
    dts: ["Bachelor of Arts"]
  }, {
    id: 488,
    label: "American Sign Language (ASL)",
    dts: ["Bachelor of Arts"]
  }, {
    id: 489,
    label: "Biology and Chemistry",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 490,
    label: "Latin Language",
    dts: ["Bachelor of Arts"]
  }, {
    id: 491,
    label: "Cognitive Science",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Doctor of Philosophy", "Master of Science", "Master of Arts"]
  }, {
    id: 492,
    label: "Religion",
    dts: ["Bachelor of Arts", "Master of Divinity", "Bachelor of Science", "Master of Arts", "Bachelor of Religious Education", "Master of Business Administration", "Doctor of Philosophy", "Master of Theological Studies", "Master of Education", "Bachelor of Liberal Arts", "Master of Science", "Doctor of Ministry", "Bachelor of Theology", "Bachelor of Business Administration", "Bachelor of General Studies", "Bachelor of Fine Arts", "Bachelor of Arts and Science"]
  }, {
    id: 493,
    label: "Developmental Psychology",
    dts: ["Bachelor of Arts"]
  }, {
    id: 494,
    label: "Audio Technology",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 495,
    label: "Marine Affairs",
    dts: ["Bachelor of Science"]
  }, {
    id: 496,
    label: "Bachelor of Business Administration (BBA), Human Resources Management (HRM)",
    dts: []
  }, {
    id: 497,
    label: "Archaeology",
    dts: ["Bachelor of Arts"]
  }, {
    id: 498,
    label: "Film Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 499,
    label: "Sports Business",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Business Administration", "Bachelor of Business Administration"]
  }, {
    id: 500,
    label: "Applied Economics",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 501,
    label: "Sports Medicine",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Health Administration", "Master of Physical Therapy"]
  }, {
    id: 502,
    label: "Spanish Language",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Business Administration", "Master of Science", "Bachelor of Business Administration", "Bachelor of Liberal Arts", "Master of Education", "Bachelor of Arts and Science", "Master of Public Administration", "Doctor of Philosophy", "Bachelor of Education", "Bachelor of Science in Nursing", "Master of Arts in Teaching", "Bachelor of Social Work", "Bachelor of Fine Arts", "Bachelor of Liberal Studies", "Bachelor of Business"]
  }, {
    id: 503,
    label: "General Studies",
    dts: ["Bachelor of Arts", "Bachelor of General Studies", "Bachelor of Science", "Master of Business Administration", "Master of Science", "Master of Arts", "Bachelor of Liberal Arts", "Bachelor of Business Administration", "Master of Social Work", "Master of Education", "Bachelor of Science in Nursing", "Bachelor of Arts and Science", "Bachelor of Social Work", "Master of Public Administration", "Bachelor of Liberal Studies", "Bachelor of Applied Arts and Science", "Master of Science in Nursing", "Bachelor of Fine Arts"]
  }, {
    id: 504,
    label: "Wood Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 505,
    label: "Book and Magazine Publishing",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 506,
    label: "Health and Physical Education Teaching",
    dts: ["Bachelor of Science"]
  }, {
    id: 507,
    label: "Broadcasting Technology",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 508,
    label: "Library Science",
    dts: ["Bachelor of Arts", "Master of Library and Information Science", "Master of Library Science", "Bachelor of Science", "Master of Science", "Bachelor of Liberal Arts", "Master of Information Science"]
  }, {
    id: 509,
    label: "Exercise Physiology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 510,
    label: "Journalism and Electronic Media",
    dts: ["Bachelor of Arts"]
  }, {
    id: 511,
    label: "Asian American Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 512,
    label: "National Resource Strategy and Policy",
    dts: ["Master of Science"]
  }, {
    id: 513,
    label: "Natural Sciences",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 514,
    label: "Biotechnology",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Bachelor of Engineering", "Bachelor of Technology", "Bachelor of Arts"]
  }, {
    id: 515,
    label: "Theological Studies",
    dts: ["Bachelor of Arts", "Master of Divinity", "Bachelor of Science", "Master of Arts", "Bachelor of Theology", "Master of Theological Studies"]
  }, {
    id: 516,
    label: "Game Design and Development",
    dts: ["Bachelor of Science"]
  }, {
    id: 517,
    label: "International Relations",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Master of Business Administration"]
  }, {
    id: 518,
    label: "Computational Mathematics",
    dts: ["Bachelor of Science"]
  }, {
    id: 519,
    label: "Computer Science (CS) and Mathematics",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 520,
    label: "Regents Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 521,
    label: "Industrial Management",
    dts: ["Bachelor of Science", "Master of Business Administration", "Master of Science"]
  }, {
    id: 522,
    label: "Criminology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science"]
  }, {
    id: 523,
    label: "Intercultural Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 524,
    label: "Infectious Diseases",
    dts: ["Master of Public Health", "Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 525,
    label: "Arts Management",
    dts: ["Bachelor of Arts"]
  }, {
    id: 526,
    label: "Meteorology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 527,
    label: "Marketing and Management",
    dts: ["Bachelor of Business Administration", "Bachelor of Science", "Master of Business Administration"]
  }, {
    id: 528,
    label: "Natural Resource Management",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Environmental Management", "Master of Business Administration"]
  }, {
    id: 529,
    label: "Management",
    dts: ["Bachelor of Business Administration", "Bachelor of Science", "Master of Business Administration", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 530,
    label: "Translation Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 531,
    label: "Music",
    dts: ["Bachelor of Arts", "Bachelor of Music", "Master of Music", "Bachelor of Science", "Master of Arts", "Bachelor of Music Education"]
  }, {
    id: 532,
    label: "Digital Media Design",
    dts: ["Bachelor of Arts"]
  }, {
    id: 533,
    label: "Mechanical Engineering (BSME)",
    dts: ["Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science", "Bachelor of Science"]
  }, {
    id: 534,
    label: "Health Sciences",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 535,
    label: "School Psychology",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 536,
    label: "Bachelor of Engineering (BEng / BE)",
    dts: []
  }, {
    id: 537,
    label: "International Development Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 538,
    label: "Physical Therapy",
    dts: ["Bachelor of Science", "Master of Physical Therapy"]
  }, {
    id: 539,
    label: "Applied Ethics",
    dts: ["Bachelor of Science", "Master of Divinity", "Bachelor of Arts"]
  }, {
    id: 540,
    label: "Graphic Design",
    dts: ["Bachelor of Fine Arts", "Bachelor of Arts", "Bachelor of Science", "Bachelor of Design", "Master of Fine Arts", "Bachelor of Fine Arts", "Master of Arts", "Master of Science"]
  }, {
    id: 541,
    label: "Pastoral Studies",
    dts: ["Bachelor of Arts", "Master of Divinity", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 542,
    label: "Human Physiology",
    dts: ["Bachelor of Science"]
  }, {
    id: 543,
    label: "Reading and Literacy",
    dts: ["Master of Education"]
  }, {
    id: 544,
    label: "Organizational Communication",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 545,
    label: "Neurobiology",
    dts: ["Bachelor of Science", "Bachelor of Science"]
  }, {
    id: 546,
    label: "Multimedia",
    dts: ["Bachelor of Arts"]
  }, {
    id: 547,
    label: "Biology",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Doctor of Philosophy", "Master of Public Health", "Master of Arts", "Bachelor of Arts and Science", "Master of Physician Assistant Studies", "Doctor of Veterinary Medicine", "Master of Education", "Master of Health Administration", "Doctorate", "Master of Science in Nursing", "Bachelor of Science in Nursing"]
  }, {
    id: 548,
    label: "Bachelor of Arts (BA)",
    dts: []
  }, {
    id: 549,
    label: "Agricultural and Horticultural Plant Breeding",
    dts: ["Bachelor of Science", "Doctor of Philosophy"]
  }, {
    id: 550,
    label: "Global Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science"]
  }, {
    id: 551,
    label: "Environmental Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Arts", "Master of Business Administration", "Master of Public Administration", "Bachelor of Arts and Science", "Master of Regional Planning", "Bachelor of Liberal Arts", "Master of Environmental Management", "Master of Environmental Science", "Master of Education", "Master of Public Policy", "Master of Public Health", "Doctor of Philosophy", "Bachelor of Liberal Studies"]
  }, {
    id: 552,
    label: "Applied Physics",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Bachelor of Arts"]
  }, {
    id: 553,
    label: "Professional Counseling",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 554,
    label: "Humanities",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Bachelor of Humanities", "Master of Business Administration", "Master of Science", "Bachelor of Liberal Arts", "Bachelor of General Studies", "Bachelor of Fine Arts", "Doctor of Philosophy", "Master of Education", "Master of Liberal Arts", "Bachelor of Business Administration", "Bachelor of Arts and Science"]
  }, {
    id: 555,
    label: "Photography",
    dts: ["Bachelor of Fine Arts", "Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 556,
    label: "Community Organization and Advocacy",
    dts: ["Master of Social Work", "Bachelor of Arts"]
  }, {
    id: 557,
    label: "Biomedical Engineering (BME)",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Engineering", "Master of Engineering", "Doctor of Philosophy"]
  }, {
    id: 558,
    label: "Economics and Mathematics",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 559,
    label: "City and Regional Planning",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Regional Planning", "Master of Science"]
  }, {
    id: 560,
    label: "Microbiology and Immunology",
    dts: ["Bachelor of Science"]
  }, {
    id: 561,
    label: "Technical Communication",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 562,
    label: "Graphic Communication",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Fine Arts", "Master of Science", "Master of Arts", "Bachelor of Arts and Science", "Bachelor of Liberal Arts", "Bachelor of Applied Science"]
  }, {
    id: 563,
    label: "Government",
    dts: ["Bachelor of Arts", "Master of Public Administration", "Bachelor of Science"]
  }, {
    id: 564,
    label: "Forensic Chemistry",
    dts: ["Bachelor of Science"]
  }, {
    id: 565,
    label: "Computational Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 566,
    label: "Legal Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Business Administration", "Master of Business Administration", "Master of Science", "Master of Legal Studies", "Master of Arts", "Bachelor of Arts and Science", "Bachelor of Liberal Arts", "Bachelor of Liberal Studies", "Master of Public Administration", "Bachelor of General Studies", "Bachelor of Business Studies"]
  }, {
    id: 567,
    label: "Telecommunications Technology",
    dts: ["Bachelor of Arts"]
  }, {
    id: 568,
    label: "Enology",
    dts: ["Bachelor of Science"]
  }, {
    id: 569,
    label: "Media Communication",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 570,
    label: "Technical Writing",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 571,
    label: "Chemical Engineering",
    dts: ["Bachelor of Science", "Bachelor of Engineering", "Master of Science", "Doctor of Philosophy", "Master of Engineering", "Master of Business Administration"]
  }, {
    id: 572,
    label: "Mental Health",
    dts: ["Master of Social Work"]
  }, {
    id: 573,
    label: "Statistics",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Arts", "Doctor of Philosophy", "Master of Business Administration", "Bachelor of Business Administration", "Master of Public Health", "Master of Computer Science", "Bachelor of Arts and Science", "Bachelor of Engineering", "Bachelor of Commerce", "Master of Public Administration", "Master of Education", "Master of Information Science", "Doctorate", "Master of Professional Studies"]
  }, {
    id: 574,
    label: "Neonatalogy",
    dts: ["Bachelor of Science in Nursing", "Master of Science in Nursing"]
  }, {
    id: 575,
    label: "Military and Strategic Leadership",
    dts: ["Master of Arts", "Bachelor of Arts"]
  }, {
    id: 576,
    label: "Nuclear Medicine",
    dts: ["Bachelor of Science"]
  }, {
    id: 577,
    label: "Artificial Intelligence",
    dts: ["Master of Computer Science", "Bachelor of Science"]
  }, {
    id: 578,
    label: "Marketing and Communications",
    dts: ["Bachelor of Arts"]
  }, {
    id: 579,
    label: "Psychiatry",
    dts: ["Master of Science in Nursing", "Bachelor of Science in Nursing", "Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Social Work", "Master of Nursing", "Doctor of Nursing Science"]
  }, {
    id: 580,
    label: "Informatics",
    dts: ["Bachelor of Science", "Master of Science", "Master of Science in Nursing", "Bachelor of Science in Nursing"]
  }, {
    id: 581,
    label: "Homeland Security",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Arts", "Master of Professional Studies"]
  }, {
    id: 582,
    label: "Recreational Studies",
    dts: ["Bachelor of Science"]
  }, {
    id: 583,
    label: "International Agricultural Development",
    dts: ["Bachelor of Science"]
  }, {
    id: 584,
    label: "Industrial Engineering and Management",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Engineering"]
  }, {
    id: 585,
    label: "Horticulture and Agronomy",
    dts: ["Bachelor of Science"]
  }, {
    id: 586,
    label: "European History",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Liberal Arts", "Bachelor of Science", "Doctor of Philosophy", "Master of Education"]
  }, {
    id: 587,
    label: "Bachelor of Fine Arts (BFA)",
    dts: []
  }, {
    id: 588,
    label: "Human Computer Interaction",
    dts: ["Master of Science", "Bachelor of Science", "Bachelor of Arts", "Master of Information Science", "Master of Computer Science", "Bachelor of Engineering", "Bachelor of Fine Arts"]
  }, {
    id: 589,
    label: "Health and Exercise Science",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 590,
    label: "Computational Linguistics",
    dts: ["Bachelor of Arts", "Master of Science", "Bachelor of Science"]
  }, {
    id: 591,
    label: "Biochemistry and Molecular Biology",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Bachelor of Arts"]
  }, {
    id: 592,
    label: "Justice Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 593,
    label: "Kinesiology",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Education", "Master of Arts", "Master of Occupational Therapy", "Bachelor of Education", "Master of Public Health", "Bachelor of Arts and Science", "Doctor of Philosophy", "Master of Physical Therapy", "Doctorate", "Bachelor of Applied Science", "Bachelor of Science in Nursing"]
  }, {
    id: 594,
    label: "Professional Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Professional Studies", "Master of Science", "Master of Business Administration"]
  }, {
    id: 595,
    label: "Comparative Literature",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Liberal Arts"]
  }, {
    id: 596,
    label: "Nautical Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 597,
    label: "Fitness",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Business Administration"]
  }, {
    id: 598,
    label: "European Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 599,
    label: "Construction Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 600,
    label: "Philosophy and Religion",
    dts: ["Bachelor of Arts", "Master of Divinity", "Master of Arts", "Bachelor of Philosophy", "Bachelor of Science", "Bachelor of Liberal Arts", "Doctor of Philosophy"]
  }, {
    id: 601,
    label: "Geographic Information Systems (GIS)",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 602,
    label: "Paralegal Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Professional Studies", "Master of Science", "Bachelor of Applied Science", "Bachelor of Arts and Science", "Bachelor of Professional Studies", "Bachelor of Business Administration"]
  }, {
    id: 603,
    label: "Financial Mathematics",
    dts: ["Bachelor of Science", "Master of Science", "Master of Arts", "Bachelor of Arts"]
  }, {
    id: 604,
    label: "Child and Family Studies",
    dts: ["Bachelor of Science", "Master of Social Work", "Bachelor of Arts", "Bachelor of Social Work", "Master of Science", "Master of Arts", "Master of Education"]
  }, {
    id: 605,
    label: "Recreation Management",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Business Administration"]
  }, {
    id: 606,
    label: "Analytical Chemistry",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 607,
    label: "Children&#x27;s Services",
    dts: ["Master of Social Work", "Bachelor of Arts"]
  }, {
    id: 608,
    label: "Physical Education Teaching",
    dts: ["Bachelor of Science", "Bachelor of Education"]
  }, {
    id: 609,
    label: "Urban Planning",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Regional Planning", "Master of Science", "Master of Architecture", "Master of Arts", "Bachelor of Architecture", "Master of Public Administration"]
  }, {
    id: 610,
    label: "French Literature",
    dts: ["Bachelor of Arts", "Master of Arts", "Doctor of Philosophy"]
  }, {
    id: 611,
    label: "Global and International Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 612,
    label: "Turf Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 613,
    label: "Physical Education and Exercise Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 614,
    label: "Middle Eastern and African Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 615,
    label: "Ornamental Horticulture",
    dts: ["Bachelor of Science"]
  }, {
    id: 616,
    label: "Community Health Education",
    dts: ["Bachelor of Science"]
  }, {
    id: 617,
    label: "Environmental Management",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Environmental Management", "Master of Business Administration", "Master of Environmental Science"]
  }, {
    id: 618,
    label: "Family and Community Services",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Social Work"]
  }, {
    id: 619,
    label: "Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 620,
    label: "Forest Resources Production and Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 621,
    label: "Criminal Justice",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Master of Arts", "Master of Business Administration", "Bachelor of Arts and Science", "Master of Public Administration", "Bachelor of Liberal Arts", "Master of Social Work", "Master of Education", "Bachelor of Applied Science", "Bachelor of Business Administration", "Doctor of Philosophy", "Bachelor of General Studies", "Master of Management", "Bachelor of Applied Arts and Science", "Master of Human Services", "Bachelor of Civil Law", "Master of Legal Studies"]
  }, {
    id: 622,
    label: "Financial Economics",
    dts: ["Bachelor of Science"]
  }, {
    id: 623,
    label: "Fashion Design",
    dts: ["Bachelor of Fine Arts", "Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 624,
    label: "General Business",
    dts: ["Bachelor of Science", "Master of Business Administration", "Bachelor of Business Administration", "Bachelor of Arts"]
  }, {
    id: 625,
    label: "Airway Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 626,
    label: "Bachelor of Music (BMus / BM)",
    dts: []
  }, {
    id: 627,
    label: "Marine Biology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 628,
    label: "Humanities and Western Civilization",
    dts: ["Bachelor of Arts"]
  }, {
    id: 629,
    label: "Furniture Design",
    dts: ["Bachelor of Fine Arts", "Master of Fine Arts", "Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Bachelor of Industrial Design"]
  }, {
    id: 630,
    label: "Molecular Genetics",
    dts: ["Bachelor of Science"]
  }, {
    id: 631,
    label: "Linguistics",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Bachelor of Liberal Arts", "Master of Education"]
  }, {
    id: 632,
    label: "Urban Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 633,
    label: "Logic",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science"]
  }, {
    id: 634,
    label: "Woodworking",
    dts: ["Bachelor of Fine Arts"]
  }, {
    id: 635,
    label: "Mathematics",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science", "Doctor of Philosophy", "Master of Business Administration", "Master of Arts", "Master of Education", "Master of Computer Science", "Bachelor of Arts and Science", "Bachelor of Education", "Master of Engineering", "Bachelor of Business Administration", "Bachelor of Engineering", "Master of Arts in Teaching", "Doctorate", "Bachelor of Liberal Arts", "Master of Accounting", "Bachelor of General Studies", "Master of Information Science", "Master of Computer Applications", "Master of Mechanical Engineering", "Doctor of Education", "Master of Public Administration", "Master of Engineering Management", "Bachelor of Applied Science", "Doctor of Science", "Master of Finance", "Master of Architecture", "Bachelor of Finance", "Bachelor of Accountancy", "Bachelor of Engineering Technology"]
  }, {
    id: 636,
    label: "Interior Design",
    dts: ["Bachelor of Science", "Bachelor of Fine Arts", "Bachelor of Arts", "Bachelor of Design"]
  }, {
    id: 637,
    label: "Teaching",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Education"]
  }, {
    id: 638,
    label: "Liberal Arts",
    dts: ["Bachelor of Arts", "Bachelor of Liberal Arts", "Bachelor of Science", "Master of Arts", "Bachelor of General Studies", "Master of Education", "Bachelor of Liberal Studies", "Bachelor of Fine Arts", "Master of Liberal Arts", "Bachelor of Business Administration", "Bachelor of Humanities", "Master of Public Administration", "Bachelor of Applied Arts and Science", "Bachelor of Arts and Science"]
  }, {
    id: 639,
    label: "Project Management",
    dts: ["Master of Business Administration", "Bachelor of Science", "Bachelor of Business Administration", "Master of Science"]
  }, {
    id: 640,
    label: "Natural Resources",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 641,
    label: "Family Medicine",
    dts: ["Master of Physician Assistant Studies"]
  }, {
    id: 642,
    label: "Agricultural and Resource Economics",
    dts: ["Bachelor of Science"]
  }, {
    id: 643,
    label: "Social Science",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 644,
    label: "Physical Sciences",
    dts: ["Bachelor of Science"]
  }, {
    id: 645,
    label: "Geochemistry",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 646,
    label: "Drawing and Painting",
    dts: ["Bachelor of Fine Arts"]
  }, {
    id: 647,
    label: "Agribusiness Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 648,
    label: "Doctorate (PhD)",
    dts: []
  }, {
    id: 649,
    label: "Biochemistry (BCH)",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy", "Bachelor of Arts"]
  }, {
    id: 650,
    label: "Business and Sustainability",
    dts: ["Bachelor of Science", "Master of Business Administration", "Bachelor of Arts"]
  }, {
    id: 651,
    label: "Master of Professional Studies (MPS)",
    dts: []
  }, {
    id: 652,
    label: "Life Sciences",
    dts: ["Bachelor of Science"]
  }, {
    id: 653,
    label: "Communication Studies and Journalism",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 654,
    label: "Administration of Justice",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 655,
    label: "Electronics and Communications Engineering",
    dts: ["Bachelor of Engineering", "Master of Science"]
  }, {
    id: 656,
    label: "Bachelor of Engineering Technology (BET)",
    dts: []
  }, {
    id: 657,
    label: "Geriatrics",
    dts: ["Master of Social Work", "Bachelor of Arts", "Bachelor of Science", "Bachelor of Science in Nursing", "Master of Science in Nursing", "Bachelor of Social Work", "Master of Occupational Therapy"]
  }, {
    id: 658,
    label: "Anthropology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science", "Doctor of Philosophy", "Master of Public Health"]
  }, {
    id: 659,
    label: "Health and Fitness",
    dts: ["Bachelor of Science"]
  }, {
    id: 660,
    label: "Construction Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 661,
    label: "Landscape Management",
    dts: ["Bachelor of Science"]
  }, {
    id: 662,
    label: "Business Administration and Accounting",
    dts: ["Bachelor of Science"]
  }, {
    id: 663,
    label: "Counseling",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Master of Education"]
  }, {
    id: 664,
    label: "Professional Pilot Education",
    dts: ["Bachelor of Science"]
  }, {
    id: 665,
    label: "Information Technology Management",
    dts: ["Bachelor of Science", "Master of Business Administration", "Master of Science", "Bachelor of Business Administration", "Bachelor of Arts"]
  }, {
    id: 666,
    label: "Agricultural Economics and Business",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Arts", "Master of Arts"]
  }, {
    id: 667,
    label: "Corporate Management and Law",
    dts: ["Bachelor of Business Administration"]
  }, {
    id: 668,
    label: "Recreation Administration",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 669,
    label: "Environmental Engineering",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Engineering"]
  }, {
    id: 670,
    label: "Fine Arts",
    dts: ["Bachelor of Fine Arts", "Bachelor of Arts"]
  }, {
    id: 671,
    label: "Systems Engineering",
    dts: ["Bachelor of Science", "Master of Science", "Master of Engineering"]
  }, {
    id: 672,
    label: "Master of Social Work (MSW)",
    dts: []
  }, {
    id: 673,
    label: "Industrial and Systems Engineering",
    dts: ["Bachelor of Science"]
  }, {
    id: 674,
    label: "Sustainable Agriculture",
    dts: ["Bachelor of Science"]
  }, {
    id: 675,
    label: "Civil Engineering (CE)",
    dts: ["Bachelor of Science", "Bachelor of Engineering", "Master of Science", "Master of Civil Engineering", "Master of Engineering", "Master of Business Administration"]
  }, {
    id: 676,
    label: "Land Use Planning",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 677,
    label: "Publishing",
    dts: ["Bachelor of Arts"]
  }, {
    id: 678,
    label: "Ancient/Classical Greek Language",
    dts: ["Bachelor of Arts"]
  }, {
    id: 679,
    label: "Energy Management",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration"]
  }, {
    id: 680,
    label: "Interdisciplinary Studies (IS)",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Arts", "Master of Business Administration", "Master of Education"]
  }, {
    id: 681,
    label: "Computing",
    dts: ["Bachelor of Science"]
  }, {
    id: 682,
    label: "Mass Communication",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Business Administration", "Master of Science"]
  }, {
    id: 683,
    label: "Epidemiology",
    dts: ["Master of Public Health", "Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 684,
    label: "Master of Business Administration (MBA), Human Resources Management (HRM)",
    dts: []
  }, {
    id: 685,
    label: "Bachelor of Technology (BT / BTech)",
    dts: []
  }, {
    id: 686,
    label: "Social Welfare",
    dts: ["Bachelor of Arts", "Master of Social Work", "Bachelor of Social Work"]
  }, {
    id: 687,
    label: "Occupational Therapy (OT)",
    dts: ["Bachelor of Science", "Master of Occupational Therapy", "Master of Science"]
  }, {
    id: 688,
    label: "Web Design and Development",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 689,
    label: "Oncology",
    dts: ["Bachelor of Science in Nursing", "Master of Science", "Master of Science in Nursing", "Doctor of Philosophy"]
  }, {
    id: 690,
    label: "Gender Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Social Work", "Master of Science", "Bachelor of Liberal Arts"]
  }, {
    id: 691,
    label: "Math and Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 692,
    label: "Multidisciplinary Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 693,
    label: "Portuguese Language",
    dts: ["Bachelor of Arts"]
  }, {
    id: 694,
    label: "Housing",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Regional Planning"]
  }, {
    id: 695,
    label: "Finance and Economics",
    dts: ["Bachelor of Science", "Master of Business Administration", "Bachelor of Business Administration", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 696,
    label: "Aerospace Engineering",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Engineering", "Master of Engineering", "Doctor of Philosophy"]
  }, {
    id: 697,
    label: "Animal Science",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 698,
    label: "Equine Studies",
    dts: ["Bachelor of Science"]
  }, {
    id: 699,
    label: "Flight Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 700,
    label: "Electrical and Electronics Engineering (EEE)",
    dts: ["Master of Science", "Bachelor of Engineering"]
  }, {
    id: 701,
    label: "Ethics",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Divinity", "Master of Business Administration", "Bachelor of Business Administration", "Master of Science", "Doctor of Philosophy", "Master of Arts", "Bachelor of Liberal Arts", "Bachelor of Philosophy"]
  }, {
    id: 702,
    label: "Conservation Biology",
    dts: ["Bachelor of Science"]
  }, {
    id: 703,
    label: "Law Enforcement",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 704,
    label: "Music Business",
    dts: ["Bachelor of Science"]
  }, {
    id: 705,
    label: "Plant Sciences",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 706,
    label: "Russian Studies",
    dts: ["Bachelor of Arts", "Master of Arts"]
  }, {
    id: 707,
    label: "Aeronautical/Aerospace Engineering Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 708,
    label: "Nuclear Engineering Technology (NET)",
    dts: ["Bachelor of Science"]
  }, {
    id: 709,
    label: "Sustainable Development",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 710,
    label: "Wildlife and Fisheries Science",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 711,
    label: "Christian Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Divinity"]
  }, {
    id: 712,
    label: "Physical Chemistry",
    dts: ["Bachelor of Science", "Doctor of Philosophy"]
  }, {
    id: 713,
    label: "Applied Intelligence",
    dts: ["Master of Professional Studies", "Master of Science"]
  }, {
    id: 714,
    label: "Entertainment Business",
    dts: ["Bachelor of Science"]
  }, {
    id: 715,
    label: "Aviation Maintenance Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 716,
    label: "Workforce Education and Development",
    dts: ["Bachelor of Science", "Master of Science", "Master of Education", "Master of Arts", "Bachelor of Arts", "Bachelor of Education"]
  }, {
    id: 717,
    label: "Philosophy",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Bachelor of Philosophy", "Master of Science", "Master of Business Administration", "Doctor of Philosophy", "Bachelor of Liberal Arts", "Master of Philosophy", "Bachelor of Arts and Science", "Master of Education", "Master of Divinity", "Bachelor of Business Administration", "Master of Computer Science", "Master of Liberal Arts", "Bachelor of Fine Arts", "Bachelor of General Studies", "Bachelor of Humanities", "Doctorate", "Master of Theological Studies", "Bachelor of Liberal Studies", "Bachelor of Theology"]
  }, {
    id: 718,
    label: "Radio Broadcasting",
    dts: ["Bachelor of Arts"]
  }, {
    id: 719,
    label: "Environmental and Natural Resource Economics",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 720,
    label: "Recreation and Leisure Studies",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Science"]
  }, {
    id: 721,
    label: "Writing",
    dts: ["Bachelor of Arts", "Master of Arts", "Master of Fine Arts", "Bachelor of Science", "Master of Science", "Bachelor of Fine Arts", "Bachelor of Liberal Arts", "Master of Education"]
  }, {
    id: 722,
    label: "Art Administration",
    dts: ["Bachelor of Arts"]
  }, {
    id: 723,
    label: "Foods and Nutrition",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 724,
    label: "Interior Architecture",
    dts: ["Bachelor of Fine Arts", "Bachelor of Science", "Bachelor of Arts", "Master of Architecture", "Bachelor of Architecture", "Master of Arts", "Master of Science", "Master of Fine Arts", "Master of Design", "Bachelor of Design"]
  }, {
    id: 725,
    label: "International Law",
    dts: ["Bachelor of Arts"]
  }, {
    id: 726,
    label: "Visual Communications",
    dts: ["Bachelor of Fine Arts", "Bachelor of Arts"]
  }, {
    id: 727,
    label: "Political Science (PolySci)",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Business Administration", "Master of Arts", "Master of Science", "Master of Public Administration", "Bachelor of Arts and Science", "Bachelor of Liberal Arts", "Master of Public Policy", "Doctor of Philosophy", "Master of Education"]
  }, {
    id: 728,
    label: "Organizational Leadership",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Business Administration", "Master of Science"]
  }, {
    id: 729,
    label: "Professional Writing",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science", "Master of Fine Arts"]
  }, {
    id: 730,
    label: "Child and Family Development",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Social Work", "Master of Science"]
  }, {
    id: 731,
    label: "Radiology",
    dts: ["Bachelor of Science", "Master of Science", "Master of Health Administration", "Bachelor of Applied Science"]
  }, {
    id: 732,
    label: "Mass Media",
    dts: ["Bachelor of Arts"]
  }, {
    id: 733,
    label: "Environmental Horticulture and Urban Forestry",
    dts: ["Bachelor of Science"]
  }, {
    id: 734,
    label: "Musical Theatre",
    dts: ["Bachelor of Fine Arts"]
  }, {
    id: 735,
    label: "Industrial Technology (IT)",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Engineering Technology"]
  }, {
    id: 736,
    label: "Parks and Recreation Management",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 737,
    label: "Korean Studies",
    dts: ["Bachelor of Arts"]
  }, {
    id: 738,
    label: "Exercise Science",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Occupational Therapy", "Master of Public Health", "Master of Education", "Master of Arts", "Bachelor of Arts and Science", "Bachelor of Education", "Master of Physical Therapy", "Doctor of Philosophy"]
  }, {
    id: 739,
    label: "Design",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts", "Bachelor of Science", "Master of Science"]
  }, {
    id: 740,
    label: "Health and Human Performance",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 741,
    label: "Poultry Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 742,
    label: "Community and Human Services",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 743,
    label: "Therapeutic Recreation",
    dts: ["Bachelor of Science"]
  }, {
    id: 744,
    label: "University Studies",
    dts: ["Bachelor of Science"]
  }, {
    id: 745,
    label: "Sustainable Design",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Bachelor of Architecture", "Master of Architecture"]
  }, {
    id: 746,
    label: "Bachelor of Science, Mechanical Engineering (BSME)",
    dts: []
  }, {
    id: 747,
    label: "Oceanography",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 748,
    label: "Mechanical Engineering (ME)",
    dts: ["Bachelor of Science", "Master of Science", "Master of Mechanical Engineering", "Bachelor of Engineering", "Master of Engineering", "Master of Business Administration", "Doctor of Philosophy", "Master of Engineering Management"]
  }, {
    id: 749,
    label: "Applied Psychology",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science"]
  }, {
    id: 750,
    label: "Acute Care",
    dts: ["Master of Science in Nursing"]
  }, {
    id: 751,
    label: "Economics and Political Science",
    dts: ["Bachelor of Arts"]
  }, {
    id: 752,
    label: "Theatre",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts"]
  }, {
    id: 753,
    label: "Geosciences",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 754,
    label: "Information Sciences and Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 755,
    label: "Environmental and Soil Sciences",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 756,
    label: "Russian Language",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 757,
    label: "Bible Studies and Theology",
    dts: ["Bachelor of Arts", "Master of Divinity", "Bachelor of Science", "Master of Arts", "Bachelor of Theology", "Master of Theological Studies", "Doctor of Ministry", "Bachelor of Business Administration"]
  }, {
    id: 758,
    label: "German Language",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Bachelor of Business Administration", "Master of Arts"]
  }, {
    id: 759,
    label: "Baking and Pastry Arts",
    dts: ["Bachelor of Science", "Bachelor of Professional Studies", "Bachelor of Arts", "Bachelor of Arts and Science"]
  }, {
    id: 760,
    label: "Agricultural Communication",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 761,
    label: "Textiles and Clothing",
    dts: ["Bachelor of Science"]
  }, {
    id: 762,
    label: "Environmental Science and Policy",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Science", "Master of Public Administration", "Master of Environmental Management"]
  }, {
    id: 763,
    label: "Military Science",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Arts", "Master of Science"]
  }, {
    id: 764,
    label: "Exercise and Sports Science",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Arts", "Bachelor of Education", "Master of Education", "Master of Occupational Therapy", "Bachelor of Arts and Science"]
  }, {
    id: 765,
    label: "Experimental Psychology",
    dts: ["Bachelor of Science"]
  }, {
    id: 766,
    label: "Aviation Safety Management",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 767,
    label: "Dental Hygiene",
    dts: ["Bachelor of Science"]
  }, {
    id: 768,
    label: "Vocal Performance",
    dts: ["Bachelor of Music"]
  }, {
    id: 769,
    label: "Entrepreneurship",
    dts: ["Master of Business Administration", "Bachelor of Business Administration", "Bachelor of Science"]
  }, {
    id: 770,
    label: "Politics",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 771,
    label: "Master of Mechanical Engineering (MME)",
    dts: []
  }, {
    id: 772,
    label: "Computer Science (CS) and Engineering",
    dts: ["Bachelor of Science", "Bachelor of Engineering", "Master of Science", "Bachelor of Technology"]
  }, {
    id: 773,
    label: "Signal/Geospatial Intelligence",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 774,
    label: "Culinary Arts and Food Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 775,
    label: "Crisis and Emergency Management",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 776,
    label: "Forest Sciences and Biology",
    dts: ["Bachelor of Science"]
  }, {
    id: 777,
    label: "Game and Simulation Programming",
    dts: ["Bachelor of Science"]
  }, {
    id: 778,
    label: "Cardiology",
    dts: ["Bachelor of Science", "Bachelor of Science in Nursing", "Master of Science in Nursing", "Master of Physician Assistant Studies"]
  }, {
    id: 779,
    label: "Deaf Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 780,
    label: "Economics",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Business Administration", "Master of Science", "Bachelor of Business Administration", "Master of Arts", "Bachelor of Arts and Science", "Doctor of Philosophy", "Bachelor of Liberal Arts", "Master of Accounting", "Master of Finance", "Master of Public Administration", "Bachelor of Finance", "Bachelor of Business"]
  }, {
    id: 781,
    label: "Italian Language",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science"]
  }, {
    id: 782,
    label: "Business Data Analysis",
    dts: ["Bachelor of Science", "Master of Science", "Master of Business Administration", "Bachelor of Arts"]
  }, {
    id: 783,
    label: "Fashion Marketing and Management",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Arts", "Bachelor of Fine Arts", "Master of Business Administration", "Bachelor of Business Administration"]
  }, {
    id: 784,
    label: "Sound Engineering",
    dts: ["Bachelor of Music", "Bachelor of Arts", "Bachelor of Science", "Bachelor of Applied Science"]
  }, {
    id: 785,
    label: "Physiology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 786,
    label: "Soil Science",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 787,
    label: "Mathematics and Statistics",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Business Administration", "Master of Arts", "Doctor of Philosophy"]
  }, {
    id: 788,
    label: "Agricultural Business",
    dts: ["Bachelor of Science", "Bachelor of Business", "Master of Business Administration", "Master of Science"]
  }, {
    id: 789,
    label: "Consumer Affairs",
    dts: ["Bachelor of Science"]
  }, {
    id: 790,
    label: "Printing Technology",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 791,
    label: "Music Composition",
    dts: ["Bachelor of Music"]
  }, {
    id: 792,
    label: "Recording Arts",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Bachelor of Music"]
  }, {
    id: 793,
    label: "Public Management",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Public Administration", "Master of Business Administration"]
  }, {
    id: 794,
    label: "Broadcast Journalism",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 795,
    label: "Advertising and Marketing Communications",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 796,
    label: "Engineering",
    dts: ["Bachelor of Science", "Bachelor of Engineering", "Master of Science", "Master of Engineering"]
  }, {
    id: 797,
    label: "Graphic Communications Management",
    dts: ["Bachelor of Science", "Bachelor of Arts", "Master of Arts"]
  }, {
    id: 798,
    label: "Evangelism",
    dts: ["Bachelor of Arts"]
  }, {
    id: 799,
    label: "Materials Science",
    dts: ["Bachelor of Science", "Master of Science", "Doctor of Philosophy"]
  }, {
    id: 800,
    label: "Nutrition",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Public Health", "Doctor of Philosophy", "Bachelor of Science in Nursing", "Master of Arts", "Master of Education"]
  }, {
    id: 801,
    label: "General Surgery",
    dts: ["Bachelor of Science", "Master of Physician Assistant Studies", "Bachelor of Science in Nursing"]
  }, {
    id: 802,
    label: "Industrial Engineering Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 803,
    label: "Bachelor of Liberal Studies (BLS)",
    dts: []
  }, {
    id: 804,
    label: "Geophysics",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 805,
    label: "Landscape Architecture",
    dts: ["Bachelor of Landscape Architecture", "Master of Landscape Architecture", "Bachelor of Science", "Bachelor of Arts", "Master of Science", "Bachelor of Architecture", "Bachelor of Fine Arts"]
  }, {
    id: 806,
    label: "Biblical Studies and Practical Ministries",
    dts: ["Bachelor of Arts", "Master of Divinity", "Bachelor of Science", "Master of Arts"]
  }, {
    id: 807,
    label: "Pre-law",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Bachelor of Business Administration", "Master of Business Administration", "Bachelor of Liberal Arts", "Bachelor of Arts and Science"]
  }, {
    id: 808,
    label: "Worship",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Bachelor of Music"]
  }, {
    id: 809,
    label: "Missions",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Divinity"]
  }, {
    id: 810,
    label: "Speech Communication",
    dts: ["Bachelor of Arts", "Bachelor of Science"]
  }, {
    id: 811,
    label: "Information Systems (IS)",
    dts: ["Bachelor of Science", "Bachelor of Business Administration", "Master of Science", "Master of Business Administration", "Bachelor of Arts", "Master of Information Science"]
  }, {
    id: 812,
    label: "Physics and Mathematics",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts"]
  }, {
    id: 813,
    label: "African American and African Studies",
    dts: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Bachelor of Liberal Arts", "Bachelor of Arts and Science"]
  }, {
    id: 814,
    label: "Disability Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Social Work"]
  }, {
    id: 815,
    label: "Interpersonal Communications",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Bachelor of Arts and Science", "Master of Social Work"]
  }, {
    id: 816,
    label: "Journalism and Mass Communication",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Business Administration", "Master of Science", "Master of Mass Communications", "Master of Journalism", "Bachelor of Liberal Arts"]
  }, {
    id: 817,
    label: "Community and Regional Development",
    dts: ["Bachelor of Science", "Bachelor of Arts"]
  }, {
    id: 818,
    label: "Equine Science",
    dts: ["Bachelor of Science"]
  }, {
    id: 819,
    label: "Sports Administration",
    dts: ["Bachelor of Science", "Master of Science", "Bachelor of Arts", "Master of Arts", "Master of Business Administration", "Master of Education", "Bachelor of Business Administration"]
  }, {
    id: 820,
    label: "Marketing",
    dts: ["Bachelor of Business Administration", "Bachelor of Science", "Master of Business Administration", "Bachelor of Arts", "Master of Science", "Bachelor of Business"]
  }, {
    id: 821,
    label: "Animal Science and Management",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 822,
    label: "Operations Management (OM)",
    dts: ["Bachelor of Science", "Master of Business Administration", "Bachelor of Business Administration"]
  }, {
    id: 823,
    label: "Art and Design",
    dts: ["Bachelor of Arts", "Bachelor of Fine Arts"]
  }, {
    id: 824,
    label: "Computer and Network Administration",
    dts: ["Bachelor of Science"]
  }, {
    id: 825,
    label: "Industrial Design (ID)",
    dts: ["Bachelor of Fine Arts", "Bachelor of Science", "Bachelor of Industrial Design", "Bachelor of Arts"]
  }, {
    id: 826,
    label: "Urban and Regional Planning",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Regional Planning", "Master of Science", "Master of Arts", "Bachelor of Architecture", "Master of Public Administration", "Master of Architecture", "Master of Business Administration", "Bachelor of Landscape Architecture"]
  }, {
    id: 827,
    label: "Naval Science and Operational Studies",
    dts: ["Bachelor of Science"]
  }, {
    id: 828,
    label: "Adult Nurse Practitioner Studies",
    dts: ["Master of Science in Nursing"]
  }, {
    id: 829,
    label: "Accounting Information Systems",
    dts: ["Bachelor of Science"]
  }, {
    id: 830,
    label: "Safety Management",
    dts: ["Bachelor of Science", "Master of Science"]
  }, {
    id: 831,
    label: "Chemical Technology",
    dts: ["Bachelor of Science"]
  }, {
    id: 832,
    label: "National Security",
    dts: ["Bachelor of Arts"]
  }, {
    id: 833,
    label: "German Studies",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Arts", "Master of Science"]
  }, {
    id: 834,
    label: "Education",
    dts: ["Bachelor of Arts", "Bachelor of Science", "Master of Education", "Bachelor of Education", "Master of Arts", "Master of Science", "Master of Science in Nursing", "Bachelor of Science in Nursing", "Doctor of Philosophy", "Master of Arts in Teaching", "Master of Business Administration", "Bachelor of Business Administration", "Bachelor of Liberal Arts", "Doctor of Education"]
  }, {
    id: 835,
    label: "Optical Science and Engineering",
    dts: ["Bachelor of Science", "Master of Science"]
  }
]

export default fieldNames;
