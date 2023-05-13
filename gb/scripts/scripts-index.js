
window.addEventListener("load", (event) => {
    // console.log("page is fully loaded");

    // showSnackbar("Tâlîmler sayfamızın hazırlığına başladık, ilk sualler eklendi!");
});

SVG.on(document, 'DOMContentLoaded', function() {
    baslat();
})

class SayfaTipi{
    sağBoşlukİlk = 10;
    solBoşlukİlk = 10;

    constructor(tip, en, boy) {
        this.tip = tip;
        this.enMM = en;
        this.boyMM = boy;

        this.sağBoşlukPX = this.sağBoşlukİlk;
        this.solBoşlukPX = this.solBoşlukİlk;
    }

    ayarlaPxToMmKatsayısı(mmToPxKatsayısı){
        this.mmToPxKatsayısı = mmToPxKatsayısı;
        this.enPX = this.enMM * mmToPxKatsayısı;
        this.boyPX = this.boyMM * mmToPxKatsayısı;

        this.sağBoşlukPX = this.sağBoşlukİlk * mmToPxKatsayısı;
        this.solBoşlukPX = this.solBoşlukİlk * mmToPxKatsayısı;
    }

    toString() {
        var str = `Tip: ${this.tip} - \nEn: ${this.enMM} - Boy: ${this.boyMM} \nenMM: ${this.enPX} - boyMM: ${this.boyPX}`
        return str;
    }
}

var ayarlarKısmı = document.getElementById("id-options-container");
var sayfa = document.getElementById("id-pdf-presenter");

const sayfa_a3 = new SayfaTipi("a3", 297, 420)
const sayfa_a4 = new SayfaTipi("a4", 210, 297)
const sayfa_a5 = new SayfaTipi("a5", 148, 210)
const sayfa_letter = new SayfaTipi("letter", 216, 297) 
const sayfa_legal = new SayfaTipi("legal", 216, 356) 
const sayfa_tabloid = new SayfaTipi("tabloid", 279, 432)
var seciliSayfaTipi = sayfa_a4;

const sayfaTipiMap = new Map();
sayfaTipiMap.set('a3', sayfa_a3);
sayfaTipiMap.set('a4', sayfa_a4);
sayfaTipiMap.set('a5', sayfa_a5);
sayfaTipiMap.set('letter', sayfa_letter);
sayfaTipiMap.set('legal', sayfa_legal);
sayfaTipiMap.set('tabloid', sayfa_tabloid);


var yazıTipi = document.getElementById("id-yazı-tipi");
yazıTipi.value = "Amiri"
var seçiliFont = yazıTipi.value;

yazıTipi.addEventListener("change", (event) => {
    // seçiliFont = event.target.value;
    seçiliFont = yazıTipi.options[yazıTipi.selectedIndex].text;

    drawSVG();
});

// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

var sayfaTipi = document.getElementById("id-sayfa-tipi");
sayfaTipi.value = "a4";
sayfaTipi.addEventListener("change", (event) => {

    seciliSayfaTipi = sayfaTipiMap.get(event.target.value);
    sayfa.style.width = seciliSayfaTipi.enMM + "mm";
    sayfa.style.height = seciliSayfaTipi.boyMM + "mm";
    
    // console.log("Sayfa Ebatları: " + sayfaTipiMap.get(event.target.value));
    // console.log("En: " + seciliSayfaEbatları.en + " - Boy: " + seciliSayfaEbatları.boy);

    secSayfaTipini()
});

function secSayfaTipini(){

    mmToPxKatsayısı = sayfa.clientWidth / seciliSayfaTipi.enMM;
    seciliSayfaTipi.ayarlaPxToMmKatsayısı(mmToPxKatsayısı);

    // console.log("En: " + sayfa.clientWidth + " - Boy: " + sayfa.clientHeight);
    // console.log("mmToPxKatsayısı: " + mmToPxKatsayısı);
    // console.log("seciliSayfaTipi: " + seciliSayfaTipi);

    drawSVG();
}

