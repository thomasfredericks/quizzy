# Quiz — Arduino clignotement interactif

## Quelle bibliothèque permet de gérer le temps dans ce tutoriel ?

- [ ] `Bounce2`
- [x] `Chrono`
- [ ] `ArduinoTimer`
- [ ] `TimeLib`

## Que fait `minuterieDel.hasPassed(INTERVALLE)` ?

- [ ] Redémarre la minuterie
- [ ] Allume la DEL
- [x] Vérifie si l'intervalle de temps est écoulé
- [ ] Arrête le programme

## À quoi sert `minuterieDel.restart()` ?

- [x] Réinitialiser la mesure du temps
- [ ] Réinitialiser la DEL
- [ ] Redémarrer `loop()`
- [ ] Réinitialiser le bouton

## Quelle instruction configure une broche Arduino comme sortie ?

- [ ] `digitalWrite(BROCHE, OUTPUT)`
- [x] `pinMode(BROCHE, OUTPUT)`
- [ ] `pinMode(BROCHE, HIGH)`
- [ ] `digitalWrite(BROCHE, INPUT)`

## Sur un Arduino Nano, que signifie `HIGH` dans ce tutoriel ?

- [ ] 0 volt
- [ ] 1 volt
- [ ] 3,3 volts
- [x] 5 volts

## Quelle configuration est utilisée pour le bouton afin d'activer la résistance pull-up interne ?

- [ ] `INPUT`
- [ ] `OUTPUT`
- [x] `INPUT_PULLUP`
- [ ] `PULLDOWN`

## Quelle méthode doit être appelée à chaque passage dans `loop()` pour mettre à jour l'état du bouton ?

- [x] `bouton.update()`
- [ ] `bouton.refresh()`
- [ ] `bouton.read()`
- [ ] `bouton.check()`

## Quelle est la différence entre `bouton.isPressed()` et `bouton.pressed()` ?

- [ ] Il n'y a aucune différence
- [x] `isPressed()` indique que le bouton est actuellement appuyé, tandis que `pressed()` détecte une nouvelle pression
- [ ] `pressed()` indique que le bouton est actuellement appuyé, tandis que `isPressed()` détecte un événement
- [ ] `isPressed()` détecte un relâchement et `pressed()` une pression

## Dans le dernier programme, à quoi sert la variable `clignotementActif` ?

- [ ] À mémoriser l'état électrique du bouton
- [x] À déterminer si le clignotement doit fonctionner ou non
- [ ] À mesurer l'intervalle de clignotement
- [ ] À mémoriser la tension de la DEL

## Dans le dernier programme, que se passe-t-il lorsqu'une nouvelle pression est détectée sur le bouton ?

- [ ] La DEL est toujours allumée
- [ ] L'intervalle passe de 500 ms à 1000 ms
- [x] L'état de `clignotementActif` est inversé
- [ ] Le programme redémarre
