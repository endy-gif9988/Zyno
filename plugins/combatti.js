let handler = async (m, { conn, participants, args }) => {
    global.db.data.users = global.db.data.users || {}
    let user1 = m.sender
    let mentionedJid = (m.mentionedJid && m.mentionedJid[0]) || ''
    if (!mentionedJid) return m.reply('⚔️ Tagga un utente per combattere!\n\nEsempio: *.combatti @utente*')

    let user2 = mentionedJid

    let p1 = global.db.data.users[user1]?.pokemons || []
    let p2 = global.db.data.users[user2]?.pokemons || []

    if (!p1.length) return m.reply('😓 Non hai Pokemon per sfidare e combattere 💔!')
    if (!p2.length) return m.reply('😓 Il tuo avversario non ha Pokémon per combattere haha è scarso!')

    let poke1 = pickRandom(p1)
    let poke2 = pickRandom(p2)

    let power1 = poke1.level + randBetween(-10, 10)
    let power2 = poke2.level + randBetween(-10, 10)

    let winner, loser, resultText

    if (power1 > power2) {
        winner = user1
        loser = user2
        resultText = `🏆 @${user1.split('@')[0]} vince il combattimento!`
    } else if (power2 > power1) {
        winner = user2
        loser = user1
        resultText = `🏆 @${user2.split('@')[0]} vince il combattimento!`
    } else {
        resultText = `🤝 Pareggio! Entrambi i Pokémon sono esausti.`
    }

    let battleText = `
⚔️ *Combattimento Pokémon!*

👤 @${user1.split('@')[0]} ha scelto *${poke1.name}* (Lv. ${poke1.level})
👤 @${user2.split('@')[0]} ha scelto *${poke2.name}* (Lv. ${poke2.level})

${resultText}
`.trim()

    await conn.sendMessage(m.chat, { text: battleText, mentions: [user1, user2] }, { quoted: m })
}

handler.help = ['combatti @utente']
handler.tags = ['pokemon']
handler.command = /^combatti$/i

export default handler

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
