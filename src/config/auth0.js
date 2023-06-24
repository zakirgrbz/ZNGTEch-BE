import { auth } from 'express-oauth2-jwt-bearer';


const jwtCheck = auth({
  audience: 'https://bloggy.hicoders.ch',
  issuerBaseURL: 'https://dev-qdp67cma.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

export default jwtCheck;