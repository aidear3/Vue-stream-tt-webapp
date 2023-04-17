
export default interface EventType{
    live_event_id: number,
    live_event_status: number,
    live_event_position: number,
    live_event_name_short: string,
    live_event_name_long: string,
    live_event_description: string,
    live_event_instagram: string,
    live_event_facebook: string,
    live_event_youtube: string,
    live_event_twitter: string,
    live_event_website: string,
    live_event_pay_per_view_url: string,
    live_event_producer: string,
    live_event_actors: string,
    live_event_duration: number,
    live_event_url: string,
    live_event_image: string,
    live_event_image_wide: string,
    live_event_date: string,
    live_event_category: string,
    live_event_playback_status: string,
    live_event_content_rating: string,
    pre_roll: string,
    mid_roll: string,
    trailer_url: string,
    ppv_url: string,
    price: number,
    category_id: number,

    ticket_status: boolean,
    
    p2p_status: boolean,
    web_login_status: boolean,
    casting_status: boolean,
    timeshift_status: boolean,
    dvr_duration: number,
    bid: string,

    content_provider_id: number,
    content_provider_name: string,
    content_provider_logo: string,
    content_provider_description: string,
    content_provider_custom_data: string,
    custom_data: string,
    package_id: number,
    package_status: string,
}

export default interface EventsType{
    Events: Array<EventType>
}