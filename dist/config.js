"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:4200",
                    credentials: true
                }
            ]
        }
    }
};
exports.default = config;
