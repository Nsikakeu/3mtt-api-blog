const blogRouter = require("express").Router()
const verifyToken = require("../middlewares/verifyToken")
const blog = require('../models/Blog')
      blogRouter.get('/getAll', async(req, res) =>{
        try{
            const blog = await Blog.find({})
            return res.status(200).json(blog)
        } catch (error){
            return res.status(500).json(error.message)
        }
    })
        blogRouter.get('/find/:id', async(req, res) => {
            try{
                const blog = await Blog.findById(req.params.Id)
                return res.status(200).json(blog)
            } catch (error){
                return res.status(500).json(error.message)
            }
    })

    blogRouter.post('/', verifyToken, async(req, res) => {
        try{
            const blog = await Blog.create({...req.body, userId: req.user.id})
            return res.status(201).json(blog)
        } catch (error){
            return res.status(500).json(error.message)
        }
    })
      blogRouter.put("/updateBlog/:id/", verifyToken, async(req, res) =>{
        try{
            const blog = await Blog.findById(req.params.id)
            if(blog.userId !== req.user.id){
                throw new Error('You can update only one post')
            }
            const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            return res.status(200).json(updatedBlog)

        } catch (error){
            return res.status(500).json(error.message)
        }
      })
    
    blogRouter.put("/deleteBlog/:id/", verifyToken, async(req, res) =>{
      try{
          const blog = await Blog.findById(req.params.id)
          if(blog.userId !== req.user.id){
              throw new Error('You can delete only one post')
          }
          await Blog.findByIdAndDelete(req.params.id)
          return res.status(200).json({msg: 'Successfully deleted a blog'})

      } catch (error){
          return res.status(500).json(error.message)
      }
    })

    module.exports = blogRouter