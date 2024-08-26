import express from "express";
import { DatabaseConnect } from "./utils/db.js";
import parser from "body-parser";
import { Todo } from "./models/todo.model.js";

const app = express();

app.use(parser.json());

// app.get("/", (_, res) => {
//   res.status(200).json({
//     message: "This is form backend",
//     success: true,
//   });
// });

// app.get("/posts", async (req, res) => {
//   const { userId } = req.query;
//   try {
//     let fetchPosts = await axios.get(
//       "https://jsonplaceholder.typicode.com/posts"
//     );

//     if (!fetchPosts)
//       return res
//         .status(401)
//         .json({ message: "Something wants wrong", success: true });
//     if (userId) {
//       const posts = fetchPosts.data.filter((post) => post.userId == userId);
//       return res.status(201).json(posts);
//     } else {
//       return res.status(201).json(fetchPosts.data);
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// });

// Add New Todo

app.post("/addtodo", async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username)
      return res.status(401).json({ message: "Please don't missed username" });
    if (!email)
      return res.status(401).json({ message: "Please don't missed email" });

    const todo = await Todo.create({
      name: username,
      email,
    });

    res.status(200).json({ success: true, todo });
  } catch (error) {
    console.log("error", error.message);
  }
});

// Get All Todo's and Get By ID

app.get("/all", async (req, res) => {
  const { id } = req.query;
  try {
    const todos = await Todo.find().sort({ createAt: -1 });
    if (todos) {
      if (!id) {
        return res.status(201).json(todos);
      } else {
        let filterTodo = await Todo.findById(id);
        return res.status(201).json(filterTodo);
      }
    } else {
      return res.status(200).json({ message: "No found", success: true });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/update/:id", async (req, res) => {
  const { username, email } = req.body;
  const id = req.params.id;
  try {
    if (!id) return res.status(404).json({ message: "Something missing" });

    const todo = await Todo.findById(id);

    if (username) todo.name = username;
    if (email) todo.email = email;

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Todo.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ message: "Deleted Successfully", success: true });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3500, () => {
  DatabaseConnect();
  console.log("Server run on this port : 3500");
});
