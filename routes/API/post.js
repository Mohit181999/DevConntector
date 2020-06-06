 const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const auth=require('../../middleware/auth');
const Post=require('../../models/Posts');
const Profile=require('../../models/Profile');
const User=require('../../models/User');

router.post('/',auth,[
    check('text','text is required').not().isEmpty()
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty())res.status(400).json({errors:error.array()});
    try{
        const user=await User.findById(req.user.id);
        const newPost=new Post({
            text: req.body.text,
            showAction:req.body.showAction,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        const post= await newPost.save();
        res.json(post);
    }catch(err){
        console.log(err);
        res.status(500).send('server err');
    }
    
});
router.get('/',async(req,res)=>{
    try{
        const post=await Post.find().sort({date:-1});
        res.json(post);
    }catch(err){
        console.log(err)
        res.status(500).send('server err');
    }
});
router.get('/:id',auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.json(post);
    }catch(err){
        console.log(err)
        res.status(500).send('server err');
    }
});
router.delete('/:id',auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.user.toString()!==req.user.id)return res.status(400).json({msg:'user not authorized'});
        await post.remove();
        res.json('post removed');
    }catch(err){
        console.log(err)
        res.status(500).send('server err');
    }
});
router.put('/like/:id',auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({msg:'post has been already liked'});
        }
        post.likes.unshift({user:req.user.id});
        await post.save();
        res.json(post.likes);
    }catch(err){
        console.log(err)
        res.status(500).send('server err');
    }
});
router.put('/unlike/:id',auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json({msg:'post has not been liked'});
        }
        const remind=post.likes.map(item=>item.id).indexOf(req.user.id);
        post.likes.splice(remind,1);
        await post.save();
        res.json(post.likes);
    }catch(err){
        console.log(err)
        res.status(500).send('server err');
    }
});
router.post('/comment/:id',[auth,
    check('text','text is required').not().isEmpty()
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty())res.status(400).json({errors:error.array()});
    try{
        const user=await User.findById(req.user.id);
        const post=await Post.findById(req.params.id);
        const newCom=({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        post.comments.unshift(newCom);
        await post.save();
        res.json(post.comments);
    }catch(err){
        console.log(err)
        res.status(500).send('server err');
    }
    
});

 router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports=router;
