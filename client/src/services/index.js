import createAuthService from "./createAuthService";
import { createAxiosClient } from "./http";

const BASE_URL = "http://localhost:3000";
const http = createAxiosClient(BASE_URL);
const AuthService = createAuthService(http);

export default AuthService;
