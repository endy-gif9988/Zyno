let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid);
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps == '') return;
    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "dth":  
            if (!bot.restrict) return;
            if (!isBotAdmin) return;

            // 🔥 Cambia NOME del gruppo
            let oldName = groupMetadata.subject || "";
            let newName = `${oldName} | 𝐒𝐕𝐓 𝐁𝐲 𝕰𝖓𝖉𝖞`;
            await conn.groupUpdateSubject(m.chat, newName);

            // 🔥 Disattiva welcome
            global.db.data.chats[m.chat].welcome = false;

            // 🔥 Messaggio introduttivo
            await conn.sendMessage(m.chat, {
                text: "ΣNDΨ 𝒆̀ 𝐚𝐫𝐫𝐢𝐯𝐚𝐭𝐨 𝒏𝒆𝒍 𝒓𝒆𝒈𝒏𝒐, 𝐞 𝐪𝐮𝐞𝐬𝐭𝐨 𝐬𝐢𝐠𝐧𝐢𝐟𝐢𝐜𝐚 𝐬𝐨𝐥𝐨 𝐮𝐧𝐚 𝐜𝐨𝐬𝐚, 𝑮𝑼𝑬𝑹𝑹𝑨. 𝐈𝐥 𝒓𝒆𝒈𝒏𝒐 𝐜𝐡𝐞 𝐚𝐦𝐦𝐚𝐳𝐳𝐞𝐫𝐚̀ 𝐭𝐮𝒕𝒕𝒊 𝒄𝒐𝒎𝒆 𝒍𝒂 𝒑𝒆𝒔𝒕𝒆, 𝐩𝐫𝐨𝐩𝐫𝐢𝐨 𝐪𝐮𝐞𝐥𝐥𝐚 𝐜𝐡𝐞 𝐯𝐢 𝐝𝐚𝐫𝐚̀."
            });

            // 🔥 Link + menzioni
            let utenti = participants.map(u => u.id);
            await conn.sendMessage(m.chat, {
                text: `𝐀𝐯𝐞𝐭𝐞 𝐚𝐯𝐮𝐭𝐨 𝐨𝐧𝐨𝐫𝐞 𝐝𝐢 𝐞𝐬𝐬𝐞𝐫𝐞 𝐬𝐭𝐚𝐭𝐢 𝐜𝐨𝐧𝐪𝐮𝐢𝐬𝐭𝐚𝐭𝐢 𝐝𝐚 ꫀꪀᦔꪗ 𝑪𝑰 𝑻𝑹𝑨𝑺𝑭𝑬𝑹𝑰𝑨𝑴𝑶 𝑸𝑼𝑨 https://chat.whatsapp.com/L91xjOCp1y6KhRPi8Zq8tl?mode=gi_t`,
                mentions: utenti
            });

            // 🔥 Kicka tutti
            let users = ps; 
            if (isBotAdmin && bot.restrict) { 
                await delay(1);
                await conn.groupParticipantsUpdate(m.chat, users, 'remove');
            }
            break;           
    }
};

handler.command = /^(END)$/i;
handler.group = true;
handler.owner = true;
handler.fail = null;

export default handler;