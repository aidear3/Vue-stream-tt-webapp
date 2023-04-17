export const devMode = true;

// function selectAccount() {
// 	/**
// 	 * See here for more info on account retrieval: 
// 	 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
// 	 */

// 	const currentAccounts = myMSALObj.getAllAccounts();
// 	//console.log(currentAccounts);
// 	if (currentAccounts.length < 1) {
// 		return;
// 	} else if (currentAccounts.length > 1) {

// 		/**
// 		 * Due to the way MSAL caches account objects, the auth response from initiating a user-flow
// 		 * is cached as a new account, which results in more than one account in the cache. Here we make
// 		 * sure we are selecting the account with homeAccountId that contains the sign-up/sign-in user-flow, 
// 		 * as this is the default flow the user initially signed-in with.
// 		 */
// 		const accounts = currentAccounts.filter(account =>
// 			account.homeAccountId.toUpperCase().includes(b2cPolicies.names.signUpSignIn.toUpperCase())
// 			&&
// 			account.idTokenClaims.iss.toUpperCase().includes(b2cPolicies.authorityDomain.toUpperCase())
// 			&&
// 			account.idTokenClaims.aud === msalConfig.auth.clientId
// 		);

// 		if (accounts.length > 1) {
// 			// localAccountId identifies the entity for which the token asserts information.
// 			if (accounts.every(account => account.localAccountId === accounts[0].localAccountId)) {
// 				// All accounts belong to the same user
// 				setAccount(accounts[0]);
// 			} else {
// 				// Multiple users detected. Logout all to be safe.
// 				const logoutRequest = {
// 					postLogoutRedirectUri: window.location.href,
// 					mainWindowRedirectUri: window.location.href
// 				};

// 				myMSALObj.logoutPopup(logoutRequest);
// 			};
// 		} else if (accounts.length === 1) {
// 			setAccount(accounts[0]);
// 		}

// 	} else if (currentAccounts.length === 1) {
// 		setAccount(currentAccounts[0]);
// 	}
// }

// function checkIsLoggedIn() {
// 	getTokenPopup(tokenRequest)
// 		.then(response => {
// 			if (response) {
// 				//console.log("access_token acquired at: " + new Date().toString());
// 				//console.log("Access Token passTokenToApi: " + response.accessToken);
// 				if (response.accessToken) {
// 					access_token = response.accessToken;
// 					$.ajax({
// 						url: 'https://' + middleware_url + '/api/ui/stb/v3/Connect?device_id=' + uuid + '&device=website&application_id=' + application_id,
// 						type: 'get',
// 						headers: { "Authorization": "Bearer " + access_token },
// 						success: function (response) {
// 							var responseObject = response;
// 							//console.log(responseObject);
// 							if (responseObject.response.account.status == 200) {
// 								user_id = responseObject.response.account.customer_id.toString();
// 								dvid = responseObject.response.account.user_device_id.toString();
// 								user_gender = responseObject.response.account.user_gender;
// 								user_age = responseObject.response.account.user_age;
// 								logged_in = true;
// 								start_load();
// 							}
// 							else if (responseObject.response.account.status == 400) {
// 								show_user_devices();
// 							}
// 						},
// 					});
// 				}
// 				else {
// 					getGuestLogin();
// 				}
// 			}
// 			else {
// 				getGuestLogin();
// 			}
// 		});
// }

// function handleResponse(response) {
// 	if (response !== null) {
// 		// console.log("function handleResponse(response)");
// 		// console.log(response);
// 		// // Show the SIBER Middleware ID of the Logged in User
// 		//console.log("Middleware ID: " + response.idTokenClaims.extension_MiddlewareID);
// 		//console.log("ID Token: " + response.idToken);
// 		//console.log("Access Token: " + response.accessToken);
// 		setAccount(response.account);
// 		login(response.accessToken);
// 	} else {
// 		selectAccount();
// 	}
// }

// function signIn() {
// 	$('#package_popup-modal').modal('hide');
// 	$('#login_required_popup-modal').modal('hide');

// 	myMSALObj.loginPopup(loginRequest)
// 		.then(handleResponse)
// 		.catch(error => {
// 			//console.log(error);
// 		});
// }

// function signOut() {

// 	getTokenPopup(tokenRequest)
// 		.then(response => {
// 			if (response) {
// 				//console.log("access_token acquired at: " + new Date().toString());
// 				console.log("Access Token passTokenToApi: " + response.accessToken);
// 				if (response.accessToken) {
// 					access_token = response.accessToken;
// 					$.ajax({
// 						url: 'https://' + middleware_url + '/api/ui/stb/v3/Users/Devices/SignOut?device_id=' + uuid + '&application_id=' + application_id + '&signout_device_id=' + dvid,
// 						type: 'get',
// 						headers: { "Authorization": "Bearer " + access_token },
// 						success: function (response) {
// 							var responseObject = response;
// 							//console.log(responseObject);
// 							if (responseObject.status == 200) {
// 								const logoutRequest = {
// 									postLogoutRedirectUri: window.location.href,
// 									mainWindowRedirectUri: window.location.href
// 								};

// 								myMSALObj.logoutPopup(logoutRequest);
// 							}
// 						},
// 					});
// 				}
// 			}
// 		});
// }

// function getTokenPopup(request) {
// 	request.account = myMSALObj.getAccountByHomeId(ssoAccountId);
// 	return myMSALObj.acquireTokenSilent(request)
// 		.then((response) => {
// 			// In case the response from B2C server has an empty accessToken field
// 			// throw an error to initiate token acquisition
// 			if (!response.accessToken || response.accessToken === "") {
// 				throw new msal.InteractionRequiredAuthError;
// 			}
// 			//console.log("myMSALObj.acquireTokenSilent(request)");
// 			//console.log(response);
// 			return response;
// 		})
// 		.catch(error => {
// 			//console.log("Silent token acquisition fails. Acquiring token using popup. \n", error);
// 			if (error instanceof msal.InteractionRequiredAuthError) {
// 				// fallback to interaction when silent call fails
// 				/* return myMSALObj.acquireTokenPopup(request)
// 					.then(response => {
// 						//console.log(response);
// 						return response;
// 					}).catch(error => {
// 						console.log(error);
// 					}); */
// 			} else {
// 				//console.log(error);
// 			}
// 		});
// }

// function getGuestLogin() {
// 	return new Promise(function (resolve, reject) {
// 		$.ajax({
// 			url: 'https://api.streamtnt.com/sso/getGuestToken.php',
// 			type: 'get',
// 			success: function (responseJSON) {
// 				response = JSON.parse(JSON.stringify(responseJSON));
// 				response.accessToken = response.access_token;

// 				logged_in = false;
// 				access_token = response.accessToken;

// 				$.ajax({
// 					url: 'https://' + middleware_url + '/api/ui/stb/v3/Connect?device_id=' + uuid + '&device=website&application_id=' + application_id,
// 					type: 'get',
// 					headers: { "Authorization": "Bearer " + response.access_token },
// 					success: function (response) {
// 						var responseObject = response;
// 						//console.log("Guest Login Success");
// 						//console.log(responseObject);
// 						if (responseObject.response.account.customer_id) {
// 							start_load();
// 						}
// 						else if (responseObject.response.account.status == 400) {
// 							console.log("Guest Login 400 Error");
// 							//show_user_devices();
// 						}
// 					},
// 				});


// 				resolve(response);
// 			},
// 			error: function (err) {
// 				reject(err) // Reject the promise and go to catch()
// 			}
// 		});
// 	});
// }