const createAuthService = (httpClient) => {
  return {
    login(body) {
      return httpClient.post("/api/session", body);
    },

    logout() {
      return httpClient.delete("/api/session");
    },

    register(body) {
      return httpClient.post("/api/user", body);
    },
  };
};

export default createAuthService;
