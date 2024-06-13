import { db } from "../db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { JWTPayload, SignJWT, importJWK } from "jose";
import { Session } from "next-auth";

interface token extends JWT {
    uid: string;
    jwtToken: string;
}
  
export interface session extends Session {
    user: {
      id: string;
      jwtToken: string;
      email: string;
      name: string;
    };
}


const generateJWT = async (payload: JWTPayload) => {
    const secret = process.env.JWT_SECRET || "secret";
  
    const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });
  
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("365d")
      .sign(jwk);
  
    return jwt;
};

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Email" },
                password: {  label: "Password", type: "password", placeholder : "Password"}
            },
            async authorize(credentials) {
                if (!credentials|| !credentials.username || !credentials.password) {
                    return null
                }
                const hashedPassword = await bcrypt.hash(credentials.password, 10);

                const userDb = await db.user.findFirst({
                    where: {
                        username: credentials.username
                    },
                    select : {
                        id: true,
                        username: true,
                        password: true
                    }
                });
                if(userDb){
                    if (await bcrypt.compare(credentials.password, userDb.password)) {
                        const jwt = await generateJWT({
                            id: userDb.id,
                        });
                        return {
                            id: userDb.id,
                            name: userDb.name,
                            email: userDb.username,
                            token: jwt,
                        }
                    }
                } else {
                    return null;
                }

                try {
                    if (credentials.username.length < 3) {
                        return null;
                    }
                    if(credentials.password.length < 3) {
                        return null;
                    }
                    const user = await db.user.create({
                        data: {
                            username: credentials.username,
                            password: hashedPassword
                        }
                    });
                    return {
                        id: user.id,
                        name: user.username,
                        email: user.username,
                        token: await generateJWT({
                            id: user.id,
                        }),
                    }

                } catch(e){
                    return null;
                }
            }        
        })

    ],
    secret: process.env.NEXTAUTH_SECRET || "secr3t",
    callbacks: {
        session: async ({ session, token }) => {
            const newSession: session = session as session;
            if (newSession.user && token.uid) {
              newSession.user.id = token.uid as string;
              newSession.user.jwtToken = token.jwtToken as string;
            }
            return newSession!;
          },
          jwt: async ({ token, user }): Promise<JWT> => {
            const newToken = token;
      
            if (user) {
              newToken.uid = user.id;
              newToken.jwtToken = (user as User);
            }
            return newToken;
        },
    },
} satisfies NextAuthOptions;
