import { performance } from 'perf_hooks';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const socialText = `*📱 SOCIAL ZYNO BOT*\n\n`
                    + `🌍 *Instagram:*\n`
                    + `https://instagram.com/zynobot.md\n\n`
                    + `📢 *TikTok:*\n`
                    + `https://www.tiktok.com/@endys8265\n\n`
                    + `💬 *GitHub:*\n`
                    + `https://github.com/endy-gif9988\n\n`

    await conn.sendMessage(
        message.chat,
        { text: socialText },
        { quoted: message }
    );
};

handler.help = ['social'];
handler.tags = ['info'];
handler.command = /^(social|socials)$/i;

export default handler;
