<script lang="ts">
    import {ButtonGroup, Card, Row, Button} from 'sveltestrap'; 
    export let image;
    console.log(image)
</script>

<style>
    .thumb {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
        padding: 10px;
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

<div class="container">
    <div class="row">
        <div class="row-item">
            <a href={image.relativeUrl} target="_blank">
                <img class="thumb" src={image.relativeUrl} alt={image.title} />
            </a>
        </div>
        <div class="row-item">
            {image.title} <br/>
            {`(C)${image.credit}, Lizenz: ${image.license}`}
        </div>
        <div class="row-item">
            <button>Link Kopieren</button>
        </div>
    </div>
</div>
