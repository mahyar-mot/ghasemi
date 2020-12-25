import Home from "../public/home";
import Login from "../login/login";
import Sets from "../sets/sets"
import SetDetails from "../sets/setsDetails"
import Questions from "../questions/questions"
import Tenants from "../tenants/tenants"


export default [
    { path: "/", name: "سامانه", Component: Home },
    { path: "/login", name: "ورود", Component: Login },
    { path: "/sets", name: "امتحانات", Component: Sets },
    { path: "/sets/:setId(\\d+)", name: "امتحان", Component: SetDetails },
    { path: "/questions", name: "سوالات", Component: Questions },
    { path: "/tenants", name: "مدارس", Component: Tenants },
  ];
