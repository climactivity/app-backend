<script lang="ts">
  import { onMount } from "svelte";
  import {
    Alert,
    ListGroup,
    ListGroupItem,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Col,
    Row,
Form,
  } from "sveltestrap";

  import ProsemirrorEditor from "prosemirror-svelte";
  import {
    createRichTextEditor,
    toPlainText,
    fromJSON,
    toJSON,
    clear,
    toggleMark,
    setBlockType,
    toHTML,
    richTextSchema,
  } from "prosemirror-svelte/state";

  import { baseUrl } from "../stores";

  import {
    getCurrentMarks,
    getNodeTypeAtSelectionHead,
  } from "prosemirror-svelte/helpers";
  import {exampleSetup} from "prosemirror-example-setup"
  export let value;
  const plugins = exampleSetup({schema: richTextSchema, history: false, floatingMenu: false});



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

  function clearEditor(event) {
    preventDefault(event);

    editorState = clear(editorState);
    focusEditor();
  }

  function resetEditor(event) {
    preventDefault(event);

    editorState = createRichTextEditor(value);
    focusEditor();
  }

  function handleToggleItalics(event) {
    preventDefault(event);
    editorState = toggleMark(editorState, "em");
  }

  function handleToggleBold(event) {
    preventDefault(event);
    editorState = toggleMark(editorState, "strong");
  }

  function handleSetBlockType(type, attrs = null) {
    return function (event) {
      preventDefault(event);

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
      typeof node.attrs.level !== "undefined" &&
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

  $: isItalics =
    currentMarks && currentMarks.activeMarks && currentMarks.activeMarks.strong;

  onMount(() => focusEditor());
  // log the text content of the editor state, just for fun
  //$: value = toJSON(editorState);
 
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
  .controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
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
