//Variables en jeu
let playing=false;
let score=0;

//XMLHttpRequest des cartes et des stats pendant le jeu
var xmlDoc;
var xmlDoc2;
//le deck de cartes : liste d indice des questions non posee
var cartesrestantes;
var nbrCartesRestantesDebutJeu;

//la carte en cours
var cardNumber;



document.getElementById('start').onclick=function(){
    //location.reload();
    generatetxt('cartes.xml');
    generatetxt('stat.xml');
}
console.log(document);
/**
document.getElementById('bouton').onclick=function(){
    //tire une carte du paquet de cartes restantes

    //re  affiche les stat en cours
    
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

        if (xmlDoc==undefined){
            //recupere les cartes en debut de partie
            xmlDoc = xml.responseXML;
        }

        //on choisis une carte parmis les cartes restantes
        cardnumber=getCardNumber(xml);

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
        if (xmlDoc2==undefined){
            //on recup stat globales
            xmlDoc2 = xml.responseXML;
        }

        //on recupère les stat
        stats = xmlDoc2.getElementsByTagName('stat');

        //recuperation valeur de stat A COMPLETER
        budgetglobal = stats[0].getElementsByTagName('budgetglobal')[0].childNodes[0].nodeValue;
        
        //On affiche les elements dans le html
        document.getElementById('qtn').textContent = budgetglobal;
        //AFFICHAGE MEGA STYLE

        //on affiche les stat
        console.log(budgetglobal);
    }
    
}
function getCardNumber(xml){
    
    //console.log(cartesrestantes);

    if (cartesrestantes==undefined){
        nbrCartesRestantesDebutJeu = xml.responseXML.getElementsByTagName('carte').length;
        cartesrestantes = new Array(nbrCartesRestantesDebutJeu);
        for (i=0; i<(nbrCartesRestantesDebutJeu+1); i++){
            cartesrestantes[i]=1;
        }
    }
    cardNumber= Math.floor(Math.random() * (nbrCartesRestantesDebutJeu));
    while(cartesrestantes[cardNumber]!=1){
        cardNumber= Math.floor(Math.random() * (nbrCartesRestantesDebutJeu));
    }
    cartesrestantes[cardNumber]=0;
    return cardNumber;
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
