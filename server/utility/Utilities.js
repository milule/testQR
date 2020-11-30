const { LOGIN_PROTOCOL, RESIZING_IMAGE } = require('./ConstsSystem');
const fs = require('fs');
let pathLogDebug = '';
const got = require('got');
// const folderSize = require('get-folder-size');
const request = require("request");

function getAuth0Token() {
    return new Promise((resolve, reject) => {
        let options = { 
            method: 'POST',
            url: 'https://' + process.domain_machine + '/oauth/token',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded' 
            },
            form: { 
                grant_type: 'client_credentials',
                client_id: process.client_id_app_machine,
                client_secret: process.client_secret_machine,
                audience: 'https://' + process.domain_machine + '/api/v2/' 
            }
        };
        
        request(options, function (error, response, body) {
            if (error) {
                resolve({});
            } else {
                resolve(JSON.parse(body));
                // const json = JSON.parse(body);
                // json.access_token
            }
        });
    });
}

function loadFileJson(path) {
    return new Promise((resolve, reject) => {
        try {
            const fs = require('fs');
            fs.readFile(path, (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    const config = JSON.parse(content);
                    resolve(config);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}
/*
async function loadFileJson2(path) {
    return await loadFileJson(path);
}
*/
function getSize(path) {
    return new Promise((resolve, reject) => {
        try {
            let size = 0;
            // folderSize(path, (err, size) => {
            //     if (err) { 
            //         resolve({
            //             size: 0
            //         });
            //     } else {
            //         resolve({
            //             size: size
            //         });
            //     }
            // });
        } catch (ex) {
            resolve({
                size: 0
            });
        }
    });
    
}
/*
async function getSizeFolder(path) {
    try {
        return await getSize(path);
    } catch (ex) {
        return {size: 0};
    }
}
*/
function updateToFileJson(filePath, branchPath, values) {
    return new Promise((resolve, reject) => {
        try {
            const editJsonFile = require("edit-json-file");
            const file = editJsonFile(filePath);
            file.set(branchPath.toString(), values);
            file.save();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function isRootUser(userName) {
    return new Promise((resolve, reject) => {
        try {
            const fs = require('fs');
            fs.readFile('../config/admin.json', (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    const config = JSON.parse(content);
                    if (config && config.info.accountid === userName) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

function rejectError(reject, error, fileName) {
    try {
        let _err;
        if (!error) {
            _err = 'underfine';
        } else {
            _err = error;
        }
        if (reject) {
            reject(_err.toString());
        }
    } catch (error) {
        reject(error.toString());
    }
}

function printConsole(message, fileName){
    try {
        let msg;
        if (!message) {
            msg = 'underfine';
        } else {
            msg = message;
        }
        console.log(msg + ' at file: ' + fileName);
    } catch (error) {
        console.log(error);
    }
}

function convertDateOld(offset) {
    let date = require('date-and-time');
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000*offset));
    return date.format(nd, 'YYYY-MM-DD HH:mm:ss');
}

function convertTimezoneDatetime(inputTimestamp, hasTimezone = false, timeZone = 'Europe/London') {
    let rs = null;
    if (inputTimestamp && timeZone) {
        const moment = require('moment-timezone');
        // moment.tz.guess()
        const _tm = moment.tz(inputTimestamp, moment.tz.guess());
        if (hasTimezone) {
            rs = _tm.format('YYYY-MM-DD HH:mm:ss [GMT]Z');
        } else {
            rs = _tm.format('YYYY-MM-DD HH:mm:ss');
        }
    }
    return rs;
}

function getCurrentDate() {
    let rs = '';
    try {
        const moment = require('moment-timezone');
        const _tm = moment.tz(new Date(), moment.tz.guess());
        rs = _tm.format('YYYY-MM-DD HH:mm:ss');
    } catch (error) {
        rs = (new Date()).toString();
    }
    return rs;
}

function addSecondDatetime(seconds) {
    let rs = '';
    try {
        const moment = require('moment-timezone');
        const dt = new Date();
        dt.setSeconds(dt.getSeconds() + seconds);
        const _tm = moment.tz(dt, moment.tz.guess());
        rs = _tm.format('YYYY-MM-DD HH:mm:ss');
    } catch (error) {
        rs = (new Date()).toString();
    }
    return rs;
}

function convertDate(date) {
    let rs = '';
    try {
        const moment = require('moment-timezone');
        const _tm = moment.tz(date, moment.tz.guess());
        rs = _tm.format('YYYY-MM-DD HH:mm:ss');
    } catch (error) {
        rs = '';
    }
    return rs;
}

function getClientIpFromReq(req) {
    let result = '';
    try {
        if (req && (req.connection || req.headers)) {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            // on localhost you'll see 127.0.0.1 if you're using IPv4 
            // or ::1, ::ffff:127.0.0.1 if you're using IPv6
            if (ip) {
                const preFix = '::ffff:';
                if (ip.toString().indexOf(preFix) >= 0) {
                    result = ip.replace(preFix, '');
                } else {
                    result = ip;
                }
            }
        }
    } catch (error) {
        // Nothing
    }

    return result;
}

function setDeviceLoginByType(type, ip) {
    let result = '';
    try {
        const _ip = ip || '';
        if (type === LOGIN_PROTOCOL.WEB.LABEL) {
            result = LOGIN_PROTOCOL.WEB.VALUE + _ip;
        } else if (type.indexOf(':') >=0) {
            const arr = type.split(':');
            const _tp = arr[0];
            const _id = arr[1];
            if (_tp === LOGIN_PROTOCOL.DEVICE.LABEL) {
                if (_id) {
                    result = LOGIN_PROTOCOL.DEVICE.VALUE + _id;
                } else {
                    result = LOGIN_PROTOCOL.DEVICE.VALUE + 'undefine';
                }

            } else {
                result = 'undefine';
            }
        }
    } catch (error) {
        // Nothing
    }
    return result;
}


function convertTimestamps(offset, format) {
    let date = require('date-and-time');
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000*offset));
    if (format && format !== '') {
        return date.format(nd, format);
    } else {
        return date.format(nd, 'YYYY-MM-DD HH:mm:ss.SSS');
    }
}

function smoothString(str) {
    let _str = str;
    if (!_str) {
        _str = '';
    }
    return "'" + _str.replace(/'/gi, "''") + "'";
}

function createFolder(pathDir) {
    try {
        const _pathDir = pathDir.replace('"', '').replace('"', '').trim();
        let result = _pathDir;
        const arr = _pathDir.split('/');
        let tmpPath = '/';
        if (!fs.existsSync(_pathDir)) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== '/') {
                    tmpPath += arr[i] + '/';
                }
                tmpPath = tmpPath.replace('//', '/')
                if (!fs.existsSync(tmpPath)) {
                    fs.mkdirSync(tmpPath);
                }
            }
        }
        const lastChar = result.charAt(result.length - 1);
        if (lastChar === '/') {
          result = result.substring(0, result.length - 1);
        }
        return result;
    } catch (ex) {
        result = '';
        // console.log(ex);
    }
}

function createFolderUpload(pathDir) {
    let result = pathDir;
    try {
        result = createFolder(pathDir);
        if (result === '') {
            const date = convertTimestamps('0', 'YYYY-MM-DD');
            result = '/www/media/' + date;
            if (!fs.existsSync(result)){
                fs.mkdirSync(result);
            }
        }
    } catch (ex) {
        console.log(ex);
    }
    return result;
}

function createFolderLog(pathDir) {
    let result = pathDir;
    try {
        result = createFolder(pathDir);
        if (result === '') {
            result = '~/log/easytravel';
            if (!fs.existsSync(result)){
                fs.mkdirSync(result);
            }
        }
    } catch (ex) {
        console.log(ex);
    }
    return result;
}

function smoothMediaPath(pathDir) {
    let result = '/';
    let index = -1;
    try {
        if (pathDir.indexOf('/www/') !== -1) {
            index = 1;
        }
        const arr = pathDir.split('/');
        for (let i = 0; i < arr.length; i++) { 
            if (i > index) {
                if (arr[i].length > 0) {
                    if (i !== arr.length - 1) {
                        result += arr[i] + '/';
                    } else {
                        result += arr[i];
                    }
                }
            }
        }
    } catch(ex) {
        console.log(ex);
    }
    return result;
}

function smoothPath(pathDir) {
    let result = '/';
    try {
        if (pathDir && pathDir !== '') {
            const arr = pathDir.split('/');
            for (let i = 0; i < arr.length; i++) { 
                if (arr[i].length > 0) {
                    result += arr[i] + '/';
                }
            }
        }
    } catch(ex) {
        console.log(ex);
    }
    return result;
}

function getLimitOffsetPagination(index, near, max) {
        //limit 10x3 offset (idex - 1 - 1) * 10 <= 1
        //limit 10x5 offset (idex - 1 - 2) * 10 <= 2
        //limit 10x7 offset (idex - 1 - 3) * 10 <= 3
        // => limit 10*(2*near + 1) offset (index - 1 - near)
        //* limit 10x4 offset [((idex=1) - 1 - 3) * 10]! <= 3
        //* limit 10x5 offset [((idex=2) - 1 - 3) * 10]! <= 3
        //* limit 10x6 offset [((idex=3) - 1 - 3) * 10]! <= 3
        //* limit 10x7 offset ((idex=4) - 1 - 3) * 10 <= 3
        //* limit [10x7]! offset ((idex=5) - 1 - 3) * 10 <= 3
        // => limit 10*min(2*near + 1,index + near) offset max(0,index - 1 - near) * 10
        const limit = max * Math.min(2*near + 1, index + near);
        const offset = max * Math.max(0, index - 1 - near);
        const nearBegin = Math.max(1, index - near);
        return {
            limit: limit,
            offset: offset,
            nearBegin: nearBegin
        }
}

/**
 * 
 * @param {*} columnsObj 
 * columnsObj = {
 *  'String': [],
 *  'Number': [],
 *  'Timestamp': []
 * }
 * @param {*} inputWhereObj
 * const inputWhereObj = {
 *  'Id': ''
 *  'Name: ''
 * }
 * @param {*} preFix
 * exaple: A."Id" - A is Prefix
 *  
 */
function makeWhere4Pagination(columnsObj, inputWhereObj, preFix, isHasWhere = true, caseId = 'common', whereExt = '') {
    try {
        let _where = '';
        if (inputWhereObj && Object.keys(inputWhereObj).length > 0
            && columnsObj && Object.keys(columnsObj).length > 0) {
            // 
            Object.keys(inputWhereObj).forEach(key => {
                // String
                if (columnsObj['String'] && columnsObj['String'][key] && inputWhereObj[key]) {
                    const columnName = columnsObj['String'][key];
                    _where += ' ' + preFix + '."' + columnName +'" ILIKE ' + smoothString('%' + inputWhereObj[key] + '%') + ' AND ';
                }
                // Number
                else if (columnsObj['Number'] && columnsObj['Number'][key]) {
                    const columnName = columnsObj['Number'][key];
                    // user management
                    if (caseId === 'user_management' && inputWhereObj[key] === '0') {
                        _where += ' ' + preFix + '."' + columnName +'" IS NULL AND ';
                    }
                    // common 
                    else if (inputWhereObj[key] !== null && inputWhereObj[key] !== undefined && inputWhereObj[key] !== '') {
                        _where += ' ' + preFix + '."' + columnName +'"=' + smoothString(inputWhereObj[key]) + ' AND ';
                    }
                }
                // Timestamp
                else if (columnsObj['Timestamp'] && columnsObj['Timestamp'][key] && inputWhereObj[key]) {
                    const columnName = columnsObj['Timestamp'][key];
                    const firstDay = convertDate2FirstDay(inputWhereObj[key]);
                    const lastDay = convertDate2LastDay(inputWhereObj[key]);
                    if (firstDay && lastDay) {
                        _where += ' ' + preFix + '."' + columnName +'" BETWEEN ' + smoothString(firstDay) + ' AND ' + smoothString(lastDay) + ' AND ';
                    } else {
                        throw new Error('Invalid input. ' + key + ': Invalid date');
                    }
                }
                // Array
                else if(columnsObj['Array'] && columnsObj['Array'][key] && inputWhereObj[key]) {
                    const columnName = columnsObj['Array'][key];
                    let _val = '';
                    const arr =  inputWhereObj[key];
                    if (Array.isArray(arr) && arr.length > 0) {
                        arr.forEach(itm => {
                            _val += itm + ','
                        });
                    }
                    if (_val) {
                        _val = _val.slice(0, _val.length - 1);
                        _val = ' ARRAY[' + arr + '] ';
                        _where += ' ' + preFix + '."' + columnName +'"=' + _val + ' AND ';
                    }
                }
            });
            if (caseId === 'calendar_management') {
                _where += whereExt;
            }
            if (_where) {
                // remove 'AND' on the latest
                _where = _where.slice(0, _where.length - 4);
                if (isHasWhere) {
                    _where = ' WHERE ' + _where;
                } else {
                    _where = ' AND ' + _where;
                }
            }
        }
        return _where;
    } catch (err) {
        throw err;
    }
}

function convertArrayToStr(arr) {
    let rs = 'ARRAY[';
    arr.map(el => {
        rs += '\'' + el.toString().replace(/'/gi, "''") + '\','
    });
    rs = rs.slice(0, rs.length - 1);
    rs += ']';
    return rs;
}

function makeDataPagination(dataRows, pageBegin, max) {
    const data = {};
    try {
        let _totalRecs = 0;
        data['Pages'] = {};
        if (dataRows && dataRows[0]) {
            const records = dataRows[0];
            let count = 0;
            let _page = [];
            let isPush2Rows = false;
            let _currentPage = pageBegin;
            records.forEach(_rec => {
                // check to get TotalRows
                if (_rec && _rec.Id && _rec.Id === '-1') {
                    _totalRecs = _rec.Seq;
                } else {
                    const rec = _rec;
                    if (_totalRecs <=0) {
                        _totalRecs = rec.TotalRecords;
                    }
                    isPush2Rows = false;
        
                    //
                    delete rec.TotalRecords;
                    _page.push(rec);
        
                    if (count === max - 1) {
                        // data['Pages'][_currentPage]= _page;
                        checkPush(_currentPage, _page);
                        _currentPage ++;
                        isPush2Rows = true;
                        _page = [];
                        count = 0;
                    } else {
                        count ++;
                    }
                }
            });
            if (!isPush2Rows) {
                // data['Pages'][_currentPage] = _page;
                checkPush(_currentPage, _page);
                _page = [];
            }
        }
        if (!_totalRecs) {
            _totalRecs = 0;
        }
        data['TotalRecords'] = _totalRecs;
    } catch (error) {
        
    }
    return data;

    function checkPush(currentPage, _page) {
        if (_page.length > 0) {
            data['Pages'][currentPage] = _page;
        }
    }
}
/*
const fetchRouteOptimized = async (onemap, coords) => {
    let res;
    try {
        res = await got('https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + coords.join(';'), {
            json: true,
            query: {
                access_token: onemap,
                geometries: 'polyline',
                overview: 'full',
                steps: true,
                approaches: coords.map(_ => 'curb').join(';'),
            },
        });
        const { body } = res;
        // geometries: 'geojson',
        // return body.matchings[0].geometry.coordinates;
        // geometries: 'polyline',
        return body.trips[0].geometry;
    } catch (e){
       // console.error(e, res.req.path);
       throw e;
    }
} 

const fetchRoutePolyline = async (onemap, coords) => {
    let res;
    try {
        if (coords.length == 2) {
            //geometries: 'geojson',
            res = await got('https://api.mapbox.com/directions/v5/mapbox/driving/' + coords.join(';'), {
                json: true,
                query: {
                    access_token: onemap,
                    geometries: 'polyline',
                    overview: 'full',
                },
            });
            const { body } = res;
            // geometries: 'geojson',
            // return body.routes[0].geometry.coordinates;

            // geometries: 'polyline',
            return body.routes[0].geometry;
        }
  
        res = await got('https://api.mapbox.com/matching/v5/mapbox/driving/' + coords.join(';'), {
            json: true,
            query: {
                access_token: onemap,
                geometries: 'polyline',
                overview: 'full',
                approaches: coords.map(_ => 'curb').join(';'),
            },
        });
        const { body } = res;
        // geometries: 'geojson',
        // return body.matchings[0].geometry.coordinates;
        
        // geometries: 'polyline',
        return body.matchings[0].geometry;
    } catch (e){
       // console.error(e, res.req.path);
       throw e;
    }
} 

const fetchRouteGeojson = async (onemap, coords) => {
    let res;
    try {
        if (coords.length == 2) {
            //geometries: 'geojson',
            res = await got('https://api.mapbox.com/directions/v5/mapbox/driving/' + coords.join(';'), {
                json: true,
                query: {
                    access_token: onemap,
                    geometries: 'geojson',
                    overview: 'full',
                },
            });
            const { body } = res;
            // geometries: 'geojson',
            return body.routes[0].geometry.coordinates;
        } else {
            res = await got('https://api.mapbox.com/matching/v5/mapbox/driving/' + coords.join(';'), {
                json: true,
                query: {
                    access_token: onemap,
                    geometries: 'geojson',
                    overview: 'full',
                    approaches: coords.map(_ => 'curb').join(';'),
                },
            });
            const { body } = res;
            // geometries: 'geojson',
            return body.matchings[0].geometry.coordinates;
        }
    } catch (e){
       // console.error(e, res.req.path);
       throw e;
    }
} 
*/
function reversePosition(arr) {
    try {
        const coords = [];
        for (let j=0; j< arr.length; j++) {
            const coord = [];
            coord.push(arr[j][1]);
            coord.push(arr[j][0]);
            coords.push(coord);
        }
        return coords;
    } catch (ex) {
        return arr;
    }
}

function isValidDate(dateString) {
    let isValid = true;
    try {
        const _date = Date.parse(dateString);
        if (!_date || _date === 'NaN') {
            isValid = false;
        }
    } catch (err) {
        isValid = false;
        // Nothing
    }
    return isValid;
}
function convertDate2FirstDay(date) {
    let rs = '';
    try {
        if (isValidDate(date)) {
            const dt = new Date(date);
            dt.setHours(0);
            dt.setMinutes(0);
            dt.setSeconds(0);
            dt.setMilliseconds(0);
            rs = convertDate(dt);
        }
    } catch (err) {
        // Nothing
    }
    return rs;
}
function convertDate2LastDay(date) {
    let rs = '';
    try {
        if (isValidDate(date)) {
            const dt = new Date(date);
            dt.setHours(23);
            dt.setMinutes(59);
            dt.setSeconds(59);
            dt.setMilliseconds(999);
            rs = convertDate(dt);
        }
    } catch (err) {
        // Nothing
    }
    return rs;
}
function compareDate(firstDate, secondDate) {
    let rs = '1'; // default is large than
    try {
        if (isValidDate(firstDate) && isValidDate(secondDate)) {
            const _first = new Date(firstDate);
            const _second = new Date(secondDate);
            if (_first.getTime() - _second.getTime() === 0) {
                rs = '0';
            } else if (_first.getTime() - _second.getTime() < 0) {
                rs = '-1';
            }
        }
    } catch (err) {
        // nothing
    }
    return rs;
}

function isDate(date) {
    let result = false;
    try {
        const _date = new Date(date);
        if (isNaN(_date.getTime())) {
            result = false;
        } else {
            result = true;
        }
    } catch (ex) {
    }
    return result;
}

function deleteFolderRecursive(path) {
    try {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file,index){
                const curPath = path + "/" + file;
                if(fs.lstatSync(curPath).isDirectory()) {
                    deleteFolderRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
          }
    } catch (ex) {
    }
}

function isNumeric(value) {
    let result = false;
    try {
        const numberPattern = /^\d+$/;
        if (value) {
            result = value.match(numberPattern);
            if (result != null) {
                result = true;
            }
        }
    } catch (ex) {
    }
    return result;
}

function resizingImage(imageBinary, inImgSize, width = null, height = null) {
    return new Promise((resolve, reject) => {
        try {
            if (Number(inImgSize) > Number(RESIZING_IMAGE.MAX_SIZE)) {
                const size = {};
                if (width) {
                    size['width'] = width;
                } else {
                    // default;
                    size['width'] = RESIZING_IMAGE.WIDTH;
                }
                if (height) {
                    size['height'] = height;
                }
                if (size['height'] || size['width']) {
                    const sharp = require('sharp');
                    sharp(imageBinary).resize(size).toBuffer((err, data, info) => {
                        // console.log('### err');
                        // console.log(err);
                        // console.log('### data');
                        // console.log(data);
                        // console.log('### info');
                        // console.log(info);
                        // console.log('###');
                        if (!err) {
                            resolve(data);
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    reject();
                }
            } else {
                resolve(imageBinary);
            }
        } catch (err) {
            reject(err);
        }
    });
}


module.exports = {
    loadFileJson,
    updateToFileJson,
    isRootUser,
    rejectError,
    printConsole,
    convertDateOld,
    getClientIpFromReq,
    setDeviceLoginByType,
    convertTimestamps,
    smoothString,
    createFolder,
    smoothPath,
    smoothMediaPath,
    createFolderUpload,
    createFolderLog,
    convertTimezoneDatetime,
    getCurrentDate,
    convertDate,
    addSecondDatetime,
    getLimitOffsetPagination: getLimitOffsetPagination,
    makeDataPagination: makeDataPagination,
    makeWhere4Pagination,
    convertArrayToStr,
    //fetchRoutePolyline,
    //fetchRouteOptimized,
    //fetchRouteGeojson,
    //loadFileJson2,
    //reversePosition,
    //getSizeFolder,
    isValidDate,
    convertDate2FirstDay,
    convertDate2LastDay,
    compareDate,
    isDate,
    deleteFolderRecursive,
    isNumeric,
    resizingImage,
    getAuth0Token
}