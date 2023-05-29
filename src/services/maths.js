// Chaine de Markov
function chaineDeMarkov(currentState) {
    // Définition des états possibles
    const etats = ['dudo', 'calza', 'bet'];

    // Définition de la matrice de transition
    const matriceTransition = [
        [0.3, 0.6, 0.1],
        [0.2, 0.2, 0.6],
        [0.4, 0.1, 0.5]
    ];

    // ID de l'état actuel
    const currentStateId = etats.indexOf(currentState);

    return loiDiscrète(matriceTransition[currentStateId], etats);
}

// Lois uniformes
function loiUniforme() {
    return Math.random();
}

function loiUniformeIntervalle(a, b) {
    return Math.random() * (b - a) + a;
}


// Lois normales utilisant la méthode de Box-Muller
function loiNormaleCentreeReduite() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Évite la valeur de u = 0
    while (v === 0) v = Math.random(); // Évite la valeur de v = 0
    const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num;
}

function loiNormale(moyenne, ecartType) {
    const randomNormal = loiNormaleCentreeReduite();
    return randomNormal * ecartType + moyenne;
}

// Loi discrète
function loiDiscrète(proba, etats) {
    // Calcul des probabilités cumulatives
    const probCumulatives = [];
    let cumul = 0;
    for (let i = 0; i < proba.length; i++) {
        cumul += proba[i];
        probCumulatives.push(cumul);
    }

    // Génération d'un nombre aléatoire entre 0 et 1
    const randomNum = Math.random();

    // Recherche du prochain état en fonction du nombre aléatoire
    for (let i = 0; i < probCumulatives.length; i++) {
        if (randomNum < probCumulatives[i]) {
            return etats[i];
        }
    }
}

// Loi exponentielle
function loiExponentielle(lambda) {
    const u = Math.random();
    const randomNumber = -Math.log(1 - u) / lambda;
    return randomNumber;
}

// Loi binomiale
function loiBinomiale(trials, successProbability) {
    let successes = 0;
    for (let i = 0; i < trials; i++) {
      successes += loiBernoulli(successProbability);
    }
    return successes;
}

// Loi de Poisson
function loiPoisson(lambda) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k++;
      const u = Math.random();
      p *= u;
    } while (p > L);
    return k - 1;
}

// Loi de Bernoulli
function loiBernoulli(successProbability) {
    const randomNum = Math.random();
    if (randomNum < successProbability) {
      return 1; // Succès
    } else {
      return 0; // Échec
    }
}

// export des fonctions
export {chaineDeMarkov, loiUniforme, loiUniformeIntervalle, loiNormaleCentreeReduite, loiNormale, loiDiscrète, loiExponentielle, loiBinomiale, loiPoisson, loiBernoulli};