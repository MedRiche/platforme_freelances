mutation {
  createUser(input: {
    email: "amina@test.com"
    password: "123456"
    role: FREELANCER
    profile: {
      firstName: "Amina"
      lastName: "Ben Salah"
      skills: ["NestJS", "MongoDB"]
      professionalLinks: ["https://linkedin.com/in/amina"]
    }
  }) {
    id
    email
    role
    profile {
      firstName
      skills
    }
  }
}



mutation {
  createUser(input: {
    email: "amina@test.com"
    password: "123456"
  })
}


query {
  getUsers {
    id
    email
    role
    profile {
      firstName
      lastName
      skills
      professionalLinks
    }
  }
}



