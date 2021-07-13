<script lang="ts">
    import { addListNodes } from "prosemirror-schema-list";
    import { Schema } from "prosemirror-model";
    import { exampleSetup } from "prosemirror-example-setup";
    import {
        fromJSON,
        richTextSchema,
        toHTML,
    } from "prosemirror-svelte/state";

    export let infobit;

    const mySchema = new Schema({
        nodes: addListNodes(
            richTextSchema.spec.nodes,
            "paragraph block*",
            "block"
        ),
        marks: richTextSchema.spec.marks,
    });
    const plugins = exampleSetup({
        schema: mySchema,
        history: false,
        floatingMenu: false,
    });
    let editorState = fromJSON(infobit, mySchema, plugins);
    const markup = toHTML(editorState);
</script>

{@html markup}
