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
        Input, InputGroup, InputGroupAddon, InputGroupText,
        ButtonGroup,
        ButtonToolbar,
    } from "sveltestrap";
    import { baseUrl } from "../stores";
    import ImageThumbnail from "./ImageThumbnail.svelte";
    let query = ""

    let offset = 0;
    let pageSize = 20;
    let hasNext = true; 
    let hasPrev = false; 
    const fetchPage = async () => {
        const response = await fetch(
            `${baseUrl}image-upload?${new URLSearchParams({
                offset: offset + "",
                pageSize: pageSize + "",
                query: query
            })}`,
            {
                credentials: "include",
            }
        );
        return await response.json();
    };


    export const refetch = () => {
        page = fetchPage()
    }

    let page: Promise<any> = fetchPage();
    const nextPage = async () => {
        const {count} = await page
        offset = Math.min(count, offset +pageSize);
        refetch()
    };
    const prevPage = () => {
        offset = Math.max(0, offset - pageSize);
        refetch()
    };
    const firstPage = () => {
        offset = 0;
        refetch()
    };
    const lastPage = () => {
        offset = 0;
        refetch()
    };

    const setPage = (pageNum) => {
        offset = pageNum * pageSize
        refetch()
    }

    var timeout 
    $: if (query !== null) {
        clearInterval(timeout);
        timeout = setTimeout(function() {
            offset = 0;
            refetch();
         }, 300);
    };
</script>

<style>
    .grid {
        display: grid;
        padding: 10px;
        grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
        max-width: 100%;
    }


</style>
<Row>
    <Card>
        <CardHeader style="display: flex; align-items: center; justify-content: space-around; flex-direction: row; ">
            Bilder Gallerie
            <InputGroup style="max-width:300px">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>🔎</InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Suchbegriff"
                    bind:value={query}
                />
            </InputGroup>
    </CardHeader>
        
            {#await page then data}
                {#if Array.isArray(data.data)}
                <CardBody >
                    <div class="grid grid-cols">
                    {#each data.data as image}
                    
                        <ImageThumbnail {image} />
                    {/each}
                    </div>
                </CardBody>
                <CardFooter>
                    <ButtonToolbar style="width: 100%;">
                        <Button on:click={firstPage} disabled={offset == 0}>&lt;&lt;</Button>
                        <Button on:click={prevPage} disabled={offset == 0}>&lt;</Button>
                        {#each Array(Math.ceil(data.count / pageSize)) as _, pageNum }
                            <Button outline on:click={() => setPage(pageNum)}> {pageNum+1} </Button>
                        {/each}
                        <Button on:click={nextPage} disabled={offset + pageSize >= data.count}>&gt;</Button>
                        <Button on:click={lastPage} disabled={offset + pageSize >= data.count}>&gt;&gt;</Button>
                    </ButtonToolbar>
                    {offset +1} bis {Math.min(offset + pageSize, data.count)} von {data.count} Bilder(n) insgesammt
                </CardFooter>
    
                {:else}
                    <CardBody>Ein Fehler ist Aufgetreten: {data}!</CardBody>
                {/if}
    
            {/await}
    </Card>
</Row>
