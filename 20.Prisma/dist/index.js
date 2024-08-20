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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//abv 2 lines similar to import mongoose from 'mongoose'; mongoose.connect('')
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName
            },
            select: {
                id: true,
                username: true
            }
        });
        console.log(response);
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const response = yield prisma.user.update({
            where: {
                username
            },
            data: {
                firstName,
                lastName
            }
        });
        console.log(response);
    });
}
// updateUser("batman",{firstName:"Bruce",lastName:"Wayne"});
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.findFirst({
            where: {
                username
            },
            select: {
                firstName: true,
                lastName: true
            }
        });
        console.log(response);
    });
}
getUser("batman");
