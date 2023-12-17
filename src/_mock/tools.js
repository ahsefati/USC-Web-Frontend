// ----------------------------------------------------------------------
import { fShortenNumber } from "../utils/formatNumber";

const tools = [

  // {
  //   index: 0,
  //   id: "63e061194bb35842d2dc7e0c",
  //   title: "The Roadmap",
  //   description: "Start your immigration process completely free using our AI-powered helper tool. It guides you step-by-step!",
  //   icon: "pepicons-pop:cv",
  //   poweredBy: "KoochAI",
  //   color: "primary",
  //   numLikes: fShortenNumber(1300),
  //   numComments: fShortenNumber(34)
  // },
  
  {
    index: 1,
    id: "63e061f34bb35842d2dc7e0e",
    title: "CV Creator",
    description: "Create a resume online with the help of AI",
    icon: "pepicons-pop:cv",
    poweredBy: "KoochAI",
    color: "primary",
    link: '/dashboard/cvcreator',
    numLikes: fShortenNumber(1300),
    numComments: fShortenNumber(34)
  },

  {
    index: 2,
    id: "63e0634f4bb35842d2dc7e0f",
    title: "Cost Estimation",
    description: "Helps you predict your costs to immigrate",
    icon: "ph:currency-dollar-bold",
    poweredBy: "KoochAI",
    color: "green",
    link: '/dashboard/costestimation',
    numLikes: fShortenNumber(13),
    numComments: fShortenNumber(34)
  },

  {
    index: 3,
    id: "63e063d44bb35842d2dc7e10",
    title: "Emailing System",
    description: "Schedule your emails to be sent automatically",
    icon: "ic:baseline-mark-email-read",
    poweredBy: "KoochAI",
    color: "purple",
    numLikes: fShortenNumber(13),
    numComments: fShortenNumber(34)
  },

  {
    index: 4,
    id: "63e0640f4bb35842d2dc7e11",
    title: "Country/City Search",
    description: "Compare and find the best options for you",
    icon: "gis:search-country",
    poweredBy: "KoochAI",
    color: "warning",
    link: '/dashboard/countrycity',
    numLikes: fShortenNumber(13),
    numComments: fShortenNumber(34)
  },

  {
    index: 5,
    id: "63e0643a4bb35842d2dc7e12",
    title: "University Search",
    description: "Compare Universities and Funding options",
    icon: "mdi:university",
    poweredBy: "KoochAI",
    color: "info",
    link: '/dashboard/universities',
    numLikes: fShortenNumber(13),
    numComments: fShortenNumber(34)
  },

  {
    index: 6,
    id: "63e0645c4bb35842d2dc7e13",
    title: "Jobs and Fields Search",
    description: "Compare salaries for different fields",
    icon: "bx:briefcase-alt-2",
    poweredBy: "KoochAI",
    color: "error",
    link: '/dashboard/jobsandfields',
    numLikes: fShortenNumber(13),
    numComments: fShortenNumber(34)
  },

  {
    index: 7,
    id: "63e064804bb35842d2dc7e14",
    title: "Professor Search",
    description: "Find the ones you are interested in their work",
    icon: "fa-solid:user-graduate",
    poweredBy: "KoochAI",
    color: "orange",
    numLikes: fShortenNumber(13000),
    numComments: fShortenNumber(34)
  },

  {
    index: 8,
    id: "63e064a74bb35842d2dc7e15",
    title: "Request Funds",
    description: "Volunteers may contact to help you",
    icon: "mdi:help-outline",
    poweredBy: "KoochCommunity",
    color: "green",
    numLikes: fShortenNumber(13),
    numComments: fShortenNumber(34)
  },
  
  {
    index: 9,
    id: "63e065704bb35842d2dc7e16",
    title: "Post Services",
    description: "See who can carry your bag to your destination!",
    icon: "mdi:cube-send",
    poweredBy: "KoochCommunity",
    color: "primary",
    numLikes: fShortenNumber(13),
    numComments: fShortenNumber(34)
  },


  {
    index: 10,
    id: "63e065a74bb35842d2dc7e17",
    title: "Currency Exchange",
    description: "Exchange money from/to abroad at no cost",
    icon: "ph:currency-dollar-bold",
    poweredBy: "KoochCommunity",
    color: "success",
    numLikes: fShortenNumber(13),
    numComments: fShortenNumber(34)
  },
];

export default tools;
