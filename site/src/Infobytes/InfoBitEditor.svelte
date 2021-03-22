<script lang="ts">
  import { exampleSetup } from "prosemirror-example-setup";
  import ProsemirrorEditor from "prosemirror-svelte";
  import {
    createRichTextEditor,
    fromJSON,
    richTextSchema,
    toJSON,
  } from "prosemirror-svelte/state";
  import { onMount } from "svelte";

  export let value;
  const plugins = exampleSetup({
    schema: richTextSchema,
    history: false,
    floatingMenu: false,
  });

  const rehydrateEditorState = (jsonData) => {
    try {
      return fromJSON(jsonData, richTextSchema, plugins);
    } catch (e) {
      console.log("Could not restore Prosemirror state from json", e);
      return createRichTextEditor("", plugins);
    }
  };

  // create the initial editor state
  let editorState = value
    ? rehydrateEditorState(value)
    : createRichTextEditor("", plugins);
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
</script>

<div class="infobit-editor justify-content-between">
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
  .infobit-editor {
    background-color: var(--grey);
    border: 1px solid var(--grey);
    border-radius: 4px;
  }
  .editor {
    background-color: white;
    max-height: 600px;
    overflow: auto;
  }
</style>
