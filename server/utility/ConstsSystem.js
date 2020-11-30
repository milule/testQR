
const API_CODE_LIST = {
    LOGIN_BY_LOCAL: 'loginByLocal',
    LOGIN_BY_GOOGLE_ACCOUNT: 'loginByGoogleAccount',
    GET_ROLES: 'getRoles',
    SEND_MAIL: 'sendMail',
    GET_MAIL_TEMPLATE: 'getMailTemplate',
    CHECK_USER_DEACTIVATE: 'chekUserDeactivate',
    GET_USERS: 'getUsers',
    GET_USER_ALL: 'getUserAll',
    GET_USER_BY_ID: 'getUserById',
    SET_USER_INFO: 'createUser',
    GET_USER_ACTIVATE: 'getUserActive',
    GET_USER_PENDING: 'getUserPending',
    GET_USER_DELETE: 'getUserDelete',
    SET_USER_REMOVE: 'deleteUser',
    CHECK_DATA_USER_BEFORE_REMOVE: 'checkDataUserBeforeRemove',
    GET_USER_DEACTIVATE: 'getUserDeactivate',
    SET_USER_DEACTIVATE: 'setUserDeactivate',
    GET_USER_FORCE_SYNC: 'getUserForceSync',
    SET_USER_FORCE_SYNC: 'setUserForceSync',
    GET_USER_ASSIGN_ROLE: 'getUserAssignRole',
    SET_USER_ASSIGN_ROLE: 'setUserAssignRole',
    GET_CALENDAR_ALL: 'getCalendarAll',
    GET_CALENDAR_BY_USER: 'getCalendarByUser',
    SET_CALENDAR: 'setCalendar',
    SET_CALENDARS: 'setCalendars',
    SET_TOKEN: 'setToken',
    ADD_EVENT_CALENDAR: 'addEventCalendar',
    GET_TOKEN_FIRE_BASE: 'getTokenFirebase',
    GET_TOKEN_FIRE_BASES: 'getTokenFirebases',
    REGISTER_TOKEN_FIRE_BASE: 'registerTokenFirebase',
    FORCE_SYNC: 'forceSync',
    GET_LOCATION: 'getLocation',
    GET_LOCATION_ALL: 'getLocationAll',
    GET_LAT_LNG_ALL_BY_ID: 'getLatLngAllById',
    CREATE_ROLE: 'createRole',
    CREATE_ACCOUNT_TYPE: 'createAccounttype',
    GET_USER_MANAGEMENTS: 'getUserManagements'
}

const API_ADMIN_ROLE_LIST = [
    API_CODE_LIST.GET_ROLES,
    API_CODE_LIST.SEND_MAIL,
    API_CODE_LIST.GET_MAIL_TEMPLATE,
    API_CODE_LIST.CHECK_USER_DEACTIVATE,
    API_CODE_LIST.GET_USERS,
    API_CODE_LIST.GET_USER_ALL,
    API_CODE_LIST.GET_USER_ACTIVATE,
    API_CODE_LIST.GET_USER_PENDING,
    API_CODE_LIST.GET_USER_DELETE,
    API_CODE_LIST.SET_USER_REMOVE,
    API_CODE_LIST.CHECK_DATA_USER_BEFORE_REMOVE,
    API_CODE_LIST.GET_USER_DEACTIVATE,
    API_CODE_LIST.SET_USER_DEACTIVATE,
    API_CODE_LIST.GET_USER_FORCE_SYNC,
    API_CODE_LIST.SET_USER_FORCE_SYNC,
    API_CODE_LIST.GET_USER_ASSIGN_ROLE,
    API_CODE_LIST.SET_USER_ASSIGN_ROLE,
    API_CODE_LIST.GET_CALENDAR_ALL,
    API_CODE_LIST.FORCE_SYNC,
    API_CODE_LIST.GET_LOCATION_ALL,
    API_CODE_LIST.GET_LAT_LNG_ALL_BY_ID,
    API_CODE_LIST.CREATE_ROLE,
    API_CODE_LIST.CREATE_ACCOUNT_TYPE,
    API_CODE_LIST.GET_USER_MANAGEMENTS
]

