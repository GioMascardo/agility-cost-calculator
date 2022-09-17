<script lang="ts">
  import Actions from './lib/Actions.svelte';
  import Dashboard from './lib/Dashboard.svelte';
  import fetchRoleList from "./lib/helper/fetchRolesList";
  import { v4 as uuidv4 } from 'uuid'
  import Summary from './lib/Summary.svelte';
  import EmptyState from './lib/EmptyState.svelte';
  
  $: entryList = [];
  $: addRoleHandler = async (event) => {
    let newEntry;
    newEntry = await fetchRoleList(event.detail.role);
    let uuid = uuidv4();
    newEntry = [...newEntry, {id: uuid}]
    entryList = [...entryList, newEntry];
  }

  // newEntry = [[{...}, {...}, {id: ...}]]
  // entry = [{...}, {...}, {id: ...}]

  $: deleteDispatchHandler = (event) => {
    entryList = entryList.filter(entry => entry[2].id !== event.detail);
  }

</script>

<main class="calculator">
  <Actions on:addRole={addRoleHandler}/>
  {#if entryList.length === 0}
    <EmptyState on:addRole={addRoleHandler} />
  {:else}
    <Dashboard {entryList} on:delete={deleteDispatchHandler} />
    <Summary />
  {/if}
</main>

<style>

</style>
