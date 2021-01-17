<script lang="ts">
    import {Input} from 'sveltestrap';

    export let answer: string
</script>

<td><Input row="1" type="textarea" value={answer}/></td>
