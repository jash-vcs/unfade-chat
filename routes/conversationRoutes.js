"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversationController_1 = require("../controllers/conversationController");
const router = (0, express_1.Router)();
router.post('/', conversationController_1.createConversation);
router.get('/:userId', conversationController_1.getConversationsByUserId);
exports.default = router;
