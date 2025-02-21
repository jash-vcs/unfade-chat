"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageHistoryByConversationId = exports.sendMessage = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const User_1 = __importDefault(require("../models/User"));
const Conversation_1 = __importDefault(require("../models/Conversation"));
const __1 = require("..");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conversationId, senderId, message } = req.body;
        const user = yield User_1.default
            .findOne({ myServerUserId: senderId });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const conversation = yield Conversation_1.default.findById(conversationId);
        if (!conversation) {
            res.status(404).json({ error: 'Conversation not found' });
            return;
        }
        const reciverId = conversation.participants.find((participant) => participant.toString() !== ("" + user._id));
        const reciver = yield User_1.default.findById(reciverId);
        if (!reciver) {
            res.status(404).json({ error: 'Reciver not found' });
            return;
        }
        const newMessage = new Message_1.default({ conversationId, senderId: user._id, message });
        const savedMessage = yield newMessage.save();
        __1.wss.emit(`message-for-${reciver.myServerUserId}`, savedMessage.toJSON());
        res.status(201).json(newMessage);
    }
    catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
});
exports.sendMessage = sendMessage;
const getMessageHistoryByConversationId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conversationId } = req.params;
        const conversation = yield Conversation_1.default.findById(conversationId).populate('participants').exec();
        const messages = yield Message_1.default.find({ conversationId }).populate('senderId').sort({ timestamp: 1 }).exec();
        res.status(200).json({ messages, conversation });
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});
exports.getMessageHistoryByConversationId = getMessageHistoryByConversationId;
