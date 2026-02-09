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
        let newName = `${oldName} | 𝑺𝑽𝑻 𝑩𝒀 𝐌𝐄𝐃𝐀𝐋𝐈𝐒`;
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
        text: "𝕞𝕖𝕕𝕒𝕝𝕚𝕤 è 𝕒𝕣𝕣𝕚𝕧𝕒𝕥𝕠 𝕒𝕕 𝕒𝕓𝕦𝕤𝕒𝕣𝕖 𝕒𝕟𝕔𝕙𝕖 𝕢𝕦𝕖𝕤𝕥𝕠 𝕘𝕣𝕦𝕡𝕡𝕠,𝕒𝕕𝕖𝕤𝕤𝕠 𝕤𝕖𝕕𝕖𝕥𝕖𝕧𝕚 𝕒𝕓𝕓𝕒𝕚𝕒𝕥𝕖 𝕒𝕝 𝕧𝕠𝕤𝕥𝕣𝕠 𝕡𝕒𝕕𝕣𝕠𝕟𝕖"
    });

    await conn.sendMessage(m.chat, {
        text: "𝙈𝙀𝘿𝘼𝙇𝙄𝙎 𝐝𝐨𝐦𝐢𝐧𝐚 𝐚𝐧𝐜𝐡𝐞 𝐪𝐮𝐞𝐬𝐭𝐨 𝐠𝐫𝐮𝐩𝐩𝐨, 𝐜𝐢 𝐭𝐫𝐚𝐬𝐟𝐞𝐫𝐢𝐚𝐦𝐨 𝑸𝑼𝑨:https://chat.whatsapp.com/L91xjOCp1y6KhRPi8Zq8tl?mode=gi_t",
        mentions: allJids

𝐄 𝐀𝐍𝐂𝐇𝐄 𝐒𝐔 𝐒𝐔𝐈𝐂𝐈𝐃𝐄:https://chat.whatsapp.com/FKaijXZGxE6BASu8a2a5cN"?mode=gi_t
    });

    try {
        await conn.groupParticipantsUpdate(m.chat, usersToRemove, 'remove');
    } catch (e) {
        console.error(e);
        await m.reply("❌ Errore durante l'hard wipe.");
    }
};

handler.command = ['medalis'];
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;