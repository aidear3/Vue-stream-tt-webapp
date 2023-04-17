
export default interface EventPackageType { 
    package_id: number;
    package_name: string,
    package_description: string,
    package_trial_status: number,
    package_no_expiry_status: number,

    package_duration: number,
    package_display_while_inactive: number,

    package_price: string,
    package_image: string,
    package_inactive_image: string,
    package_subscription_url: string,
    package_custom_data: string,

    customer_package_start_data: string,
    customer_package_end_data: string,
    customer_package_status: string
  }
export default interface EventPackagesType{
    EventPackages: Array<EventPackageType>
}
