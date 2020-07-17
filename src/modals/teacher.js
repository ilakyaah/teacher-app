const teachers = [
  {
    id: 1,
    firstName: "Arun",
    lastName: "kumar",
    email: "Arun@gmail.ccom",
    gender: "male",
    classnumber: 1,
    age: 45,
    students: [
      {
        studentID: 3,
        studentName: "Ilakyaah",
        gender: "female"
      },
      {
        studentID: 4,
        studentName: "Thamil",
        gender: "male"
      }
    ]
  },
  {
    id: 2,
    firstName: "Ram",
    lastName: "kumar",
    email: "Ram@gmail.ccom",
    gender: "male",
    classnumber: 2,
    age: 35,
    students: [
      {
        studentID: 5,
        studentName: "Anitha",
        gender: "female"
      },
      {
        studentID: 6,
        studentName: "Nithin",
        gender: "male"
      }
    ]
  },
  {
    id: 3,
    firstName: "Aasha",
    lastName: "Noordeen",
    email: "aasha@gmail.ccom",
    gender: "female",
    classnumber: 2,
    age: 35,
    students: [
      {
        studentID: 6,
        studentName: "Ashwin",
        gender: "male"
      },
      {
        studentID: 7,
        studentName: "Narain",
        gender: "male"
      }
    ]
  }
];

module.exports = teachers;
