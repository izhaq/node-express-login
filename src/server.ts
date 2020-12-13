import { appInstance } from './app/app';
import * as http from 'http';
const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

http.createServer(appInstance.getAppConfigs()).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
