// Crediti by Endy

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  let message = "";
  for (const [ownerNumber] of global.owner) {
    message += `\n> 📞+${ownerNumber}`;
  }
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;
  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await conn.sendMessage(m.chat, {
      text: `ೋೋ══ • ══ೋೋ
𝐍𝐨𝐧 𝐡𝐚𝐢 𝐢𝐥 𝐩𝐞𝐫𝐦𝐞𝐬𝐬𝐨 𝐝𝐢 𝐢𝐧𝐯𝐢𝐚𝐫𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢 𝐚𝐥𝐥𝐚 𝐜𝐡𝐚𝐭 𝐩𝐫𝐢𝐯𝐚𝐭𝐚 𝐝𝐞𝐥 𝐛𝐨𝐭. 

> 𝐏𝐞𝐫 𝐮𝐥𝐭𝐞𝐫𝐢𝐨𝐫𝐢 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐳𝐢𝐨𝐧𝐢 𝐨 𝐬𝐮𝐩𝐩𝐨𝐫𝐭𝐨, 𝐩𝐮𝐨𝐢 𝐜𝐨𝐧𝐭𝐚𝐭𝐭𝐚𝐫𝐞 𝐢 𝐜𝐫𝐞𝐚𝐭𝐨𝐫𝐢 𝐭𝐫𝐚𝐦𝐢𝐭𝐞 𝐥𝐞 𝐬𝐞𝐠𝐮𝐞𝐧𝐭𝐢 𝐫𝐞𝐟𝐞𝐫𝐞𝐧𝐳𝐞 𝐪𝐮𝐢 𝐬𝐨𝐭𝐭𝐨:
${message}
`
    });
    return false;
  }
  return true;
}