import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const userprofileinfo = {
  id: 1,
  cover: `/assets/images/covers/cover_3.jpg`,
  title: 'Amirhossein Sefati',
  balance: 120,
  points: 1240,
  rank: 8,
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: "Amirhossein Sefati",
    avatarUrl: `/assets/images/avatars/avatar_17.jpg`,
  },
}


export default userprofileinfo;
