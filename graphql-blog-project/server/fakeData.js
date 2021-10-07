const faker = require('faker')

const getFakeUsers = (howMany = 5) => {
  let fakeUsers = []
  for (let i = 0; i < howMany; i++) {
    fakeUsers.push({
      id: i + '',
      name: faker.name.findName(),
      age: faker.datatype.number() % 100,
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
      userId: getRandomUserId(0, howMany - 1),
    })
  }

  return fakeHobbies
}

const getFakePosts = (howMany = 5) => {
  let fakePosts = []
  for (let i = 0; i < howMany; i++) {
    const post = {
      id: i + '',
      comment: faker.lorem.sentence(),
      userId: getRandomUserId(0, howMany - 1),
    }
    fakePosts.push(post)
  }

  return fakePosts
}

const getRandomUserId = (min = 0, max = 5) => {
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString()
}

// store or temp DB
const usersData = getFakeUsers()
const hobbiesData = getFakeHobbies()
const postsData = getFakePosts()

module.exports = {
  usersData,
  hobbiesData,
  postsData,
}
