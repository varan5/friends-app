import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  allFriendsReducer,
  allMutualFriendsReducer,
  allRequestsReducer,
  allSuggestionsReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
  friendRequestHandlerReducer,
  allFriendsOfOthersReducer,
  acceptFriendRequestReducer,
  declineFriendRequestReducer
} from "./Reducers/User";
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    allFriends: allFriendsReducer,
    allFriendsOfOthers: allFriendsOfOthersReducer,
    allMutualFriends: allMutualFriendsReducer,
    allRequests: allRequestsReducer,
    allSuggestions: allSuggestionsReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
    requestMessage: friendRequestHandlerReducer,
    acceptMessage: acceptFriendRequestReducer,
    declineMessage: declineFriendRequestReducer,
  },
});

export default store;
