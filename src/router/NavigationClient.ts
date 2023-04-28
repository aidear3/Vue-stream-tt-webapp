import { NavigationClient, NavigationOptions } from "@azure/msal-browser";
import { Router } from "vue-router";

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
