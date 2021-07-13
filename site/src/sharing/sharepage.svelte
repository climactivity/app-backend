<script lang="ts">
    import InfobitDisplay from "./InfobitDisplay.svelte";
    import Meta from "svelte-meta";

    export let infobyte;
    export let index;
    const url = `${window.location.origin}/sharing/${infobyte}/${index}`;
    const infobyteContent = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());

    //icons
    import { library } from "@fortawesome/fontawesome-svg-core";
    import {
        faInstagram,
        faFacebook,
        faTwitter,
        faLinkedin,
        faYoutube,
    } from "@fortawesome/free-brands-svg-icons";
    import {
        FontAwesomeIcon,
        FontAwesomeLayers,
        FontAwesomeLayersText,
    } from "fontawesome-svelte";
    library.add(faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube);

    // app store
</script>

<Meta
    title="Climactivity"
    description="gemeinsam zum klimaziel"
    image="/img/logo.png"
    url="https://app.climactivity.de"
/>

<container class="wrapper">
    <div class="content">
        <div class="infobit">
            {#await infobyteContent}
                fatching...
            {:then data}
                {#if data.statusCode == 400}
                    <span>{data.message}</span>
                {:else}
                    <article>
                        <h1>{data.title}</h1>
                        <InfobitDisplay infobit={data} />
                    </article>
                {/if}
            {:catch errors}
                <span>{errors.message}</span>
            {/await}
        </div>

        <div class="call-to-action">
            <h1>Die Climacitivity App</h1>

            <img alt="Climacitvity App Icon" src="/img/app-icon.png" />

            <p>
                In unserer App gehst du mit deinem Team ein Jahr lang die Big
                Points des Klimaschutzes durch. Je nach dem, wie gut du mit
                deinem Klimaziel voran kommst, wachsen in der App deine Bäume.
                Dabei steht dir Kiko stets mit Rat und Tat zur Seite.
            </p>
            <div class="store-buttons">
                <a
                    class="store-banner"
                    href="https://testflight.apple.com/join/3XTlTjt3"
                >
                    <img alt="Jetzt im App Store" src="/img/appstore.png" /></a
                >
                <a
                    class="store-banner"
                    href="https://play.google.com/store/apps/details?id=de.climactivity.climactivityapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                    ><img
                        alt="Jetzt bei Google Play"
                        src="https://play.google.com/intl/en_us/badges/static/images/badges/de_badge_web_generic.png"
                    /></a
                >
            </div>
        </div>

    </div>
    <footer class="footer">
        <div class="footer-container">
            <a href="http://climactivity.de/"
                ><img
                    class="logo"
                    src="/img/logo.png"
                    alt="Climacitivity Hauptseite"
                /></a
            >
        </div>

        <span class="footer-container">
            © 2021 – Klimaschutz For All e.V.
        </span>

        <ul class="footer-container socials">
            <li>
                <a
                    class="social-icon-instagram shape-none"
                    rel="nofollow"
                    target="_blank"
                    href="https://www.instagram.com/climactivity/"
                    ><FontAwesomeIcon icon={faInstagram} /></a
                >
            </li>
            <li>
                <a
                    class="social-icon-facebook shape-none"
                    rel="nofollow"
                    target="_blank"
                    href="https://www.facebook.com/climactivity/"
                    ><FontAwesomeIcon icon={faFacebook} /></a
                >
            </li>
            <li>
                <a
                    class="social-icon-twitter shape-none"
                    rel="nofollow"
                    target="_blank"
                    href="https://twitter.com/climactivity"
                    ><FontAwesomeIcon icon={faTwitter} /></a
                >
            </li>
            <li>
                <a
                    class="social-icon-linkedin shape-none"
                    rel="nofollow"
                    target="_blank"
                    href="https://www.linkedin.com/company/climactivity-gemeinsam-zum-klimaziel"
                    ><FontAwesomeIcon icon={faLinkedin} /></a
                >
            </li>
            <li>
                <a
                    class="social-icon-youtube-play shape-none"
                    rel="nofollow"
                    target="_blank"
                    href="https://www.youtube.com/channel/UCtvM1pUmM3KqXFxLanvoTQg"
                    ><FontAwesomeIcon icon={faYoutube} /></a
                >
            </li>
        </ul>

        <ul class="footer-container">
            <li>
                <a href="http://climactivity.de/newsletter">Newsletter</a>
            </li>
            <li>
                <a href="http://climactivity.de/impressum">Impressum</a>
            </li>
            <li>
                <a href="https://climactivity.de/datenschutzerklaerung"
                    >Datenschutzerklärung</a
                >
            </li>
        </ul>
    </footer>
</container>

<style lang="scss">
    * {
        font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Helvetica Neue", Arial, sans-serif;
        line-height: 1.618;
        text-rendering: optimizeLegibility;     
        margin: 0;
        padding: 0;

    }
    .wrapper {
        display: flex;
        flex-grow: 1;
        margin: auto 0;
        flex-direction: column;
        min-height: 95vh;
        align-items: center;
    }
    article {
        padding: 2rem;
        margin: 2rem;
    }
    .footer {
        margin-top: auto;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        align-items: center;
        background-color: rgb(249, 249, 249);
        > ul {
            list-style: none;
        }
    }
    .logo {
        width: 150px;
        height: 150px;
        display: block;
        object-fit: contain;
        margin: auto;
    }
    .footer-container {
        margin: 0 auto;
    }
    .socials {
        > li {
            display: inline;
        }
    }
    .store-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
    }
    .store-banner {
        > img {
            display: block;
            object-fit: contain;
            margin: auto;
            max-width: 100%;
            max-height: 100%;
        }
        width: 150px;
        max-height: 150px;
    }
    .call-to-action {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        padding: 4rem;
        max-width: 1140px;
        background-color: #edf4d9;
        //margin: 2rem;
        // border-radius: 64px;
    }
    .content {
        max-width: 1140px;
    }
    .section-break {
        overflow: hidden;
        position: relative;
        left: 0;
        width: 100%;
        line-height: 0;
        direction: ltr;
        z-index: -10;
        max-width: 100% !important;
        background-color: #edf4d9;
    }
    .shape {
        display: block;
        width: calc(100% + 1.3px);
        position: relative;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .shape-fill {
        fill: rgb(255, 255, 255);
        -webkit-transform-origin: center;
        -ms-transform-origin: center;
        transform-origin: center;
        -webkit-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }
</style>
