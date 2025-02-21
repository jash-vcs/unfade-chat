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
exports.getAllUsers = exports.updateUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, profilePicSrc, myServerUserId } = req.body;
        const user = new User_1.default({ name, profilePicSrc, myServerUserId });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { name, profilePicSrc, lastSeenOn } = req.body;
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { name, profilePicSrc, lastSeenOn }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});
exports.updateUser = updateUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});
exports.getAllUsers = getAllUsers;
