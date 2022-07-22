<script lang="ts">
import ContentEditorSection from "$lib/components/Editor/content-editor-section.svelte";
import ContentEditor from "$lib/components/Editor/content-editor.svelte";
import type { Content } from "$lib/components/Editor/editor-types";
import ImageUpload from "$lib/components/Media/ImageUpload.svelte";


export let data: Content = {
    title: "",
    published: false
} 

</script>
<div>
    <ContentEditor bind:data title="Neues Bild" saveTarget="localized-aspect">
        <ContentEditorSection label="Neues Bild" >
            <ImageUpload />
        </ContentEditorSection>
    </ContentEditor>
</div>