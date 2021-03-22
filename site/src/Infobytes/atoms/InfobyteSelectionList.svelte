<script lang="ts">
    import { ListGroup, ListGroupItem } from "sveltestrap";
    import { baseUrl, currentInfobyte, Infobyte } from "../../stores";

    export let infobytes: infobyteName[];

    interface infobyteName {
        _id: string;
        name: string;
    }

    let selectedInfobyte: Infobyte;

    currentInfobyte.subscribe((value) => {
        if (!selectedInfobyte) selectedInfobyte = value;
        if (!value || value._id !== selectedInfobyte._id) {
            refetch().then((infobyteNames) => (infobytes = infobyteNames));
        }
        selectedInfobyte = value;
    });

    const refetch = async (): Promise<infobyteName[]> => {
        const response = await fetch(`${baseUrl}infobyte`, {
            credentials: "include",
        });
        let infoByteNames: infobyteName[] = await response.json();
        return infoByteNames;
    };

    const onInfobyteSelected = async (infobyte: {
        name: string;
        _id: string;
    }) => {
        const fetchedInfobyte = await fetchInfobyte(infobyte._id);
        currentInfobyte.set(fetchedInfobyte);
    };

    const fetchInfobyte = async (id: string): Promise<Infobyte> => {
        if (!id) return;
        const response = await fetch(`${baseUrl}infobyte/${id}`, {
            credentials: "include",
        });
        return (await response.json()) as Infobyte;
    };
</script>

<ListGroup vertical>
    {#each infobytes as infobyte}
        <ListGroupItem
            tag="button"
            action
            on:click={() => onInfobyteSelected(infobyte)}
            active={selectedInfobyte._id === infobyte._id}
        >
            {infobyte.name}
        </ListGroupItem>
    {/each}
</ListGroup>
