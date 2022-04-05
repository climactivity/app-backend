<script lang="ts">
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
</script>

<style lang="css">
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
    }
    .footer > ul > li {
        list-style: none;
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
    .socials > li {
        display: inline;
    }

</style>

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
