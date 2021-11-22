import http from "http";

type HandlerClass = { new (handler?: Handler): Handler };

abstract class Handler {
  constructor(private readonly handler?: Handler) {}

  process(req: http.IncomingMessage, res: http.ServerResponse) {
    console.log("BaseHandler: processing");

    if (!this.handler) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ error: 404, message: "Not found" }));
      return res.end();
    }

    this.handler.process(req, res);
  }
}

class AuthorizationHandler extends Handler {
  constructor(nextHandler?: Handler) {
    super(nextHandler);
  }

  override process(req: http.IncomingMessage, res: http.ServerResponse) {
    console.log("AuthorizationHandler: processing");

    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")?.[1];

    // implementation of authorization process
    if (token) return super.process(req, res);

    res.writeHead(401, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: 401, message: "Not Authorized" }));
    return res.end();
  }
}

class UsersHandler extends Handler {
  static users = [{ name: "Aram" }, { name: "Anri" }];

  override async process(req: http.IncomingMessage, res: http.ServerResponse) {
    console.log("UsersHandler: processing");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ users: UsersHandler.users }));
    res.end();
  }
}
class HttpServer {
  constructor(private readonly handlers: Record<string, Handler> = {}) {}

  get(route: string, ...Handlers: HandlerClass[]) {
    const requestHandler = this.buildChain(Handlers);
    this.handlers[route] = requestHandler;
  }

  listen(port: number) {
    const server = http.createServer(this.baseHandler.bind(this));
    server.listen(port);
  }

  // utility functions
  private buildChain(Handlers: HandlerClass[]): Handler {
    return Handlers.reduceRight(
      (previousHandler: Handler | undefined, CurrentHandler: HandlerClass) => {
        return new CurrentHandler(previousHandler);
      },
      undefined
    )!;
  }

  private baseHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    for (const [route, handler] of Object.entries(this.handlers)) {
      if (req.url === route) return handler.process(req, res);
    }
  }
}

const app = new HttpServer();

app.get("/users", AuthorizationHandler, UsersHandler);

app.listen(3000);
