import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

export const HIGHLIGHT_COLOR_1 = "#8b0000";
export const HIGHLIGHT_COLOR_2 = "#2f2f2f";
export const BACKGROUND_COLOR_1 = "#111"; //2473b7
export const BACKGROUND_COLOR_2 = "'.$background_color_2.'";
export const FONT_COLOR_1 = "#fff";
export const FONT_COLOR_2 = "'.$font_color_2.'";
export const SIDEEFFECTBAR_1 = "rgba(0,0,0,1)";
export const SIDEEFFECTBAR_2 = "rgba(0,0,0,0.9668242296918768)";
export const SIDEEFFECTBAR_3 = "rgba(0,0,0,0.7455357142857143)";
export const SIDEEFFECTBAR_4 = "rgba(255,255,255,0)";

export const PLAYER_URL = "https://player.xstreamtt.com/";
export const baseURL = "https://xmw.siberapi.com/api/ui/stb/v3/";

export const guestTokenAPI = "https://api.xstreamtt.com/sso/getGuestToken.php";

export const msalObj = {
  dev: {
    // clientId: '2c3e67d9-1670-45c7-8451-651abd1304c0',
    // authority: 'https://streamtt.b2clogin.com/streamtt.onmicrosoft.com/B2C_1_SignUp_SignIn_Dev',
    // redirectUri: '/', // Must be registered as a SPA redirectURI on your app registration
    // knownAuthorities: ["streamtt.b2clogin.com"], 
    clientId: '32ffd2f4-0a68-4342-955c-95b32111373d',
    authority: 'https://xstreamtt.b2clogin.com/xstreamtt.onmicrosoft.com/B2C_1_SignUp_SignIn',
    redirectUri: '/', // Must be registered as a SPA redirectURI on your app registration
    knownAuthorities: ["xstreamtt.b2clogin.com"],
    postLogoutRedirectUri: '/' // Must be registered as a SPA redirectURI on your app registration
  },
  stage: {
    clientId: '32ffd2f4-0a68-4342-955c-95b32111373d',
    authority: 'https://xstreamtt.b2clogin.com/xstreamtt.onmicrosoft.com/B2C_1_SignUp_SignIn',
    redirectUri: '/', // Must be registered as a SPA redirectURI on your app registration
    knownAuthorities: ["xstreamtt.b2clogin.com"],
    postLogoutRedirectUri: '/' // Must be registered as a SPA redirectURI on your app registration
  },
  product: {
    clientId: '32ffd2f4-0a68-4342-955c-95b32111373d',
    authority: 'https://xstreamtt.b2clogin.com/xstreamtt.onmicrosoft.com/B2C_1_SignUp_SignIn',
    redirectUri: '/', // Must be registered as a SPA redirectURI on your app registration
    knownAuthorities: ["xstreamtt.b2clogin.com"],
    postLogoutRedirectUri: '/' // Must be registered as a SPA redirectURI on your app registration
  }
}

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: msalObj.dev,
  cache: {
    cacheLocation: 'localStorage'
    // https://bmobileplus.com/#state=eyJpZCI6IjU1NjFlODhlLWM0YTgtNGVlZC1iMDg0LWUzY2IzMzNlNzRkYSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicG9wdXAifX0%3d&client_info=eyJ1aWQiOiIyNDg4ODYxYi1mOTkxLTQxOTAtYjc5MC0xZGY0NTBmNGQwNjYtYjJjXzFfc2lnbnVwX3NpZ25pbiIsInV0aWQiOiIyZDk5ZWEzZC1lN2I4LTQzNDItYWZkNy1hNTJhMWVjZjE2ODkifQ&code=eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ..w2K0tdPtnfNORRD7.S49Sa1bqm9qX8DSAZuqF2_5nzD5XpL9eOkoMc2uTIpjssna6AWd3tw7DPIXjA5NKJWOtL1_vkuD2yu37eHyPZJ_eLI0hOAmt8NsVF96GyQbQt7NRWGEAtuCSYZ7qtghYhMtFzT9yQq_Ie_KpW2Du1802gkpG74vlmjbJam62bx3LNR5BC5xvcTs_IFd7o4rnKMmxREYCNIV5LBsLipdLxr-9r239W0GgJOhPcSOpy1W0d4rTUO8pTvQKZ7fX-FrtkeW4mNtqhI30ECl3aC2d4sZ4lLZbAxU_pkzLFwL1m8FLB7YPi5ScDj-21bLquUaa0PWLOTZKinWW05bhAFpUcfCTYeUUSfcfISEEklP3mAeCfD9Un-xzL2MURhXE1kLeHjM2gDRPI9HZ4LWFXPECAyDD_DpAHD4U2vxTS8zouOqsmBWX-4VXvbStMD4umjmOALP7klpuQLX0k7FSM4xbIdVrfuSxwuYvUq3F1foYct17dMl8nXNJgK_fgxiiLZogyTMwUEtTLzz0BXXWyIThsiArOPXOBAco-ZVFwmut0gnorWUaYhnBimgYTKo-p79Vn7RMUptJEyk59Tnrhvr5uWsqfFKPyy5o3CWreWeWSzJv9mlK-BZCUmYfwPp6nCco6KLVWYXOSO9lQnuRV-yK_bBnhgLYcF9oTaa3TwPjA3xGBc7BIZ9g-ZsSaM6kvgwh-Nn83iaCYfOGeXwRnenA9F5n4xetR26upfC8yhqbLAytk8NBNrHBpeHKEn628PqKwqekEMNf811YLY34.hsMI6NRfRpoXVNU_ohXkRg
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            console.log(level, message, containsPii);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      logLevel: LogLevel.Verbose
    }
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  // scopes: ['User.Read'],
  scopes: ["openid", "offline_access", msalConfig.auth.clientId],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};

