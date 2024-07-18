import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher(["/dashboard", "/profile", "/conversation", "/video", "/code", "/music", "/image"]);
export default clerkMiddleware((auth, req) => {
    if (protectedRoutes(req)) {
        auth().protect();
    }
});
export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};