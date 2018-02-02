window.$ = window.jQuery = require('jquery');
const fs = require('fs');

var mode = 0;
var dziala = false;
var rozwiniete;

$(document).ready(function() {
    fs.readFile('client.txt', function(err, data) {
        $("#cli").attr("value", data);
    })

})

$(".btn-open").click(function () {
    
    if (dziala == false) {
        require('electron').remote.getCurrentWindow().close();
    } else {
        require('electron').remote.getCurrentWindow().hide();
    }
})
// po wysłaniu
$(".btn-submit").click(function () {
    //tytuł
    let tytul = $("#title").val();
    //clientid
    let Clientid = $("#cli").val();
    //treść
    let trach = $("#opis").val();
    //kod dużego obrazka
    let duzyk = $("#duzy").val();
    //tekst dużego obrazka
    let duzyt = $("#duzy-txt").val();
    //kod małego obrazka
    let malyk = $("#maly").val();
    //tekst małego obrazka
    let malyt = $("#maly-txt").val();


    if ((tytul == "") || (Clientid = "") || (trach = "")) {
        $('.btn-submit').attr('value', 'Musisz wypełnić wszystko!');
        setTimeout(function () {
            $('.btn-submit').attr('value', 'Aktywuj!')
        }, 2000);
    } else {
        fs.writeFile('client.txt', $("#cli").val(), function(err){
            if (err) throw err;
        });
        const DiscordRPC = require("discord-rpc");
        const clientId = $("#cli").val();
        const trash = $("#opis").val();
        
        dziala = true;
        $(".btn-open").text('Ukryj');
        var wzor = {
            details: tytul,
            state: trash,
            instance: false,
        }

        if(duzyk != '') {
            wzor.largeImageKey = duzyk;
        }
        if(duzyt != '') {
            wzor.largeImageText = duzyt;
        }
        if(malyk != '') {
            wzor.smallImageKey = malyk;
        }
        if(malyt != '') {
            wzor.smallImageText = malyt;
        }
        const rpc = new DiscordRPC.Client({transport: 'ipc'});
        DiscordRPC.register(clientId);
        rpc.on('ready', () => {
                rpc.setActivity(wzor)
        })
        rpc.login(clientId).catch(console.error)
    }
})

$(".btn-help").click( function () {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const url = require('url');
    const path = require('path');
    let iconpath = path.join(__dirname, 'ikona.png')

    var win = new BrowserWindow({ width: 800, height: 600, resizable: false, title: 'Pomoc i poradnik', icon: iconpath });
    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'help.html'),
        protocol: 'file:',
        slashes: true
    }))
    win.setMenu(null);
    win.setTitle('Pomoc i poradnik');
})
$(".btn-info").click( function() {
    const remote = require('electron').remote
    const BrowserWindow = remote.BrowserWindow;
    const url = require('url');
    const path = require('path');
    let iconpath = path.join(__dirname, 'ikona.png')

    var win = new BrowserWindow({ width: 300, height: 174, frame: false, resizable: false, icon: iconpath });
    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'info.html'),
        protocol: 'file:',
        slashes: true
    }))

})
$(".btn-rozwin").click(function() {
    $(".obrazki").slideToggle();
    if(rozwiniete) {
        $(".btn-rozwin").text('Rozwiń obrazki');
        rozwiniete = false;
    } else {
        $(".btn-rozwin").text('Zwiń obrazki');
        rozwiniete = true;
    }
})