const CODE_T_ROLE = {
    ROOT: '1',
    ADMIN: '2',
    USER: '3',
    ANALYSIS: '4'
}

const ROLE_NAME = {
    ROOT: 'ROOT',
    ADMIN: 'ADMIN',
    USER: 'USER',
    ANALYST: 'ANALYST'
}

const CODE_IDP = {
    GOOGLE: '2',
    LOCAL: '1'
}

const CODE_USER_STATUS = {
    ACTIVATE: '1',
    DEACTIVATE: '2',
    PENDING: ''
}

const CODE_STRING_VALUE = {
    EMPTY: '',
    NULL: null
}

const LOGIN_PROTOCOL = {
    WEB: {
        LABEL: 'WEB',
        VALUE: 'web ip: '
    },
    DEVICE: {
        LABEL: 'DEVICE',
        VALUE: 'deviceID: '
    }
}

const SCHEDULE_TYPE = {
    EZT: 'EZT',
    GCAL: 'GCAL'
}
const STATUS_DEVICE_TRACKING = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
    NONE: 'NONE',
    TIME_RESET: '15000'
}
const FIREBASE_DIRECTION_PATH = {
    ROOT: 'web',
    LOCATIONS: {
        KEY: 'locations',
        ACCOUNT_ID: {
            DEVICE_ID: {
                STATUS_ONLINE: 'onlineSts',
                LAST_SYNC: 'lastSync',
                LAT: 'lat',
                LNG: 'lng',
                USER_NAME: 'Name' // TODO
            }
        }
    },
    USERS: {
        KEY: 'users',
        ACCOUNT_ID: {
            CALENDAR_STATUS: 'calendarSt',
            LOGIN_STATUS: 'loginSt'
        }
    }
}
const MQTT_TOPIC_LIST = {
    LOCATION: 'location',
    TRACKING_USER: 'tracking-user'
}
const SYNC_BUS_MODE = {
    ARRIVAL: '"A"',
    TRACKING: '"T"',
    MODIFY: '"M"',
    COLLECTION: '"S"',
    NONE: '"N"'
}

const USE_MODEL = {
    WEB: 'W',
    MOBILE: 'M'
}

const GENERAL_SETTING_CODES = {
    SITE_API_DATAMALL_ACCOUNTKEY: 'site.api.datamall.accountkey', 
    SITE_API_DATAMALL_ACCEPT: 'site.api.datamall.accept', 
    SITE_API_ONEMAP_EMAIL: 'site.api.onemap.email', 
    SITE_API_ONEMAP_PASSWORD: 'site.api.onemap.password', 
    SITE_API_SENDGRID_APIKEY: 'site.api.sendgrid.apikey', 
    SITE_API_MAPBOX_APIKEY: 'site.api.mapbox.apikey', 
    SITE_API_HEREMAP_APPID: 'site.api.heremap.app_id',
    SITE_API_HEREMAP_APPCODE: 'site.api.heremap.app_code',
    SITE_API_SCHEDULENOTIFICATION_DEFAULTCHECK: 'site.all_users.schedulednotification.default_check',
    SITE_LOCATION_DATA_ARCHIVE_DAYS: 'site.all_users.location.data.days',
    SITE_LOCATION_DATA_ARCHIVE_ENABLE: 'site.all_users.location.data.enable',
    SITE_EVENTREPORT_MEDIAUPLOAD_PATH: 'site.event_report.media_upload.path',
    SITE_LTA_BUS_LIVE_TRACKING_DATA_COLLECTION: 'site.all_users.bus.data.collection',
    SITE_LOCATION_DATA_DEL_DAYS: 'site.all_users.location.data.del.days',
    SITE_LOCATION_DATA_DEL_ENABLE: 'site.all_users.location.data.del.enable'
}

