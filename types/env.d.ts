import type { web } from "../alchemy.run.ts";

export type CloudflareEnv = typeof web.Env;

declare global {
    type Env = CloudflareEnv;
}

declare module "cloudflare:workers" {
    namespace Cloudflare {
        export interface Env extends CloudflareEnv {}
    }
}
