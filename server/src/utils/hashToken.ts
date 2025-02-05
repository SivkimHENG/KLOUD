import crypto from "crypto";



export default function hashToken(token : string) : string {
  return crypto.createHash("sha512").update(token).digest("hex");
}

