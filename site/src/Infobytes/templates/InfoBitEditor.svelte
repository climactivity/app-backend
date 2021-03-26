<script lang="ts">
  import { exampleSetup } from "prosemirror-example-setup";
  import ProsemirrorEditor from "prosemirror-svelte";
  import {
    createRichTextEditor,
    fromJSON,
    richTextSchema,
    toJSON,
  } from "prosemirror-svelte/state";
  import { beforeUpdate, onDestroy, onMount } from "svelte";
  import { currentInfobit, currentInfobitIndex } from "../../stores";

  export let value;

  const plugins = exampleSetup({
    schema: richTextSchema,
    history: false,
    floatingMenu: false,
  });

  // create the initial editor state
  let editorState = createRichTextEditor("", plugins);
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

  const unsubscribe = currentInfobit.subscribe((infobit) => {
    if (!infobit) return;
    editorState = fromJSON(infobit, richTextSchema, plugins);
  });

  onDestroy(unsubscribe);
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
