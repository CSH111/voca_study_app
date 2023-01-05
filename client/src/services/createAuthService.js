const createAuthService = (httpClient) => {
  return {
    register(body) {
      return httpClient.post("/api/user", body);
    },
    login(body) {
      return httpClient.post("/api/session", body);
    },
    logout() {
      return httpClient.delete("/api/session");
    },
    getUser() {
      return httpClient.get("/api/user");
    },
  };
};

export default createAuthService;
