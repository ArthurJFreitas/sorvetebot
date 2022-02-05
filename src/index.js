const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core-discord');
const express = require('express');
const entradasJson = require('../entradas.json')
const fs = require('fs')

var app  = express();

client.queues = new Map();


const TOKEN = 'NDg2NjkzNTU5NjcyNzY2NDg1.W48isg.v_qh8tsHgzTOCj4aCDtgrCvTqA4';

client.on('ready', ()=> {
    console.log('Ligou');
});
// Retorna numero aleatorio de x a y
const randomNumber = (x,y) => {
    let random = Math.floor ( (Math.random() * y) + x )
    return random
}
// Recomendação do gordo
const gordoRecomendations = (msg) => {
    if(msg.content === '!gordo'){
        let gordoMsg = [
            ["VoÇê CaIu Na REcOmEndsão dU Gordo"],
            ["Dazz diamond é recomendado para o seu caso"],
            ["Use Go4Gold"],
            ["RP Pela metade do preço, pode confiar dfg.com"]
        ];
        let random = Math.floor( (Math.random() * gordoMsg.length ) )  ;
        msg.reply('Gordo recomendou: ' + gordoMsg[random] + '\:maniacodoparque:');
   }
}

const callGame = (msg) => {
    if(msg.content === '!call'){
        let gameMsg = [
            ["Badaras"],
            ["Debêde"],
            ["Truco"],
            ["Uno"],
            ["The Hunter, é um monstro"],
            ["Tem que baixar"],
            ["Sera decidio num pife"],
        ];
        let random = Math.floor( (Math.random() * gameMsg.length ) )  ;
        console.log(random);
        msg.reply('Call de: ' + gameMsg[random]);
    }
}

// Função dibs na ...
const callDibs = (msg) => {
    let txt = msg.content;
    let dibs = txt.split(" ")
    if(dibs[0] == "!dibs") {

        let enviada = 'Tem dibs ';
        for (  i = 1 ; i < dibs.length ; i++) {
            enviada += dibs[i]
            if(i !== dibs.length-1)
                enviada += " ";
        }
        enviada  += ", favor respeitar o dibs";
        msg.reply(enviada);
   }
}

// Monstro
const monster = (msg) => {
    if(msg.content === '!monstro'){
        const Monster = (Math.floor(Math.random() * 100) + 1); 
        const SuperMonster = (Math.floor(Math.random() * 1000) + 1);
        if(SuperMonster === 500) {
            msg.reply("É UM SUPER MONSTRO!");
        }
        else if ( Monster < 10) {
            msg.reply("É UM MONSTRO!");
        } else if ( Monster > 90) {
            msg.reply("Você é um merda");
        } else {
            let umBosta = [
                ["É um mero criado"],
                ["È quase um monstro"]
                ["É uma pessoa ordinária"],
                ["Não passa de um ser humano irrelevante"],
                ["É um ser comum"],
                ["Pode ser que um dia seja alguem"],
                ["Mano, desiste, você é um bosta"],
                ["Ainda esta tentando ser alguem. mas falhou"],
                ["Se joga da ponte seu bosta"],
                ["Você falhou seu verme"],
                ["Você é quase um Everton Barbim, SASAGUEIO SASAGUEIO!"]
            ]
            
            let random = Math.floor( (Math.random() * umBosta.length ) )  ;
            console.log(random);
            msg.reply(umBosta[random]);
        }
    }
}

// Bet
let player1;
let player2; 
let random1;
let random2;
const betFunctiom = (msg) => {
    if(msg.content === '!bet'){
        if(player1 === undefined) {
            random1 = randomNumber(1,100);
            player1 = msg.author.username;
            msg.channel.send(player1 + ", fez sua aposta, " + random1);
        } else if (player1 !== msg.author.username) {
            random2 = randomNumber(1,100)
            player2 = msg.author.username;
            msg.channel.send(player2 + " fez sua aposta, " + random2); 
        }
        if ( player1 !== undefined && player2 !== undefined) {
            if (random1 > random2) {
                msg.channel.send("**" + player1 + "**" + " é o vencedor, " + "**" + player2 + "**" + " sentou na pica")
            } else if(random2 > random1 ){
                msg.channel.send("**" + player2 + "**" + " é o vencedor, " + "**" + player1 + "**" +" sentou na pica")
            }
            player1 = undefined;
            player2 = undefined;
            random1 = 0;
            random2 = 0; 
    }
    }
}

// Pago o x mês 
const pago = (msg) => {
    if (msg.content === '!pago'){
        const random = randomNumber(1,5);
        msg.reply(`Paga o ${random}º Mes`);
        msg.reply(`vrau`);
    }
}


const sense = (msg) => {
    if(msg.content === "!sense"){
        msg.channel.send({
            files: ['./garcia_sense.mp4']
        });
    }
}

