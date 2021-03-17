<script lang="ts">
   import { NavLink } from 'sveltestrap';
   export var target;
   export var name;
   export var currentTab;
   $: currentTab
   export var callback; 
   export var disabled;
</script>

<NavLink  on:click={callback(target)} active={currentTab === target} disabled={disabled}>
    <slot/>
</NavLink>
