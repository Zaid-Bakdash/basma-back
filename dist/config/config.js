"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = exports.bcryptConfig = void 0;
exports.bcryptConfig = {
    saltyHash: 6,
};
exports.jwtConfig = {
    secertKey: 'Shopy is an Eccommerce here',
    issuer: 'Shopy',
    expiresIn: '200h'
};
