//   What is "auth-token" in req.cookies["auth-token"]?
// The "auth-token" is the name of a cookie that stores the JWT (JSON Web Token) in a user's browser. It is used for authentication.

  // What Are Cookies? 
  // A cookie is a small piece of data stored in the user's browser. It is sent along with every request to the server.
  
  // Example of a Cookie
  // When a user logs in, the server sets a cookie:
  
  // Set-Cookie: auth-token=ey123.abc.789; HttpOnly
  // Next time the user makes a request, the browser automatically sends the cookie:

  // GET /profile
  // Cookie: auth-token=ey123.abc.789
  // This allows the server to identify the user without needing them to log in again.
  
  // Why Are We Using Cookies for Authentication?
  // Without cookies, users would need to send their login credentials with every request!
  // Instead, we use a JWT token stored in a cookie, so users stay logged in.
  // The middleware extracts the token from cookies and verifies if the user is authenticated.


//   How Are Cookies Stored and Used in AuthMiddleware?
// Step 1: When the User Logs In, the Server Sets a Cookie
//   When a user logs in, the server generates a JWT and stores it in a cookie.
// Now, the browser stores the auth-token cookie.

// Step 2: When User Requests a Protected Page, AuthMiddleware Checks Cookies
// When the user tries to access a protected route (e.g., /profile), the request includes the cookie:

// GET /profile
// Cookie: auth-token=ey123.abc.789
// The middleware retrieves the token from req.cookies:

// const token = req.cookies["auth-token"];
// It then verifies the token and allows access.

//  Step 3: If No Cookie Exists, Access is Denied
// If the user does not have a token (e.g., they are logged out), req.cookies["auth-token"] will be undefined, and they will get:


// { "msg": "No token, authorization denied" }

// How Cookies Are Sent from the Client (Frontend)
// In a browser-based app or Postman, you don't need to manually send the cookie—browsers automatically include cookies in requests.

// If you're making a frontend request with JavaScript, you need to enable credentials:




    // What If We Don't Verify with JWT_SECRET?
    // If we skip verification, an attacker can modify the JWT and pretend to be an admin.
    
    //  Without Verification (Insecure Code)


//     What Happens If the Token is Fake or Tampered With?
// If an attacker modifies the JWT token (e.g., changing "userId": "12345" to "userId": "admin"), the signature will not match the original one.

// Fake Token Example

    // Step 4: Store user ID in request object and continue
    // req.userId = decoded.userId;

    // When the user logs in, we store their user ID inside the JWT token.
    // When they make a request, AuthMiddleware verifies the token and extracts the userId.
    // The userId is then stored in req.userId, making it available in the next middleware or route handler.
  

// The AuthMiddleware is a function that helps protect routes by ensuring that only users with a valid JWT (JSON Web Token) can access them.

// Think of it like a security guard at a VIP party:

// If you have a valid invite (JWT Token) → You can enter.
// If you don't have an invite → You are denied entry (401 Unauthorized).
// If you try to use a fake invite → The guard catches you (400 Bad Request).


// In web applications, authentication is used to ensure that only authorized users can access certain resources. Since HTTP is stateless, a user must send some form of authentication with each request. A common way to handle authentication in modern web applications is by using JSON Web Tokens (JWTs).

// Middleware functions in Express.js allow us to run custom logic before a request reaches a route handler. The AuthMiddleware you provided is used to verify that a request contains a valid JWT, ensuring the user is authenticated before proceeding.


// How AuthMiddleware Works
// When a user logs in, a JWT token is typically generated and stored in the browser’s cookies.
// The middleware retrieves this token from the auth-token cookie in the incoming request.

// If there is no token, the user is not authenticated, and the request should be denied.
// If no token is found in the request, the server responds with 401 Unauthorized.
// This means the user is not logged in or the token was not sent.
        // We need both the token and the secret key because:
        
        // The token contains user data.
        // The secret key is used to verify if the token is genuine and not tampered with.
        // If the secret key is missing, anyone could create fake tokens, making authentication insecure.

// If the token is valid, it contains the userId (or other user-related data).
// The middleware adds this userId to the req object, allowing other route handlers to identify the user.

// This function tells Express to continue processing the request.
// The request moves forward to the next middleware or the actual route handler.
// If the user is authenticated, the protected route (e.g., /dashboard, /profile) can access req.userId to retrieve the user's data.


// This middleware is used to authenticate requests using JSON Web Tokens (JWT)
// It first checks if the auth-token cookie exists on the request
// If no token is found, it returns a 401 unauthorized error
// If a token is found, it verifies the token using jwt.verify()
// The token is verified against the JWT_SECRET environment variable
// If valid, the decoded userId is added to the request object
// Then next() is called to pass execution to the next middleware
// If invalid, a 400 bad request error is returned
const jwt = require("jsonwebtoken");

const AuthMiddleware = {
    //1. FOR  REGULAR USERS (check cookies)
    authUser: (req, res, next) => {
  console.log("---- AUTH CHECK ----");
  console.log("Cookies:", req.cookies);

  const token = req.cookies["auth-token"];
  console.log("Token:", token);

  if (!token) {
    console.log("NO TOKEN FOUND");
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("TOKEN VERIFY FAILED:", err.message);
    return res.status(401).json({ msg: "Invalid token" });
  }
},

    //2. FOR ADMINS (check Headers)
    authAdmin: (req, res, next) => {
        try {
            //check the Header (Authorization)
            const token = req.header("Authorization");

            if (!token) {
                return res.status(401).json({ msg: " You are not an Admin" })
            };

            //Verify the token 
            //Note: Use the same secret key you snd in Admin Login
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET);

            if (decoded.type !== 'admin') {
                return res.status(403).json({ msg: "Access Denied Admins Only"})
            };

            req.adminId = decoded.id;
            next(); //Allow them in

        } catch (err) {
            return res.status(400).json({ msg: "Invalid  Admin Token" });
        }
    }
}

module.exports = AuthMiddleware