const TABLEAU_DASHBOARD_SETTING_CODES = {
    SITE_ALL_USER_TABLEAU_DASHBOARD_HOST_URL: 'site.all_users.tableaudashboard.tableau.host_url',
    SITE_ALL_USER_TABLEAU_DASHBOARD_NAME: 'site.all_users.tableaudashboard.tableau.name',
    SITE_ALL_USER_TABLEAU_DASHBOARD_SITE_ROOT: 'site.all_users.tableaudashboard.tableau.site_root',
    SITE_ALL_USER_TABLEAU_DASHBOARD_LOAD_ORDER: 'site.all_users.tableaudashboard.tableau.load_order',
    SITE_ALL_USER_TABLEAU_DASHBOARD_CLIENT_IP: 'site.all_users.tableaudashboard.tableau.client_ip',
    SITE_ALL_USER_TABLEAU_DASHBOARD_VIEW_AS: 'site.all_users.tableaudashboard.tableau.view_as',
    SITE_ALL_USER_TABLEAU_DASHBOARD_FILTER: 'site.all_users.tableaudashboard.tableau.filter',
    SITE_ALL_USER_TABLEAU_DASHBOARD_DEVICE: 'site.all_users.tableaudashboard.tableau.device',
    SITE_ALL_USER_TABLEAU_DASHBOARD_CUSTOM_VIEWS: 'site.all_users.tableaudashboard.tableau.customViews',
    SITE_ALL_USER_TABLEAU_DASHBOARD_SHOW_SHARE_OPTIONS: 'site.all_users.tableaudashboard.tableau.showShareOptions',
    SITE_ALL_USER_TABLEAU_DASHBOARD_ALERTS: 'site.all_users.tableaudashboard.tableau.alerts',
    SITE_ALL_USER_TABLEAU_DASHBOARD_SUBCRIPTIONS: 'site.all_users.tableaudashboard.tableau.subscriptions',
    SITE_ALL_USER_TABLEAU_DASHBOARD_TABS: 'site.all_users.tableaudashboard.tableau.tabs',
    SITE_ALL_USER_TABLEAU_DASHBOARD_TOOLBAR: 'site.all_users.tableaudashboard.tableau.toolbar',
    SITE_ALL_USER_TABLEAU_DASHBOARD_TOOLTIP: 'site.all_users.tableaudashboard.tableau.tooltip',
    SITE_ALL_USER_TABLEAU_DASHBOARD_WIDTH: 'site.all_users.tableaudashboard.tableau.width',
    SITE_ALL_USER_TABLEAU_DASHBOARD_HEIGHT: 'site.all_users.tableaudashboard.tableau.height'
}

const DIVICE_DASHBOARD_SETTING_CODES = {
    SITE_ALL_USER_DIVICE_DASHBOARD_HOST_URL: 'site.all_users.devicedashboard.tableau.host_url',
    SITE_ALL_USER_DIVICE_DASHBOARD_NAME: 'site.all_users.devicedashboard.tableau.name',
    SITE_ALL_USER_DIVICE_DASHBOARD_SITE_ROOT: 'site.all_users.devicedashboard.tableau.site_root',
    SITE_ALL_USER_DIVICE_DASHBOARD_LOAD_ORDER: 'site.all_users.devicedashboard.tableau.load_order',
    SITE_ALL_USER_DIVICE_DASHBOARD_CLIENT_IP: 'site.all_users.devicedashboard.tableau.client_ip',
    SITE_ALL_USER_DIVICE_DASHBOARD_VIEW_AS: 'site.all_users.devicedashboard.tableau.view_as',
    SITE_ALL_USER_DIVICE_DASHBOARD_FILTER: 'site.all_users.devicedashboard.tableau.filter',
    SITE_ALL_USER_DIVICE_DASHBOARD_DEVICE: 'site.all_users.devicedashboard.tableau.device',
    SITE_ALL_USER_DIVICE_DASHBOARD_CUSTOM_VIEWS: 'site.all_users.devicedashboard.tableau.customViews',
    SITE_ALL_USER_DIVICE_DASHBOARD_SHOW_SHARE_OPTIONS: 'site.all_users.devicedashboard.tableau.showShareOptions',
    SITE_ALL_USER_DIVICE_DASHBOARD_ALERTS: 'site.all_users.devicedashboard.tableau.alerts',
    SITE_ALL_USER_DIVICE_DASHBOARD_SUBCRIPTIONS: 'site.all_users.devicedashboard.tableau.subscriptions',
    SITE_ALL_USER_DIVICE_DASHBOARD_TABS: 'site.all_users.devicedashboard.tableau.tabs',
    SITE_ALL_USER_DIVICE_DASHBOARD_TOOLBAR: 'site.all_users.devicedashboard.tableau.toolbar',
    SITE_ALL_USER_DIVICE_DASHBOARD_TOOLTIP: 'site.all_users.devicedashboard.tableau.tooltip',
    SITE_ALL_USER_DIVICE_DASHBOARD_WIDTH: 'site.all_users.devicedashboard.tableau.width',
    SITE_ALL_USER_DIVICE_DASHBOARD_HEIGHT: 'site.all_users.devicedashboard.tableau.height'
}

