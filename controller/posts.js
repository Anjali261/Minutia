import Post from "../models/Post.js";

//CREATE
export const createPost = async (req,res) =>{
    try{

        const { userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            //profile picture path
            userPicturePath:user.picturePath,
            //post picturepath
            picturePath,
            likes:{},
            Comments: []

        })
        await newPost.save();
        //after saving post ,all post are sent to the frontend 
        const post = await Post.find();
        res.status(201).json(post);
    }catch(err){
        res.status(409).json({message:err.message})
    }
}


//READ
//grab only user post
export const getFeedPosts = async(req,res) =>{
    try{
        const { userId } = req.params;
        const post = await Post.find( userId);
        res.status(200).json(post);

    }catch(err){
        res.status(404).json({message:err.message})


    }
}

//UPDATE
export const likePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const { userId} = req.body;
        //if userid exist then it is liked by that id
        //wrapping post information
        const post = await Post.findById(id);
        //checking user has liked or not
        const isLiked = post.likes.get(userId);

        if( isLiked){
            //if like then delete the user
            post.likes.delete(userId);
        }
        else{
            //if not liked then the post is liked by the user
            post.likes.set(userId, true);
        }
        
        const updatePost = await post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new:true}
        );
        res.status(200).jsom(updatePost);

    }catch(err){
        res.status(404).json({message:err.message})


    }
}