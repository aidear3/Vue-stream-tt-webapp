export default interface Auth {
  auth: Auth;
  loggedIn: boolean,
  msalToken: string,
  tokenMode: string,
  devices: Array<Object>
}
