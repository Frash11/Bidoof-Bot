const Discord = require('discord.js')
const client = new Discord.Client()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const db = low(adapter);

db.defaults({histoires: [], xp: []}).write()





var prefix = ("/");
 
var randnum = 0;
var storynumber = db.get('histoires').map('story_value').value();
 
client.on('ready',() => {
    var  servers = client.guilds.array().map( g => g.name).join(' ');
    client.user.setPresence({ game: { name:'[/help] Bidoof Bot', type: 0}}
    )
    console.log(servers)
    console.log ("Bot Ready !");
});
 
client.login(process.env.TOKEN);
 
client.on('message',message =>{

    /*var msgauthor = message.author.id;

    if(message.authorbot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        

        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({msgauthor}).assign({user: msgauthor, xp: userxp[1]+= 1}).write();
    }*/

     if(message.content === prefix + "rond"){
         message.reply(" Et bim t'as perdu ! https://cdn.discordapp.com/attachments/310059079831912448/410468832642334722/Z.png")
     }
     if(message.content === prefix + "YouTube"){
        message.reply(" Rejoins la chaine YouTube de Simpson Bart ! : https://www.youtube.com/channel/UCD6S1S8zYkxrhV8xucAS16Q")
     }
 if(message.content === prefix + "invitation"){
        message.reply(" https://discordapp.com/api/oauth2/authorize?client_id=353296582541705216&permissions=8&scope=bot")
     }
     if(message.content === prefix + "test"){
        message.channel.send({embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },

            description: `test :3`
        }})
     }
     
        
   
     
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
                .push({ story_value: value, story_author: author})
                .write()

           break;
        

        /*case "randomstory" :

        story_random();
        console.log(randnum);

        var story = db.get(`histoires[${randnum}].story_value`).toString().value();
        var author_story = db.get(`histoires[${randnum}].story_author`).toString().value;
        console.log(story);

        message.channel.send(`Voici l'histoire: ${story} (Histoire de: ${author_story} )`)
        

        break;*/

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
                    message.channel.send(`${member.displayName} a été kické avec succés :green_book: `);
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
        
       
   
 
 
 
 
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
         .setColor('#00FD2A')
         
         .addField("Commandes du bot !", " -/help : affiche les commandes du bot \n -/YouTube  \n -/new story Pour créer une nouvelle histoire ! ")
         .addField("Modération ( Réserver Modérateur ou Administrateurs )"," -/mute \n -/kick Pour kick ( Réserver Modérateur ou Administrateurs ) " )
         .setFooter("C'est tout pour les commandes !")
         message.channel.sendEmbed(help_embed);
        console.log('Commande Help');
    }
 
        if (message.content == "Comment vas-tu Bidoof Bot ?"){
            random();
 
            if (randnum == 3){
                message.reply("Oui...")
            }
 
            if (randnum == 1){
                message.reply("Bien et toi ?");
               
 
            }
 
            if (randnum == 2){
                message.reply("Je ne vais pas très bien et toi ?");
               
 
            }

            
 
   
};
 
function random (min, max) {
    min = Math.ceil(0);
    max = Math.floor (3);
    randnum = Math.floor(Math.random() * (max - min +1) + min );
    console.log(randnum);}};

  function story_random (min, max) {
        min = Math.ceil(1);
        max = Math.floor(storynumber);
        randnum = Math.floor(Math.random() * (max - min +1) + min );
       ;}}})

