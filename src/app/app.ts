import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes/app.routes";
import { MongoClient } from "mongodb";
import {Application} from "express";

class App {

  readonly appConfig: express.Application;
  public routes: AppRoutes = new AppRoutes();
  public mongoUrl: string = 'mongodb+srv://izhaq:11072017@realmcluster.b9wxi.mongodb.net/Users?retryWrites=true&w=majority';
  private dbClient: MongoClient;

  constructor() {
    this.appConfig = express();
    this.config();
    this.routes.routes(this.appConfig);
    //this.mongoSetup().catch(console.error);
  }

  private config(): void{
    this.appConfig.use(bodyParser.json());
    this.appConfig.use(bodyParser.urlencoded({ extended: false }));
    this.appConfig.use(express.static('public'));
    // Add headers
    this.appConfig.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      // Pass to next layer of middleware
      next();
    });
    this.appConfig.options('*', function (req,res) { res.sendStatus(200); });
  }

  public async getMongoSetup() {
    const dbClient = new MongoClient(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await dbClient.connect();
      return dbClient;
    } catch (e) {
      console.error(e);
    }
  }

  public getAppConfigs(): Application {
    return this.appConfig;
  }
}

export const appInstance : App = new App();
