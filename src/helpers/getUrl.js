const APIRoot = 'http://localhost:8000/api/v1';

export const APIUrls = {
  login: () => `${APIRoot}/users/create-session`,
  signup: () => `${APIRoot}/users/create`,
  update: () => `${APIRoot}/users/update`,
  posts: () => `${APIRoot}/posts`,
  createPost: () => `${APIRoot}/posts/create-post`,
  createComment: () => `${APIRoot}/comments/create-comment`,
  user: (id) => `${APIRoot}/users/get-user/?id=${id}`,
  getFreinds: (userId) => `${APIRoot}/friends/get-friends/?userId=${userId}`,
  addFriend: (email1, email2) =>
    `${APIRoot}/friends/add-friend/?email1=${email1}&email2=${email2}`,
  removeFriend: (email1, email2) =>
    `${APIRoot}/friends/remove-friend/?email1=${email1}&email2=${email2}`,
  getLikePost: (userId, postId, type) =>
    `${APIRoot}/likes/action-like/?userId=${userId}&postId=${postId}&type=${type}`,
  searchUrl: (name) => `${APIRoot}/search/search-users/?name=${name}`,
  chatUrl: (roomName) => `${APIRoot}/chats/get-chat/?roomNmae=${roomName}`,
};
