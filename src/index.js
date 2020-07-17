const express = require("express");
const bodyParser = require("body-parser");
const {
  teacherRoute,
  getAllTeachers,
  getTeacherByid
} = require("./routes/teacherRoute");
const expressHbs = require("express-handlebars");
const path = require("path");
const ifEquality = require("./views/helpers/ifEquality");

const app = express();

const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    ifEquality
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.status(200).render("home.hbs", {
    layout: "hero",
    title: "Home Page"
  });
});

app.get("/teachers", (req, res) => {
  res.status(200).render("teachers.hbs", {
    layout: "navigation",
    teacher: getAllTeachers(),
    title: "Teacher Details"
  });
});

app.get("/add-teacher", (req, res) => {
  res.status(200).render("addteacher.hbs", {
    layout: "navigation",
    method: "POST",
    action: "/api/teacher",
    title: "Add Teacher"
  });
});

app.get("/edit-teacher/:id", (req, res) => {
  const { id } = req.params;
  const requiredTeacher = getTeacherByid(parseInt(id));
  if (requiredTeacher) {
    res.status(200).render("addteacher.hbs", {
      layout: "navigation",
      teacher: requiredTeacher,
      title: "Edit Teacher",
      action: "/api/teacher/" + requiredTeacher.id,
      method: "PUT"
    });
  }
});

app.get("/teacher/:id/students", (req, res) => {
  const { id } = req.params;
  const requiredTeacher = getTeacherByid(parseInt(id));
  if (requiredTeacher) {
    res.status(200).render("students.hbs", {
      layout: "navigation",
      title: "Student Details",
      teacher: requiredTeacher.id,
      students: requiredTeacher.students
    });
  } else {
    res.status(404).send("Unable to find teacher");
  }
});
app.get("/teacher/:id/edit-student/:s_id", (req, res) => {
  const { id, s_id } = req.params;
  const teacherID = parseInt(id);
  const studentID = parseInt(s_id);
  const requiredTeacher = getTeacherByid(parseInt(id));
  const students = requiredTeacher.students;
  if (requiredTeacher) {
    const findStudent = students.find(each => each.studentID === studentID);
    res.status(200).render("addStudent.hbs", {
      title: "Edit Student",
      layout: "navigation",
      method: "PUT",
      action:
        "/api/teacher/" +
        requiredTeacher.id +
        "/students/" +
        findStudent.studentID,
      students: findStudent
    });
  } else {
    res.status(404).send("Unable to find teacher");
  }
});

app.get("/teacher/:id/add-student", (req, res) => {
  const { id } = req.params;
  const requiredTeacher = getTeacherByid(parseInt(id));
  res.status(200).render("addStudent.hbs", {
    title: "Add Student",
    layout: "navigation",
    method: "POST",
    action: "/api/teacher/" + requiredTeacher.id + "/students"
  });
});

app.use("/api/teacher", teacherRoute);

app.get("*", (req, res) => {
  res.status(404).send("404 page not found");
});

app.listen(8080, () => {
  console.log("Server is running");
});
