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
exports.getConversationsByUserId = exports.createConversation = void 0;
const Conversation_1 = __importDefault(require("../models/Conversation"));
const User_1 = __importDefault(require("../models/User"));
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { participants } = req.body;
        const conversation = new Conversation_1.default({ participants });
        yield conversation.save();
        res.status(201).json(conversation);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating conversation' });
    }
});
exports.createConversation = createConversation;
const getConversationsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield User_1.default
            .findOne({ myServerUserId: userId });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const conversations = yield Conversation_1.default.find({
            participants: user._id,
        }).sort({ lastMessageTime: -1 });
        res.status(200).json(conversations);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching conversations' });
    }
});
exports.getConversationsByUserId = getConversationsByUserId;
