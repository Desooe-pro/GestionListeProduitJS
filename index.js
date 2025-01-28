// Fonction de Trie par catégorie
const Trie = (Tags) => {
    table.innerHTML = `<div class="ligne">
                    <div class="nom interne">Nom</div>
                    <div class="prix interne">Prix</div>
                </div>`
    if (Tags.length === 0){
        Creation()
    } else {
        for (let i = 0; i < produits.length; i++) {
            if (Tags.includes(produits[i].tag)){
                let idProd = produits[i].id
                let nomProd = produits[i].nom
                let prixProd = produits[i].prix
                let tagProd = produits[i].tag
                let supProd = "sup" + produits[i].id
                table.innerHTML += `<div class="ligne ${tagProd}" id=${idProd}>
                    <div class="nom interne">${nomProd}</div>
                    <div class="prix interne">${prixProd}€</div>
                    <div class="sup"><button id=${supProd}>Supprimer</button></div>
                </div>`
            }
        }
        document.querySelectorAll('.sup button').forEach(button => {
            button.addEventListener('click', () => Supprimer(button.id));
        });
    }
}

const Supprimer = (id) => {
    // Extraire l'ID du produit (enlever "sup" du début)
    const produitId = parseInt(id.replace("sup", ""));

    // Filtrer le produit du tableau
    produits = produits.filter(produit => produit.id !== produitId);

    // Récupérer les tags actifs actuels
    let tagsActifs = [];
    Tags.forEach(tag => {
        if (tag.state) {
            tagsActifs.push(tag.nom);
        }
    });

    // Mettre à jour l'affichage en fonction des filtres actifs
    if (tagsActifs.length > 0) {
        Trie(tagsActifs);
    } else {
        Creation();
    }
}

// Récupération et création des informations
const table = document.querySelector(".grid");
const testDiv = document.getElementById("test")
const inputTexte = document.querySelector("input[type='text']");
const form = document.querySelector("form");
const Checkboxs = [
    {nom : "Thé",checkbox : document.getElementById("Thé"), checked : false},
    {nom : "Café",checkbox : document.getElementById("Café"), checked : false},
    {nom : "Infusion",checkbox : document.getElementById("Infusion"), checked : false}
];
const produitsSave = [
    { id: 1, nom: "Thé vert", prix: 12.99 },
    { id: 2, nom: "Café Arabica", prix: 8.99 },
    { id: 3, nom: "Infusion Camomille", prix: 5.49 },
    { id: 4, nom: "Café Robusta", prix: 9.99 },
];

let produits = produitsSave

const collator = new Intl.Collator("fr", {sensitivity : "base"});

produits.sort((a, b) => collator.compare(a.nom, b.nom));

let Tags = [
    {nom : "Thé", state : false},
    {nom : "Café", state : false},
    {nom : "Infusion", state : false}
]

// Ajout de Tags
for (let i = 0; i < produits.length; i++) {
    if (produits[i].nom.includes("Thé")){
        produits[i].tag = "Thé"
    } else if (produits[i].nom.includes("Café")){
        produits[i].tag = "Café"
    } else if (produits[i].nom.includes("Infusion")){
        produits[i].tag = "Infusion"
    }
}


// Insertion des produits
const Creation = () => {
    table.innerHTML = `<div class="ligne">
                    <div class="nom interne">Nom</div>
                    <div class="prix interne">Prix</div>
                </div>`
    for (let i = 0; i < produits.length; i++) {
        let idProd = produits[i].id
        let nomProd = produits[i].nom
        let prixProd = produits[i].prix
        let tagProd = produits[i].tag
        let supProd = "sup" + produits[i].id
        table.innerHTML += `<div class="ligne ${tagProd}" id=${idProd}>
                    <div class="nom interne">${nomProd}</div>
                    <div class="prix interne">${prixProd}€</div>
                    <div class="sup"><button id=${supProd}>Supprimer</button></div>
                </div>`
    }
    document.querySelectorAll('.sup button').forEach(button => {
        button.addEventListener('click', () => Supprimer(button.id));
    });
}

Creation()

// Fonction
for (let i = 0; i < Checkboxs.length; i++) {
    Checkboxs[i].checkbox.addEventListener("click", () => {
        Checkboxs[i].checked = !Checkboxs[i].checked;

        for (let loop = 0; loop < Tags.length; loop++) {
            if (Checkboxs[i].nom === Tags[loop].nom) {
                Tags[loop].state = Checkboxs[i].checked
            }
        }

        let tags = [];
        for (let loop = 0; loop < Tags.length; loop++) {
            if (Tags[loop].state){
                tags.push(Tags[loop].nom)
            }
        }
        Trie(tags);
    })
}

// Fonction de recherche
inputTexte.addEventListener("input", (e) => {
    table.innerHTML = `<div class="ligne">
                    <div class="nom interne">Nom</div>
                    <div class="prix interne">Prix</div>
                </div>`
    for (let i = 0; i < produits.length; i++) {
        if (produits[i].nom.includes(e.target.value) || produits[i].nom.toLowerCase().includes(e.target.value)){
            let idProd = produits[i].id.toString()
            let nomProd = produits[i].nom
            let prixProd = produits[i].prix
            let tagProd = produits[i].tag
            let supProd = "sup" + produits[i].id
            table.innerHTML += `<div class="ligne ${tagProd}" id=${idProd}>
                    <div class="nom interne">${nomProd}</div>
                    <div class="prix interne">${prixProd}€</div>
                    <div class="sup"><button id=${supProd}>Supprimer</button></div>
                </div>`
        }
    }
    document.querySelectorAll('.sup button').forEach(button => {
        button.addEventListener('click', () => Supprimer(button.id));
    });
})

form.addEventListener("submit", (e) => {
    // Supprime la fonctionnalité native de l'élément ciblé
    e.preventDefault();
})