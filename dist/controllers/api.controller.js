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
exports.getPlace = void 0;
// export const getPlace = async (
//     req: Request,
//     res: Response
//   ): Promise<Response> => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))
//       return res.status(200).json(response);
//     } catch (e) {
//       console.log(e);
//       return res.status(500).json("caca");
//     }
//   };
// function (req, res) {
//     req.get('https://jsonplaceholder.typicode.com/todos/1', function(err, response, body) {
//         if (!err && response.statusCode == 200) {
//             var locals = JSON.parse(body);
//             return res.status(200).json(response);
//         }
//     }
// }
exports.getPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://jsonplaceholder.typicode.com/posts').then();
        return res.status(200).json(response);
    }
    finally {
    }
});
try { }
catch (e) {
    console.log(e);
    return res.status(500).json("caca");
}
;
