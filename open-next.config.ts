import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

const isDev = process.env.NEXTJS_ENV === "development";

export default defineCloudflareConfig({
    incrementalCache: isDev ? undefined : r2IncrementalCache,
    queue: isDev ? memoryQueue : doQueue,
});
