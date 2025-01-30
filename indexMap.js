const Creation = (produits) => { //Fonction de création du tableau, appel affichePrixTot()
    let prixTot = 0;
    const open = produits.map(produit => `<div class="ligne ${produit.tag}" id=${produit.id}>`)
    const nom = produits.map(produit => `<div class="nom interne">${produit.nom}</div>`)
    const prix = produits.map(produit => `<div class="prix interne">${produit.prix}</div>`)
    const sup = produits.map(produit => `<div class="sup"><button class="button" id=sup${produit.id}>Supprimer</button></div>`)
    table.innerHTML = `<div class="ligne">
                    <div class="nom">Nom</div>
                    <div class="prix">Prix</div>
                    <div class="sup"></div>
                </div>`
    for (let i = 0; i < open.length; i++) {
        prixTot += produits[i].prix
        table.innerHTML += open[i] + nom[i] + prix[i] + sup[i] + `</div>`
    }
    affichePrixTot(prixTot)
    document.querySelectorAll('.sup button').forEach(button => {
        button.addEventListener('click', () => Supprimer(button.id));
    });
}

const Trie = (Tags,produits) => { // Fonction de Trie par catégorie, appel Creation()
    let produitsTemp = []
    produits.forEach(produit => produitsTemp.push(produit))
    if (Tags.length > 0){
        produitsTemp = produitsTemp.filter(produit => Tags.includes(produit.tag))
    }
    if (texteTrie !== ""){
        produitsTemp = produitsTemp.filter(produit => produit.nom.includes(texteTrie) ||
            produit.nom.toLowerCase().includes(texteTrie) ||
            produit.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(texteTrie) ||
            produit.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(texteTrie))
    }
    Creation(produitsTemp)
}

const Supprimer = (id) => { // Fonction de suppression des items de la liste, appel Trie()
    const produitId = parseInt(id.replace("sup", ""));
    produits = produits.filter(produit => produit.id !== produitId)
    let tagsActifs = [];
    Checkboxs.forEach(tag => {
        if (tag.checkbox.checked) {
            tagsActifs.push(tag.nom);
        }
    });
    Trie(tagsActifs,produits)
}

const affichePrixTot = (prix) => { // Fonction d'affichage de la ligne de prix
    if (texteTrie === "Sacha Allardin dit le génie charismatique divin"){
        prix += 1000
    }
    prixTotDiv.innerHTML = `<div class="ligne" style="margin-top: 10px">
                    <div class="nom interne">Prix de tous les articles séléctionnés</div>
                    <div class="prix interne">${prix.toFixed(2)} €</div>
                    <div class="sup"></div>
                </div>`
}

// Récupération des informations et création des constantes et variables
const table = document.querySelector(".grid > div");
const reset = document.getElementById("Reset");
const inputTexte = document.querySelector("input[type='text']");
const form = document.querySelector("form");
const prixTotDiv = document.getElementById("prix-tot")
const Checkboxs = [
    {nom : "Thé",checkbox : document.getElementById("Thé")},
    {nom : "Café",checkbox : document.getElementById("Café")},
    {nom : "Infusion",checkbox : document.getElementById("Infusion")}
];
const produitsSave = [
    // Thés
    { id: 1, nom: "Thé vert Sencha", prix: 12.99 },
    { id: 2, nom: "Thé noir English Breakfast", prix: 8.99 },
    { id: 3, nom: "Thé Earl Grey", prix: 9.99 },
    { id: 4, nom: "Thé Oolong", prix: 14.99 },
    { id: 5, nom: "Thé blanc Bai Mu Dan", prix: 16.99 },
    { id: 6, nom: "Thé Matcha", prix: 19.99 },
    { id: 7, nom: "Thé Chai", prix: 11.99 },

    // Cafés
    { id: 8, nom: "Café Arabica Colombie", prix: 13.99 },
    { id: 9, nom: "Café Robusta Vietnam", prix: 9.99 },
    { id: 10, nom: "Café Blue Mountain", prix: 24.99 },
    { id: 11, nom: "Café Moka d'Éthiopie", prix: 15.99 },
    { id: 12, nom: "Café Kenya AA", prix: 17.99 },
    { id: 13, nom: "Café Costa Rica Tarrazu", prix: 16.49 },
    { id: 14, nom: "Café Sumatra", prix: 14.99 },

    // Infusions
    { id: 15, nom: "Infusion Camomille", prix: 5.49 },
    { id: 16, nom: "Infusion Verveine", prix: 6.99 },
    { id: 17, nom: "Infusion Fruits rouges", prix: 7.49 },
    { id: 18, nom: "Infusion Menthe poivrée", prix: 5.99 },
    { id: 19, nom: "Infusion Tilleul", prix: 6.49 },
    { id: 20, nom: "Infusion Rooibos", prix: 8.99 },
    { id: 21, nom: "Infusion Gingembre Citron", prix: 7.99 }
];
let produits = produitsSave;
const collator = new Intl.Collator("fr", {sensitivity : "base"});

produits.sort((a, b) => collator.compare(a.nom, b.nom));
let texteTrie = "";

// Ajout de Tags aux items de la liste
for (let i = 0; i < produits.length; i++) {
    if (produits[i].nom.includes("Thé")){
        produits[i].tag = "Thé"
    } else if (produits[i].nom.includes("Café")){
        produits[i].tag = "Café"
    } else if (produits[i].nom.includes("Infusion")){
        produits[i].tag = "Infusion"
    }
}

Creation(produits);

for (let i = 0; i < Checkboxs.length; i++) { // Fonction qui vérifie l'état des checkbox, appel Trie()
    Checkboxs[i].checkbox.addEventListener("click", () => {
        let tags = [];
        for (let loop = 0; loop < Checkboxs.length; loop++) {
            if (Checkboxs[loop].checkbox.checked){
                tags.push(Checkboxs[loop].nom)
            }
        }
        Trie(tags,produits);
    })
}

inputTexte.addEventListener("input", (e) => { // Fonction de recherche textuel, appel Trie()
    let tagsActifs = [];
    Checkboxs.forEach(tag => {
        if (tag.checkbox.checked) {
            tagsActifs.push(tag.nom);
        }
    });
    texteTrie = e.target.value
    Trie(tagsActifs,produits)
})

form.addEventListener("submit", (e) => { // Supprime la fonctionnalité native du form
    e.preventDefault();
})

reset.addEventListener("click", () => { // Fonction de réinitialisation complète, appel Creation()
    produits = produitsSave
    inputTexte.value = ""
    texteTrie = ""
    for (let i= 0; i < Checkboxs.length; i++) {
        Checkboxs[i].checkbox.checked = false
    }
    Creation(produits)
})