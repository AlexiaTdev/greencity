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
var carte;
//proposition cliquée
var propositionEnCours;


document.getElementById('start').onclick=function(){
    //location.reload();
    generatetxt('stat.xml');
    generatetxt('cartes5.xml');

    

}
document.getElementById('option1').onclick=function(){
    //modifier les stats en cours
    propositionEnCours='proposition1';
    integrerStatProposition(cardNumber,propositionEnCours);
    //re  affiche les stat en cours + nouvelle question
    chargement('cartes5.xml');
    chargement('stat.xml');
}
document.getElementById('option2').onclick=function(){
    //modifier les stats en cours
    propositionEnCours='proposition2';
    integrerStatProposition(cardNumber,propositionEnCours);
    //re  affiche les stat en cours + nouvelle question
    chargement('cartes5.xml');
    chargement('stat.xml');
}
document.getElementById('option3').onclick=function(){
    //modifier les stats en cours
    propositionEnCours='proposition3';
    integrerStatProposition(cardNumber,propositionEnCours);
    //re  affiche les stat en cours + nouvelle question
    chargement('cartes5.xml');
    chargement('stat.xml');
}
document.getElementById('option4').onclick=function(){
    //modifier les stats en cours
    propositionEnCours='proposition4';
    integrerStatProposition(cardNumber,propositionEnCours);
    //re  affiche les stat en cours + nouvelle question
    generatetxt('cartes5.xml');
    generatetxt('stat.xml');
}

function Circlle(el){

    $(el).circleProgress({fill:{color:'#ff5c5c'}})
    .on('circle-animation-progress', function(event, progress, stepValue){

      $(this).find('strong').text(String(stepValue.toFixed(2)).substr(2)+'%');
     });
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
    if (fichierdepart=='cartes5.xml') {
        //console.log('xmldoc is '+xmlDoc);

        if (xmlDoc==undefined){
            //recupere les cartes en debut de partie
            xmlDoc = xml.responseXML;
        }

        //on choisis une carte parmis les cartes restantes
        cardNumber=getCardNumber(xmlDoc);
        console.log("carte choisie : "+cardNumber);

        //on récupère la carte
        cartes = xmlDoc.getElementsByTagName('carte');

        //On affiche les elements dans le html
        document.getElementById('note').textContent = cartes[cardNumber].childNodes[1].textContent;
        for (i=0; i<4; i++) {
            document.getElementById('option'+ (i+1)).textContent = cartes[cardNumber].getElementsByTagName('proposition')[i].childNodes[0].nodeValue;
        }
        //console.log(cardNumber);
        integrerStatQuestion(cardNumber);

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
        
        //AFFICHAGE MEGA STYLE*******************************************************************
        document.getElementById("header").setAttribute("datav", "nimportequoi");
        //Circlle('.round');
    }
    
}
function getCardNumber(xmlDoc){
    //console.log(xml)

    if (cartesrestantes==undefined){
        nbrCartesRestantesDebutJeu = xmlDoc.getElementsByTagName('carte').length;
        console.log("nombre de cartes au demarrage : "+ nbrCartesRestantesDebutJeu);
        cartesrestantes = new Array(nbrCartesRestantesDebutJeu);
        for (i=0; i<(nbrCartesRestantesDebutJeu+1); i++){
            cartesrestantes[i]=1;
        }
    }
    nextcardNumber= Math.floor(Math.random() * (nbrCartesRestantesDebutJeu));
    while(cartesrestantes[nextcardNumber]!=1){
        nextcardNumber= Math.floor(Math.random() * (nbrCartesRestantesDebutJeu));
    }
    cartesrestantes[nextcardNumber]=0;
    return nextcardNumber;
}
function integrerStatProposition(cardNumber, propositionEnCours){
    //on recupere le nombre de stat consignees dans la proposition cliquee
    nombreDeTotalDeStat=xmlDoc.getElementsByTagName('carte')[cardNumber].getElementsByTagName(propositionEnCours)[0].getElementsByTagName('statistique').length;
    
    for (i=0; i<nombreDeTotalDeStat; i++) {
        statencours=xmlDoc.getElementsByTagName('carte')[cardNumber].getElementsByTagName(propositionEnCours)[0].getElementsByTagName('statistique')[i].childNodes[0].nodeValue;
        valdestatencours=xmlDoc.getElementsByTagName('carte')[cardNumber].getElementsByTagName(propositionEnCours)[0].getElementsByTagName('valeur')[i].childNodes[0].nodeValue;
        //console.log("i="+i+" "+statencours+" : "+valdestatencours);
        
        //console.log(valdestatencours[0]);
        if(typeof(valdestatencours)==Boolean){
            stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue = valdestatencours;
        }if(valdestatencours[0]=="%"){
            stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue = parseInt(stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue) % parseInt(valdestatencours[1]);
        }
        else {
            console.log('stat depart de '+statencours+' : '+stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue);
            stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue = parseInt(stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue) + parseInt(valdestatencours);
            console.log('stat fin de '+statencours+' : '+stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue);
        }
    }

}
function integrerStatQuestion(cardNumber){
    statdansquestion = xmlDoc.getElementsByTagName('carte')[cardNumber].getElementsByTagName('statistiquequestion')[0];
    if (statdansquestion!= undefined){
        nombreDeTotalDeStatQuestion= xmlDoc.getElementsByTagName('carte')[cardNumber].getElementsByTagName('statistiquequestion')[0].getElementsByTagName('statistique').length;
        console.log(nombreDeTotalDeStatQuestion);

        for (i=0; i<nombreDeTotalDeStatQuestion; i++) {
            statencours=xmlDoc.getElementsByTagName('carte')[cardNumber].getElementsByTagName('statistiquequestion')[0].getElementsByTagName('statistique')[i].childNodes[0].nodeValue;
            valdestatencours=xmlDoc.getElementsByTagName('carte')[cardNumber].getElementsByTagName('statistiquequestion')[0].getElementsByTagName('valeur')[i].childNodes[0].nodeValue;
            console.log("QUESTION stat a appliquer i="+i+" "+statencours+" : "+valdestatencours);
            
            if(typeof(valdestatencours)==Boolean){
                stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue = valdestatencours;
            }if(valdestatencours[0]=="%"){
                stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue = parseInt(stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue) % parseInt(valdestatencours[1]);
            }
            else {
                console.log('stat depart de '+statencours+' : '+stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue);
                stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue = parseInt(stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue) + parseInt(valdestatencours);
                console.log('stat fin de '+statencours+' : '+stats[0].getElementsByTagName(statencours)[0].childNodes[0].nodeValue);
            }
        }

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
