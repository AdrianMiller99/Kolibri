import { dom } from "../../../kolibri/util/dom.js";
import { Page } from "../../../kolibri/navigation/page/page.js";
import { URI_HASH_HOME, href, URI_HASH_SPINNER } from "../../../customize/uriHashes.js";

export { SpinnerPage };

const PAGE_CLASS = URI_HASH_SPINNER.substring(1);
const ACTIVATION_MS = 2000;
const PASSIVATION_MS = 1000;
const TITLE = "Spinner Page";

const SpinnerPage = () => Page({
    titleText: TITLE,
    activationMs: ACTIVATION_MS,
    passivationMs: PASSIVATION_MS,
    pageClass: PAGE_CLASS,
    styleElement,
    contentElement,
});

const [contentElement] = dom(`
    <div class="${PAGE_CLASS} page-content">
        <div class="card">
            <h1>${TITLE}</h1>
            <section>
                <p>This page demonstrates a rotating/zooming transition with a simple spin animation effect.</p>
                <p>Check out the <a ${href(URI_HASH_HOME)}>Home Page</a> to see the exit animation.</p>
            </section>
        </div>
    </div>
`);

const [styleElement] = dom(`
    <style data-style-id="${PAGE_CLASS}">
        @layer pageLayer {
            .${PAGE_CLASS} {
                --activation-ms: ${ACTIVATION_MS};
                --passivation-ms: ${PASSIVATION_MS};

                display: flex;
                justify-content: center;
                align-items: flex-start;
                min-height: 100%;
                padding: 2em;

                .card {
                    background: var(--kb-color-hsl-bg-light);
                    box-shadow: var(--kolibri-box-shadow);
                    max-width: 30em;
                    padding: 2em;
                    border-radius: 0.5em;
                }

                &.activate {
                    animation: page-fade-in calc(var(--activation-ms) * 1ms) ease-out forwards;

                    .card {
                        animation: card-activate calc(var(--activation-ms) * 1ms) cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    }
                }

                &.passivate {
                    animation: page-fade-out calc(var(--passivation-ms) * 1ms) ease-in forwards;

                    .card {
                        animation: card-passivate calc(var(--passivation-ms) * 1ms) cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
                    }
                }
            }

            /* Card Activation: rotate in from -180deg, scale from small to normal */
            @keyframes card-activate {
                0% {
                    opacity: 0;
                    transform: rotate(-180deg)  scale(0.5);
                }
                100% {
                    opacity: 1;
                    transform: rotate(0deg)     scale(1);
                }
            }

            /* Card Passivation: rotate out to 180deg, scale down */
            @keyframes card-passivate {
                0% {
                    opacity: 1;
                    transform: rotate(0deg)     scale(1);
                }
                100% {
                    opacity: 0;
                    transform: rotate(180deg)   scale(0.5);
                }
            }
        }
    </style>
`);
