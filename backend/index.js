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
	origin:'https://study-notion-frontent.vercel.app',
	credentials:true,
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
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
