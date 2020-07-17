const express = require("express");
const studentRouter = express.Router();
const teachers = require("../modals/teacher");

const getAll = () => teachers;

const getTeachByID = id => {
  const teacher = getAll();
  return teacher.find(each => each.id === id);
};

const isValidStudent = s => {
  let one;
  if (s.length !== 0) {
    for (let i = 0; i < s.length; i++) {
      if (typeof s[i].studentID === "number" && s[i].studentName.length !== 0) {
        one = true;
      } else {
        return (one = false);
      }
    }
  }
  return one;
};
studentRouter
  .get("/:id/students", (req, res) => {
    const { id } = req.params;
    const teacherID = parseInt(id);
    const findTeacher = getTeachByID(teacherID);
    if (findTeacher) {
      const students = findTeacher.students;
      students.length !== 0
        ? res.status(200).json(students)
        : res.status(404).send("Unable to find students");
    } else {
      res.status(404).send("Unable to find a teacher");
    }
  })
  .get("/:id/students/:s_id", (req, res) => {
    const { id, s_id } = req.params;
    const teacherID = parseInt(id);
    const _studentID = parseInt(s_id);
    const findTeacher = teachers.find(each => each.id === teacherID);
    if (findTeacher !== undefined) {
      const findStudent = findTeacher.students.find(
        each => each.studentID === _studentID
      );
      findStudent
        ? res.status(200).json(findStudent)
        : res.status(404).send("can't able to find student");
    } else {
      res.status(404).send("can't able to find teacher");
    }
  })

  .put("/:id/students/:s_id", (req, res) => {
    const { id, s_id } = req.params;
    const teacherID = parseInt(id);
    const studentID = parseInt(s_id);
    const requiredTeacher = getTeachByID(teacherID);
    const students = requiredTeacher.students;
    req.body.studentID = parseInt(req.body.studentID);
    const newStudent = [req.body];
    let requiredStudentIndex;
    for (let i = 0; i < teachers[id - 1].students.length; i++) {
      console.log(teachers[teacherID - 1].students[i].studentID === studentID);
      if (teachers[teacherID - 1].students[i].studentID === studentID) {
        requiredStudentIndex = i;
        break;
      }
    }
    if (requiredTeacher) {
      if (isValidStudent(newStudent)) {
        const findStudent = students.find(each => each.studentID === studentID);
        const updateStudent = { findStudent, ...req.body };
        teachers[teacherID - 1].students.splice(
          requiredStudentIndex,
          1,
          updateStudent
        );
        res.status(200).json({
          message: "Student updated successfully in the respective teacher"
        });
      } else {
        res.status(404).json({
          message: "can't able to update student"
        });
      }
    }
  })

  .post("/:id/students", (req, res) => {
    const { id } = req.params;
    const requiredTeacher = getTeachByID(parseInt(id));
    const studentData = [req.body];
    req.body.studentID = parseInt(req.body.studentID);
    if (requiredTeacher) {
      if (isValidStudent(studentData)) {
        teachers[parseInt(id) - 1].students.push(req.body);
        res
          .status(200)
          .json({ data: req.body, message: "Student added successfully" });
      } else {
        res.status(404).json({
          message: "can't able to addd Student into the respective teacher"
        });
      }
    }
  })
  .delete("/:id/students/:s_id", (req, res) => {
    const { id, s_id } = req.params;
    const teacherID = parseInt(id);
    const _studentID = parseInt(s_id);
    const findTeacher = teachers.find(each => each.id === teacherID);
    if (findTeacher) {
      const findStudent = findTeacher.students.find(
        each => each.studentID === _studentID
      );
    } else {
      res.status(404).send("can't able to delete students");
    }
  });

module.exports = studentRouter;
