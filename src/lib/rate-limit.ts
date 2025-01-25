import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "24h"),
    analytics: true,
});
