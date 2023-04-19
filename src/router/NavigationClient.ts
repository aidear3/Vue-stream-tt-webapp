import { NavigationClient, NavigationOptions } from "@azure/msal-browser";
import { Router } from "vue-router";

/**
 * This is an example for overriding the default function MSAL uses to navigate to other urls in your webpage
 */
export class CustomNavigationClient extends NavigationClient{
    private router: Router;

    constructor(router: Router) {
        super();
        this.router = router;
    }

    async navigateInternal(url: string, options: NavigationOptions) {
        const relativePath = url.replace(window.location.origin, '');
        if (options.noHistory) {
            this.router.replace(relativePath);
        } else {
            this.router.push(relativePath);
        }

        return false;
    }
}
