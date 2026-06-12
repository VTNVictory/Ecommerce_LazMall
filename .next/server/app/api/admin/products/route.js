"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/products/route";
exports.ids = ["app/api/admin/products/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fproducts%2Froute&page=%2Fapi%2Fadmin%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fproducts%2Froute.ts&appDir=D%3A%5CLOOPS%5CEcommerce_LazMall%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CLOOPS%5CEcommerce_LazMall&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fproducts%2Froute&page=%2Fapi%2Fadmin%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fproducts%2Froute.ts&appDir=D%3A%5CLOOPS%5CEcommerce_LazMall%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CLOOPS%5CEcommerce_LazMall&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_LOOPS_Ecommerce_LazMall_src_app_api_admin_products_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/products/route.ts */ \"(rsc)/./src/app/api/admin/products/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/products/route\",\n        pathname: \"/api/admin/products\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/products/route\"\n    },\n    resolvedPagePath: \"D:\\\\LOOPS\\\\Ecommerce_LazMall\\\\src\\\\app\\\\api\\\\admin\\\\products\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_LOOPS_Ecommerce_LazMall_src_app_api_admin_products_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/products/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnByb2R1Y3RzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnByb2R1Y3RzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZwcm9kdWN0cyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDTE9PUFMlNUNFY29tbWVyY2VfTGF6TWFsbCU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RCUzQSU1Q0xPT1BTJTVDRWNvbW1lcmNlX0xhek1hbGwmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3NCO0FBQ25HO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGZpZ21hL215LW1ha2UtZmlsZS8/N2Q2YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxMT09QU1xcXFxFY29tbWVyY2VfTGF6TWFsbFxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxwcm9kdWN0c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vcHJvZHVjdHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9wcm9kdWN0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vcHJvZHVjdHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxMT09QU1xcXFxFY29tbWVyY2VfTGF6TWFsbFxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxwcm9kdWN0c1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYWRtaW4vcHJvZHVjdHMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fproducts%2Froute&page=%2Fapi%2Fadmin%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fproducts%2Froute.ts&appDir=D%3A%5CLOOPS%5CEcommerce_LazMall%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CLOOPS%5CEcommerce_LazMall&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/products/route.ts":
/*!*********************************************!*\
  !*** ./src/app/api/admin/products/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"lazmall_jwt_secret_key_2026\";\nasync function POST(request) {\n    try {\n        // Xác thực quyền Admin\n        const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n        const tokenCookie = cookieStore.get(\"lazmall_auth_token\");\n        if (!tokenCookie || !tokenCookie.value) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Quyền truy cập bị từ chối\"\n            }, {\n                status: 401\n            });\n        }\n        let decoded;\n        try {\n            decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().verify(tokenCookie.value, JWT_SECRET);\n        } catch (err) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Phi\\xean l\\xe0m việc hết hạn hoặc kh\\xf4ng hợp lệ\"\n            }, {\n                status: 401\n            });\n        }\n        if (decoded.role !== \"ADMIN\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Bạn kh\\xf4ng c\\xf3 quyền thực hiện t\\xe1c vụ n\\xe0y\"\n            }, {\n                status: 403\n            });\n        }\n        const body = await request.json();\n        const { name, description, image, price, originalPrice, stock, discount, isOfficial, isFlashSale, categoryId } = body;\n        // Validate dữ liệu bắt buộc\n        if (!name || !image || price === undefined || categoryId === undefined) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Vui l\\xf2ng nhập c\\xe1c th\\xf4ng tin bắt buộc: t\\xean, ảnh, gi\\xe1 b\\xe1n v\\xe0 danh mục\"\n            }, {\n                status: 400\n            });\n        }\n        // Tạo sản phẩm mới\n        const product = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.db.product.create({\n            data: {\n                name,\n                description: description || \"\",\n                image,\n                price: parseFloat(price),\n                originalPrice: originalPrice ? parseFloat(originalPrice) : null,\n                stock: stock !== undefined ? parseInt(stock) : 100,\n                discount: discount ? parseInt(discount) : null,\n                isOfficial: isOfficial !== undefined ? isOfficial : true,\n                isFlashSale: isFlashSale !== undefined ? isFlashSale : false,\n                categoryId: parseInt(categoryId),\n                soldCount: \"0\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Đăng b\\xe1n sản phẩm th\\xe0nh c\\xf4ng\",\n            product\n        });\n    } catch (error) {\n        console.error(\"Lỗi khi th\\xeam sản phẩm:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Lỗi m\\xe1y chủ trong qu\\xe1 tr\\xecnh th\\xeam sản phẩm\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi9wcm9kdWN0cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMkM7QUFDSjtBQUNUO0FBQ0M7QUFFL0IsTUFBTUksYUFBYUMsUUFBUUMsR0FBRyxDQUFDRixVQUFVLElBQUk7QUFPdEMsZUFBZUcsS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLHVCQUF1QjtRQUN2QixNQUFNQyxjQUFjUixxREFBT0E7UUFDM0IsTUFBTVMsY0FBY0QsWUFBWUUsR0FBRyxDQUFDO1FBRXBDLElBQUksQ0FBQ0QsZUFBZSxDQUFDQSxZQUFZRSxLQUFLLEVBQUU7WUFDdEMsT0FBT1oscURBQVlBLENBQUNhLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBNEIsR0FDckM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLElBQUlDO1FBQ0osSUFBSTtZQUNGQSxVQUFVYiwwREFBVSxDQUFDTyxZQUFZRSxLQUFLLEVBQUVSO1FBQzFDLEVBQUUsT0FBT2MsS0FBSztZQUNaLE9BQU9sQixxREFBWUEsQ0FBQ2EsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUEyQyxHQUNwRDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSUMsUUFBUUcsSUFBSSxLQUFLLFNBQVM7WUFDNUIsT0FBT25CLHFEQUFZQSxDQUFDYSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQTBDLEdBQ25EO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNSyxPQUFPLE1BQU1aLFFBQVFLLElBQUk7UUFDL0IsTUFBTSxFQUNKUSxJQUFJLEVBQ0pDLFdBQVcsRUFDWEMsS0FBSyxFQUNMQyxLQUFLLEVBQ0xDLGFBQWEsRUFDYkMsS0FBSyxFQUNMQyxRQUFRLEVBQ1JDLFVBQVUsRUFDVkMsV0FBVyxFQUNYQyxVQUFVLEVBQ1gsR0FBR1Y7UUFFSiw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDQyxRQUFRLENBQUNFLFNBQVNDLFVBQVVPLGFBQWFELGVBQWVDLFdBQVc7WUFDdEUsT0FBTy9CLHFEQUFZQSxDQUFDYSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQXNFLEdBQy9FO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxtQkFBbUI7UUFDbkIsTUFBTWlCLFVBQVUsTUFBTTlCLHVDQUFFQSxDQUFDOEIsT0FBTyxDQUFDQyxNQUFNLENBQUM7WUFDdENDLE1BQU07Z0JBQ0piO2dCQUNBQyxhQUFhQSxlQUFlO2dCQUM1QkM7Z0JBQ0FDLE9BQU9XLFdBQVdYO2dCQUNsQkMsZUFBZUEsZ0JBQWdCVSxXQUFXVixpQkFBaUI7Z0JBQzNEQyxPQUFPQSxVQUFVSyxZQUFZSyxTQUFTVixTQUFTO2dCQUMvQ0MsVUFBVUEsV0FBV1MsU0FBU1QsWUFBWTtnQkFDMUNDLFlBQVlBLGVBQWVHLFlBQVlILGFBQWE7Z0JBQ3BEQyxhQUFhQSxnQkFBZ0JFLFlBQVlGLGNBQWM7Z0JBQ3ZEQyxZQUFZTSxTQUFTTjtnQkFDckJPLFdBQVc7WUFDYjtRQUNGO1FBRUEsT0FBT3JDLHFEQUFZQSxDQUFDYSxJQUFJLENBQUM7WUFDdkJ5QixTQUFTO1lBQ1RDLFNBQVM7WUFDVFA7UUFDRjtJQUNGLEVBQUUsT0FBT2xCLE9BQU87UUFDZDBCLFFBQVExQixLQUFLLENBQUMsNkJBQTBCQTtRQUN4QyxPQUFPZCxxREFBWUEsQ0FBQ2EsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQTRDLEdBQ3JEO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGZpZ21hL215LW1ha2UtZmlsZS8uL3NyYy9hcHAvYXBpL2FkbWluL3Byb2R1Y3RzL3JvdXRlLnRzP2M2OWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9saWIvZGJcIjtcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBcImxhem1hbGxfand0X3NlY3JldF9rZXlfMjAyNlwiO1xuXG5pbnRlcmZhY2UgRGVjb2RlZFRva2VuIHtcbiAgdXNlcklkOiBzdHJpbmc7XG4gIHJvbGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIC8vIFjDoWMgdGjhu7FjIHF1eeG7gW4gQWRtaW5cbiAgICBjb25zdCBjb29raWVTdG9yZSA9IGNvb2tpZXMoKTtcbiAgICBjb25zdCB0b2tlbkNvb2tpZSA9IGNvb2tpZVN0b3JlLmdldChcImxhem1hbGxfYXV0aF90b2tlblwiKTtcblxuICAgIGlmICghdG9rZW5Db29raWUgfHwgIXRva2VuQ29va2llLnZhbHVlKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiUXV54buBbiB0cnV5IGPhuq1wIGLhu4sgdOG7qyBjaOG7kWlcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IGRlY29kZWQ6IERlY29kZWRUb2tlbjtcbiAgICB0cnkge1xuICAgICAgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW5Db29raWUudmFsdWUsIEpXVF9TRUNSRVQpIGFzIERlY29kZWRUb2tlbjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCJQaGnDqm4gbMOgbSB2aeG7h2MgaOG6v3QgaOG6oW4gaG/hurdjIGtow7RuZyBo4bujcCBs4buHXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChkZWNvZGVkLnJvbGUgIT09IFwiQURNSU5cIikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIkLhuqFuIGtow7RuZyBjw7MgcXV54buBbiB0aOG7sWMgaGnhu4duIHTDoWMgduG7pSBuw6B5XCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMyB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zdCB7XG4gICAgICBuYW1lLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBpbWFnZSxcbiAgICAgIHByaWNlLFxuICAgICAgb3JpZ2luYWxQcmljZSxcbiAgICAgIHN0b2NrLFxuICAgICAgZGlzY291bnQsXG4gICAgICBpc09mZmljaWFsLFxuICAgICAgaXNGbGFzaFNhbGUsXG4gICAgICBjYXRlZ29yeUlkLFxuICAgIH0gPSBib2R5O1xuXG4gICAgLy8gVmFsaWRhdGUgZOG7ryBsaeG7h3UgYuG6r3QgYnXhu5ljXG4gICAgaWYgKCFuYW1lIHx8ICFpbWFnZSB8fCBwcmljZSA9PT0gdW5kZWZpbmVkIHx8IGNhdGVnb3J5SWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIlZ1aSBsw7JuZyBuaOG6rXAgY8OhYyB0aMO0bmcgdGluIGLhuq90IGJ14buZYzogdMOqbiwg4bqjbmgsIGdpw6EgYsOhbiB2w6AgZGFuaCBt4bulY1wiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBU4bqhbyBz4bqjbiBwaOG6qW0gbeG7m2lcbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgZGIucHJvZHVjdC5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJcIixcbiAgICAgICAgaW1hZ2UsXG4gICAgICAgIHByaWNlOiBwYXJzZUZsb2F0KHByaWNlKSxcbiAgICAgICAgb3JpZ2luYWxQcmljZTogb3JpZ2luYWxQcmljZSA/IHBhcnNlRmxvYXQob3JpZ2luYWxQcmljZSkgOiBudWxsLFxuICAgICAgICBzdG9jazogc3RvY2sgIT09IHVuZGVmaW5lZCA/IHBhcnNlSW50KHN0b2NrKSA6IDEwMCxcbiAgICAgICAgZGlzY291bnQ6IGRpc2NvdW50ID8gcGFyc2VJbnQoZGlzY291bnQpIDogbnVsbCxcbiAgICAgICAgaXNPZmZpY2lhbDogaXNPZmZpY2lhbCAhPT0gdW5kZWZpbmVkID8gaXNPZmZpY2lhbCA6IHRydWUsXG4gICAgICAgIGlzRmxhc2hTYWxlOiBpc0ZsYXNoU2FsZSAhPT0gdW5kZWZpbmVkID8gaXNGbGFzaFNhbGUgOiBmYWxzZSxcbiAgICAgICAgY2F0ZWdvcnlJZDogcGFyc2VJbnQoY2F0ZWdvcnlJZCksXG4gICAgICAgIHNvbGRDb3VudDogXCIwXCIsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBtZXNzYWdlOiBcIsSQxINuZyBiw6FuIHPhuqNuIHBo4bqpbSB0aMOgbmggY8O0bmdcIixcbiAgICAgIHByb2R1Y3QsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkzhu5dpIGtoaSB0aMOqbSBz4bqjbiBwaOG6qW06XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiBcIkzhu5dpIG3DoXkgY2jhu6cgdHJvbmcgcXXDoSB0csOsbmggdGjDqm0gc+G6o24gcGjhuqltXCIgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjb29raWVzIiwiZGIiLCJqd3QiLCJKV1RfU0VDUkVUIiwicHJvY2VzcyIsImVudiIsIlBPU1QiLCJyZXF1ZXN0IiwiY29va2llU3RvcmUiLCJ0b2tlbkNvb2tpZSIsImdldCIsInZhbHVlIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZGVjb2RlZCIsInZlcmlmeSIsImVyciIsInJvbGUiLCJib2R5IiwibmFtZSIsImRlc2NyaXB0aW9uIiwiaW1hZ2UiLCJwcmljZSIsIm9yaWdpbmFsUHJpY2UiLCJzdG9jayIsImRpc2NvdW50IiwiaXNPZmZpY2lhbCIsImlzRmxhc2hTYWxlIiwiY2F0ZWdvcnlJZCIsInVuZGVmaW5lZCIsInByb2R1Y3QiLCJjcmVhdGUiLCJkYXRhIiwicGFyc2VGbG9hdCIsInBhcnNlSW50Iiwic29sZENvdW50Iiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/products/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst db = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = db;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLEtBQ1hGLGdCQUFnQkcsTUFBTSxJQUN0QixJQUFJSix3REFBWUEsQ0FBQztJQUNmSyxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFHO0FBRUwsSUFBSUMsSUFBcUMsRUFBRUwsZ0JBQWdCRyxNQUFNLEdBQUdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGZpZ21hL215LW1ha2UtZmlsZS8uL3NyYy9saWIvZGIudHM/OWU0ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsIGFzIHVua25vd24gYXMgeyBwcmlzbWE6IFByaXNtYUNsaWVudCB9O1xuXG5leHBvcnQgY29uc3QgZGIgPVxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8XG4gIG5ldyBQcmlzbWFDbGllbnQoe1xuICAgIGxvZzogW1wicXVlcnlcIl0sXG4gIH0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gZGI7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsIiwiZGIiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fproducts%2Froute&page=%2Fapi%2Fadmin%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fproducts%2Froute.ts&appDir=D%3A%5CLOOPS%5CEcommerce_LazMall%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CLOOPS%5CEcommerce_LazMall&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();