

import User from "../../api/User";

Practitioners._transform = function (document) {
  return new User(document);
};
