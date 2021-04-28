<script lang="ts">
    import {
        Row,
        Col,
        Card,
        CardBody,
        CardFooter,
        CardTitle,
        CardHeader,
        Button,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
        Input,
    } from "sveltestrap";
    import { baseUrl } from "../stores";
    import ImageThumbnail from "./ImageThumbnail.svelte";

    let offset = 0;
    let pageSize = 10;

    const fetchPage = async () => {
        const response = await fetch(
            `${baseUrl}image-upload?${new URLSearchParams({
                offset: offset + "",
                pageSize: pageSize + "",
            })}`,
            {
                credentials: "include",
            }
        );
        return await response.json();
    };

    let page: Promise<any> = fetchPage()
</script>

<Row>
    <Card>
        <CardHeader>Bilder</CardHeader>
        <CardBody>
            {#await page then data}
                {#if Array.isArray(data)}
                    {#each data as image}
                        <ImageThumbnail {image} />
                    {/each}
                {:else}
                    <div>Ein Fehler ist Aufgetreten: {data}!</div>
                {/if}
            {/await}
        </CardBody>
        <CardFooter />
    </Card>
</Row>