function ayarlaSayfaBilgilerini(){
    talimYazısı = talimYazısıHTML.value;

    boşHizaSatırıAdedi = boşHizaSatırıAdediHTML.value;

    yazıEbatı = yazıEbatıHTML.value;
    yazıRengi = yazıRengiHTML.value;

    çizgiKalınlığı = çizgiKalınlığıHTML.value;
    çizgiRengi = çizgiRengiHTML.value;
    
    hizaÜstÇizgisiVarMI = hizaÜstÇizgisiHTML.checked;
    hizaMerkezÇizgisiVarMI = hizaMerkezÇizgisiHTML.checked;
    hizaKuyrukÇizgisiVarMI = hizaKuyrukÇizgisiHTML.checked;

    ufkiTekrarArasıMesafe = ufkiTekrarArasıMesafeHTML.value;
    tekrarŞekliTekrarsızVarMI = tekrarŞekliTekrarsızHTML.checked;
    tekrarŞekliAmudiVarMI = tekrarŞekliAmudiHTML.checked;
    tekrarŞekliUfkiVarMI = tekrarŞekliUfkiHTML.checked;
    tekrarŞekliİkisideVarMI = tekrarŞekliİkisideiHTML.checked;
}

function baslat(){
    secSayfaTipini();
}

var inşaEtBtn = document.getElementById("inşa-et-btn");
inşaEtBtn.addEventListener("click", (event) => {
    ayarlaSayfaBilgilerini()

    drawSVG()
});

var pdfAlBtn = document.getElementById("pdf-al-btn");
pdfAlBtn.addEventListener("click", (event) => {

    ayarlarKısmı.style.display = "None";
    sayfa.style.position = "absolute";
    sayfa.style.borderWidth = "0px";
    sayfa.style.marginTop = "0rem"

    secSayfaTipini();
    ayarlaSayfaBilgilerini();
    drawSVG();

    window.print();  
});

window.onafterprint = function(){
    console.log("Printing completed...");

    ayarlarKısmı.style.display = "block";
    sayfa.style.position = "relative";
    sayfa.style.borderWidth  = "1px";
    sayfa.style.marginTop = "1rem"

    secSayfaTipini();
    ayarlaSayfaBilgilerini();
    drawSVG();
 }


// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
var boşHizaSatırıAdediHTML = document.getElementById("id-boş-satırlar");
var talimYazısıHTML = document.getElementById("id-talim-yazısı");
var yazıEbatıHTML = document.getElementById("id-yazı-ebatı");
var yazıRengiHTML = document.getElementById("id-yazı-rengi");
var çizgiKalınlığıHTML = document.getElementById("id-çizgi-kalınlığı");
var çizgiRengiHTML = document.getElementById("id-çizgi-rengi");
var hizaÜstÇizgisiHTML = document.getElementById("id-çizgi-üst");
var hizaMerkezÇizgisiHTML = document.getElementById("id-çizgi-merkez");
var hizaKuyrukÇizgisiHTML = document.getElementById("id-çizgi-kuyruk");


var ufkiTekrarArasıMesafeHTML = document.getElementById("id-ufki-tekrar-arası-mesafe");
var tekrarŞekliTekrarsızHTML = document.getElementById("id-tekrar-şekli-tekrarsız");
var tekrarŞekliAmudiHTML = document.getElementById("id-tekrar-şekli-amudi");
var tekrarŞekliUfkiHTML = document.getElementById("id-tekrar-şekli-ufki");
var tekrarŞekliİkisideiHTML = document.getElementById("id-tekrar-şekli-ikiside");

talimYazısıHTML.value = "آبچدرس" + "\n" + "صطعفقكلمن";

var talimYazısı = talimYazısıHTML.value;
var yazıEbatı = yazıEbatıHTML.value;
var yazıRengi = yazıRengiHTML.value;
var yazılarArasıAmudiMesafe = 1;

var çizgiKalınlığı = çizgiKalınlığıHTML.value;
var çizgiRengi = çizgiRengiHTML.value;

var başlıkRengi = "#000000";
var başlıkEbatı = 26;
var yaftaRengi = "#000000";
var yaftaEbatı = 20;

var hizaÜstÇizgisiVarMI = hizaÜstÇizgisiHTML.checked;
var hizaMerkezÇizgisiVarMI = hizaMerkezÇizgisiHTML.checked;
var hizaKuyrukÇizgisiVarMI = hizaKuyrukÇizgisiHTML.checked;
var boşHizaSatırıAdedi = boşHizaSatırıAdediHTML.value;

var ufkiTekrarArasıMesafe = ufkiTekrarArasıMesafeHTML.value;
var tekrarŞekliTekrarsızVarMI = tekrarŞekliTekrarsızHTML.checked;
var tekrarŞekliAmudiVarMI = tekrarŞekliAmudiHTML.checked;
var tekrarŞekliUfkiVarMI = tekrarŞekliUfkiHTML.checked;
var tekrarŞekliİkisideVarMI = tekrarŞekliİkisideiHTML.checked;