const USER_DASHBOARD_SETTING_CODES = {
    SITE_ALL_USER_DASHBOARD_HOST_URL: 'site.all_users.userdashboard.tableau.host_url',
    SITE_ALL_USER_DASHBOARD_NAME: 'site.all_users.userdashboard.tableau.name',
    SITE_ALL_USER_DASHBOARD_SITE_ROOT: 'site.all_users.userdashboard.tableau.site_root',
    SITE_ALL_USER_DASHBOARD_LOAD_ORDER: 'site.all_users.userdashboard.tableau.load_order',
    SITE_ALL_USER_DASHBOARD_CLIENT_IP: 'site.all_users.userdashboard.tableau.client_ip',
    SITE_ALL_USER_DASHBOARD_VIEW_AS: 'site.all_users.userdashboard.tableau.view_as',
    SITE_ALL_USER_DASHBOARD_FILTER: 'site.all_users.userdashboard.tableau.filter',
    SITE_ALL_USER_DASHBOARD_DEVICE: 'site.all_users.userdashboard.tableau.device',
    SITE_ALL_USER_DASHBOARD_CUSTOM_VIEWS: 'site.all_users.userdashboard.tableau.customViews',
    SITE_ALL_USER_DASHBOARD_SHOW_SHARE_OPTIONS: 'site.all_users.userdashboard.tableau.showShareOptions',
    SITE_ALL_USER_DASHBOARD_ALERTS: 'site.all_users.userdashboard.tableau.alerts',
    SITE_ALL_USER_DASHBOARD_SUBCRIPTIONS: 'site.all_users.userdashboard.tableau.subscriptions',
    SITE_ALL_USER_DASHBOARD_TABS: 'site.all_users.userdashboard.tableau.tabs',
    SITE_ALL_USER_DASHBOARD_TOOLBAR: 'site.all_users.userdashboard.tableau.toolbar',
    SITE_ALL_USER_DASHBOARD_TOOLTIP: 'site.all_users.userdashboard.tableau.tooltip',
    SITE_ALL_USER_DASHBOARD_WIDTH: 'site.all_users.userdashboard.tableau.width',
    SITE_ALL_USER_DASHBOARD_HEIGHT: 'site.all_users.userdashboard.tableau.height'
}

const CALENDAR_DASHBOARD_SETTING_CODES = {
    SITE_ALL_CALENDAR_DASHBOARD_HOST_URL: 'site.all_users.calendardashboard.tableau.host_url',
    SITE_ALL_CALENDAR_DASHBOARD_NAME: 'site.all_users.calendardashboard.tableau.name',
    SITE_ALL_CALENDAR_DASHBOARD_SITE_ROOT: 'site.all_users.calendardashboard.tableau.site_root',
    SITE_ALL_CALENDAR_DASHBOARD_LOAD_ORDER: 'site.all_users.calendardashboard.tableau.load_order',
    SITE_ALL_CALENDAR_DASHBOARD_CLIENT_IP: 'site.all_users.calendardashboard.tableau.client_ip',
    SITE_ALL_CALENDAR_DASHBOARD_VIEW_AS: 'site.all_users.calendardashboard.tableau.view_as',
    SITE_ALL_CALENDAR_DASHBOARD_FILTER: 'site.all_users.calendardashboard.tableau.filter',
    SITE_ALL_CALENDAR_DASHBOARD_DEVICE: 'site.all_users.calendardashboard.tableau.device',
    SITE_ALL_CALENDAR_DASHBOARD_CUSTOM_VIEWS: 'site.all_users.calendardashboard.tableau.customViews',
    SITE_ALL_CALENDAR_DASHBOARD_SHOW_SHARE_OPTIONS: 'site.all_users.calendardashboard.tableau.showShareOptions',
    SITE_ALL_CALENDAR_DASHBOARD_ALERTS: 'site.all_users.calendardashboard.tableau.alerts',
    SITE_ALL_CALENDAR_DASHBOARD_SUBCRIPTIONS: 'site.all_users.calendardashboard.tableau.subscriptions',
    SITE_ALL_CALENDAR_DASHBOARD_TABS: 'site.all_users.calendardashboard.tableau.tabs',
    SITE_ALL_CALENDAR_DASHBOARD_TOOLBAR: 'site.all_users.calendardashboard.tableau.toolbar',
    SITE_ALL_CALENDAR_DASHBOARD_TOOLTIP: 'site.all_users.calendardashboard.tableau.tooltip',
    SITE_ALL_CALENDAR_DASHBOARD_WIDTH: 'site.all_users.calendardashboard.tableau.width',
    SITE_ALL_CALENDAR_DASHBOARD_HEIGHT: 'site.all_users.calendardashboard.tableau.height'
}

