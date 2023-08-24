// const express = require("express")
// const app = express()


// const AdminBro = require('admin-bro');
// const AdminBroMongoose = require('admin-bro-mongoose');
// const AdminBroExpress = require('@admin-bro/express');


// const Users = require("./models/userModel")
// const Car = require("./models/carsModel")
// const Booking = require("./models/bookingModel")
// const Review = require("./models/reviewModel")

// AdminBro.registerAdapter(AdminBroMongoose);


// const admin = new AdminBro({
//   resources: [Users,Car,Booking,Review],
//   rootPath: '/admin',
// });

// const router = AdminBroExpress.buildRouter(admin);

// app.use(admin.options.rootPath, router);
// app.listen(process.env.ADMIN_PORT,()=>{
//     console.log("DB Adminstration running on port : 127.0.0.1:"+process.env.ADMIN_PORT|| 4001);
// })