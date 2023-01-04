const createauthService = (httpClient) => {
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
    getUser() {
      return httpClient.get("/api/user");
    },
  };
};

export default createauthService;
