import axios from "axios";
import { baseURL, guestTokenAPI } from "../mainConfig";
import { Md5 } from "ts-md5";
// import { key } from '../store'
// import { useStore } from 'vuex' 

// const store = useStore(key) 

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: baseURL //process.env.baseURL || process.env.apiUrl || "",
    //   timeout: 60 * 1000, // Timeout
    //   withCredentials: true, // Check cross-site Access-Control

};

const _axios = axios.create(config);

function getApiData(query: { apiParam: any; apiData: any; }, token: string) {
    return _axios
        .get(config.baseURL + query.apiParam + '?' + query.apiData,
            { headers: { "Authorization": `Bearer ${token}` } }
            // {
            //     headers: {
            //         "accept": "application/json",
            //         "Content-Type": "application/json; charset=utf8",
            //         "Authorization": 'Bearer '+ token,
            //         // "Transfer-Encoding": "chunked",
            //         // "Connection": "keep-alive",
            //         "Access-Control-Allow-Origin": "*",
            //         "Access-Control-Allow-Headers": "Authorization,*", 

            //         // 'CF-Cache-Status': 'DYNAMIC',
            //         // "Report-To": `{"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=AFYpTQWUJagZ3n2MZGZU1ZDV%2BYq94YoYkCvKqmwv2Z%2BdOnWwmK%2FqLXp%2BsGJtHyBFzCPgoWTAnOa%2F3wUk%2FDAZbcXHzeTO6wvpMbDm8ItyQ8oHen5xssEprjaxdBWLonhwc7ww"}],"group":"cf-nel","max_age":604800}`,
            //         // "NEL" : `{"success_fraction":0,"report_to":"cf-nel","max_age":604800}`,
            //         // "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
            //         // "X-Content-Type-Options": "nosniff",
            //         // "Server": "cloudflare",
            //         // "CF-RAY": "783cf83c39babb32-FRA",
            //         // "Content-Encoding": "br",
            //         // "alt-svc": `h3=":443"; ma=86400, h3-29=":443"; ma=86400`
            //     },
            //     // withCredentials: false,
            //     // transformRequest: getQueryString
            // }
        );
    // .then(response => {
    //     // var user_data = {
    //     // username: credentials.username,
    //     // access_token: response["data"].access_token,
    //     // token_type: response["data"].token_type
    //     // };

    //     // commit("SET_USER_DATA", user_data);

    //     store.commit("collateralVaultStore/setUserJustMinted", true);
    // });
}

const getRemoteAPIData = async (query: { apiParam: any; apiData: any; }, token: string) => {
    return await _axios
        .get(config.baseURL + query.apiParam + '?' + query.apiData,
            { headers: { "Authorization": `Bearer ${token}` } }
        );
}

export const getGuestToken = () => {
    return _axios
        .get(guestTokenAPI);
}

export const getUUID = () => {
    var base_url = "http://localhost:3000";
    var uuid_now = new Date();
    uuid_now.setMonth(uuid_now.getMonth() + 120);
    var uuid_expire = uuid_now.toUTCString();
    if (!getCookie("uuid")) {
        var uuid = Md5.hashStr(crypto.randomUUID());
        window.document.cookie = "uuid=" + uuid + "; SameSite=None; expires=" + uuid_expire + ";  path=/; domain=" + base_url + "; Secure";
    }
    else {
        var uuid = getCookie("uuid");
        window.document.cookie = "uuid=" + uuid + "; SameSite=None; expires=" + uuid_expire + ";  path=/; domain=" + base_url + "; Secure";
    }
    return uuid;
}

export const getConnection = (token : string) => {
    let apiData = '';
    // apiData += 'action=view_list' + '&';
    apiData += 'device_id=' + getUUID() + '&';
    apiData += 'device=website' + '&';
    apiData += 'application_id=2';

    let req = {
        apiParam: `Connect`,
        apiData: apiData
    }
    return getApiData(req, token);
}

export const showUserDevices = (token : string) => {
    let apiData = '';
    apiData += 'device_id=' + getUUID() + '&';
    apiData += 'application_id=2';

    let req = {
        apiParam: `Users/Devices`,
        apiData: apiData
    }
    return getApiData(req, token);
}

