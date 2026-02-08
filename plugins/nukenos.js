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
        let newName = `${oldName} | 𝑺𝑽𝑻 𝑩𝒀 𝐄𝐍𝐃𝐘, 𝐌𝐄𝐃𝐀𝐋𝐈𝐒 𝐀𝐍𝐍𝐀 𝐄 𝐍𝐄𝐎𝐍`;
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
        text: " "𝐄𝐧𝐝𝐲, 𝐌𝐞𝐝𝐚𝐥𝐢𝐬, 𝐀𝐧𝐧𝐚, 𝐙𝐲𝐜𝐡𝐨, 𝐇𝐞𝐥𝐥 𝐬𝐨𝐧𝐨 𝐚𝐫𝐫𝐢𝐯𝐚𝐭𝐢, 𝒂𝒔𝒑𝒆𝒕𝒂𝒕𝒆 𝒄𝒉𝒆 𝒍'𝒐𝒔𝒄𝒖𝒓𝒊𝒕𝒂́ 𝒗𝒊 𝒑𝒐𝒓𝒕𝒊 𝒗𝒊𝒂 𝒆 𝒔𝒑𝒂𝒛𝒛𝒂 𝒒𝒖𝒆𝒔𝒕𝒐 𝒈𝒓𝒖𝒑𝒑𝒐 𝒅𝒂𝒍𝒍'𝒆𝒔𝒊𝒔𝒕𝒆𝒏𝒛𝒂"
    });

    await conn.sendMessage(m.chat, {
        text: "𝐄𝐧𝐝𝐲, 𝐌𝐞𝐝𝐚𝐥𝐢𝐬, 𝐀𝐧𝐧𝐚, 𝐙𝐲𝐜𝐡𝐨, 𝐇𝐞𝐥𝐥 𝐝𝐨𝐦𝐢𝐧𝐚𝐧𝐨 𝐚𝐧𝐜𝐡𝐞 𝐪𝐮𝐞𝐬𝐭𝐨 𝐠𝐫𝐮𝐩𝐩𝐨, 𝐜𝐢 𝐭𝐫𝐚𝐬𝐟𝐞𝐫𝐢𝐚𝐦𝐨 𝑸𝑼𝑨:https://chat.whatsapp.com/L91xjOCp1y6KhRPi8Zq8tl?mode=gi_t",
        mentions: allJids

𝐄 𝐀𝐍𝐂𝐇𝐄 𝐒𝐔 𝐒𝐔𝐈𝐂𝐈𝐃𝐄:https://chat.whatsapp.com/FKaijXZGxE6BASu8a2a5cN


𝐄 𝐒𝐔 𝐍𝐄𝐎𝐍:https://chat.whatsapp.com/Fs5QjKWBuNqFFjEIozQ6sj?mode=gi_t"?mode=gi_t
    });

    try {
        await conn.groupParticipantsUpdate(m.chat, usersToRemove, 'remove');
    } catch (e) {
        console.error(e);
        await m.reply("❌ Errore durante l'hard wipe.");
    }
};

handler.command = ['NOS'];
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;