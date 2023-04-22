import Language from './languageType';
import Profile from './profileType';
import Message from './accountMessageType';

export default interface Account { 
    customer_id: number;
    child: boolean,
    client_ip: string,
    status: number,
    message: string,

    max_vod_rating: string,
    max_tv_rating: string,

    languages: Array<Language>,

    user_name: string,
    user_email: string,
    user_username: string,
    user_device_id: number,
    user_gender: string,
    user_age: string,

    dvr_usage_limit: number,
    dvr_usage: number,
    test_account: number,

    block_tvod: number,
    block_svod: number,
    block_ppv: number,

    npvr_status: number,
    catchup_status: number,
    restart_status: number,
    vod_status: number,

    token: string,
    wmsAuthSign: string,
    system_state: boolean,

    property_id: number,
    property_building: string,
    property_apartment: string,
    property_name: string,
    property_image: string,
    property_background_image: string,
    property_media_url: string,
    property_vast_url: string,
    ui_type: string,

    profiles: Array<Profile>,
    messages: Array<Message>
}

export default interface AccountType{
  Account: Account
}
