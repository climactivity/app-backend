<script lang="ts">
  import { browser } from "$app/env";
  import ProsemirrorEditor from "prosemirror-svelte";
  import { pluginSetup } from "./PluginSetup";
  import { addListNodes } from "prosemirror-schema-list";
  import { Schema } from "prosemirror-model";
  import { EditorState } from "prosemirror-state";
  import { fromJSON, richTextSchema, toJSON } from "prosemirror-svelte/state";
  import { beforeUpdate, onDestroy, onMount } from "svelte";
  import { currentInfobit, currentInfobitIndex } from "$lib/stores/stores";

  export let value;
  export let key;
  let editorState;
  let focusEditor;
  if (browser) {
    const mySchema = new Schema({
      nodes: addListNodes(
        richTextSchema.spec.nodes,
        "paragraph block*",
        "block"
      ),
      marks: richTextSchema.spec.marks,
    });
    const plugins = pluginSetup({
      schema: mySchema,
      history: false,
      floatingMenu: false,
    });
    console.log(mySchema, richTextSchema);
    // create the initial editor state
    editorState = EditorState.create({
      schema: mySchema,
      doc: undefined,
      selection: undefined,
      plugins,
    });
    const updateEditorState = (key) => {
      console.log(key, value);
      if (value === undefined) {
        editorState = EditorState.create({
          schema: mySchema,
          doc: undefined,
          selection: undefined,
          plugins,
        });
      } else {
        try {
          editorState = fromJSON(value, mySchema, plugins);
        } catch (e) {
          editorState = EditorState.create({
            schema: mySchema,
            doc: undefined,
            selection: undefined,
            plugins,
          });

          //editorState = createRichTextEditor(value, plugins);
          console.log(value);
          console.log(e);
        }
      }
    };
  }
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

  //$: updateEditorState(key);
</script>

<svelte:head>
	<link rel="stylesheet" href="/styles/pm-menu.css">
</svelte:head>

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


/* Add space around the hr to make clicking it easier */

:global(.ProseMirror-example-setup-style hr) {
  padding: 2px 10px;
  border: none;
  margin: 1em 0;
}

:global(.ProseMirror-example-setup-style hr:after) {
  content: "";
  display: block;
  height: 1px;
  background-color: silver;
  line-height: 2px;
}

:global(.ProseMirror ul, .ProseMirror ol) {
  padding-left: 30px;
}

:global(.ProseMirror blockquote) {
  padding-left: 1em;
  border-left: 3px solid #eee;
  margin-left: 0; margin-right: 0;
}

:global(.ProseMirror-example-setup-style img) {
  cursor: default;
}

:global(.ProseMirror-prompt) {
  background: white;
  padding: 5px 10px 5px 15px;
  border: 1px solid silver;
  position: fixed;
  border-radius: 3px;
  z-index: 11;
  box-shadow: -.5px 2px 5px rgba(0, 0, 0, .2);
}

:global(.ProseMirror-prompt h5) {
  margin: 0;
  font-weight: normal;
  font-size: 100%;
  color: #444;
}

:global(.ProseMirror-prompt input[type="text"],
.ProseMirror-prompt textarea) {
  background: #eee;
  border: none;
  outline: none;
}

:global(.ProseMirror-prompt input[type="text"]) {
  padding: 0 4px;
}

:global(.ProseMirror-prompt-close) {
  position: absolute;
  left: 2px; top: 1px;
  color: #666;
  border: none; background: transparent; padding: 0;
}

:global(.ProseMirror-prompt-close:after) {
  content: "✕";
  font-size: 12px;
}

:global(.ProseMirror-invalid) {
  background: #ffc;
  border: 1px solid #cc7;
  border-radius: 4px;
  padding: 5px 10px;
  position: absolute;
  min-width: 10em;
}

:global(.ProseMirror-prompt-buttons) {
  margin-top: 5px;
  display: none;
}



</style>
