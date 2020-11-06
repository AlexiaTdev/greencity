//Variables en jeu
let playing=false;
let score=0;

//XMLHttpRequest des cartes et des stats pendant le jeu
var xmlDoc;
var xmlDoc2;
var stats;
//le deck de cartes : liste d indice des questions non posee
var cartesrestantes;
var nbrCartesRestantesDebutJeu;
//le numero de la carte en cours
var cardNumber;
//carte en cours
var carte;
//proposition cliquée
var propositionEnCours;
//nombre de tour
var nombreToursJoues=0;

var texteIntroduction="Bonjour! vous etes le maire de votre ville. L'objectif est de rendre la ville plus verte <3. Pour cela, vous allez avoir une situation et plusieurs reponses vous serez proposees. Vos reponses vont influencer les statistiques de votre ville."
var textefintop="Bravo, vous etes le meilleur maire de GreenCity"
var textefinmid="Pas mal, mais vous n'avez pas beaucoup bosse... peu mieux faire!"
var textefincata="Catastrophe! mais bon on apprends en se trompant...."

//seul le div de debut saffiche
document.getElementById('container').style.display="none";
document.getElementById('textIntro').textContent= texteIntroduction;
document.getElementById('finjeu').style.display="none";


//fonctions de clic start
document.getElementById('realstart').onclick=function(){
    document.getElementById('debutjeu').style.display="none";
    document.getElementById('container').style.display="block";
    generatetxt('stat.xml');
    generatetxt('cartes5.xml');
}

document.getElementById('option1').onclick=function(){
    //modifier les stats en cours
    propositionEnCours='proposition1';
    integrerStatProposition(cardNumber,propositionEnCours);
    //re  affiche les stat en cours + nouvelle question
    generatetxt('cartes5.xml');
    generatetxt('stat.xml');
    nombreToursJoues=nombreToursJoues+1;
    findepartie(nombreToursJoues);
}
document.getElementById('option2').onclick=function(){
    //modifier les stats en cours
    propositionEnCours='proposition2';
    integrerStatProposition(cardNumber,propositionEnCours);
    //re  affiche les stat en cours + nouvelle question
    generatetxt('cartes5.xml');
    generatetxt('stat.xml');
    nombreToursJoues=nombreToursJoues+1;
    findepartie(nombreToursJoues);
}
document.getElementById('option3').onclick=function(){
    //modifier les stats en cours
    propositionEnCours='proposition3';
    integrerStatProposition(cardNumber,propositionEnCours);
    //re  affiche les stat en cours + nouvelle question
    generatetxt('cartes5.xml');
    generatetxt('stat.xml');
    nombreToursJoues=nombreToursJoues+1;
    findepartie(nombreToursJoues);
}
document.getElementById('option4').onclick=function(){
    //modifier les stats en cours
    propositionEnCours='proposition4';
    integrerStatProposition(cardNumber,propositionEnCours);
    //re  affiche les stat en cours + nouvelle question
    generatetxt('cartes5.xml');
    generatetxt('stat.xml');
    //chargement('cartes5.xml');
    //chargement('stat.xml');
    nombreToursJoues=nombreToursJoues+1;
    findepartie(nombreToursJoues);
}

