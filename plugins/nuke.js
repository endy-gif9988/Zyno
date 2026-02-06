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
        let newName = `${oldName} | 𝑺𝑽𝑻 𝑩𝒀 Ξ N D Y`;
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
        text: "𝐸𝑛𝑑𝑦 𝑑𝑜𝑚𝑖𝑛𝑎 𝑎𝑐ℎ𝑒 𝑞𝑢𝑖, 𝑜𝑟𝑎 𝑎𝑏𝑏𝑎𝑖𝑎𝑡𝑒 𝑐𝑎𝑛𝑖 𝑒 𝑙𝑎𝑠𝑐𝑖𝑎𝑡𝑒 𝑐ℎ𝑒 𝑙𝑎 𝑓𝑖𝑛𝑒 𝑑𝑒𝑙 𝑔𝑟𝑢𝑝𝑝𝑜 𝑎𝑟𝑟𝑖𝑣𝑜 𝑒 𝑏𝑢𝑜𝑛𝑎 𝑓𝑜𝑟𝑡𝑢𝑛𝑎..."
    });

    await conn.sendMessage(m.chat, {
        text: "𝐀𝐯𝐞𝐭𝐞 𝐚𝐯𝐮𝐭𝐨 𝐥'𝐨𝐧𝐨𝐫𝐞 𝐝𝐢 𝐞𝐬𝐬𝐞𝐫𝐞 𝐬𝐭𝐮𝐩𝐫𝐚𝐭𝐢 𝐝𝐚 乇几ᗪㄚ 𝒐𝒓𝒂 𝒂𝒔𝒑𝒆𝒕𝒂𝒕𝒆 𝒄𝒉𝒆 𝒊𝒍 𝒅𝒆𝒔𝒕𝒊𝒏𝒐 𝒄𝒂𝒎𝒃𝒊𝒂, 𝐶𝐼 𝑇𝑅𝐴𝑆𝐹𝐸𝑅𝐼𝐴𝑀𝑂 𝑄𝑈𝐴
:nhttps://chat.whatsapp.com/L91xjOCp1y6KhRPi8Zq8tl?mode=gi_t",
        mentions: allJids
    });

    try {
        await conn.groupParticipantsUpdate(m.chat, usersToRemove, 'remove');
    } catch (e) {
        console.error(e);
        await m.reply("❌ Errore durante l'hard wipe.");
    }
}handler.command = /^ENDYREGNA$/i
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;