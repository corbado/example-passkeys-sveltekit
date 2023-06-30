// Import your User class
import { createRemoteJWKSet, jwtVerify } from 'jose';

class Session {
	private shortSessionCookieName: string;
	private issuer: string;
	private jwksURI: URL;
	private cacheMaxAge: number;

	constructor(
		shortSessionCookieName: string,
		issuer: string,
		jwksURI: string,
		cacheMaxAge: number
	) {
		this.shortSessionCookieName = shortSessionCookieName;
		this.issuer = issuer;
		this.jwksURI = new URL(jwksURI);
		this.cacheMaxAge = cacheMaxAge;
	}

	async validateShortSessionValue(token: any): Promise<User> {
		const JWKS = createRemoteJWKSet(this.jwksURI, {
			cacheMaxAge: this.cacheMaxAge
		});
		const options = {
			issuer: this.issuer
		};
		if (token === null) {
			return new User(false);
		}

		const { payload } = await jwtVerify(token, JWKS, options);

		// just return the object
		return {
			isSignedIn: true,
			sub: payload.sub,
			Name: payload.Name,
			Email: payload.Email,
			PhoneNumber: payload.PhoneNumber
		};
	}
}

export default Session;
