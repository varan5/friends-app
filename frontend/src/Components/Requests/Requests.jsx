import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from "react-alert";
import Button from '@mui/material/Button'
import { getAllRequests, acceptFriendRequest, declineFriendRequest } from "../../Actions/User";
import User from "../User/User";
import './Requests.css'

const FriendRequests = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { requests, loading: requestsLoading } = useSelector(
    (state) => state.allRequests
  );

  const acceptFriendRequestHandler = async (userIdToAcceptRequest) => {
    await dispatch(acceptFriendRequest(userIdToAcceptRequest));
    await dispatch(getAllRequests());
    alert.success('Friend request accepted')
  }

  const declineFriendRequestHandler = async (userIdToDeclineRequest) => {
    await dispatch(declineFriendRequest(userIdToDeclineRequest));
    await dispatch(getAllRequests());
    alert.error('Friend request declined')
  }

  useEffect(() => {
    dispatch(getAllRequests());
  }, [dispatch]);

  return (
    <div className="friendRequestContainer">
      <h3>Friend Requests Received</h3>
      {requests && requests.length > 0 ? (
        requests.map((request) => (
          <div>
            <User
              key={request._id}
              userId={request._id}
              name={request.name}
              avatar={request.avatar.url}
            />
            <Button onClick={() => acceptFriendRequestHandler(request._id)} variant="outlined">Accept Request</Button>
            <Button onClick={() => declineFriendRequestHandler(request._id)} variant="outlined">Decline Request</Button>
          </div>
        ))
      ) : (
        <Typography>No Friend Requests</Typography>
      )}
    </div>
  );
};

export default FriendRequests;
