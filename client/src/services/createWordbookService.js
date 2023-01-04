const createwordbookService = (httpClient) => {
  return {
    getTopics() {
      return httpClient.get("/api/topic");
    },
    postTopic(body) {
      return httpClient.post("/api/topic", body);
    },
    deleteTopic(id) {
      return httpClient.delete(`/api/topic/${id}`);
    },
    patchTopic(id, body) {
      return httpClient.patch(`/api/topic/${id}`, body);
    },
    getWords() {
      return httpClient.get("/api/word");
    },
    postWord(body) {
      return httpClient.post(`/api/word`, body);
    },
    deleteWord(id) {
      return httpClient.delete(`/api/word/${id}`);
    },
    patchWord(id, body) {
      return httpClient.patch(`/api/word/${id}`, body);
    },
  };
};

export default createwordbookService;
