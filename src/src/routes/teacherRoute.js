const express = require("express");
const teacherRoute = express.Router();
const teacherData = require("../modals/teacher");
const studentRouter = require("./studentRoute");

const isValid = teacher => {
  if (typeof teacher.id === "number" && teacher.age > 23) {
    return true;
  } else {
    return false;
  }
};

const getAllTeachers = () => teacherData;

const getTeacherByid = id => {
  const teachers = getAllTeachers();
  return teachers.find(each => each.id === id);
};
teacherRoute
  .get("/", (req, res) => {
    if (teacherData.length !== 0) {
      res.status(200).json(teacherData);
    } else {
      res.status(404).send("teachers are empty");
    }
  })

  .post("/", (req, res) => {
    const id = getAllTeachers().length + 1;
    const teacher = { id, ...req.body, students: [] };
    if (isValid(teacher)) {
      teacherData.push(teacher);
      res.status(200).json({ message: "Teacher Added Successfully" });
    } else {
      res.status(404).json({ message: "can't able to Add Teacher" });
    }
  })

  .put("/", (request, res) => {
    if (isValid(request.body)) {
      const newTeacher = request.body;
      const newAppend = { ...teacherData, ...newTeacher };
      teacherData.splice(0, teacherData.length, newAppend);
      res.status(200).json(teacherData);
    } else {
      res.status(404).send("404 unable to edit");
    }
  })
  .delete("/", (req, res) => {
    if (teacherData.length !== 0) {
      teacherData.splice(0, teacherData.length);
      res.status(200).send("Teacher data deleted successfully");
    } else {
      res.status(404).send("Teacher data is empty");
    }
  })

  .get("/:id", (req, res) => {
    const { id } = req.params;
    const teacherID = parseInt(id);
    const requiredTeacher = getTeacherByid(teacherID);
    if (requiredTeacher) {
      res.status(200).json(requiredTeacher);
    } else {
      res.status(404).send("Teacher not found");
    }
  })

  .post("/:id", (req, res) => {
    const { id } = req.params;
    const teacherID = parseInt(id);
    let newTeac = [];
    let newTeacher = { id: teacherID, ...req.body };
    newTeac.push(newTeacher);
    if (isValidObj(newTeac)) {
      newTeac.forEach(each => {
        teacherData.push(each);
      });
      res.status(200).json(newTeac);
    } else {
      res.status(404).send("can't able to add teacher");
    }
  })
  .put("/:id", (req, res) => {
    const { id } = req.params;
    const teacherID = parseInt(id);
    const requiredTeacher = teacherData.find(each => each.id === teacherID);
    if (requiredTeacher !== undefined) {
      const newTeacher = { ...requiredTeacher, ...req.body };
      teacherData.splice(teacherData.indexOf(requiredTeacher), 1, newTeacher);
      res.status(200).json({
        message: "Teacher details updated!",
        data: newTeacher
      });
    } else {
      res.status(400).send("Invalid Teacher");
    }
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    const teacherID = parseInt(id);
    const requiredTeacher = teacherData.find(each => each.id === teacherID);
    if (requiredTeacher !== undefined) {
      teacherData.splice(teacherData.indexOf(requiredTeacher), 1);
      res.status(200).send("Teacher is successfully deleted");
    } else {
      res.status(404).send("can't able to delete teacher.");
    }
  });

teacherRoute.use("/", studentRouter);

module.exports = { teacherRoute, getAllTeachers, getTeacherByid };
