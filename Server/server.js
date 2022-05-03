import express, {json} from "express";
import mysql from "mysql";
import cors from "cors";

const db = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "Employees",
});

let jsonData = [
  {
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
//This tells node to apply json format to all data
db.connect(error => {
  if (error) console.log("Sorry cannot connect to db: ", error);
  else console.log("Connected to mysql db");
});

server.get("/employeesapi", (req, res) => {
  // query(, callback function)
  // let allEmpSP = "CALL `All_Emp_Data`()";
  let allEmpSP = "SELECT * FROM Employee";
  db.query(allEmpSP, (error, data, fields) => {
    if (error) {
      res.json({EroorMessage: error});
    } else {
      res.json(data);
    }
  });
});

// req is data from the client to the server
// res is data from the server to the client
server.get("/photosapi", (req, res) => {
  res.json(jsonData);
});

server.get("/photosapi/:photoid", (req, res) => {
  let id_from_client = req.params.photoid;
  res.json(jsonData.find(x => x.id == id_from_client));
});

server.listen(4400, function () {
  console.log("Server is successfully running on port 4400");
});