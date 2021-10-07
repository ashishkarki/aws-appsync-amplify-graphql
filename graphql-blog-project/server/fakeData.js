const faker = require('faker')

const getFakeUsers = (howMany = 5) => {
  let fakeUsers = []
  for (let i = 0; i < howMany; i++) {
    fakeUsers.push({
      id: i + '',
      name: faker.name.findName(),
      age: faker.random.number() % 100,
      profession: faker.name.jobTitle(),
    })
  }
  return fakeUsers
}

const getFakeHobbies = (howMany = 5) => {
  let fakeHobbies = []
  for (let i = 0; i < howMany; i++) {
    fakeHobbies.push({
      id: i + '',
      title: faker.name.jobArea(),
      description: faker.lorem.sentence(),
    })
  }

  return fakeHobbies
}

const getFakePosts = (howMany = 5) => {
  let fakePosts = []
  for (let i = 0; i < howMany; i++) {
    fakePosts.push({
      id: i + '',
      comment: faker.lorem.sentence(),
    })
  }

  return fakePosts
}

module.exports = {
  getFakeUsers,
  getFakeHobbies,
  getFakePosts,
}
