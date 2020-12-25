module.exports = {

    //MESSAGES
    SUCCESS_MESSAGE : "عملیات با موفقیت انجام شد",
    ERROR_MESSAGE: "با خطا همراه بود",
    CONFLICT_MESSAGE: "مشکلی به وجود آمده است",

    // ROUTES
    BASE_URL: "http://preforms.ir/api",
    PREFIX:"",
    LOGIN_PATH: "/token/",
    SETS_LIST: "/portal/sets",
    SETS_DETAIL: (id) => `/portal/sets/${id}`,
    QUESTIONS_LIST: "/portal/questions",
    TENANTS_LIST: "/portal/tenants",

    // PARAMS:
    COOKIE_EXPIRES: 1 // IN DAYS
};