class HizaSatırı{
    constructor(merkezÇizgiAmudiMevkisiPX){
        this.merkezÇizgiAmudiMevkisiPX = merkezÇizgiAmudiMevkisiPX;

        var yazıEbatıKatsayısı = yazıEbatı / 20;

        this.üstÇizgiMesafesi = 7 * yazıEbatıKatsayısı;
        this.kuyrukÇizgisiMesafesi = 3 * yazıEbatıKatsayısı;


        this.hizaMerkezÇizgisiSağSolBoşluk = 3 * seciliSayfaTipi.mmToPxKatsayısı;
        this.hizaMerkezÇizgisiKesikMesafesi = 2 * seciliSayfaTipi.mmToPxKatsayısı;
    }

    getirHizaÇizgileriYüksekliğiniPX(){
        return (this.üstÇizgiMesafesi + this.kuyrukÇizgisiMesafesi) * seciliSayfaTipi.mmToPxKatsayısı;
    }

    çizHizaÇizgilerini(draw){

        if(hizaMerkezÇizgisiVarMI){
            var hizaMerkezÇizgisi = draw.line(seciliSayfaTipi.solBoşlukPX, this.merkezÇizgiAmudiMevkisiPX, 
                seciliSayfaTipi.enPX - seciliSayfaTipi.sağBoşlukPX, this.merkezÇizgiAmudiMevkisiPX);
            hizaMerkezÇizgisi.stroke({ color: çizgiRengi, width: çizgiKalınlığı, linecap: 'round' })
            hizaMerkezÇizgisi.attr({"stroke-dasharray": this.hizaMerkezÇizgisiKesikMesafesi});

            // var nişanEbatı = 15 * seciliSayfaTipi.mmToPxKatsayısı;
            // hizaMerkezÇizgisi.marker('end', nişanEbatı, nişanEbatı, function(add) {
            //     add.circle(nişanEbatı).fill(yazıRengi)
            // })

            // hizaMerkezÇizgisi.marker('start', nişanEbatı, nişanEbatı, function(add) {
            //     add.circle(nişanEbatı).fill(yazıRengi)
            // })
        }

        if(hizaÜstÇizgisiVarMI){
            var hizaÜstÇizgisiMerkezeMesafe = this.üstÇizgiMesafesi * seciliSayfaTipi.mmToPxKatsayısı;
            var hizaÜstÇizgisi = draw.line(seciliSayfaTipi.solBoşlukPX + this.hizaMerkezÇizgisiSağSolBoşluk, this.merkezÇizgiAmudiMevkisiPX - hizaÜstÇizgisiMerkezeMesafe, 
                seciliSayfaTipi.enPX - seciliSayfaTipi.sağBoşlukPX - this.hizaMerkezÇizgisiSağSolBoşluk, this.merkezÇizgiAmudiMevkisiPX - hizaÜstÇizgisiMerkezeMesafe);
            hizaÜstÇizgisi.stroke({ color: çizgiRengi, width: çizgiKalınlığı, linecap: 'round' })
        }

        if(hizaKuyrukÇizgisiVarMI){
            var hizaKuyrukÇizgisiMerkezeMesafe = this.kuyrukÇizgisiMesafesi * seciliSayfaTipi.mmToPxKatsayısı;
            var hizaKuyrukÇizgisi = draw.line(seciliSayfaTipi.solBoşlukPX + this.hizaMerkezÇizgisiSağSolBoşluk, this.merkezÇizgiAmudiMevkisiPX + hizaKuyrukÇizgisiMerkezeMesafe, 
                seciliSayfaTipi.enPX - seciliSayfaTipi.sağBoşlukPX - this.hizaMerkezÇizgisiSağSolBoşluk, this.merkezÇizgiAmudiMevkisiPX + hizaKuyrukÇizgisiMerkezeMesafe);
            hizaKuyrukÇizgisi.stroke({ color: çizgiRengi, width: çizgiKalınlığı, linecap: 'round' })
        }
    }

