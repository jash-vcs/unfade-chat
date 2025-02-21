"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const router = (0, express_1.Router)();
router.post('/', messageController_1.sendMessage);
router.get('/:conversationId', messageController_1.getMessageHistoryByConversationId);
exports.default = router;
