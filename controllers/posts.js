import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
export const getPost = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage); // Set the status and send JSON data in one step
  } catch (error) {
    res.status(404).json({ message: error.message }); // Set the status and send JSON data in one step
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost); // Set the status and send JSON data in one step
  } catch (error) {
    res.status(409).json({ message: error.message }); // Set the status and send JSON data in one step
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  // await PostMessage.findByIdAndRemove(id);
  await PostMessage.findByIdAndDelete(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};

// export const likePost = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Validate ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).send(`No post with id: ${id}`);
//     }

//     // Find the post by ID
//     const post = await PostMessage.findById(id);

//     // Check if the post exists
//     if (!post) {
//       return res.status(404).send(`No post found with id: ${id}`);
//     }

//     // Update the like count
//     post.likeCount += 1;
//     const updatedPost = await post.save();

//     // Return the updated post
//     res.json(updatedPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to like post" });
//   }
// };
