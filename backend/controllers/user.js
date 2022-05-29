const User = require("../models/User");
const Post = require("../models/Post");
const { sendEmail } = require("../middlewares/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
var _ = require('lodash');

exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      // httpOnly: true,
      secure: false // <-- false here when served over HTTP
    };

    res.cookie("token", token, options)
    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }


    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      // httpOnly: true,
      // expire: 1 / 24, // One hour
      secure: false // <-- false here when served over HTTP
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// exports.followUser = async (req, res) => {
//   try {
//     const userToFollow = await User.findById(req.params.id);
//     const loggedInUser = await User.findById(req.user._id);

//     if (!userToFollow) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (loggedInUser.following.includes(userToFollow._id)) {
//       const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
//       const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);

//       loggedInUser.following.splice(indexfollowing, 1);
//       userToFollow.followers.splice(indexfollowers, 1);

//       await loggedInUser.save();
//       await userToFollow.save();

//       res.status(200).json({
//         success: true,
//         message: "Friend request cancelled",
//       });
//     } else {
//       loggedInUser.following.push(userToFollow._id);
//       userToFollow.followers.push(loggedInUser._id);

//       await loggedInUser.save();
//       await userToFollow.save();

//       res.status(200).json({
//         success: true,
//         message: "Friend request sent",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.friendRequestHandler = async (req, res) => {
  try {
    const userToConnect = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToConnect) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (loggedInUser.friends.includes(userToConnect._id) || userToConnect.friends.includes(loggedInUser._id)) {
      res.status(200).json({
        success: true,
        message: "Already friends",
      });
    } else {
      if (userToConnect.requests.includes(loggedInUser._id)) {
        userToConnect.requests.pop(loggedInUser._id);
        await userToConnect.save();
        res.status(200).json({
          success: true,
          message: "Friend request cancelled",
        });
        return;
      } else {
        userToConnect.requests.push(loggedInUser._id);
        await userToConnect.save();
        res.status(200).json({
          success: true,
          message: "Friend request sent",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.friendRequestAccepted = async (req, res) => {
  try {
    const userToAccept = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToAccept) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await userToAccept.friends.push(loggedInUser._id);
    await loggedInUser.friends.push(userToAccept._id);

    const index = loggedInUser.requests.indexOf(userToAccept._id);
    await loggedInUser.requests.splice(index._id, 1);

    await userToAccept.save();
    await loggedInUser.save();

    res.status(200).json({
      success: true,
      message: "Friend Request Accepted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.friendRequestDeclined = async (req, res) => {
  try {
    const userToDecline = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToDecline) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const index = loggedInUser.requests.indexOf(userToDecline._id);
    await loggedInUser.requests.splice(index._id, 1);

    await loggedInUser.save();
    await userToDecline.save();

    res.status(200).json({
      success: true,
      message: "Friend Request Declined",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const userId = user._id;

    // Removing Avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();

    // Logout user after deleting profile

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Delete all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.remove();
    }

    // removing all comments of the user from all posts
    const allPosts = await Post.find();

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }
    // removing all likes of the user from all posts

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllFriendRequests = async (req, res) => {
  try {
    const requestsIdList = req.user.requests;
    const requests = await User.find({ _id: { $in: requestsIdList } });
    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllFriendSuggestions = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const loggedInUserFriendsIds = loggedInUser.friends;

    let friendsOfFriends = [];
    for (friendId of loggedInUserFriendsIds) {
      const friendDetailsOfCurrentId = await User.findById(friendId);
      const friendsListOfCurrentId = friendDetailsOfCurrentId.friends;
      friendsOfFriends.push(friendsListOfCurrentId);
    }
    friendsOfFriends = [].concat.apply([], friendsOfFriends); // concating the array

    // filtering the duplicate suggestion ids
    let uniqueSuggestionsIdList = [];
    friendsOfFriends.forEach(friendId => {
      if (!uniqueSuggestionsIdList.includes(friendId.toString())) {
        uniqueSuggestionsIdList.push(friendId.toString());
      }
    })

    // removing the self suggestion
    uniqueSuggestionsIdList = uniqueSuggestionsIdList.filter(id => id !== loggedInUser._id.toString())

    // shuffling the suggestions list after every refreshing of 1 minute
    const suggestionsBeforeShuffle = await User.find({ _id: { $in: uniqueSuggestionsIdList } }); // final suggestions list  

    let suggestions = _.shuffle(suggestionsBeforeShuffle);

    res.status(200).json({
      success: true,
      suggestions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getUserProfile = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    let isUserFriendOfLoggedInUser = false;
    let isUserRequestedForFriendRequest = false;
    const user = await User.findById(req.params.id).populate(
      "posts"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.friends.includes(loggedInUserId)) {
      isUserFriendOfLoggedInUser = true;
    }

    if (user.requests.includes(loggedInUserId)) {
      isUserRequestedForFriendRequest = true;
    }

    res.status(200).json({
      success: true,
      user,
      isFriend: isUserFriendOfLoggedInUser,
      isRequested: isUserRequestedForFriendRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const allUsers = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    const users = allUsers.filter(user => user.email !== loggedInUser.email);
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllFriends = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const myFriendsIdList = req.user.friends;
    const allFriends = await User.find({ _id: { $in: myFriendsIdList } });
    const friends = allFriends.filter(friend => friend.email !== loggedInUser.email);
    res.status(200).json({
      success: true,
      friends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllFriendsOfOthers = async (req, res) => {
  try {
    const userId = req.query.name;
    const userInformation = await User.findById(userId);
    const userFriendsList = userInformation.friends;
    const allFriendsOfOthers = await User.find({ _id: { $in: userFriendsList } });
    res.status(200).json({
      success: true,
      allFriendsOfOthers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllMutualFriends = async (req, res) => {
  try {
    const otherUserId = req.query.name;
    const loggedInUser = req.user;
    const otherUserInformation = await User.findById({ _id: otherUserId })

    const otherUserFriends = otherUserInformation.friends;
    const loggedInUserFriends = loggedInUser.friends;

    // Finding mutual friends
    const mutualFriendsIdList = loggedInUserFriends.filter(loggedInUserFriend => otherUserFriends.includes(loggedInUserFriend));
    const mutualFriends = await User.find({ _id: { $in: mutualFriendsIdList } });

    res.status(200).json({
      success: true,
      mutualFriends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
