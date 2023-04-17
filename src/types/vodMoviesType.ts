
export default interface VodMovieType { 
    id: number;
    position: number,
    is_series: boolean,
    series_id: number,
    caption: string,

    description: string,
    poster_url: string,

    wide_poster_url: string,
    landscape_poster_url: string,
    category: string,
    price: string,
    genre: string,

    svod_subscription: number,
    customer_balance: string,
    custom_data: string,
    content_provider_id: string,
    content_provider_name: string,
    content_provider_logo: string,
    content_provider_description: string,
    content_provider_custom_data: string
  }
export default interface VodMoviesType{
    VodMovies: Array<VodMovieType>
}
