const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  
  const { email, username, password, } = req.body;

  try {
    const user = await User.signup(email, username, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
}



const getUserUpdate = async (req,res)=>{
  const _id = req.user._id;
  console.log(_id);
  await User.findOne({_id})
        .then((data)=>{
          return res.status(200).json(data)
        })
        .catch((error)=>{
          return res.status(400).json({error:error})
        })

 
}

const postUserUpdate = async (req,res)=>{
    const _id = req.user._id;
    const {first_name,last_name,date_of_birth,phone_number,address} = req.body;
    await User.updateOne({_id},{$set:{first_name:first_name,last_name:last_name,date_of_birth,phone_number,address}})
        .then((data)=>{
          console.log(data);
            return res.send("Profile updated sucessfully")
        })
        .catch((error)=>{
          return res.status.json(error)
        })
}

module.exports = { signupUser, loginUser, getUserUpdate,postUserUpdate }