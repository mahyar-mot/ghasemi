import Home from "../public/home";
import Login from "../login/login";
// import Reports from "../report/reportPage";
// import Monitoring from "../monitoring/monitoring";
// import ProjectTabs from "../project/projectTabs";
// import CreateProject from "../project/createProject";
// import SubjectManage from "../subjects/subjectManage";
// import SubjectForm from "../subjects/subjectForm";
// import SubjectProfile from "../subjects/subjectProfile";
// // import TagPost from "../tag/tagPost";
// import TagCreate from "../tag/tagCreate";
// import FavoritismCreate from "../subjects/favoritismManage";
// import UsersList from "../users/usersList";
// import SignInOidc from "../login/signin_oidc"


export default [
    { path: "/", name: "سامانه", Component: Home },
    { path: "/login", name: "ورود", Component: Login },
    // { path: "/monitoring", name: "ورود", Component: Monitoring },
    // { path: "/manage", name: "مدیریت", Component: Home },
    // { path: "/manage/subject", name: "مدیریت سوژه ها", Component: SubjectManage },
    // { path: "/manage/subject/profile/:subjectId(\\d+)", name: "پروفایل سوژه", Component: SubjectProfile },
    // { path: "/manage/subjects", name: "ساخت سوژه", Component: SubjectForm },
    // { path: "/manage/subjects/edit/:subjectId(\\d+)", name: "ویرایش سوژه", Component: SubjectForm },
    // { path: "/manage/project", name: "مدیریت پروژه‌ها", Component: CreateProject },
    // { path: "/manage/project/edit/:projectId(\\d+)", name: "ویرایش پروژه", Component: CreateProject },
    // { path: "/manage/tags", name: "مدیریت تگ ها", Component: TagCreate},
    // { path: "/manage/favoritism", name: "مدیریت ویژگی‌ها", Component: FavoritismCreate},
    // { path: "/manage/users", name: "مدیریت کاربران", Component: UsersList},
    // { path: "/view/project", name: "پروژه‌ها", Component: ProjectTabs },
    // { path: "/report", name: "گزارش ها", Component: Reports },
    // { path: "/view/tag", name: "تگ پست ها", Component: TagPost},
  ];
