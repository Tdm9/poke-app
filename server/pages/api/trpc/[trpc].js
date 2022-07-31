"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ 72:
/***/ ((module) => {

module.exports = require("superjson");

/***/ }),

/***/ 9926:
/***/ ((module) => {

module.exports = import("zod");;

/***/ }),

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 395:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5445);
/* harmony import */ var _server_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2622);
/* harmony import */ var _server_router_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8588);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_server_router__WEBPACK_IMPORTED_MODULE_1__]);
_server_router__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// src/pages/api/trpc/[trpc].ts



// export API handler
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__.createNextApiHandler)({
    router: _server_router__WEBPACK_IMPORTED_MODULE_1__/* .appRouter */ .q,
    createContext: _server_router_context__WEBPACK_IMPORTED_MODULE_2__/* .createContext */ .k
}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8588:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "k": () => (/* binding */ createContext),
  "p": () => (/* binding */ createRouter)
});

;// CONCATENATED MODULE: external "@trpc/server"
const server_namespaceObject = require("@trpc/server");
;// CONCATENATED MODULE: ./src/server/router/context.ts
// src/server/router/context.ts

const createContext = (opts)=>{
    const req = opts?.req;
    const res = opts?.res;
    return {
        req,
        res
    };
};
const createRouter = ()=>server_namespaceObject.router();


/***/ }),

/***/ 2622:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ appRouter)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8588);
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(superjson__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pokeRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6632);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pokeRouter__WEBPACK_IMPORTED_MODULE_2__]);
_pokeRouter__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// src/server/router/index.ts



const appRouter = (0,_context__WEBPACK_IMPORTED_MODULE_0__/* .createRouter */ .p)().transformer((superjson__WEBPACK_IMPORTED_MODULE_1___default())).merge("pokeRouter.", _pokeRouter__WEBPACK_IMPORTED_MODULE_2__/* .pokeRouter */ .I);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6632:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ pokeRouter)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8588);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9926);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_1__]);
zod__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const API_URL = "https://pokeapi.co/api/v2/";
// creates the trcp api layer for the pokeapi
const pokeRouter = (0,_context__WEBPACK_IMPORTED_MODULE_0__/* .createRouter */ .p)().query("pokemon", {
    // defines a schema for this query input
    input: zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
        page: zod__WEBPACK_IMPORTED_MODULE_1__.z.number().min(1).max(18),
        cursor: zod__WEBPACK_IMPORTED_MODULE_1__.z.number().nullish()
    }),
    // code called after each api call
    resolve: async ({ input  })=>{
        const offset = ((input.page ? input.page : 1) - 1) * 50;
        const response = await fetch(`${API_URL}pokemon?limit=50&offset=${offset}`).then((res)=>res.json()).then((res)=>res.results).then((res)=>res.map((pokemon, idx)=>{
                // this id will be used to fetch the details on the client side
                const id = offset + idx + 1;
                return {
                    ...pokemon,
                    id,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                };
            }));
        return response;
    }
}).query("pokemonDetails", {
    input: zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
        id: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().nullish()
    }),
    async resolve ({ input  }) {
        const pokemon = await fetch(`${API_URL}pokemon/${input?.id}`).then((res)=>res.json());
        return pokemon;
    }
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [445], () => (__webpack_exec__(395)));
module.exports = __webpack_exports__;

})();