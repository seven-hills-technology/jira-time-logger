import * as redis from "redis";
import { promisify } from "util";
import { config } from "../config"

import { RedisJiraIssue } from "../models/redisJiraIssue";

const redisHost = config.redisHost;
const redisPort = config.redisPort;

const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort
});
const asyncRedisClient = {
    get: promisify(redisClient.get).bind(redisClient),
    set: promisify(redisClient.set).bind(redisClient),
    del: promisify(redisClient.del).bind(redisClient),
    sadd: promisify(redisClient.sadd).bind(redisClient),
    srem: promisify(redisClient.srem).bind(redisClient),
    setnx: promisify(redisClient.setnx).bind(redisClient),
    srandmember: promisify(redisClient.srandmember).bind(redisClient),
    keys: promisify(redisClient.keys).bind(redisClient)
};

class RedisJiraService {
    async getAllJiraIssues(): Promise<RedisJiraIssue[]> {
        const keys: string[] = await asyncRedisClient.keys("jira-issue-cache:jiraIssues:*");
        const redisJiraIssues: RedisJiraIssue[] = await Promise.all(
            keys.map(key => asyncRedisClient.get(key)
                .then((x: string) => JSON.parse(x))
                .then((x: any) => ({...x, id: x.key}))
            )
        );
        return redisJiraIssues;
    }
}

export const redisJiraService = new RedisJiraService();