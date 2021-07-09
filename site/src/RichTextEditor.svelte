<script lang="ts">
  import ProsemirrorEditor from "prosemirror-svelte";
  import { exampleSetup } from "prosemirror-example-setup";
  import { addListNodes } from "prosemirror-schema-list";
  import { Schema, DOMParser } from "prosemirror-model";
  import {EditorState, TextSelection} from 'prosemirror-state';
  import {
    createRichTextEditor,
    fromJSON,
    richTextSchema,
    toJSON,
  } from "prosemirror-svelte/state";
  import { beforeUpdate, onDestroy, onMount } from "svelte";
  import { currentInfobit, currentInfobitIndex } from "./stores";

  export let value;
  export let key;
  const mySchema = new Schema({
    nodes: addListNodes(richTextSchema.spec.nodes, "paragraph block*", "block"),
    marks: richTextSchema.spec.marks,
  });
  const plugins = exampleSetup({
    schema: mySchema,
    history: false,
    floatingMenu: false,
  });
  console.log(mySchema, richTextSchema);
  // create the initial editor state
  let editorState = EditorState.create({
        schema: mySchema,
        doc: undefined,
        selection: undefined,
        plugins,
      });
  const updateEditorState = (key) => {
    console.log(key, value);
    try {
      editorState = fromJSON(value, mySchema, plugins);
    } catch (e) {

      editorState =  EditorState.create({
        schema: mySchema,
        doc: undefined,
        selection: undefined,
        plugins,
      });

      //editorState = createRichTextEditor(value, plugins);
      console.log(value)
      console.log(e);
    }
  };
  let focusEditor;

  function handleTransaction(event) {
    preventDefault(event);

    // get the new editor state from event.detail
    editorState = event.detail.editorState;
    value = toJSON(editorState);
  }

  function preventDefault(event) {
    event.preventDefault();
  }
  onMount(() => focusEditor());

  $: updateEditorState(key);
</script>

<div class="pm-editor justify-content-between">
  <div class="editor">
    <ProsemirrorEditor
      placeholder="Go ahead and type something"
      {editorState}
      bind:focus={focusEditor}
      on:transaction={handleTransaction}
    />
  </div>
</div>

<style>
  .pm-editor {
    background-color: var(--grey);
    border: 1px solid var(--grey);
    border-radius: 4px;
  }
  .editor {
    background-color: white;
    height: 50vh;
    overflow: auto;
  }

  :global(.ProseMirror-menubar-wrapper) {
    height: 46vh;
  }
  :global(.ui-editor) {
    height: 46vh;
  }
</style>
