const Express = require("express");
const Router = Express.Router();
const UserController = require(`./controllers/users`);

Router.get("/", UserController.index);
Router.get("/poll", UserController.poll);
Router.get("/poll/:id", UserController.students);
Router.post("/result", UserController.result);
Router.post("/sendResult", UserController.sendResult);


module.exports = Router;