export const signout = (token: string) => {
    let apiData = '';
    apiData += 'device_id=' + getUUID() + '&';
    apiData += 'application_id=2&';
    apiData += 'signout_device_id=0';

    let req = {
        apiParam: `Users/Devices/SignOut`,
        apiData: apiData
    }
    return getApiData(req, token);
}

export const getMenuList = (token: string) => {

    let apiData = '';
    apiData += 'action=view_list' + '&';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2';


    let req = {
        apiParam: `Menu`,
        apiData: apiData
        // {
        //     action: 'view_list',
        //     device_id: 'Some-Unique-Device-ID-String-Of-Any-Length',
        //     device: 'android_mobile',
        //     application_id: 2
        // }
    }
    return getApiData(req, token);
}

export const getLiveTVByCategoryId = (apiParams: any) => {

    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'category_id=' + apiParams.category_id;


    let req = {
        apiParam: `Channels`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

/**
 * 
 * @param apiParams 
 * @returns 
 */
export const getLiveEventsByCategoryId = (apiParams: any) => {

    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2';


    let req = {
        apiParam: `Events/Category/` + apiParams.category_id,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}


/**
 * 
 * @param apiParams 
 * @returns 
 */
export const getSVODByCategoryId = (apiParams: any) => {

    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'category_id=' + apiParams.category_id;


    let req = {
        apiParam: `Video/Movies/` + apiParams.category_id,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

/**
 * 
 * @param apiParams 
 * @returns 
 */
export const getSVODById = (apiParams: any) => {

    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'movie_id=' + apiParams.vodId;


    let req = {
        apiParam: `Video/MovieDetails`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getMovieDetail = async (apiParams: any) => {

    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'movie_id=' + apiParams.vodId;


    let req = {
        apiParam: `Video/MovieDetails`,
        apiData: apiData
    }
    return await getRemoteAPIData(req, apiParams.token);
}

/**
 * 
 * @param apiParams 
 * @returns 
 */
export const getSVODSeriesById = (apiParams: any) => {

    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'seriesid=' + apiParams.vodId;


    let req = {
        apiParam: `Video/SeriesDetails`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getPackagesById = (apiParams: any) => {
    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2';

    let req = {
        apiParam: `Video/Packages/${apiParams.packageId}`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getProviderInfo = (apiParams: any) => {
    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'content_provider=' + apiParams.providerId;

    let req = {
        apiParam: `Instance/ContentProviders`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getEventsByContentProviderId = (apiParams: any) => {
    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2';

    let req = {
        apiParam: `Events/ContentProvider/${apiParams.providerId}`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getSeriesByContentProviderId = (apiParams: any) => {
    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'content_provider=' + apiParams.providerId + '&';
    apiData += 'series=true';

    let req = {
        apiParam: `Video/Movies`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getFilmsByContentProviderId = (apiParams: any) => {
    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'content_provider=' + apiParams.providerId + '&';
    apiData += 'movies=true';

    let req = {
        apiParam: `Video/Movies`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getSubscriptionSVOD = (apiParams: any) => {
    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'content_provider=' + apiParams.providerId;

    let req = {
        apiParam: `Video/Packages`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getSubscriptionLiveTV = (apiParams: any) => {
    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'content_provider=' + apiParams.providerId;

    let req = {
        apiParam: `Channels/Packages`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getSubscriptionSports = (apiParams: any) => {
    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'content_provider=' + apiParams.providerId;

    let req = {
        apiParam: `Sports/Packages`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getSubscriptionEvents = (apiParams: any) => {
    let apiData = '';
    apiData += 'device_id=Some-Unique-Device-ID-String-Of-Any-Length' + '&';
    apiData += 'device=android_mobile' + '&';
    apiData += 'application_id=2' + '&';
    apiData += 'content_provider=' + apiParams.providerId;

    let req = {
        apiParam: `Events/Packages`,
        apiData: apiData
    }
    return getApiData(req, apiParams.token);
}

export const getCookie = (cname: string) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(window.document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


