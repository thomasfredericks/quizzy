# C++ : Quiz

## Quelle est la syntaxe générale utilisée pour créer une variable ?

- [ ] `nom type = valeur;`
- [x] `type nom = valeur;`
- [ ] `type = nom valeur;`
- [ ] `valeur nom type;`

## Que signifie la déclaration suivante ?

- [ ] `compteur` est une variable de type `float` contenant 0
- [ ] `compteur` est une fonction qui retourne 0
- [x] `compteur` est une variable de type `int` dont la valeur initiale est 0
- [ ] `compteur` est une constante qui ne peut pas être modifiée

```cpp
int compteur = 0;
```

## Quel type est le plus approprié pour stocker une valeur qui peut être uniquement `true` ou `false` ?

- [ ] `char`
- [ ] `float`
- [ ] `int`
- [x] `bool`

## Quelle déclaration permet de créer une variable pouvant contenir un nombre compris entre 0 et 255 ?

- [x] `byte valeur = 200;`
- [ ] `bool valeur = 200;`
- [ ] `char valeur = 200.5;`
- [ ] `float valeur = false;`

## Quelle instruction permet de modifier la valeur d'une variable existante appelée `compteur` pour lui donner la valeur 10 ?

- [ ] `int compteur = 10;`
- [ ] `compteur == 10;`
- [x] `compteur = 10;`
- [ ] `compteur := 10;`

## À quoi servent principalement les parenthèses `()` après le nom d'une fonction ?

- [x] À définir les paramètres de la fonction
- [ ] À délimiter le bloc d'instructions
- [ ] À indiquer le type de retour
- [ ] À terminer la fonction

## Quel symbole délimite le bloc d'instructions d'une fonction en C++ ?

- [ ] `[ ]`
- [ ] `( )`
- [x] `{ }`
- [ ] `< >`

## Laquelle de ces déclarations de fonction est correcte ?

- [x] `int bonjour() { }`
- [ ] `int bonjour[] { }`
- [ ] `int bonjour() [ ]`
- [ ] `int bonjour{} ( )`

## Dans ce code, quel rôle jouent les parenthèses ?

```cpp
if (x > 5) {
    printf("OK");
}
```

- [x] Elles contiennent la condition du `if`
- [ ] Elles contiennent le bloc du `if`
- [ ] Elles indiquent le type de `x`
- [ ] Elles terminent l'instruction `printf`

## Que fait ce code si `x` vaut 10 ?

```cpp
if (x > 5) {
    printf("Oui");
}
```

- [x] Il affiche `Oui`
- [ ] Il affiche `Non`
- [ ] Il n'affiche rien
- [ ] Il provoque une erreur

## Que se passe-t-il si `x` vaut 3 ?

```cpp
if (x > 5) {
    printf("Oui");
}
```

- [ ] `Oui` est affiché
- [x] Rien n'est affiché
- [ ] `Non` est affiché
- [ ] Le programme s'arrête

## Quel est le rôle du `else` dans une structure `if...else` ?

- [x] Exécuter un bloc lorsque la condition du `if` est fausse
- [ ] Exécuter toujours les deux blocs
- [ ] Déclarer une nouvelle fonction
- [ ] Répéter le bloc du `if`

## Quelle écriture est correcte pour un `if` en C++ ?

- [ ] `if x > 5 { }`
- [x] `if (x > 5) { }`
- [ ] `if { x > 5 }`
- [ ] `if [x > 5] { }`

## Que se passe-t-il si `age` vaut 16 ?

```cpp
if (age >= 18) {
    printf("Adulte");
} else {
    printf("Mineur");
}
```

- [ ] `Adulte` est affiché
- [x] `Mineur` est affiché
- [ ] Les deux sont affichés
- [ ] Rien n'est affiché

## Pourquoi utilise-t-on `{ }` dans une fonction ?

- [x] Pour commencer et terminer son bloc d'instructions
- [ ] Pour commencer la liste des paramètres
- [ ] Pour indiquer le type de retour
- [ ] Pour appeler automatiquement la fonction

## Que signifie l'accolade `}` à la fin d'une fonction ?

- [ ] Le début de la fonction
- [x] La fin du bloc de la fonction
- [ ] L'appel de la fonction
- [ ] La déclaration d'un paramètre

## Que va afficher ce code si `x` vaut 8 ?

```cpp
if (x >= 10) {
    printf("A");
} else {
    printf("B");
}
```

- [ ] `A`
- [x] `B`
- [ ] `A` puis `B`
- [ ] Rien

## Laquelle de ces écritures appelle correctement une fonction nommée `calculer` qui ne reçoit aucun argument ?

- [ ] `calculer;`
- [x] `calculer();`
- [ ] `calculer{};`
- [ ] `calculer[];`

## Que va afficher ce code si `x` vaut 5 ?

```cpp
if (x > 5) {
    printf("Grand");
} else {
    printf("Petit ou égal");
}
```

- [ ] `Grand`
- [x] `Petit ou égal`
- [ ] Les deux
- [ ] Rien

## Laquelle de ces fonctions est correctement structurée ?

- [x]

```cpp
void test(int x) {
    if (x > 0) {
        printf("Positif");
    } else {
        printf("Non positif");
    }
}
```

- [ ]

```cpp
void test(int x) (
    if x > 0 {
        printf("Positif");
    }
)
```

- [ ]

```cpp
void test(int x) {
    if x > 0 [
        printf("Positif");
    ]
}
```

- [ ]

```cpp
void test(int x) {
    if (x > 0) (
        printf("Positif");
    )
}
```