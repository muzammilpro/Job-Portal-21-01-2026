
// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => {
//       // Allow access if user is authenticated
//       return !!token;
//     },
//   },
// });

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };


import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