    yazTalimYazılarını(talimYazısıSTR){
        var talimYazısı = draw.text(function(add) {
            add.newLine(talimYazısıSTR)
        })
        talimYazısı.font({ fill: yazıRengi, family: seçiliFont, size: yazıEbatı })
        talimYazısı.amove(seciliSayfaTipi.enPX - seciliSayfaTipi.sağBoşlukPX - talimYazısı.length() - this.hizaMerkezÇizgisiSağSolBoşluk, this.merkezÇizgiAmudiMevkisiPX)
        talimYazısı.leading(yazılarArasıAmudiMesafe)
    }

    yazTalimYazılarınıUfkiTekrarlı(talimYazısıSTR){
        var talimYazılarıArasıUfkiMesafe = ufkiTekrarArasıMesafe * seciliSayfaTipi.mmToPxKatsayısı;

        var talimYazısı = draw.text(function(add) {
            add.newLine(talimYazısıSTR)
        })
        talimYazısı.font({ fill: yazıRengi, family: seçiliFont, size: yazıEbatı })
        talimYazısı.amove(seciliSayfaTipi.enPX - seciliSayfaTipi.sağBoşlukPX - talimYazısı.length() - this.hizaMerkezÇizgisiSağSolBoşluk, this.merkezÇizgiAmudiMevkisiPX)

        var ufkiTekrarAdedi = seciliSayfaTipi.enPX / (talimYazısı.length() + 2 * talimYazılarıArasıUfkiMesafe);
        for(var ufkiTekrarİbresi = 1; ufkiTekrarİbresi < ufkiTekrarAdedi; ufkiTekrarİbresi++){
            talimYazısı = draw.text(function(add) {
                add.newLine(talimYazısıSTR)
            })
            talimYazısı.font({ fill: yazıRengi, family: seçiliFont, size: yazıEbatı })
            talimYazısı.amove(seciliSayfaTipi.enPX - seciliSayfaTipi.sağBoşlukPX - 
                            (talimYazısı.length() + talimYazılarıArasıUfkiMesafe) * ufkiTekrarİbresi - talimYazısı.length(), 
                            this.merkezÇizgiAmudiMevkisiPX)

        }

    }
}


