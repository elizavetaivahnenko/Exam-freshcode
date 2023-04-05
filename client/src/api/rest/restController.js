import http from "../interceptor";

//auth

export const registerRequest = (data) =>
  http.post("/api/auth/registration", data);
export const loginRequest = (data) => http.post("/api/auth/login", data);

//chat

export const newMessage = (data) => http.post("/api/chat/newMessage", data);
export const getPreviewChat = () => http.post("/api/chat/getPreview");
export const changeChatFavorite = (data) =>
  http.post("/api/chat/favorite", data);
export const changeChatBlock = (data) => http.post("/api/chat/blackList", data);
export const removeChatFromCatalog = (data) =>
  http.post("/api/chat/removeChatFromCatalog", data);
export const getCatalogList = (data) =>
  http.post("/api/chat/getCatalogs", data);
export const addChatToCatalog = (data) =>
  http.post("/api/chat/addNewChatToCatalog", data);
export const createCatalog = (data) =>
  http.post("/api/chat/createCatalog", data);
export const deleteCatalog = (data) =>
  http.post("/api/chat/deleteCatalog", data);
export const changeCatalogName = (data) =>
  http.post("/api/chat/updateNameCatalog", data);
export const getDialog = (data) => http.post("/api/chat/getChat", data);

//contest
export const dataForContest = (data) =>
  http.post("/api/contests/dataForContest", data);
export const getCustomersContests = (data) =>
  http.post(
    "/api/contests/getCustomersContests",
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );

export const getContestById = (data) =>
  http.get("/api/contests/getContestById", {
    headers: {
      contestId: data.contestId,
    },
  });

export const updateContest = (data) =>
  http.post("/api/contests/updateContest", data);
export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.post("/api/contests/getAllContests", {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

///pay
export const payMent = (data) => http.post("/api/pay/pay", data.formData);
export const cashOut = (data) => http.post("/api/pay/cashout", data);

//users
export const updateUser = (data) => http.post("/api/users/updateUser", data);
export const getUser = () => http.post("/api/users/getUser");
export const changeMark = (data) => http.post("/api/users/changeMark", data);
export const setOfferStatus = (data) =>
  http.post("/api/users/setOfferStatus", data);
export const setNewOffer = (data) => http.post("/api/users/setNewOffer", data);

export const downloadContestFile = (data) =>
  http.get(`/api/users/downloadFile/${data.fileName}`);
