"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app/app");
const http = require("http");
const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
;
http.createServer(app_1.appInstance.getAppConfigs()).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map