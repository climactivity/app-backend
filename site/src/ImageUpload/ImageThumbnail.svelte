<script lang="ts">
    import {
        ButtonGroup,
        Card,
        Row,
        Button,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
    } from "sveltestrap";
import RewardDisplayer from "../Rewards/RewardDisplayer.svelte";
    import { baseUrl } from "../stores";
    export let image;

    export let imageModifiedCallback: Function;
    let modalOpen = false;

    const toggleModal = () => {
        modalOpen = !modalOpen;
    };

    const updateImage = () => {};

    const deleteImage = () => {
        console.log(image._id)
        fetch(`${baseUrl}image-upload/delete/${image._id}`, {
            method: "DELETE",
        }).then( async (res) => {
            console.log(res);
            if (+status <= 400) {
                if (imageModifiedCallback !== null) {
                    toggleModal()
                    imageModifiedCallback();
                    console.log(await res.json())
                }
            }
        }).then(data => {
            console.log(data)
        });
    };
</script>

<div class="container">
    <div class="row">
        <div style="width: 100%; display: flex; flex-direction: row-reverse;">
            <button on:click={toggleModal}>X</button>
        </div>

        <div class="row-item">
            <a href={image.relativeUrl} target="_blank">
                <img class="thumb" src={image.relativeUrl} alt={image.title} />
            </a>
        </div>
        <div class="row-item">
            {image.title} <br />
            {`©${image.credit}, Lizenz: ${image.license}`}
        </div>
        <div class="row-item">
            <button
                on:click={(e) => {
                    navigator.clipboard
                        .writeText(
                            `${window.location.protocol}//${window.location.host}${image.relativeUrl}`
                        )
                        .then(
                            function () {
                                console.log(
                                    `${baseUrl.slice(0, -1)}${
                                        image.relativeUrl
                                    }`
                                );
                            },
                            function (err) {
                                console.error(
                                    "Async: Could not copy text: ",
                                    err
                                );
                            }
                        );
                }}>Link Kopieren</button
            >
        </div>
    </div>
</div>

<Modal isOpen={modalOpen} {toggleModal} transitionOptions>
    <ModalHeader toggle={toggleModal}>Bild löschen</ModalHeader>
    <ModalBody>Kann nicht rückgängig gemacht werden!</ModalBody>
    <ModalFooter>
        <Button danger on:click={deleteImage}>Löschen</Button>
    </ModalFooter>
</Modal>

<style>
    .thumb {
        width: 200px;
        height: 200px;
        object-fit: contain;
    }
    .row {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px;
        border-radius: 5px;
        border-color: lightgray;
        border-width: 1px;
        border-style: solid;
    }
    .row-item {
        width: auto;
    }
</style>
