import axios from "axios";
const backendUrl = ''

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });

    const { data } = await axios.get(`${backendUrl}/api/v1/posts`);
    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const { data } = await axios.get(`${backendUrl}/api/v1/my/posts`);
    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = "") =>
    async (dispatch) => {
      try {
        dispatch({
          type: "allUsersRequest",
        });

        const { data } = await axios.get(`${backendUrl}/api/v1/users?name=${name}`);
        dispatch({
          type: "allUsersSuccess",
          payload: data.users,
        });
      } catch (error) {
        dispatch({
          type: "allUsersFailure",
          payload: error.response.data.message,
        });
      }
    };

export const getAllFriends =
  (name = "") =>
    async (dispatch) => {
      try {
        dispatch({
          type: "allFriendsRequest",
        });
        const { data } = await axios.get(`${backendUrl}/api/v1/friends?name=${name}`);
        dispatch({
          type: "allFriendsSuccess",
          payload: data.friends,
        });
      } catch (error) {
        dispatch({
          type: "allFriendsFailure",
          payload: error.response.data.message,
        });
      }
    };

export const getAllFriendsOfOthers =
  (name = "") =>
    async (dispatch) => {
      try {
        dispatch({
          type: "allFriendsOfOthers",
        });
        const { data } = await axios.get(`${backendUrl}/api/v1/friends/others?name=${name}`);
        dispatch({
          type: "allFriendsOfOthersSuccess",
          payload: data.allFriendsOfOthers,
        });
      } catch (error) {
        dispatch({
          type: "allFriendsOfOthersFailure",
          payload: error.response.data.message,
        });
      }
    };

export const getAllMutualFriends =
  (name = "") =>
    async (dispatch) => {
      try {
        dispatch({
          type: "allMutualFriendsRequest",
        });

        const { data } = await axios.get(`${backendUrl}/api/v1/mutualFriends?name=${name}`);
        dispatch({
          type: "allMutualFriendsSuccess",
          payload: data.mutualFriends,
        });
      } catch (error) {
        dispatch({
          type: "allMutualFriendsFailure",
          payload: error.response.data.message,
        });
      }
    };

export const getAllRequests =
  (name = "") =>
    async (dispatch) => {
      try {
        dispatch({
          type: "allRequests",
        });
        const { data } = await axios.get(`${backendUrl}/api/v1/requests`);
        dispatch({
          type: "allRequestsSuccess",
          payload: data.requests,
        });
      } catch (error) {
        dispatch({
          type: "allRequestsFailure",
          payload: error.response.data.message,
        });
      }
    };

export const acceptFriendRequest =
  (id) =>
    async (dispatch) => {
      try {
        dispatch({
          type: "acceptFriendRequest",
        });
        const { data } = await axios.get(`${backendUrl}/api/v1/request/accept/${id}`);
        dispatch({
          type: "acceptFriendRequestSuccess",
          payload: data.requests,
        });
      } catch (error) {
        dispatch({
          type: "acceptFriendRequestFailure",
          payload: error.response.data.message,
        });
      }
    };

export const declineFriendRequest =
  (id) =>
    async (dispatch) => {
      try {
        dispatch({
          type: "declineFriendRequest",
        });
        const { data } = await axios.get(`${backendUrl}/api/v1/request/decline/${id}`);
        dispatch({
          type: "declineFriendRequestSuccess",
          payload: data.message,
        });
      } catch (error) {
        dispatch({
          type: "declineFriendRequestFailure",
          payload: error.response.data.message,
        });
      }
    };

export const getAllSuggestions =
  (name = "") =>
    async (dispatch) => {
      try {
        dispatch({
          type: "allSuggestions",
        });
        const { data } = await axios.get(`${backendUrl}/api/v1/suggestions`);
        dispatch({
          type: "allSuggestionsSuccess",
          payload: data.suggestions,
        });
      } catch (error) {
        dispatch({
          type: "allSuggestionsFailure",
          payload: error.response.data.message,
        });
      }
    };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    await axios.get(`${backendUrl}/api/v1/logout`);

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
        `${backendUrl}/api/v1/register`,
        { name, email, password, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.put(
      `${backendUrl}/api/v1/update/profile`,
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        `${backendUrl}/api/v1/update/password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });

    const { data } = await axios.delete(`${backendUrl}/api/v1/delete/me`);

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios.post(
      "/api/v1/forgot/password",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.put(
      `${backendUrl}/api/v1/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequest",
    });

    const { data } = await axios.get(`${backendUrl}/api/v1/userposts/${id}`);
    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });

    const { data } = await axios.get(`${backendUrl}/api/v1/user/${id}`);
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
    dispatch({
      type: "userIsFriend",
      payload: data.isFriend,
    });
    dispatch({
      type: "userIsRequested",
      payload: data.isRequested,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const friendRequestHandler = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "friendRequestHandler",
    });

    const { data } = await axios.get(`${backendUrl}/api/v1/request/${id}`);
    dispatch({
      type: "friendRequestHandlerSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "friendRequestHandlerFailure",
      payload: error.response.data.message,
    });
  }
};


export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const { data } = await axios.get(`${backendUrl}/api/v1/follow/${id}`);
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};
