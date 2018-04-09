'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = model = {
	grant: function grant() {
		return '23eef354fr4';
	},
	generateAuthorizationCode: function generateAuthorizationCode(client, user, scope, _ref) {
		var _ref2 = _slicedToArray(_ref, 1),
		    callback = _ref2[0];
	},
	getAuthorizationCode: function getAuthorizationCode(client_id, state, redirect_uri, type, callback) {},
	saveAuthorizationCode: function saveAuthorizationCode(code, client, user, _ref3) {
		var _ref4 = _slicedToArray(_ref3, 1),
		    callback = _ref4[0];
	},
	revokeAuthorizationCode: function revokeAuthorizationCode(code, _ref5) {
		var _ref6 = _slicedToArray(_ref5, 1),
		    callback = _ref6[0];
	},
	generateAccessToken: function generateAccessToken(client, user, scope, _ref7) {
		var _ref8 = _slicedToArray(_ref7, 1),
		    callback = _ref8[0];
	},
	getAccessToken: function getAccessToken(bearerToken, callback) {},
	generateRefreshToken: function generateRefreshToken(client, user, scope, _ref9) {
		var _ref10 = _slicedToArray(_ref9, 1),
		    callback = _ref10[0];
	},
	getClient: function getClient(clientId, clientSecret, callback) {},
	grantTypeAllowed: function grantTypeAllowed(clientId, grantType, callback) {},
	saveToken: function saveToken(token, client, user, _ref11) {
		var _ref12 = _slicedToArray(_ref11, 1),
		    callback = _ref12[0];
	},
	saveAccessToken: function saveAccessToken(accessToken, clientId, expires, user, callback) {},
	getAuthCode: function getAuthCode(authCode, callback) {},
	saveAuthCode: function saveAuthCode(authCode, clientId, expires, user, callback) {},
	getUser: function getUser(username, password, callback) {},
	saveRefreshToken: function saveRefreshToken(refreshToken, clientId, expires, user, callback) {},
	revokeToken: function revokeToken(token, _ref13) {
		var _ref14 = _slicedToArray(_ref13, 1),
		    callback = _ref14[0];
	},
	getRefreshToken: function getRefreshToken(refreshToken, callback) {},
	revokeRefreshToken: function revokeRefreshToken(refreshToken, callback) {},
	extendedGrant: function extendedGrant(grantType, req, callback) {},
	getUserFromClient: function getUserFromClient(clientId, clientSecret, callback) {},
	generateToken: function generateToken(type, req, callback) {}
};
//# sourceMappingURL=Oauth_model.js.map