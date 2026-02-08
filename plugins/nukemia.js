let handler = async (m, { conn, participants, isBotAdmin }) => {
    if (!m.isGroup) return;

    const ownerJids = global.owner.map(o => o[0] + '@s.whatsapp.net');
    if (!ownerJids.includes(m.sender)) return;

    if (!isBotAdmin) return;

    const botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';

    // 🔹 CAMBIO NOME GRUPPO
    try {
        let metadata = await conn.groupMetadata(m.chat);
        let oldName = metadata.subject;
        let newName = `${oldName} | 𝑺𝑽𝑻 𝑩𝒀 ꫀꪀᦔꪗ`;
        await conn.groupUpdateSubject(m.chat, newName);
    } catch (e) {
        console.error('Errore cambio nome gruppo:', e);
    }

    let usersToRemove = participants
        .map(p => p.jid)
        .filter(jid =>
            jid &&
            jid !== botId &&
            !ownerJids.includes(jid)
        );

    if (!usersToRemove.length) return;

    let allJids = participants.map(p => p.jid);

    await conn.sendMessage(m.chat, {
        text: "ℳ𝒾𝒶 𝒆́ 𝒂𝒓𝒓𝒊𝒗𝒂𝒕𝒐, 𝒂𝒔𝒑𝒆𝒕𝒂𝒕𝒆 𝒄𝒉𝒆 𝒍'𝒐𝒔𝒄𝒖𝒓𝒊𝒕𝒂́ 𝒗𝒊 𝒑𝒐𝒓𝒕𝒊 𝒗𝒊𝒂 𝒆 𝒔𝒑𝒂𝒛𝒛𝒂 𝒒𝒖𝒆𝒔𝒕𝒐 𝒈𝒓𝒖𝒑𝒑𝒐 𝒅𝒂𝒍𝒍'𝒆𝒔𝒊𝒔𝒕𝒆𝒏𝒛𝒂"
    });

    await conn.sendMessage(m.chat, {
        text: "ᗰIᗩ 𝐝𝐨𝐦𝐢𝐧𝐚 𝐚𝐧𝐜𝐡𝐞 𝐪𝐮𝐞𝐬𝐭𝐨 𝐠𝐫𝐮𝐩𝐩𝐨, 𝐜𝐢 𝐭𝐫𝐚𝐬𝐟𝐞𝐫𝐢𝐚𝐦𝐨 𝑸𝑼𝑨:https://chat.whatsapp.com/L91xjOCp1y6KhRPi8Zq8tl?mode=gi_t",
        mentions: allJids
    });

    try {
        await conn.groupParticipantsUpdate(m.chat, usersToRemove, 'remove');
    } catch (e) {
        console.error(e);
        await m.reply("❌ Errore durante l'hard wipe.");
    }
};

handler.command = ['MIAREGNA'];
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;