const TIME_ZONES = {
    SINGAPORE: '+8',
    STANDARD: '+0'
}

const DATAMALL_KEYS = {
    ACCOUNT_KEY: "4o2ELWUtT7SAi7leVvvEng==",
    ACCEPT: "application/json",
    TIMEOUT: 10000
}
const ONEMAP_KEYS = {
    EMAIL: "necvm.dev@gmail.com",
    PASSWORD: "necvmdev12"
}
const HEREMAP_KEYS = {
    APP_ID: "YnHb6bk7lVuo5Ydidrll",
    APP_CODE: "eI_wbTp0l6U7QoifRt4pvw"
}

const DATE_FORMAT = {
    DB_FORMAT: "'YYYY-MM-DD HH24:MI:SS'",
    DB_FORMAT_2: "'YYYY-MM-DD HH24:MI'"
}

const HOUSE_KEEPING = {
    LOCATION_DAYS: 7,
    LOG_DEBUGGER_DAYS: 7
}

const RESIZING_IMAGE = {
    WIDTH: 640,
    MAX_SIZE: 1500000
}

const BUS_DATA_MANAGEMENT = {
    BUS_STOP: '0',
    BUS_SERVICE: '1',
    BUS_ROUTES: '2',
    BUS_POLYLINE: '3',
    BUS_CATEGORY: '4',
    BUS_MRT: '5',
    BUS_ARRIVAL: '6'
}

module.exports = {
    API_CODE_LIST: API_CODE_LIST,
    API_ADMIN_ROLE_LIST: API_ADMIN_ROLE_LIST,
    CODE_T_ROLE: CODE_T_ROLE,
    ROLE_NAME: ROLE_NAME,
    CODE_IDP: CODE_IDP,
    CODE_USER_STATUS: CODE_USER_STATUS,
    CODE_STRING_VALUE: CODE_STRING_VALUE,
    GENERAL_SETTING_CODE: GENERAL_SETTING_CODES,
    TABLEAU_DASHBOARD_SETTING_CODE: TABLEAU_DASHBOARD_SETTING_CODES,
    DIVICE_DASHBOARD_SETTING_CODE: DIVICE_DASHBOARD_SETTING_CODES,
    USER_DASHBOARD_SETTING_CODE: USER_DASHBOARD_SETTING_CODES,
    CALENDAR_DASHBOARD_SETTING_CODE: CALENDAR_DASHBOARD_SETTING_CODES,
    TIME_ZONE: TIME_ZONES,
    LOGIN_PROTOCOL: LOGIN_PROTOCOL,
    DATAMALL_KEY: DATAMALL_KEYS,
    ONEMAP_KEY: ONEMAP_KEYS,
    HEREMAP_KEY: HEREMAP_KEYS,
    SCHEDULE_TYPE,
    DATE_FORMAT: DATE_FORMAT,
    HOUSE_KEEPING: HOUSE_KEEPING,
    SYNC_BUS_MODE: SYNC_BUS_MODE,
    STATUS_DEVICE_TRACKING,
    FIREBASE_DIRECTION_PATH,
    MQTT_TOPIC_LIST,
    USE_MODEL,
    RESIZING_IMAGE,
    BUS_DATA_MANAGEMENT
}

