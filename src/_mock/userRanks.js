import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const USERRANKS = [
  
  {
    id: 1,
    avatarUrl: `/assets/images/avatars/avatar_${1}.jpg`,
    name: faker.name.fullName(),
    points: 1230,
    change: 120
  },
  {
    id: 2,
    avatarUrl: `/assets/images/avatars/avatar_${2}.jpg`,
    name: faker.name.fullName(),
    points: 1130,
    change: 120
  },
  {
    id: 3,
    avatarUrl: `/assets/images/avatars/avatar_${3}.jpg`,
    name: faker.name.fullName(),
    points: 1120,
    change: 120
  },
  {
    id: 4,
    avatarUrl: `/assets/images/avatars/avatar_${4}.jpg`,
    name: faker.name.fullName(),
    points: 1230,
    change: 120
  },
  {
    id: 5,
    avatarUrl: `/assets/images/avatars/avatar_${5}.jpg`,
    name: faker.name.fullName(),
    points: 1230,
    change: 120
  },
  {
    id: 6,
    avatarUrl: `/assets/images/avatars/avatar_${6}.jpg`,
    name: faker.name.fullName(),
    points: 1230,
    change: 120
  },
  {
    id: 7,
    avatarUrl: `/assets/images/avatars/avatar_${7}.jpg`,
    name: faker.name.fullName(),
    points: 1230,
    change: 120
  },
]

export default USERRANKS;
