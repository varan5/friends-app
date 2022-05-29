import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserPosts,
  getUserProfile,
} from "../../Actions/User";
import { getAllFriendsOfOthers, getAllMutualFriends, friendRequestHandler } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    user,
    userIsFriend,
    userIsRequested,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);

  const { mutualFriends, loading: mutualFriendsLoading } = useSelector(
    (state) => state.allMutualFriends
  );

  const { allFriendsOfOthers: friendsList, loading: friendsLoading } = useSelector(
    (state) => state.allFriendsOfOthers
  );


  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const {
    requestMessage,
  } = useSelector((state) => state.requestMessage);

  const params = useParams();
  const [friendsToggle, setFriendsToggle] = useState(false);
  const [friends, setFriends] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const friendRequestHandlerButtonClick = async () => {
    await dispatch(friendRequestHandler(params.id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
    dispatch(getAllFriendsOfOthers(params.id));
    dispatch(getAllMutualFriends(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
  }, [user, me._id, params.id]);

  useEffect(() => {
    if (requestMessage !== undefined) {
      alert.success(requestMessage);
    }
  }, [requestMessage])

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, error, followError, userError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
            <h3>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}'s Profile</h3>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{user.name}</Typography>

            <div>
              <button onClick={() => setFriendsToggle(!friendsToggle)}>
                <Typography>Friends</Typography>
              </button>
              <Typography>{user.friends.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>

            {
              requestMessage === undefined ?
                <Button
                  variant="contained"
                  style={{ background: friends ? "red" : "" }}
                  onClick={friendRequestHandlerButtonClick}
                  disabled={userIsFriend || userIsRequested}
                >
                  {
                    userIsFriend ? 'Friend' : userIsRequested ? 'Requested' : 'Send Friend Request'
                  }
                </Button> : ''
            }


            <br />
            <br />


            <h3>Your Mutual Friends With {user.name}</h3>
            {mutualFriends && mutualFriends.length > 0 ? (
              mutualFriends.map((mutualFriend) => (
                <User
                  key={mutualFriend._id}
                  userId={mutualFriend._id}
                  name={mutualFriend.name}
                  avatar={mutualFriend.avatar.url}
                />
              ))
            ) : (
              <Typography>{user.name} has no friends</Typography>
            )}

            <br />
            <br />

            <h3>{user.name}'s friendsList</h3>
            {friendsList && friendsList.length > 0 ? (
              friendsList.map((friend) => (
                <User
                  key={friend._id}
                  userId={friend._id}
                  name={friend.name}
                  avatar={friend.avatar.url}
                />
              ))
            ) : (
              <Typography>{user.name} has no friends</Typography>
            )}

          </>
        )}

        <Dialog
          open={friendsToggle}
          onClose={() => setFriendsToggle(!friendsToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Friends</Typography>

            {user && user.friends.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You do not have any friends
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
