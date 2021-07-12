<script lang="ts">
    export let infobit;

    import Meta from 'svelte-meta';

    import { addListNodes } from "prosemirror-schema-list";
    import { Schema } from "prosemirror-model";
    import {EditorState} from 'prosemirror-state';
    import ProsemirrorEditor from "prosemirror-svelte";

    import { exampleSetup } from "prosemirror-example-setup";
    import {
        createRichTextEditor,
        fromJSON,
        richTextSchema,
        toHTML,
    } from "prosemirror-svelte/state";

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
    const markup = toHTML(editorState)

</script>
<Meta
  title="Climactivity"
  description="gemeinsam zum klimaziel"
  image="img/logo.png"
  url="https://app.climactivity.de"
/>
 {@html markup}