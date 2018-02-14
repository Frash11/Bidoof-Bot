



const Discord = require('discord.js')
const client = new Discord.Client()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const db = low(adapter);
const boutiqueadapter = new FileSync('boutique.json');
const boutiquedb = low(boutiqueadapter);
const setadapter = new FileSync("set.json")
const setdb = low(setadapter)

var dispatcher;





var prefix = ("/");

var randnum = 1;

var storynumber = db.get('histoires').map('story_value').value();

 
var randnum = 0;

db.defaults({ histoires: [], xp: [], inventaire: []})
    .write()

 setdb.defaults({setWelcome: []})
      .write()



function sendError(message, description) {
    message.channel.send({embed: {
       color: 15158332,
       description: ':x: ' + description

    }});
}
 
client.on('ready',() => {
    var  servers = client.guilds.array().map( g => g.name).join(' ');
    client.user.setPresence({ game: { name:'[/help] Bidoof Bot', type: 0}}
    )
    console.log(servers)
    console.log ("Bot Ready !");
});
 
client.login(process.env.TOKEN);

client.on('guildMemberAdd', member => {
    member.guild.channels.find('name', 'bienvenu_bye').send(`:green_book: Bonjour, **${member.user.username}** bienvenu sur ce server je t'invite à allez voir le #regle et le #accueil  pour ne pas être perdu, bref passe un bon moment sur le serveur en notre compagnie :wink: !`)


})
 
client.on("guildMemberRemove", member =>{
    member.guild.channels.find('name', 'bienvenu_bye').send(`:x: **${member.user.username}** a quitté le serveur, reviens vite... :cry:`)
})
    

client.on('message', message => {
                             if(message.content[0] === prefix ) {
                                 let splitMessage = message.content.split(" ");
                                 if(splitMessage[0] === '/play') {
                                      if(splitMessage.length === 2)
                                       {
                                         if(message.member.voiceChannel)
                                       {                       
                                         message.member.voiceChannel.join().then(connection => {
                                            dispatcher = connection.playArbitraryInput(splitMessage[1]);

                                            dispatcher.on('error', e => {
                                                console.log(e);
                                            });

                                            dispatcher.on('end', e => {
                                                dispatcher = undefined;
                                                console.log('Fin du son !');
                                            });

                                            }).catch(console.log);

                                        }
                                         else
                                         sendError(message, 'Erreur, vous devez vous connectez à a salon vocal !');
                                    }
                                    else
                                    sendError(message, 'Erreur, vous avez mal tapé la commande !  !');
                                }
                                else if(splitMessage[0] === '/stop'){
                                    if( dispatcher !== undefined )
                                       dispatcher.pause();
                                }
                                else if(splitMessage[0] === '/resume'){
                                    if( dispatcher !== undefined )
                                       dispatcher.resume();
                                }
                                     }

                                  
                                

    
    if(message.content === prefix + "YouTube"){
        message.channel.send(" Rejoins la chaine YouTube de Simpson Bart ! : https://www.youtube.com/channel/UCD6S1S8zYkxrhV8xucAS16Q")
        
     }
     
     if(message.content === prefix + "invitation"){
        message.channel.send(" Lien pour m'inviter sur votre server : https://bot.discord.io/bidoofbot ")
   

     }
     if(message.content === prefix + "myserver"){
        message.channel.send(" Lien de mon server, ici vous pourrez être a l'actu sur moi !  : https://discord.gg/VVEXymP  ")
   

     }
     	

    if (message.content === prefix + "help"){
        message.reply('Les commandes ont été envoyée en message privé, veuillez lire vos messages privés !')
        
        message.author.send({embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: `Voici mes commandes !`,

           
            fields: [{
                    name: 'Les commandes :',
                    value: `-/help : affiche les commandes du bot
-/YouTube  
-/new story Pour créer une nouvelle histoire !
-/invitation Lien pour m'inviter sur votre server !
-/myserver Pour rejoindre mon server et savoir toute l'actualité sur moi !`,
                     
                   
                    },
                {
                    name: 'Modération ( **Réserver Modérateur ou Administrateurs** ):',
                     value: `-/mute Pour mute une personne.
-/kick Pour kick une personne.
-/ban Pour bannir une personne.`
                  
                },
            {
            
                    name: 'Indisponible car co pourrie ! :',
                    value: `-/play Pour jouer une musique YouTube !
-/stop Pour stoper la musique !
-/resume pour relancer la musique ! `
                

            }],
                timestamp: new Date(),
        footer: {

           icon_url: client.user.avatarURL,
           text : 'Créer par Simpson Bart !',
        }

       

         
        
    }
});
    }

    
        //client.setTimeout(delay: 60000,)
    


    

    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()){
            case "newstory":
            var value = message.content.substr(10);
            var author = message.author.toString();
            var number = db.get('histoires').map('id').value();

            console.log(value);
            message.reply("Vous avez créer une nouvelle histoire !")
            

            db.get('histoires')
                .write({ story_value: value, story_author: author})
                //.write()

           break;

           case "kick":

        if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
            message.reply("Tu n'as pas accés a cette commande, il te faut les permissions nécessaires")
        }else{
            var memberkick = message.mentions.users.first();
            console.log(memberkick)
            console.log(message.guild.member(memberkick).kickable)
            if(!memberkick){
                message.reply("Cet utilisateur n'éxiste pas !");
             }else{
                if(!message.guild.member(memberkick).kickable){
                    message.reply(":x: Impossible de kick cet utilisateur !");
                }else{
                    message.guild.member(memberkick).kick().then((member) => {
                    message.channel.send(`${member.displayName} a été banni avec succés :green_book: `);
                }).catch(() => {
                    message.channel.send(":x: Le kick est innaccessible !")
                })
            }
        }
        }
        break;

        case "ban":

        if (!message.channel.permissionsFor(message.author).hasPermission("BAN_MEMBERS")){
            message.reply("Tu n'as pas accés a cette commande, il te faut les permissions nécessaires")
        }else{
            var memberban = message.mentions.users.first();
            console.log(memberban)
            console.log(message.guild.member(memberban).ban)
            if(!memberban){
                message.reply("Cet utilisateur n'existe pas ! ");
             }else{
                if(!message.guild.member(memberban).ban){
                    message.reply(":x: Impossible de bannir cet utilisateur");
                }else{
                    message.guild.member(memberban).ban().then((member) => {
                    message.channel.send(`${member.displayName} a été banni avec succés :green_book: `);
                }).catch(() => {
                    message.channel.send("Ban impossible !")
                })
            }
        
        break;
        }
            
        }

        case "setWelcome":

        
        
        var servername = client.guild.name();
        var serverid = client.guild.id();

        console.log(serverid)

        setdb.get('setWelcome')
              .push({ server_name: servername, server_id: serverid})
              .write()

         break;


    } 

});
 
function random (min, max) {
  min = Math.ceil(0);
 max = Math.floor (3);
randnum = Math.floor(Math.random() * (max - min +1) + min );
console.log(randnum);}
            

