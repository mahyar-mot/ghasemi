module.exports = {

    //MESSAGES
    SUCCESS_MESSAGE : "عملیات با موفقیت انجام شد",
    ERROR_MESSAGE: "با خطا همراه بود",
    CONFLICT_MESSAGE: "مشکلی به وجود آمده است",

    // ROUTES
    BASE_URL: "http://192.168.0.124:8003/api",
    MEDIA_URL: "http://feeder.binainst.ir/",
    PREFIX:"",
    LOGIN_PATH: "/auth/token/",
    USER_PROFILE: "/auth/profile/",
    PROJECT_LIST:"/project/",
    PROJECT_DETAIL: (id) => `/project/${id}/`,
    PROJECT_SUBJECTS: (id) => `/project/${id}/subjects/`,
    PROJECT_TAGS: (id) => `/project/${id}/tags/`,
    PROJECT_KEYWORDS: (id) => `/project/${id}/keywords/`,
    SUBJECT_LIST: "/subject/",
    SUBJECT_DETAIL: (id) => `/subject/${id}/`,
    USERS_LIST: "/project/users/",
    BIAS_LIST: "/favoritism/",
    BIAS_CREATE: (id) => `/favoritism/${id}/`,
    PROJECTS_STAT: "/project/projects/",
    TAG_LIST: "/tag/",
    TAG_DETAIL: (id) => `/tag/${id}/`,
    TAG_POSTS: (id) => `/project/${id}/post/tagger/`,
    VALID_TAG_POSTS: (id) => `/project/${id}/tags/`,
    POST_DETAIL: (id) => `/post/${id}/`,
    POST_FILTERS: (id) => `/project/${id}/attributes/`,
    POST_RESTORE: (id) => `/post/${id}/restore/`,
    SET_POST_TAG: (id) => `/project/post/${id}/attribute/`,
    PROJECT_POSTS: (id) => `/project/${id}/posts/`,
    CRAWL_POSTS: (id) => `/media/${id}/crawl/`,
    PROJECT_ARCHIVE: (id) => `/project/scheduler/${id}/stop/`,
    PROJECT_ARCHIVE_RESTORE: (id) => `/project/scheduler/${id}/resume/`,
    PROJECT_EXCEL_REPORT: (id) => `/project/${id}/report/`,

    // PARAMS:
    COOKIE_EXPIRES: 1 // IN DAYS
};