export const TopMenu = [
  {
    item: 'Download Apps',
    icon: '',
    subItems: [
      {
        icon: '/assets/img/roku_circle_icon.png',
        name: 'Roku Devices',
        action: '',
        newtab: true,
      },
      {
        icon: '/assets/img/fire_tv_circle_icon.png',
        name: 'Fire TV Devices',
        action: '',
        newtab: true,
      },
      {
        icon: '/assets/img/google_tv_circle_icon.png',
        name: 'Google/Android TV',
        action: '',
        newtab: true,
      },
      {
        icon: '/assets/img/iphone_mobile_circle_icon.png',
        name: 'iPhone',
        action: '',
        newtab: true,
      },
      {
        icon: '/assets/img/ipad_circle_icon.png',
        name: 'iPad',
        action: '',
        newtab: true,
      },
      {
        icon: '/assets/img/android_tablet_circle_icon.png',
        name: 'Android Tablet',
        action: '',
        newtab: true,
      },
      {
        icon: '/assets/img/android_mobile_circle_icon.png',
        name: 'Android Phone',
        action: '',
        newtab: true,
      }
    ]
  },
  {
    item: 'Packages',
    icon: '',
    action: '',
    subItems: []
  },
  {
    item: 'About us',
    icon: '',
    subItems: [
      {
        icon: '',
        name: 'About us',
        action: '',
        newtab: true,
      },
      {
        icon: '',
        name: 'Terms & Conditions',
        action: '',
        newtab: true,
      }, {
        icon: '',
        name: 'Privacy Policy',
        action: '',
        newtab: true,
      }
    ]
  },
  {
    item: 'Broadcast',
    icon: '/assets/img/broadcast_icon.png',
    subItems: [
      {
        icon: '/assets/img/go_live_icon.png',
        name: 'Go Live',
        action: '',
        newtab: false,
      },
      {
        icon: '/assets/img/upload_video_icon.png',
        name: 'Upload Video',
        action: '',
        newtab: false,
      }
    ]
  }
]

export const Signin = [
  {
    item: 'Sign In',
    icon: '',
    subItems: [
    ]
  },
]

export const Signout = [
  {
    item: 'Sign Out',
    icon: '',
    subItems: [
      {
        icon: '',
        name: 'Settings',
        action: '',
        newtab: false,
      },
      {
        icon: '',
        name: 'Sign out',
        action: '',
        newtab: false,
      },
    ]
  },
]
