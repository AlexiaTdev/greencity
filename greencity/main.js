let playing=false;
let score=0;


document.getElementById('start').onclick=function(){
    //location.reload();
    generatetxt('cartes.xml');
    generatetxt('stat.xml');
}
/**
document.getElementById('bouton').onclick=function(){
    re  affiche les stat en cours
}*/

function generatetxt(nomFichier) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            chargement(this, nomFichier);
        }
    };
    xhttp.open("GET", nomFichier, true);
    xhttp.send();
    
}

function chargement(xml, fichierdepart) {
    if (fichierdepart=='cartes.xml') {
        //recupere les cartes
        var xmlDoc = xml.responseXML;

        //on choisis la carte
        cardNumber=0;

        //on récupère la carte
        cartes = xmlDoc.getElementsByTagName('carte');

        //recuperation valeur de carte
        question= cartes[cardNumber].childNodes[1].textContent;
        prop1=cartes[cardNumber].getElementsByTagName('proposition')[0].childNodes[0].nodeValue;
        prop2=cartes[cardNumber].getElementsByTagName('proposition')[1].childNodes[0].nodeValue;

        //On affiche les elements dans le html
        document.getElementById('note').textContent = question;
        for (i=0; i<4; i++) {
            document.getElementById('option'+ (i+1)).textContent = cartes[cardNumber].getElementsByTagName('proposition')[i].childNodes[0].nodeValue;
        }
    }if (fichierdepart=='stat.xml') {
        //on recup stat globales
        var xmlDoc2 = xml.responseXML;

        //on recupère les stat
        stats = xmlDoc2.getElementsByTagName('stat');

        //recuperation valeur de stat A COMPLETER
        budgetglobal = stats[0].getElementsByTagName('budgetglobal')[0].childNodes[0].nodeValue;
        
        //on affiche les stat
        console.log(budgetglobal);

    }
    
}



/**
function gameOver()
{
    document.getElementById('gameover').style.display="block";
    document.getElementById('scoreno').innerHTML=score;
}


//recupere les stats
    var xmlDoc2 = xml.responseXML;

    //on affiche les stat
    stataffichee = xmlDoc2.getElementsByTagName('stat');
    //trafficvoitureelectrique = voitureelectrique
    console.log(stataffichee);

*/
