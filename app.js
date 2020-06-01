const livereload = require("livereload");

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

var connectLivereload = require("connect-livereload");

var app = express();

app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });