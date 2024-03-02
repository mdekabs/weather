import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const BLACKLIST_FILE = process.env.BLACKLIST;
const UTF8_ENCODING = "utf-8";

function readBlackList() {
  try {
    const data = readFileSync(BLACKLIST_FILE, UTF8_ENCODING);
    return JSON.parse(data);
  }
  catch (error) {
    return [];
  }
}

export function updateBlacklist(token) {
  const blacklistData = readBlacklist();
  blacklistData.push(token);
  writeFileSync(BLACKLIST_FILE, JSON.stringify(blackData));
}

export function isBlacklisted(token) {
  const blacklistData = readBlacklist();
  return blacklistData.includes(token);
}