const matano = (msg) => {
    if(msg.content === "!tamatano") {
        const Matano = (Math.floor(Math.random() * 100) + 1); 

        if( Matano < 50 ) {
            msg.channel.send('https://cdn.boob.bot/Gifs/1872.gif');
        } else {
            msg.channel.send('https://images-ext-1.discordapp.net/external/9PDa1zi7kwx3iUe5zcPc2r9blJbSQCH837IZ1FD7Hn0/https/cdn.boob.bot/Gifs/17EC.gif');
        }
    }
}


// Escolher jogo
let gamesEscolhidos = [];
let vote = false;
let jaEscolheu = [];
const chooseTheGame = (msg) => { 
    let txt = msg.content;
    txt = txt.split(" ");
    if(msg.content === "!gp brincante") {
        // Verifica se o player ja jogou
        for ( let j = 0 ; j < jaEscolheu.length ; j++){
            if (jaEscolheu[j] === msg.author.username){
                msg.reply ("Você ja escolheu seu viadinho")
                return 0;
            }
        }
        jaEscolheu.push(msg.author.username);
        vote = true;
        msg.reply(msg.author.username + ' iniciou a call do bozo loiro, façam suas escolhas');
    } else if ( vote === true && txt[0] === '!gp' && txt[1] !== 'sorteio') {
      txt.shift();
      txt = txt.join(" ");
      msg.channel.send(msg.author.username+ " escolheu " + txt )
      gamesEscolhidos.push(txt);
    }
     if ( msg.content === "!gp sorteio" && vote) {
        vote = false;
        let random = randomNumber(0,gamesEscolhidos.length-1); 
        msg.channel.send ("A gameplay brincante da vez sera de: " + gamesEscolhidos[random])
        gamesEscolhidos = [];
     }
}

client.on('message', msg => {
    const PREFIX = '!';
    let args = msg.content.substring(PREFIX.length).split(" ");
    const entradas = JSON.parse(fs.readFileSync('./entradas.json'))


    switch (args[0]) {      
        case 'entrada':
            const url = args[1]
            const username = msg.member.user.username
            let entradaMudar = entradas.find((e) => e.nickname === username)

            if (!entradaMudar) {
                const novoObjeto = { nickname: username, entrada: url }
                const entradasConcatenadas = [...entradas, novoObjeto]

                fs.writeFileSync('./entradas.json', JSON.stringify(entradasConcatenadas))
                
                
            } else {
                entradaMudar['entrada'] = url
                fs.writeFileSync('./entradas.json', JSON.stringify(entradas))
            }
            break

        case 'toca':
            if(!msg.member.voice.channel){
                msg.reply('Você precisa estar em um canal de voz');
            }
            
            let queue = client.queues.get(msg.member.guild.id);
            
            if(!queue){
                const play = async () => {
                    const conn = await msg.member.voice.channel.join();
                    queue = {
                        volume: 10,
                        connection: conn,
                        dispacher: null,
                    }
                    client.queues.set(msg.member.guild.id, queue);
                        if (args[1] === 'mery'){
                            queue.dispacher = await queue.connection.play(await ytdl("https://www.youtube.com/watch?v=q5m7NaU6oD4"), {
                                type: 'opus',
                            });
                        }
                        if (args[1] === 'maracuja'){
                            queue.dispacher = await queue.connection.play(await ytdl("https://www.youtube.com/watch?v=pgp3U_J5yOM"), {
                                type: 'opus',
                            });
                        } else {
                            queue.dispacher = await queue.connection.play(await ytdl(args[1]), {
                                type: 'opus',
                            });
                        }

                    queue.dispacher.on("finish", () => {
                        queue.connection.disconnect();
                    });
                }
                play();
            }

            break;
        default:
            break;
    }

    
    if(msg.content.startsWith('Gordo')){
        msg.react('/:maniacodoparque:')
    }


    // Funções para mensagem
    gordoRecomendations(msg);
    monster(msg);
    callGame(msg);
    pago(msg);
    sense(msg);
    matano(msg);
    callDibs (msg);
    betFunctiom(msg)
    chooseTheGame(msg);
});


client.on('guildMemberAdd', member  => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Bem Vindo ${member}`);
});

client.login(TOKEN);

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (newMember.channelID !== "812086637093191742") return

    const play2 = async () => {
        const entradas = JSON.parse(fs.readFileSync('./entradas.json'))

        if (!entradas.find((e) => e.nickname == newMember.member.user.username)) return

        const conn = await newMember.member.voice.channel.join();
        queue = {
            volume: 10,
            connection: conn,
            dispacher: null,
        }

        client.queues.set(newMember.member.guild.id, queue);
        const username = newMember.member.user.username
        let entradaEncontrada = entradas.find((e) => e.nickname === username);

        let url;

        if (entradaEncontrada) 
            url = entradaEncontrada.entrada;

        if (url == null) return

        queue.dispacher = await queue.connection.play(await ytdl(url), 
            {
                type: 'opus',
            }
        );
        
        setTimeout(function() {
            queue.connection.disconnect();
        }, 7000);
    }
    play2();
 });



