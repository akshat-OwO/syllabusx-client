import alchemy, { Scope } from "alchemy";
import {
    DurableObjectNamespace,
    Images,
    Nextjs,
    R2Bucket,
    Self,
    type Bindings,
} from "alchemy/cloudflare";

const app = await alchemy("syllabusx-client");
const isLocal = Scope.current.local;

const isrCache = isLocal
    ? undefined
    : await R2Bucket("isr-cache", {
          name: `${app.name}-${app.stage}-isr-cache`,
      });

const bindings: Bindings = {
    IMAGES: Images(),
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL ?? "",
    CONTENTFUL_SPACE_ID: alchemy.secret(process.env.CONTENTFUL_SPACE_ID),
    CONTENTFUL_ACCESS_TOKEN: alchemy.secret(
        process.env.CONTENTFUL_ACCESS_TOKEN
    ),
    RESEND_API_KEY: alchemy.secret(process.env.RESEND_API_KEY),
    UPSTASH_REDIS_REST_URL: alchemy.secret(process.env.UPSTASH_REDIS_REST_URL),
    UPSTASH_REDIS_REST_TOKEN: alchemy.secret(
        process.env.UPSTASH_REDIS_REST_TOKEN
    ),
    DISCORD_BOT_TOKEN: alchemy.secret(process.env.DISCORD_BOT_TOKEN),
    DISCORD_CHANNEL_ID: process.env.DISCORD_CHANNEL_ID ?? "",
};

if (!isLocal && isrCache) {
    bindings.NEXT_INC_CACHE_R2_BUCKET = isrCache;
    bindings.NEXT_CACHE_DO_QUEUE = DurableObjectNamespace("isr-queue", {
        className: "DOQueueHandler",
        sqlite: true,
    });
    bindings.WORKER_SELF_REFERENCE = Self;
}

export const web = await Nextjs("web", {
    adopt: true,
    dev: {
        command: "pnpm next dev --turbopack",
        env: {
            NEXTJS_ENV: "development",
        },
    },
    bindings,
    build: {
        command:
            "pnpm opennextjs-cloudflare build && pnpm opennextjs-cloudflare populateCache remote",
        env: {
            NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL ?? "",
            CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID ?? "",
            CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
        },
    },
});

console.log({
    url: web.url,
});

await app.finalize();
