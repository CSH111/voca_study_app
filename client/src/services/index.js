import createAuthService from "./createAuthService";
import createWordbookService from "./createWordbookService";
import { createAxiosClient } from "./http";

const BASE_URL = "http://localhost:3000";
const http = createAxiosClient(BASE_URL);

export const wordbookService = createWordbookService(http);
export const AuthService = createAuthService(http);
