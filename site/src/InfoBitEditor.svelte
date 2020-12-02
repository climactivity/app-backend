<script lang="js">
  import { onMount } from 'svelte';
  import ProsemirrorEditor from 'prosemirror-svelte';
  import {
    createRichTextEditor,
    toPlainText,
    fromJSON,
    toJSON,
    clear,
    toggleMark,
    setBlockType,
    toHTML,
    richTextSchema
  } from 'prosemirror-svelte/state';
  import {
    getCurrentMarks,
    getNodeTypeAtSelectionHead,
  } from 'prosemirror-svelte/helpers';

  export let value;
  const plugins = [];

  // create the initial editor state
  console.log(value)
  let editorState = fromJSON(value, richTextSchema)
  let focusEditor;
  //let editorState = createRichTextEditor()

  function handleTransaction(event) {
    // get the new editor state from event.detail
    editorState = event.detail.editorState;
    value = toJSON(editorState);
  }

  function clearEditor(event) {
    editorState = clear(editorState);
    focusEditor();
  }

  function resetEditor(event) {
    editorState = createRichTextEditor(value);
    focusEditor();
  }

  function handleToggleBold(event) {
    editorState = toggleMark(editorState, 'strong');
  }

  function handleSetBlockType(type, attrs = null) {
    return function (event) {
      editorState = setBlockType(editorState, type, attrs);
      value = toJSON(editorState);

    };
  }

  function preventDefault(event) {
    event.preventDefault();
  }

  function getBlockType(node) {
    if (!node) return null;
    if (
      node.attrs &&
      typeof node.attrs.level !== 'undefined' &&
      node.attrs.level !== null
    ) {
      return `${node.type.name}-${node.attrs.level}`;
    } else {
      return node.type.name;
    }
  }

  $: currentMarks = editorState ? getCurrentMarks(editorState) : null;
  $: activeMarks = currentMarks ? Object.keys(currentMarks.activeMarks) : [];
  $: nodeAtSelectionHead = editorState
    ? getNodeTypeAtSelectionHead(editorState)
    : {};
  $: activeBlockType = getBlockType(nodeAtSelectionHead);
  $: isBold =
    currentMarks && currentMarks.activeMarks && currentMarks.activeMarks.strong;

  onMount(() => focusEditor());
  // log the text content of the editor state, just for fun
  //$: value = toJSON(editorState);
</script>

<style>
  .controls {
    display: flex;
    padding: 0;
  }
  .controls > button {
    min-width: auto;
    margin-right: 1em;
    padding: 1em;
  }
  .infobit-editor {
    padding: 8px;
    border-radius: 8px;
    margin-top: 1em;
    margin-bottom: 1em;
    background-color: var(--grey);
  }
  .editor {
    background-color: white;
    padding: 2px;

  }
</style>

<div class="infobit-editor">
  <div class="controls">
    <button on:click={clearEditor}>Clear</button>
    <!--<button on:click={resetEditor}>Reset</button> really broken :/-->

    <button
      style="margin-left: .5em"
      on:click={handleToggleBold}
      on:mousedown={preventDefault}>
      {#if isBold}Too bold for me{:else}Make it bold{/if}
    </button>

    <button
      style="margin-left: .5em"
      disabled={activeBlockType === 'paragraph'}
      on:click={handleSetBlockType('paragraph')}
      on:mousedown={preventDefault}>p</button>

    <button
      disabled={activeBlockType === 'heading-1'}
      on:click={handleSetBlockType('heading', { level: 1 })}
      on:mousedown={preventDefault}>h1</button>

    <button
      disabled={activeBlockType === 'heading-2'}
      on:click={handleSetBlockType('heading', { level: 2 })}
      on:mousedown={preventDefault}>h2</button>

    <button
      disabled={activeBlockType === 'heading-3'}
      on:click={handleSetBlockType('heading', { level: 3 })}
      on:mousedown={preventDefault}>h3</button>
  </div>
  
  <div class="editor">
  <ProsemirrorEditor
    placeholder="Go ahead and type something"
    {editorState}
    bind:focus={focusEditor}
    on:transaction={handleTransaction} />
  </div>
 
</div>
