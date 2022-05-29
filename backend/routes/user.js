const express = require("express");
const {
  register,
  login,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMyPosts,
  getUserPosts,
  getAllFriends,
  getAllMutualFriends,
  getAllFriendRequests,
  getAllFriendSuggestions,
  friendRequestHandler,
  friendRequestAccepted,
  friendRequestDeclined,
  getAllFriendsOfOthers
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, myProfile);

router.route("/my/posts").get(isAuthenticated, getMyPosts);

router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/users").get(isAuthenticated, getAllUsers);

router.route("/friends").get(isAuthenticated, getAllFriends);

router.route("/friends/others").get(isAuthenticated, getAllFriendsOfOthers);

router.route("/mutualFriends").get(isAuthenticated, getAllMutualFriends);

router.route("/requests").get(isAuthenticated, getAllFriendRequests);

router.route("/request/:id").get(isAuthenticated, friendRequestHandler);

router.route("/request/accept/:id").get(isAuthenticated, friendRequestAccepted);

router.route("/request/decline/:id").get(isAuthenticated, friendRequestDeclined);

router.route("/suggestions").get(isAuthenticated, getAllFriendSuggestions);

router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

module.exports = router;