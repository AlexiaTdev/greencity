//Variables en jeu
let playing=false;
let score=0;

//XMLHttpRequest des cartes et des stats pendant le jeu
var xmlDoc;
var xmlDoc2;
//le deck de cartes : liste d indice des questions non posee
var cartesrestantes;
var nbrCartesRestantesDebutJeu;
//le numero de la carte en cours
var cardNumber;
//carte en cours
var carte
//lesvariables de jeu



document.getElementById('start').onclick=function(){
    //location.reload();
    generatetxt('cartes.xml');
    generatetxt('stat.xml');
}
document.getElementById('option1').onclick=function(){
    //modifier les stats en cours
    integrerStat();
    //re  affiche les stat en cours + nouvelle question
    generatetxt('cartes.xml');
    generatetxt('stat.xml');
    
}
document.getElementById('option2').onclick=function(){
    //modifier les stats en cours
    integrerStat();
    //re  affiche les stat en cours + nouvelle question
    generatetxt('cartes.xml');
    generatetxt('stat.xml');
}
document.getElementById('option3').onclick=function(){
    //modifier les stats en cours
    integrerStat();
    //re  affiche les stat en cours + nouvelle question
    generatetxt('cartes.xml');
    generatetxt('stat.xml');
}
document.getElementById('option4').onclick=function(){
    //modifier les stats en cours
    integrerStat();
    //re  affiche les stat en cours + nouvelle question
    generatetxt('cartes.xml');
    generatetxt('stat.xml');
}



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
        //prop1=cartes[cardNumber].getElementsByTagName('proposition')[0].childNodes[0].nodeValue;
        //prop2=cartes[cardNumber].getElementsByTagName('proposition')[1].childNodes[0].nodeValue;

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

function Circlle(el){

    $(el).circleProgress({fill:{color:'#ff5c5c'}})
    .on('circle-animation-progress', function(event, progress, stepValue){

      $(this).find('strong').text(String(stepValue.toFixed(2)).substr(2)+'%');
     });
}
Circlle('.round');

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
function integrerStat(){
    //on recupere le nom et la valeur de la stat
    //stats[0].getElementsByTagName('budgetglobal')[0].childNodes[0].nodeValue
    //stats[0].getElementsByTagName('budgetglobal')[0].childNodes[0].nodeValue = 9;
    //on applique la stat a xmlDoc
    console.log(xmlDoc.getElementsByTagName('carte')[cardNumber]);
    
    

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
