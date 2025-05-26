import express from 'express';
// const router = express.Router();
import post from '../Schema/Post.js';
import user from '../Schema/User.js';
import { v2 as cloudinary } from 'cloudinary';
const Cloudinary_API = 989946476839148;
const Cloudinary_API_Secret = UTqJo2KvEj416NHrcYXB61NJepg;
export const createpost = async (req, res) => {
  try {
    const { photo, music, privacystatus, comments } = req.body;
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "plz.. login for posting and exploring out feature: "
      })
    }
    if (!photo) {
      res.status(401).json({
        success: false,
        message: "you need to have some photo to post something: ",
      })
    }
    const Photo = [];
    for (let i = 0; i < photo.size(); i++) {
      if (!photo[i].startsWith("data:image")) {
        console.log(`there has been some error in ${i} : index`);
        continue;
      }
      try {
        const imageUrl = await UploadImageCloudinary(photo[i], intagram_data);
        Photo.push(imageUrl.secure_url);
      }
      catch (error) {
        console.error(`upload failed for image ${i}`, error);
      }

    }
    const newpost = await post.create({
      user: userId,
      photo: Photo,
      music: [],
      privacystatus,
      comments: [],
    });
    const updatedUserDetails = await user.findByIdAndUpdate(
      user,
      {
        $push: {
          post: {
            $each: [newpost._id],
            $position: 0,
          }
        }
      },
      { new: true }
    ).populate("new_posts")
      .exec();
    return res.status(200).json({
      success: true,
      message: "your post has been created: ",
    })
  }
  catch (error) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "there is some server error while creating post : ",
    })
  }
}
export const addcomment = async (req, res) => {
  try {

    const { comment, postId } = req.body;
    const userId = req.user._id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "this user doen't even exist :",
      })
    }
    const commentData = await post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comment: {
            $each: [commentData._id],
            $position: 0,
          }
        }
      },
      { new: true },
    )
      .populate("the comment has been added: ")
      .exex();
    res.status(200).json({
      success: true,
      message: "you comment has been added to the post : ",
    })
  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: "there has been some technical dificulty while feting the comment :",
    })
  }
}