function findepartie(nombreToursJoues) {
    //fontion de nbr tour
    if(nombreToursJoues>5) {
        //QUELMAIRE EST IL 
        scorefinal= (stats[0].getElementsByTagName('abeille')[0].childNodes[0].nodeValue)/100;
        if (scorefinal>80){
            document.getElementById('appreciation').textContent= textefintop;
        }if (scorefinal<10){
            document.getElementById('appreciation').textContent= textefincata;
        }else {
            document.getElementById('appreciation').textContent= textefinmid;
        }
        document.getElementById('statfinjeu').textContent= (scorefinal*100)+" %";
        //document.getElementById("statfinjeu").setAttribute("data-value", scorefinal);

        document.getElementById('container').style.display="none";
        document.getElementById('finjeu').style.display="block";
    }
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

        //////////recuperation valeur de stat A COMPLETER
        ////qui nont pas de valeur : trafficurbain, energie, ecosysteme, espacevert, population, pollution, infrastructure
        ////valeur brute
        budgetglobal = stats[0].getElementsByTagName('budgetglobal')[0].childNodes[0].nodeValue;
        ////pourcentages
        //trafic urbain
        traficglobal = (stats[0].getElementsByTagName('traficglobal')[0].childNodes[0].nodeValue) /100;
        voitureelectrique = (stats[0].getElementsByTagName('voitureelectrique')[0].childNodes[0].nodeValue)/100;
        voitureessenceoudiesel = (stats[0].getElementsByTagName('voitureessenceoudiesel')[0].childNodes[0].nodeValue)/100;
        transportencommun = (stats[0].getElementsByTagName('transportencommun')[0].childNodes[0].nodeValue)/100;
        velo = (stats[0].getElementsByTagName('velo')[0].childNodes[0].nodeValue)/100;
        pedestre = (stats[0].getElementsByTagName('pedestre')[0].childNodes[0].nodeValue)/100;
        //energie
        typesfossile = (stats[0].getElementsByTagName('typesfossile')[0].childNodes[0].nodeValue)/100;
        typerenouvelable = 1-typesfossile;
        ///équipementpopulationenrenouvelable je sais pas si on lutilise
        //ecosys
        abeille = (stats[0].getElementsByTagName('abeille')[0].childNodes[0].nodeValue)/100;
        //espacevert
        vert = (stats[0].getElementsByTagName('vert')[0].childNodes[0].nodeValue)/100;
        //population
        santeentale = (stats[0].getElementsByTagName('santeentale')[0].childNodes[0].nodeValue)/100;
        santephysique = (stats[0].getElementsByTagName('santephysique')[0].childNodes[0].nodeValue)/100;
        bienetre = (stats[0].getElementsByTagName('bienetre')[0].childNodes[0].nodeValue)/100;
        adhesionecologique = (stats[0].getElementsByTagName('adhesionecologique')[0].childNodes[0].nodeValue)/100;
        //pollution
        decheturbain = (stats[0].getElementsByTagName('decheturbain')[0].childNodes[0].nodeValue)/100;
        co2 = (stats[0].getElementsByTagName('co2')[0].childNodes[0].nodeValue)/100;
        sonore = (stats[0].getElementsByTagName('sonore')[0].childNodes[0].nodeValue)/100;
        lumineuse = (stats[0].getElementsByTagName('lumineuse')[0].childNodes[0].nodeValue)/100;
        triselectif = (stats[0].getElementsByTagName('triselectif')[0].childNodes[0].nodeValue)/100;
        //un global pour infrastructure : affichera le nom

        
        //AFFICHAGE MEGA STYLE*******************************************************************
        document.getElementById("energiefo").setAttribute("data-value", typesfossile);
        document.getElementById('budget').textContent=budgetglobal;
        document.getElementById("traficglobal").setAttribute("data-value", traficglobal);
        document.getElementById("parcs").setAttribute("data-value", vert);
        document.getElementById("pollution").setAttribute("data-value", co2);
        document.getElementById("decheturbain").setAttribute("data-value", decheturbain);
        document.getElementById("bienetre").setAttribute("data-value", santeentale);
        document.getElementById("transportencommun").setAttribute("data-value", transportencommun);
        document.getElementById("triselectif").setAttribute("data-value", triselectif);
        document.getElementById("santephysique").setAttribute("data-value", santephysique);
        document.getElementById("voitureelectrique").setAttribute("data-value", voitureelectrique);
        document.getElementById("voitureessence").setAttribute("data-value", voitureessenceoudiesel);
        document.getElementById("adhesionecologique").setAttribute("data-value", adhesionecologique);

        Circlle('.round');
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
