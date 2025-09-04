import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
  
export async function POST(request) {
  const { cacheKey, databaseDetails } = await request.json();
  const redis = new Redis({url: process.env.UPSTASH_REDIS_REST_URL,token: process.env.UPSTASH_REDIS_REST_TOKEN,});
  const cacheValue = await redis.set(cacheKey, databaseDetails);
  return NextResponse.json({ cacheValue });
}