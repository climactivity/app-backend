<script lang="ts">
    export let title: string;

    const noTitleText: string = "No Aspect title found";
</script>

<h4 class="mt-3">{title ? title : noTitleText}</h4>
