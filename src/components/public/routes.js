import Home from "../public/home";
import Login from "../login/login";
import Sets from "../sets/sets";
import SetDetails from "../sets/setsDetails";
import Questions from "../questions/questions";
import Tenants from "../tenants/tenants";
import Exams from "../exams/exams";
import ExamDetails from "../exams/examDetails";


export default [
    { path: "/", name: "سامانه", Component: Home },
    { path: "/login", name: "ورود", Component: Login },
    { path: "/sets", name: "امتحانات", Component: Sets },
    { path: "/sets/:setId(\\d+)", name: "امتحان", Component: SetDetails },
    { path: "/questions", name: "سوالات", Component: Questions },
    { path: "/tenants", name: "مدارس", Component: Tenants },
    { path: "/exams", name: "آزمون ها", Component: Exams },
    { path: "/exams/:examId(\\d+)", name: "آزمون ", Component: ExamDetails },
  ];
