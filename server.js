const express = require("express");

const app = express();
const cors = require("cors");
const dbConnection = require("./utils/dbConnection");

const userRouter = require("./routes/userRoutes");
const port = process.env.PORT || 5000;
// const projectRouter = require("./routes/projectRoutes");
// const taskRouter = require("./routes/taskRoutes");
// const taskNsRouter = require("./routes/taskNsRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/v1/user/", userRouter);
// app.use("/api/v1/project/", projectRouter);
// app.use("/api/v1/task/", taskRouter);
// app.use("/api/v1/taskNs/", taskNsRouter);

dbConnection()
  .then((status) => {
    console.log(status);
    app.listen(port, () => {
      console.log(`App listening at http://localhost:5000`);
    });
  })
  .catch((err) => console.log(err));

