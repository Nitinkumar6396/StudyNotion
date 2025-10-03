import express from 'express'
import 'dotenv/config'
import connectdb from './config/database.js'
import cloudinaryConnect from './config/cloudinary.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import userRoutes from './routes/user.js'
import profileRoutes from './routes/profile.js'
import courseRoutes from './routes/course.js'
import catalogRoutes from './routes/catalog.js'
import paymentRoutes from './routes/payments.js'



// app config
const app = express()
const port = process.env.PORT || 5000
connectdb()
cloudinaryConnect()


// midlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
	origin:['https://study-notion-frontent.vercel.app','http://localhost:5173'],
<<<<<<< HEAD
	credentials:true
=======
	credentials:true,
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
>>>>>>> 1d44b472c6f9d452ef8f89782ec5917c64324f93
}))
app.use(fileUpload({
	useTempFiles:true,
	tempFileDir:'/tmp'
}))

// api endpoint
app.get('/', (req,res) => {
	res.send('API working...')
})

app.use('/api/user',userRoutes)
app.use('/api/profile',profileRoutes)
app.use('/api/course',courseRoutes)
app.use('/api/catalog',catalogRoutes)
app.use('/api/payment',paymentRoutes)

// start server
app.listen(port, () => console.log("Server started at ",port))




















// const express = require("express");
// const app = express();

// const userRoutes = require("./routes/user");
// const profileRoutes = require("./routes/profile");
// const paymentRoutes = require("./routes/payments");
// const courseRoutes = require("./routes/Course");
// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const {cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");

// dotenv.config();
// const PORT = process.env.PORT || 4000

// database.dbconnect();

// //middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//     cors({
//         // origin: 'http://localhost:5173', // frontend link
//         origin: "*",
//         credentials: true
//     })
// );

// app.use(
// 	fileUpload({
// 		useTempFiles:true,
// 		tempFileDir:"/tmp",
// 	})
// )

// //cloudinary connection
// cloudinaryConnect();

// //routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// // app.use("/api/v1/reach", contactUsRoute);

// //def route

// app.get("/", (req, res) => {
// 	return res.json({
// 		success:true,
// 		message:'Your server is up and running....'
// 	});
// });

// app.listen(PORT, () => {
// 	console.log(`App is running at ${PORT}`)
// })
