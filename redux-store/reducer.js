export default function userReducer(_, action) {
  switch (action.type) {
    case "logout":
      return null;
    case "login":
      return action.payload;
  }
}
