import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import 'dotenv/config';

// const db = mysql.createConnection({
//     host: "localhost",
//     port: 8889,
//     user: "root",
//     password: "root",
//     database: "PhotoGallery",
// });
const db = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE
});


let jsonData = [{
        albumId: 1,
        id: 2,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
    {
        albumId: 1,
        id: 2,
        title: "reprehenderit est deserunt velit ipsam",
        url: "https://via.placeholder.com/600/771796",
        thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
    {
        albumId: 1,
        id: 3,
        title: "officia porro iure quia iusto qui ipsa ut modi",
        url: "https://via.placeholder.com/600/24f355",
        thumbnailUrl: "https://via.placeholder.com/150/24f355",
    },
    {
        albumId: 1,
        id: 4,
        title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        url: "https://via.placeholder.com/600/d32776",
        thumbnailUrl: "https://via.placeholder.com/150/d32776",
    },
    {
        albumId: 1,
        id: 5,
        title: "natus nisi omnis corporis facere molestiae rerum in",
        url: "https://via.placeholder.com/600/f66b97",
        thumbnailUrl: "https://via.placeholder.com/150/f66b97",
    },
    {
        albumId: 1,
        id: 6,
        title: "accusamus ea aliquid et amet sequi nemo",
        url: "https://via.placeholder.com/600/56a8c2",
        thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
    },
    {
        albumId: 1,
        id: 7,
        title: "officia delectus consequatur vero aut veniam explicabo molestias",
        url: "https://via.placeholder.com/600/b0f7cc",
        thumbnailUrl: "https://via.placeholder.com/150/b0f7cc",
    },
    {
        albumId: 1,
        id: 8,
        title: "aut porro officiis laborum odit ea laudantium corporis",
        url: "https://via.placeholder.com/600/54176f",
        thumbnailUrl: "https://via.placeholder.com/150/54176f",
    },
    {
        albumId: 1,
        id: 9,
        title: "qui eius qui autem sed",
        url: "https://via.placeholder.com/600/51aa97",
        thumbnailUrl: "https://via.placeholder.com/150/51aa97",
    },
];

const server = express();
server.use(cors());
server.use(express.json());


// static is where we tell the server
server.use(express.static('uploads'));
//This tells node to apply json format to all data
db.connect(error => {
    if (error) console.log("Sorry cannot connect to db: ", error);
    else console.log("Connected to mysql db");
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

const fileupload = multer({ storage: storage })


server.post('/upload', fileupload.single("file_fromC"), (req, res) => {
    res.json({ fileupload: true, })
});

server.get('/photos', (req, res) => {
    let query = "CALL `getPhotos`()";
    db.query(query, (error, allphotos) => {
        if (error) {
            res.json({ allphotos: false, message: error });
        } else {
            res.json({ allphotos: allphotos[0], message: "returned photos" });
        }
    })
})

server.get('/photos/:photoid', (req, res) => {
    let query = "CALL `getPhotoByID`(?)";
    db.query(query, [req.params.photoid], (error, photo) => {
        if (error) {
            res.json({ photo: false, message: error });
        } else {
            res.json({ photo: photo[0][0], message: "Returned photo by ID" });
        }
    })
})

server.post('/photos', (req, res) => {
    let query = "CALL `addPhoto`(?, ?, ?, ?)";
    db.query(query, [req.body.albumId_fromC, req.body.title_fromC, req.body.url_fromC, req.body.tn_fromC], (error, newphoto) => {
        if (error) {
            res.json({ newphoto: false, message: error });
        } else {
            res.json({ newphoto: newphoto[0], message: "Photo added to the table" });
        }
    })
})

server.delete('/photos/:id', (req, res) => {
    let query = "CALL `deletePhoto`(?)";
    let getFilename = "CALL `getPhotoByID`(?)";
    db.query(getFilename, [req.params.id], (error, data) => {
        // res.json(data[0][0].data)
        if (error) {

        } else {
            let file_to_be_deleted = data[0][0].url;
            fs.unlink('./uploads/' + file_to_be_deleted, (error) => {
                if (error) {
                    res.json({ delStatus: false, message: error });
                } else {
                    db.query(query, [req.params.id], (error, deleteStatus) => {
                        if (error) {
                            res.json({ delStatus: false, message: error });
                        } else {
                            let del_succcess = deleteStatus[0][0].DEL_SUCCESS;
                            if (del_succcess === 1) {
                                res.json({ delStatus: del_succcess, message: 'Successfully deleted!' })
                            } else {
                                res.json({ delStatus: del_succcess, message: 'ID not found' })

                            }
                        }
                    })
                }
            });
        }
    })

})

// server.get("/employeesapi", (req, res) => {
//     // query(, callback function)
//     // let allEmpSP = "CALL `All_Emp_Data`()";
//     let allEmpSP = "SELECT * FROM Employee";
//     db.query(allEmpSP, (error, data, fields) => {
//         if (error) {
//             res.json({ EroorMessage: error });
//         } else {
//             res.json(data[0]);
//         }
//     });
// });

// server.get("/employeesapi/:id", (req, res) => {
//     let emp_id = req.params.id;
//     let empSP = " CALL `One_emp_data`(?)";
//     db.query(empSP, [emp_id], (error, data, fields) => {
//         if (error) {
//             res.json({ ErrorMessafe: error });
//         } else {
//             res.json(data[0]);
//         }
//     });
// });

// server.post("/login", (req, res) => {
//     let email = req.body.email;
//     let password = req.body.password;
//     // let loginQuery = "SELECT * FROM `users` WHERE users.email = `${email}` AND users.password = `${password}`"
//     let loginQuery = "CALL `login`(?,?)";
//     db.query(loginQuery, [email, password], (error, data, fields) => {
//         if (error) {
//             res.json({ ErrorMessage: error });
//         } else {
//             if (data[0].length === 0) {
//                 res.json({
//                     login: false,
//                     message: "Sorry, you have provided wrong credentials",
//                 });
//             } else {
//                 res.json({
//                     data: data[0],
//                     login: true,
//                     message: "Login successful",
//                     // UserID: data[0].UserID,
//                     // email: data[0].email,
//                     // Crete the Auth KEy
//                 });
//             }
//         }
//     });
// });

// server.post("/signup", (req, res) => {
//     let name = req.body.name;
//     // will contain parameter
//     let email = req.body.email;
//     let password = req.body.password;
//     // let query = "INSERT INTO `users` (`UserID`, `user_name`, `email`, `password`) VALUES (NULL, ?, ?, ?);";
//     let querySP = "CALL `Insert_user`(?, ?, ?)";
//     db.query(querySP, [name, email, password], (error, data, fields) => {
//         if (error) {
//             res.json({
//                     signup: false,
//                     message: error
//                 })
//                 // res.json({ErrorMessage: error});
//         } else {
//             // if ((name && email && password) === "") {
//             //   res.json({
//             //     data: data[0],
//             //     signup: false,
//             //     message: "Sorry, please input every information.",
//             //   });
//             // } else {
//             res.json({
//                 data: data[0],
//                 signup: true,
//                 message: "Signup successful.",
//             });
//             // }
//         }
//     });
// });


// server.put('/updateuser', (req, res) => {
//     let userID = req.body.userID;
//     let user_name = req.body.user_name;
//     let email = req.body.email;
//     let password = req.body.password;
//     let query = ' CALL `updateUser`(?, ?, ?, ?)!';
//     // order is really important!!!
//     db.query(query, [userID, user_name, email, password], (error, data) => {
//         if (error) {
//             res.json({ updata: false, message: error });
//         } else {
//             res.json({ update: true, message: "User successfully updated" });
//         }
//     })
// })


// server.get('/user/:id', (req, res) => {
//     let userID = req.params.id;
//     let query = ' CALL `getUser`(?)';
//     db.query(query, [userID], (error, data) => {
//         if (error) {
//             res.json({ user: false, message: error })
//         } else {
//             if (data[0].length === 0) {
//                 res.json({ user: false, message: "No user with that ID exists" })
//             } else {
//                 res.json({ user: true, message: "User successfully", userData: data[0] })
//             }
//         }
//     })
// })

// server.delete('/deleteuser/:id', (req, res) => {
//     let userID = req.params.id;
//     let query = 'CALL `deleteUser`(?)';
//     db.query(query, [userID], (error, date) => {
//         if (error) {
//             res.json({ deleteUser: false, message: error });
//         } else {
//             res.json({ deleteUser: true, message: "User deleted successfully" });
//         }
//     })
// })


// req is data from the client to the server
// res is data from the server to the client
// server.get("/photosapi", (req, res) => {
//     res.json(jsonData);
// });

// server.get("/photosapi/:photoid", (req, res) => {
//     let id_from_client = req.params.photoid;
//     res.json(jsonData.find(x => x.id == id_from_client));
// });

server.listen(4400, function() {
    console.log("Server is successfully running on port 4400");
});