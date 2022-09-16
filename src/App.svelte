<script lang="ts">
  import Actions from './lib/Actions.svelte';
  import Dashboard from './lib/Dashboard.svelte';
  import fetchRoleList from "./lib/helper/fetchRolesList";
  import { v4 as uuidv4 } from 'uuid'
  
  $: entryList = [];
  $: addRoleHandler = async (event) => {
    let newEntry;
    newEntry = await fetchRoleList(event.detail.role);
    let uuid = uuidv4();
    newEntry = [...newEntry, {id: uuid}]
    entryList = [...entryList, newEntry];
  }

  $: deleteDispatchHandler = (event) => {
    entryList = entryList.filter(entry => entry[2].id !== event.detail);
    console.log(entryList);
  }
</script>

<main class="calculator">
  <Actions on:addRole={addRoleHandler}/>
  <Dashboard {entryList} on:delete={deleteDispatchHandler}/>

</main>

<style>

</style>
