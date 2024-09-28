"use strict";
// export { auth as middleware } from "@/auth";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.middleware = middleware;
const server_1 = require("next/server");
// // Define the middleware function
// export function middleware(request: NextRequest) {
//   // Check for login status (you'll need to adjust this based on your authentication method)
//   const token = request.cookies.get(
//     process.env.NODE_ENV === "production"
//       ? "__Secure-authjs.session-token"
//       : "authjs.session-token"
//   );
//   // Define the URL of the login page
//   const loginUrl = new URL("/login", request.url);
//   // List of paths that do not require authentication
//   const publicPaths = [
//     "/login",
//     "/signup",
//     "/public",
//     "/email/verify",
//     "/email/verify/**",
//   ];
//   // Redirect to login page if not authenticated and the path is private
//   if (!token?.value && !publicPaths.includes(request.nextUrl.pathname)) {
//     return NextResponse.redirect(loginUrl);
//   } else if (token?.value && publicPaths.includes(request.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   // Continue to the requested page if authenticated or on a public path
//   return NextResponse.next();
// }
// Define the paths the middleware should apply to
function middleware(request) {
    return server_1.NextResponse.next();
}
exports.config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
