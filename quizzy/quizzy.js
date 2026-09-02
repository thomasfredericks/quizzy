/*
 * =========================================================
 * QUIZZY
 * =========================================================
 *
 * Utilisation :
 *
 * <div
 *   class="quizzy"
 *   data-questions="questions.md"
 * ></div>
 *
 * <script src="quizzy/quizzy.js"></script>
 *
 * Quizzy charge automatiquement :
 *
 * - quizzy.css
 * - Prism.js
 * - Prism C
 * - Prism C++
 *
 * =========================================================
 */

(function () {

  "use strict";


  /*
   * =========================================================
   * URL DU FICHIER QUIZZY.JS
   * =========================================================
   *
   * IMPORTANT :
   *
   * document.currentScript doit être récupéré
   * immédiatement pendant l'exécution de quizzy.js.
   *
   * Il ne faut PAS essayer de le récupérer plus tard
   * dans loadResources(), car il peut alors être null.
   *
   * Exemple :
   *
   * https://monsite.com/quizzy/quizzy.js
   *
   * donnera :
   *
   * https://monsite.com/quizzy/
   *
   * =========================================================
   */

  const quizzyScript =
    document.currentScript;


  const quizzyBaseURL =
    quizzyScript
      ? new URL(
          "./",
          quizzyScript.src
        ).href
      : new URL(
          "./",
          window.location.href
        ).href;


  /*
   * =========================================================
   * RESSOURCES EXTERNES
   * =========================================================
   */

  const PRISM_URL =
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js";


  const PRISM_C_URL =
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-c.min.js";


  const PRISM_CPP_URL =
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-cpp.min.js";


  const PRISM_CSS_URL =
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css";


  /*
   * =========================================================
   * PROMESSE DE CHARGEMENT
   * =========================================================
   *
   * Permet d'éviter de charger plusieurs fois
   * les ressources lorsqu'il y a plusieurs Quizzy
   * sur la même page.
   *
   * =========================================================
   */

  let resourcesPromise =
    null;


  /*
   * =========================================================
   * CHARGER UN SCRIPT
   * =========================================================
   */

  function loadScript(src) {

    return new Promise(
      function (resolve, reject) {

        /*
         * Vérifier si le script est déjà présent.
         */

        const existing =
          document.querySelector(
            `script[src="${src}"]`
          );


        if (existing) {

          /*
           * Script déjà chargé.
           */

          if (
            existing.dataset.loaded === "true"
          ) {

            resolve();

            return;

          }


          /*
           * Script actuellement en cours
           * de chargement.
           */

          existing.addEventListener(
            "load",
            resolve,
            {
              once: true
            }
          );


          existing.addEventListener(
            "error",
            reject,
            {
              once: true
            }
          );


          return;

        }


        /*
         * Créer le script.
         */

        const script =
          document.createElement(
            "script"
          );


        script.src =
          src;


        script.async =
          false;


        script.addEventListener(
          "load",
          function () {

            script.dataset.loaded =
              "true";


            resolve();

          },
          {
            once: true
          }
        );


        script.addEventListener(
          "error",
          function () {

            reject(
              new Error(
                "Impossible de charger : " +
                src
              )
            );

          },
          {
            once: true
          }
        );


        document.head.appendChild(
          script
        );

      }
    );

  }


  /*
   * =========================================================
   * CHARGER UNE FEUILLE CSS
   * =========================================================
   */

  function loadCSS(href) {

    return new Promise(
      function (resolve, reject) {

        /*
         * Vérifier si la feuille existe déjà.
         */

        const existing =
          document.querySelector(
            `link[href="${href}"]`
          );


        if (existing) {

          resolve();

          return;

        }


        /*
         * Créer le link.
         */

        const link =
          document.createElement(
            "link"
          );


        link.rel =
          "stylesheet";


        link.href =
          href;


        link.addEventListener(
          "load",
          resolve,
          {
            once: true
          }
        );


        link.addEventListener(
          "error",
          function () {

            reject(
              new Error(
                "Impossible de charger : " +
                href
              )
            );

          },
          {
            once: true
          }
        );


        document.head.appendChild(
          link
        );

      }
    );

  }


  /*
   * =========================================================
   * CHARGEMENT DES RESSOURCES
   * =========================================================
   */

  function loadResources() {

    /*
     * Si les ressources sont déjà en cours
     * de chargement ou déjà chargées,
     * réutiliser la même Promise.
     */

    if (resourcesPromise) {

      return resourcesPromise;

    }


    /*
     * -------------------------------------------------------
     * CSS DE QUIZZY
     * -------------------------------------------------------
     *
     * Si quizzy.js est ici :
     *
     * /quizzy/quizzy.js
     *
     * alors :
     *
     * /quizzy/quizzy.css
     *
     * sera automatiquement chargé.
     * -------------------------------------------------------
     */

    const quizzyCSS =
      new URL(
        "quizzy.css",
        quizzyBaseURL
      ).href;


    /*
     * -------------------------------------------------------
     * LANCER LE CHARGEMENT
     * -------------------------------------------------------
     */

    resourcesPromise =
      Promise.all([

        loadCSS(
          quizzyCSS
        ),

        loadCSS(
          PRISM_CSS_URL
        ),

        loadScript(
          PRISM_URL
        )

      ])


      /*
       * -----------------------------------------------------
       * Prism C
       * -----------------------------------------------------
       */

      .then(
        function () {

          return loadScript(
            PRISM_C_URL
          );

        }
      )


      /*
       * -----------------------------------------------------
       * Prism C++
       * -----------------------------------------------------
       */

      .then(
        function () {

          return loadScript(
            PRISM_CPP_URL
          );

        }
      )


      /*
       * -----------------------------------------------------
       * Vérification
       * -----------------------------------------------------
       */

      .then(
        function () {

          if (
            typeof Prism === "undefined"
          ) {

            throw new Error(
              "Prism.js n'est pas disponible."
            );

          }

        }
      );


    return resourcesPromise;

  }


  /*
   * =========================================================
   * INITIALISATION
   * =========================================================
   */

  function initializeQuizzy() {

    const containers =
      document.querySelectorAll(
        ".quizzy"
      );


    /*
     * Aucun Quizzy sur cette page.
     */

    if (
      containers.length === 0
    ) {

      return;

    }


    /*
     * Charger les ressources.
     */

    loadResources()

      .then(
        function () {

          containers.forEach(
            function (container) {

              /*
               * Eviter une double initialisation.
               */

              if (
                container.dataset.quizzyInitialized === "true"
              ) {

                return;

              }


              container.dataset.quizzyInitialized =
                "true";


              new Quizzy(
                container
              );

            }
          );

        }
      )


      .catch(
        function (error) {

          console.error(
            "Erreur lors du chargement de Quizzy :",
            error
          );


          containers.forEach(
            function (container) {

              container.innerHTML = `

                <div class="quizzy-error">

                  <strong>
                    Erreur Quizzy
                  </strong>

                  <br><br>

                  ${escapeHTML(
                    error.message
                  )}

                </div>

              `;

            }
          );

        }
      );

  }


  /*
   * =========================================================
   * CLASSE QUIZZY
   * =========================================================
   */

  class Quizzy {

    constructor(container) {

      this.container =
        container;


      this.questions =
        [];


      /*
       * Fichier Markdown.
       *
       * Par défaut :
       *
       * questions.md
       *
       * ou :
       *
       * data-questions="questionnaires/cpp.md"
       */

      this.markdownFile =
        container.dataset.questions ||
        "questions.md";


      /*
       * URL absolue du questionnaire.
       */

      this.markdownURL =
        new URL(
          this.markdownFile,
          window.location.href
        );


      /*
       * Clé de stockage.
       *
       * Chaque fichier Markdown possède
       * son propre stockage.
       */

      this.storageKey =
        `quizzy:${this.markdownURL.pathname}:result`;


      this.createInterface();


      this.load();

    }


    /*
     * =======================================================
     * CREER L'INTERFACE
     * =======================================================
     */

    createInterface() {

      this.container.innerHTML = `

        <h1 class="quizzy-title">
          Quizzy
        </h1>

        <div class="quizzy-loading">
          Chargement du questionnaire...
        </div>

        <div class="quizzy-error-container"></div>

        <form class="quizzy-form"></form>

        <button
          class="quizzy-submit-button"
          type="button"
          style="display: none;"
        >
          Voir mon résultat
        </button>

        <div
          class="quizzy-result"
          style="display: none;"
        >

          <div class="quizzy-score"></div>

          <div class="quizzy-score-message"></div>

          <div
            class="quizzy-saved-result"
            style="display: none;"
          >
            Résultat enregistré dans ce navigateur.
          </div>

          <br>

          <button
            type="button"
            class="quizzy-restart-button"
          >
            Recommencer
          </button>

        </div>

      `;


      this.title =
        this.container.querySelector(
          ".quizzy-title"
        );


      this.loading =
        this.container.querySelector(
          ".quizzy-loading"
        );


      this.error =
        this.container.querySelector(
          ".quizzy-error-container"
        );


      this.form =
        this.container.querySelector(
          ".quizzy-form"
        );


      this.submitButton =
        this.container.querySelector(
          ".quizzy-submit-button"
        );


      this.result =
        this.container.querySelector(
          ".quizzy-result"
        );


      this.score =
        this.container.querySelector(
          ".quizzy-score"
        );


      this.scoreMessage =
        this.container.querySelector(
          ".quizzy-score-message"
        );


      this.savedResult =
        this.container.querySelector(
          ".quizzy-saved-result"
        );


      this.restartButton =
        this.container.querySelector(
          ".quizzy-restart-button"
        );


      this.submitButton.addEventListener(
        "click",
        () => this.submit()
      );


      this.restartButton.addEventListener(
        "click",
        () => this.restart()
      );

    }


    /*
     * =======================================================
     * CHARGER LE QUESTIONNAIRE
     * =======================================================
     */

    async load() {

      try {

        const response =
          await fetch(
            this.markdownFile
          );


        if (!response.ok) {

          throw new Error(
            "Impossible de charger le fichier " +
            this.markdownFile
          );

        }


        const markdown =
          await response.text();


        this.questions =
          this.parseMarkdown(
            markdown
          );


        if (
          this.questions.length === 0
        ) {

          throw new Error(
            "Aucune question trouvée dans " +
            this.markdownFile +
            "."
          );

        }


        this.displayQuiz();


        this.loading.style.display =
          "none";


        this.restoreSavedState();

      }
      catch (error) {

        this.loading.style.display =
          "none";


        this.error.innerHTML = `

          <div class="quizzy-error">

            <strong>
              Erreur :
            </strong>

            <br>

            ${this.escapeHTML(
              error.message
            )}

            <br><br>

            Vérifiez que
            <strong>
              ${this.escapeHTML(
                this.markdownFile
              )}
            </strong>
            se trouve au bon emplacement.

          </div>

        `;

      }

    }


    /*
     * =======================================================
     * PARSER MARKDOWN
     * =======================================================
     */

    parseMarkdown(markdown) {

      const lines =
        markdown.split(/\r?\n/);


      const parsedQuestions =
        [];


      let currentQuestion =
        null;


      let currentAnswer =
        null;


      let inCodeBlock =
        false;


      let codeLines =
        [];


      let codeLanguage =
        "cpp";


      for (
        const line of lines
      ) {

        const trimmedLine =
          line.trim();


        /*
         * Début / fin d'un bloc de code.
         */

        if (
          trimmedLine.startsWith("```")
        ) {

          if (!inCodeBlock) {

            inCodeBlock =
              true;


            codeLines =
              [];


            const language =
              trimmedLine
                .substring(3)
                .trim()
                .toLowerCase();


            codeLanguage =
              language || "cpp";

          }
          else {

            inCodeBlock =
              false;


            const code =
              codeLines.join("\n");


            if (currentAnswer) {

              currentAnswer.code =
                code;


              currentAnswer.language =
                codeLanguage;

            }
            else if (currentQuestion) {

              currentQuestion.code =
                code;


              currentQuestion.language =
                codeLanguage;

            }


            codeLines =
              [];

          }


          continue;

        }


        /*
         * Ligne dans un bloc de code.
         */

        if (inCodeBlock) {

          codeLines.push(
            line
          );


          continue;

        }


        /*
         * Titre principal.
         */

        const titleMatch =
          trimmedLine.match(
            /^#\s+(.+)$/
          );


        if (
          titleMatch &&
          !currentQuestion
        ) {

          this.title.textContent =
            titleMatch[1].trim();


          continue;

        }


        /*
         * Nouvelle question.
         */

        const questionMatch =
          trimmedLine.match(
            /^##\s+(.+)$/
          );


        if (questionMatch) {

          if (currentQuestion) {

            parsedQuestions.push(
              currentQuestion
            );

          }


          currentQuestion = {

            number:
              parsedQuestions.length + 1,

            text:
              questionMatch[1].trim(),

            code:
              null,

            language:
              "cpp",

            answers:
              []

          };


          currentAnswer =
            null;


          continue;

        }


        /*
         * Pas encore de question.
         */

        if (!currentQuestion) {

          continue;

        }


        /*
         * Nouvelle réponse.
         */

        const answerMatch =
          trimmedLine.match(
            /^-\s*\[\s*([xX ])\s*\]\s*(.*)$/
          );


        if (answerMatch) {

          currentAnswer = {

            text:
              answerMatch[2].trim(),

            correct:
              answerMatch[1].toLowerCase() === "x",

            code:
              null,

            language:
              "cpp"

          };


          currentQuestion.answers.push(
            currentAnswer
          );


          continue;

        }

      }


      /*
       * Ajouter la dernière question.
       */

      if (currentQuestion) {

        parsedQuestions.push(
          currentQuestion
        );

      }


      /*
       * Vérifications.
       */

      parsedQuestions.forEach(
        function (question, index) {

          question.number =
            index + 1;


          if (
            question.answers.length === 0
          ) {

            console.warn(
              `La question ${question.number} n'a aucune réponse.`
            );

          }


          const correctAnswers =
            question.answers.filter(
              answer => answer.correct
            );


          if (
            correctAnswers.length === 0
          ) {

            console.warn(
              `La question ${question.number} n'a pas de bonne réponse.`
            );

          }

        }
      );


      return parsedQuestions;

    }


    /*
     * =======================================================
     * MARKDOWN INLINE
     * =======================================================
     */

    renderInlineMarkdown(text) {

      const fragment =
        document.createDocumentFragment();


      const regex =
        /`([^`]+)`/g;


      let lastIndex =
        0;


      let match;


      while (
        (match = regex.exec(text)) !== null
      ) {

        if (
          match.index > lastIndex
        ) {

          fragment.appendChild(
            document.createTextNode(
              text.substring(
                lastIndex,
                match.index
              )
            )
          );

        }


        const code =
          document.createElement(
            "code"
          );


        code.className =
          "inline-code";


        code.textContent =
          match[1];


        fragment.appendChild(
          code
        );


        lastIndex =
          regex.lastIndex;

      }


      if (
        lastIndex < text.length
      ) {

        fragment.appendChild(
          document.createTextNode(
            text.substring(
              lastIndex
            )
          )
        );

      }


      return fragment;

    }


    /*
     * =======================================================
     * CREER UN BLOC DE CODE
     * =======================================================
     */

    createCodeBlock(
      codeText,
      language,
      additionalClass = ""
    ) {

      const pre =
        document.createElement(
          "pre"
        );


      const code =
        document.createElement(
          "code"
        );


      let prismLanguage =
        "cpp";


      if (
        language &&
        language.toLowerCase() === "c"
      ) {

        prismLanguage =
          "c";

      }


      pre.className =
        `language-${prismLanguage}`;


      if (additionalClass) {

        pre.classList.add(
          additionalClass
        );

      }


      code.className =
        `language-${prismLanguage}`;


      code.textContent =
        codeText;


      pre.appendChild(
        code
      );


      Prism.highlightElement(
        code
      );


      return pre;

    }


    /*
     * =======================================================
     * AFFICHER LE QUIZ
     * =======================================================
     */

    displayQuiz() {

      this.form.innerHTML =
        "";


      this.result.style.display =
        "none";


      this.submitButton.style.display =
        "none";


      this.questions.forEach(
        (
          question,
          questionIndex
        ) => {

          const questionElement =
            document.createElement(
              "div"
            );


          questionElement.className =
            "quizzy-question";


          /*
           * Titre de la question.
           */

          const title =
            document.createElement(
              "h2"
            );


          title.appendChild(
            document.createTextNode(
              `Question ${questionIndex + 1} : `
            )
          );


          title.appendChild(
            this.renderInlineMarkdown(
              question.text
            )
          );


          questionElement.appendChild(
            title
          );


          /*
           * Code de la question.
           */

          if (question.code) {

            questionElement.appendChild(
              this.createCodeBlock(
                question.code,
                question.language || "cpp"
              )
            );

          }


          /*
           * Réponses.
           */

          question.answers.forEach(
            (
              answer,
              answerIndex
            ) => {

              const label =
                document.createElement(
                  "label"
                );


              label.className =
                "quizzy-answer";


              const input =
                document.createElement(
                  "input"
                );


              input.type =
                "radio";


              input.name =
                `${this.storageKey}-question-${questionIndex}`;


              input.value =
                answerIndex;


              input.addEventListener(
                "change",
                () => {

                  this.saveAnswers();

                  this.updateSubmitButtonVisibility();

                }
              );


              const content =
                document.createElement(
                  "span"
                );


              content.className =
                "quizzy-answer-content";


              if (answer.text) {

                content.appendChild(
                  this.renderInlineMarkdown(
                    answer.text
                  )
                );

              }


              if (answer.code) {

                content.appendChild(
                  this.createCodeBlock(
                    answer.code,
                    answer.language || "cpp",
                    "quizzy-answer-code"
                  )
                );

              }


              label.appendChild(
                input
              );


              label.appendChild(
                content
              );


              questionElement.appendChild(
                label
              );

            }
          );


          this.form.appendChild(
            questionElement
          );

        }
      );


      this.updateSubmitButtonVisibility();

    }


    /*
     * =======================================================
     * AFFICHER / MASQUER LE BOUTON
     * =======================================================
     */

    updateSubmitButtonVisibility() {

      if (
        this.questions.length === 0
      ) {

        this.submitButton.style.display =
          "none";


        return;

      }


      const allAnswered =
        this.questions.every(
          (
            question,
            questionIndex
          ) => {

            return this.container.querySelector(
              `input[name="${this.storageKey}-question-${questionIndex}"]:checked`
            ) !== null;

          }
        );


      this.submitButton.style.display =
        allAnswered
          ? "block"
          : "none";

    }


    /*
     * =======================================================
     * SAUVEGARDER LES REPONSES
     * =======================================================
     */

    saveAnswers() {

      const answersGiven =
        [];


      this.questions.forEach(
        (
          question,
          questionIndex
        ) => {

          const selected =
            this.container.querySelector(
              `input[name="${this.storageKey}-question-${questionIndex}"]:checked`
            );


          answersGiven.push(
            selected
              ? parseInt(
                  selected.value,
                  10
                )
              : null
          );

        }
      );


      let savedData =
        {};


      const existing =
        sessionStorage.getItem(
          this.storageKey
        );


      if (existing) {

        try {

          savedData =
            JSON.parse(
              existing
            );

        }
        catch (error) {

          savedData =
            {};

        }

      }


      savedData.answers =
        answersGiven;


      savedData.total =
        this.questions.length;


      if (
        typeof savedData.completed !==
        "boolean"
      ) {

        savedData.completed =
          false;

      }


      sessionStorage.setItem(
        this.storageKey,
        JSON.stringify(
          savedData
        )
      );

    }


    /*
     * =======================================================
     * VALIDATION DU QUIZ
     * =======================================================
     */

    submit() {

      const allAnswered =
        this.questions.every(
          (
            question,
            questionIndex
          ) => {

            return this.container.querySelector(
              `input[name="${this.storageKey}-question-${questionIndex}"]:checked`
            ) !== null;

          }
        );


      if (!allAnswered) {

        this.updateSubmitButtonVisibility();

        return;

      }


      let score =
        0;


      const questionElements =
        this.container.querySelectorAll(
          ".quizzy-question"
        );


      const answersGiven =
        [];


      this.questions.forEach(
        (
          question,
          questionIndex
        ) => {

          const selected =
            this.container.querySelector(
              `input[name="${this.storageKey}-question-${questionIndex}"]:checked`
            );


          const questionElement =
            questionElements[
              questionIndex
            ];


          const answers =
            questionElement.querySelectorAll(
              ".quizzy-answer"
            );


          const selectedIndex =
            parseInt(
              selected.value,
              10
            );


          answersGiven.push(
            selectedIndex
          );


          /*
           * Afficher les bonnes réponses.
           */

          question.answers.forEach(
            (
              answer,
              answerIndex
            ) => {

              if (answer.correct) {

                answers[
                  answerIndex
                ].classList.add(
                  "correct"
                );

              }

            }
          );


          const selectedAnswer =
            question.answers[
              selectedIndex
            ];


          /*
           * Bonne réponse.
           */

          if (
            selectedAnswer.correct
          ) {

            score++;


            answers[
              selectedIndex
            ].classList.add(
              "correct"
            );


            this.addFeedback(
              questionElement,
              "✓ Bonne réponse !"
            );

          }


          /*
           * Mauvaise réponse.
           */

          else {

            answers[
              selectedIndex
            ].classList.add(
              "incorrect"
            );


            this.addFeedback(
              questionElement,
              "✗ Mauvaise réponse."
            );

          }

        }
      );


      /*
       * Calcul du pourcentage.
       */

      const percentage =
        Math.round(
          (
            score /
            this.questions.length
          ) * 100
        );


      /*
       * Message.
       */

      const message =
        this.getScoreMessage(
          percentage
        );


      /*
       * Résultat complet.
       */

      const resultData = {

        score:
          score,

        total:
          this.questions.length,

        percentage:
          percentage,

        message:
          message,

        answers:
          answersGiven,

        completed:
          true

      };


      /*
       * Sauvegarder le résultat.
       */

      sessionStorage.setItem(
        this.storageKey,
        JSON.stringify(
          resultData
        )
      );


      /*
       * Afficher le résultat.
       */

      this.showResult(
        resultData,
        false
      );


      /*
       * Désactiver les réponses.
       */

      this.container
        .querySelectorAll(
          ".quizzy-form input"
        )
        .forEach(
          input => {

            input.disabled =
              true;

          }
        );


      /*
       * Masquer le bouton.
       */

      this.submitButton.style.display =
        "none";


      /*
       * Aller au résultat.
       */

      this.result.scrollIntoView({
        behavior: "smooth"
      });

    }


    /*
     * =======================================================
     * FEEDBACK
     * =======================================================
     */

    addFeedback(
      questionElement,
      text
    ) {

      const feedback =
        document.createElement(
          "div"
        );


      feedback.className =
        "quizzy-feedback";


      feedback.textContent =
        text;


      questionElement.appendChild(
        feedback
      );

    }


    /*
     * =======================================================
     * RESTAURATION
     * =======================================================
     */

    restoreSavedState() {

      const saved =
        sessionStorage.getItem(
          this.storageKey
        );


      if (!saved) {

        this.updateSubmitButtonVisibility();

        return;

      }


      try {

        const savedData =
          JSON.parse(
            saved
          );


        /*
         * Vérifier le nombre de questions.
         */

        if (
          savedData.total !==
          this.questions.length
        ) {

          sessionStorage.removeItem(
            this.storageKey
          );


          this.updateSubmitButtonVisibility();


          return;

        }


        /*
         * Restaurer les réponses.
         */

        if (
          Array.isArray(
            savedData.answers
          )
        ) {

          savedData.answers.forEach(
            (
              answerIndex,
              questionIndex
            ) => {

              if (
                answerIndex === null ||
                answerIndex === undefined
              ) {

                return;

              }


              const input =
                this.container.querySelector(
                  `input[name="${this.storageKey}-question-${questionIndex}"][value="${answerIndex}"]`
                );


              if (input) {

                input.checked =
                  true;

              }

            }
          );

        }


        /*
         * Restaurer la correction.
         */

        if (
          savedData.completed === true
        ) {

          this.restoreCorrection(
            savedData
          );

        }
        else {

          this.updateSubmitButtonVisibility();

        }

      }
      catch (error) {

        console.error(
          "Impossible de restaurer Quizzy :",
          error
        );


        sessionStorage.removeItem(
          this.storageKey
        );


        this.updateSubmitButtonVisibility();

      }

    }


    /*
     * =======================================================
     * RESTAURER LA CORRECTION
     * =======================================================
     */

    restoreCorrection(
      resultData
    ) {

      const questionElements =
        this.container.querySelectorAll(
          ".quizzy-question"
        );


      this.questions.forEach(
        (
          question,
          questionIndex
        ) => {

          const questionElement =
            questionElements[
              questionIndex
            ];


          if (!questionElement) {

            return;

          }


          const answers =
            questionElement.querySelectorAll(
              ".quizzy-answer"
            );


          /*
           * Afficher les bonnes réponses.
           */

          question.answers.forEach(
            (
              answer,
              answerIndex
            ) => {

              if (answer.correct) {

                answers[
                  answerIndex
                ].classList.add(
                  "correct"
                );

              }

            }
          );


          /*
           * Réponse sélectionnée.
           */

          const selectedIndex =
            resultData.answers[
              questionIndex
            ];


          if (
            selectedIndex === null ||
            selectedIndex === undefined
          ) {

            return;

          }


          const selectedAnswer =
            question.answers[
              selectedIndex
            ];


          if (!selectedAnswer) {

            return;

          }


          /*
           * Mauvaise réponse.
           */

          if (
            !selectedAnswer.correct
          ) {

            answers[
              selectedIndex
            ].classList.add(
              "incorrect"
            );

          }


          /*
           * Feedback.
           */

          this.addFeedback(
            questionElement,
            selectedAnswer.correct
              ? "✓ Bonne réponse !"
              : "✗ Mauvaise réponse."
          );

        }
      );


      /*
       * Désactiver les réponses.
       */

      this.container
        .querySelectorAll(
          ".quizzy-form input"
        )
        .forEach(
          input => {

            input.disabled =
              true;

          }
        );


      /*
       * Masquer le bouton.
       */

      this.submitButton.style.display =
        "none";


      /*
       * Afficher le résultat.
       */

      this.showResult(
        resultData,
        true
      );

    }


    /*
     * =======================================================
     * AFFICHER LE RESULTAT
     * =======================================================
     */

    showResult(
      resultData,
      restored
    ) {

      this.score.textContent =
        `${resultData.score} / ${resultData.total} — ${resultData.percentage}%`;


      this.scoreMessage.textContent =
        resultData.message;


      this.savedResult.style.display =
        restored
          ? "block"
          : "none";


      this.result.style.display =
        "block";

    }


    /*
     * =======================================================
     * MESSAGE SELON LE SCORE
     * =======================================================
     */

    getScoreMessage(
      percentage
    ) {

      if (
        percentage === 100
      ) {

        return "Excellent ! 🎉";

      }


      if (
        percentage >= 80
      ) {

        return "Très bon résultat !";

      }


      if (
        percentage >= 60
      ) {

        return "Bon résultat, mais il reste quelques notions à revoir.";

      }


      return "Certaines notions méritent d'être revues.";

    }


    /*
     * =======================================================
     * RECOMMENCER
     * =======================================================
     */

    restart() {

      sessionStorage.removeItem(
        this.storageKey
      );


      this.displayQuiz();


      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }


    /*
     * =======================================================
     * SECURITE
     * =======================================================
     */

    escapeHTML(text) {

      return escapeHTML(
        text
      );

    }

  }


  /*
   * =========================================================
   * ECHAPPEMENT HTML
   * =========================================================
   */

  function escapeHTML(text) {

    return String(text)

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /'/g,
        "&#039;"
      );

  }


  /*
   * =========================================================
   * INITIALISATION
   * =========================================================
   */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initializeQuizzy
    );

  }
  else {

    initializeQuizzy();

  }


})();
