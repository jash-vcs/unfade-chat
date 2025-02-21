"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const conversationRoutes_1 = __importDefault(require("./routes/conversationRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.wss = new ws_1.WebSocketServer({ server });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/conversations', conversationRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
