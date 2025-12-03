import { betterAuth } from "better-auth";
// Create the auth instance, grab required api secrets
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {    
        enabled: true
    } 
});
