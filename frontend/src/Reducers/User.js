import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutUserRequest: (state) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});

export const postOfFollowingReducer = createReducer(initialState, {
  postOfFollowingRequest: (state) => {
    state.loading = true;
  },
  postOfFollowingSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  postOfFollowingFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const allUsersReducer = createReducer(initialState, {
  allUsersRequest: (state) => {
    state.loading = true;
  },
  allUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});


export const allFriendsReducer = createReducer(initialState, {
  allFriendsOfOthers: (state) => {
    state.loading = true;
  },
  allFriendsSuccess: (state, action) => {
    state.loading = false;
    state.friends = action.payload;
  },
  allFriendsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const allFriendsOfOthersReducer = createReducer(initialState, {
  allFriendsOfOthers: (state) => {
    state.loading = true;
  },
  allFriendsOfOthersSuccess: (state, action) => {
    state.loading = false;
    state.allFriendsOfOthers = action.payload;
  },
  allFriendsOfOthersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});



export const allMutualFriendsReducer = createReducer(initialState, {
  allMutualFriendsRequest: (state) => {
    state.loading = true;
  },
  allMutualFriendsSuccess: (state, action) => {
    state.loading = false;
    state.mutualFriends = action.payload;
  },
  allMutualFriendsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const allRequestsReducer = createReducer(initialState, {
  allRequests: (state) => {
    state.loading = true;
  },
  allRequestsSuccess: (state, action) => {
    state.loading = false;
    state.requests = action.payload;
  },
  allRequestsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const acceptFriendRequestReducer = createReducer(initialState, {
  acceptFriendRequest: (state) => {
    state.loading = true;
  },
  acceptFriendRequestSuccess: (state, action) => {
    state.loading = false;
    state.acceptRequestMessage = action.payload;
  },
  acceptFriendRequestFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const declineFriendRequestReducer = createReducer(initialState, {
  declineFriendRequest: (state) => {
    state.loading = true;
  },
  declineFriendRequestSuccess: (state, action) => {
    state.loading = false;
    state.declineRequestMessage = action.payload;
  },
  declineFriendRequestFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const allSuggestionsReducer = createReducer(initialState, {
  allSuggestions: (state) => {
    state.loading = true;
  },
  allSuggestionsSuccess: (state, action) => {
    state.loading = false;
    state.suggestions = action.payload;
  },
  allSuggestionsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});


export const userProfileReducer = createReducer(initialState, {
  userProfileRequest: (state) => {
    state.loading = true;
  },
  userProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  userIsFriend: (state, action) => {
    state.loading = false;
    state.userIsFriend = action.payload;
  },
  userIsRequested: (state, action) => {
    state.loading = false;
    state.userIsRequested = action.payload;
  },
  userProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});


export const friendRequestHandlerReducer = createReducer(initialState, {
  friendRequestHandler: (state) => {
    state.loading = true;
  },
  friendRequestHandlerSuccess: (state, action) => {
    state.loading = false;
    state.requestMessage = action.payload;
  },
  friendRequestHandlerFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