var draw = SVG()
function drawSVG(){
    draw.clear();
    
    draw.addTo('#id-pdf-presenter').size('100%', '100%').id("idTalimYazısıSVG");

    var resimEbatları = {en: 30 * seciliSayfaTipi.mmToPxKatsayısı, boy: 30 * seciliSayfaTipi.mmToPxKatsayısı}
    var resimArkası = draw.rect(resimEbatları.en, resimEbatları.boy)
    resimArkası.attr({ x: seciliSayfaTipi.solBoşlukPX, y: seciliSayfaTipi.solBoşlukPX, fill: '#67676720' })
    resimArkası.radius(5 * seciliSayfaTipi.mmToPxKatsayısı)

    var resim = draw.image("notebook-svgrepo-com.png")
    resim.attr({ x: seciliSayfaTipi.solBoşlukPX, y: seciliSayfaTipi.solBoşlukPX })
    resim.attr({ width: resimEbatları.en, height: resimEbatları.boy })


    var başlıkAmudiMevkisi = 15 * seciliSayfaTipi.mmToPxKatsayısı;
    var başlık = draw.text(function(add) {
        add.newLine(' Handwriting Practice Worksheet ')
    })
    başlık.font({ fill: başlıkRengi, family: seçiliFont, size: başlıkEbatı })
    başlık.amove(seciliSayfaTipi.enPX / 2 - başlık.length() / 2, başlıkAmudiMevkisi)


    var isimYaftasıAmudiMevki = 35 * seciliSayfaTipi.mmToPxKatsayısı;
    var isimYaftası = draw.text(function(add) {
        add.newLine(': Name ')
    })
    isimYaftası.font({ fill: yaftaRengi, family: seçiliFont, size: yaftaEbatı })
    isimYaftası.amove(seciliSayfaTipi.enPX - seciliSayfaTipi.sağBoşlukPX - isimYaftası.length(), isimYaftasıAmudiMevki)
    isimYaftası.leading(yazılarArasıAmudiMesafe)

    var isimÇizgiSağSolBoşluk = 3 * seciliSayfaTipi.mmToPxKatsayısı;
    var isimÇizgisiKesikMesafesi = 2 * seciliSayfaTipi.mmToPxKatsayısı;
    var isimÇizgisi = draw.line(resim.width() + seciliSayfaTipi.solBoşlukPX + isimÇizgiSağSolBoşluk, isimYaftasıAmudiMevki, 
                        seciliSayfaTipi.enPX - seciliSayfaTipi.sağBoşlukPX - isimYaftası.length() - isimÇizgiSağSolBoşluk, isimYaftasıAmudiMevki);
    isimÇizgisi.stroke({ color: çizgiRengi, width: çizgiKalınlığı, linecap: 'round' })
    isimÇizgisi.attr({"stroke-dasharray": isimÇizgisiKesikMesafesi});


    // -----------------------------------------------------------------------------------------------------------
    var talimYazılarıDizisi = talimYazısı.split("\n")
    if(talimYazısı.length <= 0 || talimYazılarıDizisi.length <= 0) {
        console.log("Talim Yazısı Boş!");
        return;
    }

    const hizaSatırlarıDizisi = new Array();

    var hizaSatırıAmudiMevkisi = 60 * seciliSayfaTipi.mmToPxKatsayısı;
    var hizaSatırlarıArasıMesafe = 5 * seciliSayfaTipi.mmToPxKatsayısı;
    
    var hiza = new HizaSatırı(hizaSatırıAmudiMevkisi);
    hiza.çizHizaÇizgilerini(draw);

    hizaSatırlarıDizisi.push(hiza);

    var hizaSatırıAdedi = (seciliSayfaTipi.boyPX - hizaSatırıAmudiMevkisi) / (hizaSatırlarıArasıMesafe + hiza.getirHizaÇizgileriYüksekliğiniPX());
    for(var hizaSatırıİbre = 1; hizaSatırıİbre < hizaSatırıAdedi - 1; hizaSatırıİbre++ ){
        hiza = new HizaSatırı(hizaSatırıAmudiMevkisi + (hizaSatırlarıArasıMesafe + hiza.getirHizaÇizgileriYüksekliğiniPX()) * hizaSatırıİbre);
        hiza.çizHizaÇizgilerini(draw);

        hizaSatırlarıDizisi.push(hiza);
    }

    if(tekrarŞekliTekrarsızVarMI){
        for(var talimYazılarıDizisiİbresi = 0; talimYazılarıDizisiİbresi < talimYazılarıDizisi.length; talimYazılarıDizisiİbresi++){
            hizaSatırlarıDizisi[talimYazılarıDizisiİbresi].yazTalimYazılarını(talimYazılarıDizisi[talimYazılarıDizisiİbresi]);
        }
    }else if(tekrarŞekliAmudiVarMI){
        for(var hizaSatırıİbre = 0; hizaSatırıİbre < hizaSatırlarıDizisi.length; hizaSatırıİbre++ ){
            for(var talimYazılarıDizisiİbresi = 0; hizaSatırıİbre < hizaSatırlarıDizisi.length && talimYazılarıDizisiİbresi < talimYazılarıDizisi.length; talimYazılarıDizisiİbresi++){
                hizaSatırlarıDizisi[hizaSatırıİbre].yazTalimYazılarını(talimYazılarıDizisi[talimYazılarıDizisiİbresi]);
                hizaSatırıİbre++;
            }
            hizaSatırıİbre += (boşHizaSatırıAdedi - 1);
        }
    }else if(tekrarŞekliUfkiVarMI){
        for(var talimYazılarıDizisiİbresi = 0; talimYazılarıDizisiİbresi < talimYazılarıDizisi.length; talimYazılarıDizisiİbresi++){
            hizaSatırlarıDizisi[talimYazılarıDizisiİbresi].yazTalimYazılarınıUfkiTekrarlı(talimYazılarıDizisi[talimYazılarıDizisiİbresi]);
        }
    }else if(tekrarŞekliİkisideVarMI){
        for(var hizaSatırıİbre = 0; hizaSatırıİbre < hizaSatırlarıDizisi.length; hizaSatırıİbre++ ){
            for(var talimYazılarıDizisiİbresi = 0; hizaSatırıİbre < hizaSatırlarıDizisi.length && talimYazılarıDizisiİbresi < talimYazılarıDizisi.length; talimYazılarıDizisiİbresi++){
                hizaSatırlarıDizisi[hizaSatırıİbre].yazTalimYazılarınıUfkiTekrarlı(talimYazılarıDizisi[talimYazılarıDizisiİbresi]);
                hizaSatırıİbre++;
            }
            hizaSatırıİbre += (boşHizaSatırıAdedi - 1);
        }
    }
    
    











    
}