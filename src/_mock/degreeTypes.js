// ----------------------------------------------------------------------
const degreeTypes = [
  {
    id: 0,
    label: ''
  },
  {
    id: 1,
    label: 'Master of Legal Studies'
  }, {
    id: 2,
    label: 'Bachelor of Professional Studies'
  }, {
    id: 3,
    label: 'Bachelor of Industrial Design'
  }, {
    id: 4,
    label: 'Master of Theological Studies'
  }, {
    id: 5,
    label: 'Master of Public Administration'
  }, {
    id: 6,
    label: 'Master of Environmental Management'
  }, {
    id: 7,
    label: 'Doctor of Psychology'
  }, {
    id: 8,
    label: 'Bachelor of General Studies'
  }, {
    id: 9,
    label: 'Bachelor of Engineering Technology'
  }, {
    id: 10,
    label: 'Bachelor of Social Work'
  }, {
    id: 11,
    label: 'Master of Landscape Architecture'
  }, {
    id: 12,
    label: 'Doctor of Ministry'
  }, {
    id: 13,
    label: 'Master of Health Administration'
  }, {
    id: 14,
    label: 'Master of Civil Engineering'
  }, {
    id: 15,
    label: 'Bachelor of Liberal Studies'
  }, {
    id: 16,
    label: 'Master of Occupational Therapy'
  }, {
    id: 17,
    label: 'Bachelor of Philosophy'
  }, {
    id: 18,
    label: 'Bachelor of Finance'
  }, {
    id: 19,
    label: 'Bachelor of Music Education'
  }, {
    id: 20,
    label: 'Bachelor of Commerce'
  }, {
    id: 21,
    label: 'Bachelor of Business'
  }, {
    id: 22,
    label: 'Master of Public Health'
  }, {
    id: 23,
    label: 'Bachelor of Fine Arts'
  }, {
    id: 24,
    label: 'Master of Human Services'
  }, {
    id: 25,
    label: 'Bachelor of Technology'
  }, {
    id: 26,
    label: 'Bachelor of Music'
  }, {
    id: 27,
    label: 'Master of Environmental Design'
  }, {
    id: 28,
    label: 'Master of Regional Planning'
  }, {
    id: 29,
    label: 'Master of Philosophy'
  }, {
    id: 30,
    label: 'Bachelor of Science'
  }, {
    id: 31,
    label: 'Doctor of Physical Therapy'
  }, {
    id: 32,
    label: 'Master of Journalism'
  }, {
    id: 33,
    label: 'Master of Liberal Arts'
  }, {
    id: 34,
    label: 'Bachelor of Science in Nursing'
  }, {
    id: 35,
    label: 'Doctor of Science'
  }, {
    id: 36,
    label: 'Master of Computer Applications'
  }, {
    id: 37,
    label: 'Bachelor of Applied Science'
  }, {
    id: 38,
    label: 'Master of Social Work'
  }, {
    id: 39,
    label: 'Bachelor of Landscape Architecture'
  }, {
    id: 40,
    label: 'Master of Architecture'
  }, {
    id: 41,
    label: 'Master of Physical Therapy'
  }, {
    id: 42,
    label: 'Bachelor of Business Administration'
  }, {
    id: 43,
    label: 'Bachelor of Theology'
  }, {
    id: 44,
    label: 'Master of Mass Communications'
  }, {
    id: 45,
    label: 'Bachelor of Liberal Arts'
  }, {
    id: 46,
    label: 'Master of Professional Studies'
  }, {
    id: 47,
    label: 'Master of Computer Science'
  }, {
    id: 48,
    label: 'Master of Science'
  }, {
    id: 49,
    label: 'Master of Information Science'
  }, {
    id: 50,
    label: 'Master of Public Affairs'
  }, {
    id: 51,
    label: 'Bachelor of Arts and Science'
  }, {
    id: 52,
    label: 'Bachelor of Business Studies'
  }, {
    id: 53,
    label: 'Master of Professional Accountancy'
  }, {
    id: 54,
    label: 'Master of Management'
  }, {
    id: 55,
    label: 'Master of Engineering Management'
  }, {
    id: 56,
    label: 'Master of Engineering'
  }, {
    id: 57,
    label: 'Bachelor of Education'
  }, {
    id: 58,
    label: 'Master of Finance'
  }, {
    id: 59,
    label: 'Bachelor of University Studies'
  }, {
    id: 60,
    label: 'Master of Divinity'
  }, {
    id: 61,
    label: 'Bachelor of Engineering'
  }, {
    id: 62,
    label: 'Bachelor of Civil Law'
  }, {
    id: 63,
    label: 'Bachelor of Accountancy'
  }, {
    id: 64,
    label: 'Master of Arts'
  }, {
    id: 65,
    label: 'Master of Taxation'
  }, {
    id: 66,
    label: 'Master of Environmental Science'
  }, {
    id: 67,
    label: 'Doctor of Philosophy'
  }, {
    id: 68,
    label: 'Doctorate of Psychology'
  }, {
    id: 69,
    label: 'Master of Fine Arts'
  }, {
    id: 70,
    label: 'Master of Physician Assistant Studies'
  }, {
    id: 71,
    label: 'Master of Arts in Teaching'
  }, {
    id: 72,
    label: 'Doctor of Nursing Practice'
  }, {
    id: 73,
    label: 'Master of Forestry'
  }, {
    id: 74,
    label: 'Bachelor of Architecture'
  }, {
    id: 75,
    label: 'Doctor of Pharmacy'
  }, {
    id: 76,
    label: 'Master of Sacred Theology'
  }, {
    id: 77,
    label: 'Doctor of Nursing Science'
  }, {
    id: 78,
    label: 'Master of Mechanical Engineering'
  }, {
    id: 79,
    label: 'Bachelor of Humanities'
  }, {
    id: 80,
    label: 'Bachelor of Design'
  }, {
    id: 81,
    label: 'Doctorate'
  }, {
    id: 82,
    label: 'Bachelor of Religious Education'
  }, {
    id: 83,
    label: 'Bachelor of Applied Arts and Science'
  }, {
    id: 84,
    label: 'Bachelor of Arts'
  }, {
    id: 85,
    label: 'Master of Library Science'
  }, {
    id: 86,
    label: 'Master of Public Policy'
  }, {
    id: 87,
    label: 'Master of Music'
  }, {
    id: 88,
    label: 'Bachelor of Creative Arts'
  }, {
    id: 89,
    label: 'Master of Education'
  }, {
    id: 90,
    label: 'Doctor of Education'
  }, {
    id: 91,
    label: 'Master of Business Administration'
  }, {
    id: 92,
    label: 'Master of Design'
  }, {
    id: 93,
    label: 'Master of Science in Nursing'
  }, {
    id: 94,
    label: 'Doctor of Veterinary Medicine'
  }, {
    id: 95,
    label: 'Master of Nursing'
  }, {
    id: 96,
    label: 'Bachelor of Individualized Studies'
  }, {
    id: 97,
    label: 'Master of Library and Information Science'
  }, {
    id: 98,
    label: 'Bachelor of Special Studies'
  }, {
    id: 99,
    label: 'Master of Accounting'
  }, {
    id: 100,
    label: 'Master of Studies in Law'
  }
]

export default degreeTypes;
