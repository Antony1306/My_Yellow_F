/* =====================================
   ELEMENTOS
====================================== */

const inicio =
    document.getElementById("inicio");

const florPantalla =
    document.getElementById("florPantalla");

const revelacion =
    document.getElementById("revelacion");

const carta =
    document.getElementById("carta");

const recuerdo =
    document.getElementById("recuerdo");

const jardinPantalla =
    document.getElementById("jardinPantalla");

const final =
    document.getElementById("final");

const campo =
    document.getElementById("campo");

const petalos =
    document.getElementById("petalos");

const musica =
    document.getElementById("musica");

const musicaBtn =
    document.getElementById("musicaBtn");


let reproduciendo = false;


/* =====================================
   CAMBIO DE PANTALLA
====================================== */

function cambiar(actual, siguiente) {

    actual.classList.add("oculto");

    setTimeout(() => {

        siguiente.classList.remove("oculto");

    }, 850);

}


/* =====================================
   COMENZAR
====================================== */

document
    .getElementById("comenzar")
    .addEventListener(
        "click",
        () => {

            cambiar(
                inicio,
                florPantalla
            );


            musicaBtn.style.display =
                "block";


            musica
                .play()
                .then(() => {

                    reproduciendo = true;

                    musicaBtn.textContent =
                        "🔊";

                })
                .catch(() => {

                    reproduciendo = false;

                    musicaBtn.textContent =
                        "🎵";

                });


            /*
             * La flor permanece
             * unos segundos antes
             * de continuar.
             */

            setTimeout(() => {

                /*
                 * Solo continuamos si
                 * todavía estamos en
                 * la pantalla de la flor.
                 */

                if (
                    !florPantalla
                        .classList
                        .contains("oculto")
                ) {

                    cambiar(
                        florPantalla,
                        revelacion
                    );

                }

            }, 8500);

        }
    );


/* =====================================
   REVELACIÓN → CARTA
====================================== */

document
    .getElementById("abrirHistoria")
    .addEventListener(
        "click",
        () => {

            cambiar(
                revelacion,
                carta
            );

        }
    );


/* =====================================
   CARTA → RECUERDO
====================================== */

document
    .getElementById("continuar")
    .addEventListener(
        "click",
        () => {

            cambiar(
                carta,
                recuerdo
            );

        }
    );


/* =====================================
   RECUERDO → JARDÍN
====================================== */

document
    .getElementById("jardin")
    .addEventListener(
        "click",
        () => {

            cambiar(
                recuerdo,
                jardinPantalla
            );


            /*
             * Esperamos un poquito
             * para que la pantalla
             * esté visible antes
             * de crear las flores.
             */

            setTimeout(() => {

                crearFlores();

            }, 900);

        }
    );


/* =====================================
   CREAR FLORES
====================================== */

function crearFlores() {

    /*
     * Limpiar jardín anterior.
     */

    campo.innerHTML = "";


    const movil =
        window.innerWidth < 600;


    const cantidad =
        movil ? 8 : 14;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const flor =
            document.createElement("div");


        flor.className =
            "flor-pequena";


        /* -----------------------------
           ALTURA
        ----------------------------- */

        const altura =
            movil
                ? 145 + Math.random() * 75
                : 180 + Math.random() * 110;


        flor.style.setProperty(
            "--altura",
            `${altura}px`
        );


        /* -----------------------------
           RETRASO
        ----------------------------- */

        const delay =
            i * 0.18;


        flor.style.setProperty(
            "--delay",
            `${delay}s`
        );


        /* -----------------------------
           BALANCEO
        ----------------------------- */

        const balance =
            1.5 + Math.random() * 2;


        flor.style.setProperty(
            "--balance",
            `${balance}deg`
        );


        const duracion =
            3.5 + Math.random() * 2;


        flor.style.setProperty(
            "--balance-duration",
            `${duracion}s`
        );


        /* -----------------------------
           HTML DE LA FLOR
        ----------------------------- */

        flor.innerHTML = `

            <div class="cabeza"></div>

            <div class="tallo"></div>

        `;


        campo.appendChild(flor);


        /* -----------------------------
           BALANCEO
           DESPUÉS DEL CRECIMIENTO
        ----------------------------- */

        setTimeout(() => {

            flor.classList.add(
                "balanceando"
            );

        }, 1900 + (delay * 1000));

    }

}


/* =====================================
   JARDÍN → FINAL
====================================== */

document
    .getElementById("finalBtn")
    .addEventListener(
        "click",
        () => {

            cambiar(
                jardinPantalla,
                final
            );


            setTimeout(() => {

                lluviaDePetalos();

            }, 900);

        }
    );


/* =====================================
   CONTROL DE MÚSICA
====================================== */

musicaBtn
    .addEventListener(
        "click",
        () => {

            if (!reproduciendo) {

                musica
                    .play()
                    .then(() => {

                        reproduciendo =
                            true;

                        musicaBtn.textContent =
                            "🔊";

                    })
                    .catch(() => {

                        reproduciendo =
                            false;

                    });

            }

            else {

                musica.pause();

                reproduciendo =
                    false;

                musicaBtn.textContent =
                    "🎵";

            }

        }
    );


/* =====================================
   CREAR PÉTALO
====================================== */

function crearPetalo() {

    const petalo =
        document.createElement("div");


    petalo.className =
        "petalo";


    petalo.style.left =
        `${Math.random() * 100}vw`;


    const duracion =
        4 + Math.random() * 5;


    petalo.style.animationDuration =
        `${duracion}s`;


    petalo.style.opacity =
        .4 + Math.random() * .6;


    /*
     * Variación de tamaño.
     */

    const escala =
        .7 + Math.random() * .8;


    petalo.style.transform =
        `scale(${escala})`;


    petalos.appendChild(
        petalo
    );


    setTimeout(() => {

        petalo.remove();

    }, duracion * 1000);

}


/* =====================================
   PRIMERA LLUVIA
====================================== */

function lluviaDePetalos() {

    for (
        let i = 0;
        i < 50;
        i++
    ) {

        setTimeout(
            crearPetalo,
            i * 100
        );

    }

}


/* =====================================
   LLUVIA CONTINUA
====================================== */

setInterval(
    () => {

        if (
            !final
                .classList
                .contains("oculto")
        ) {

            crearPetalo();

        }

    },
    400
);


/* =====================================
   CONTROL DE ERROR DE FOTO
====================================== */

const imagenRecuerdo =
    document.querySelector(
        "#recuerdo .marco-foto img"
    );


if (imagenRecuerdo) {

    imagenRecuerdo.addEventListener(
        "error",
        () => {

            imagenRecuerdo.alt =
                "No se pudo cargar la fotografía";

            imagenRecuerdo.style.minHeight =
                "220px";

            imagenRecuerdo.style.objectFit =
                "contain";

            imagenRecuerdo.style.padding =
                "30px";

        }
    );

}