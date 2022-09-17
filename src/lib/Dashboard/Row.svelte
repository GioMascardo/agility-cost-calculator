<script>
  export let entry;
  export let id;

  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";
  import { createEventDispatcher, onDestroy } from "svelte";
  import { loop_guard } from "svelte/internal";
  import { isWorkFromHome, selectedWorkOption, currentCurrency, estimateObjectArr, dashboardSummary } from '../../stores';
  import Counter from "../Counter.svelte";
  const dispatch = createEventDispatcher();
  
  const experienceLevelOptions = ['Junior', 'Intermediate', 'Senior'];
  $: selectedExperienceLevel = experienceLevelOptions[0]

  $: roleData = entry.find(object => object.workOption === $selectedWorkOption)
  $: selectedRole = roleData.roles.find(role => role.experienceLevel === selectedExperienceLevel)
  $: ({ role, currencies } = selectedRole);
  let numberOfEmployees = 1;
  $: currentCurrencyArr = currencies[`${$currentCurrency}`];
  $: hireWithAgility = currentCurrencyArr[0] * numberOfEmployees;
  $: hireOnshore = currentCurrencyArr[1] * numberOfEmployees;
  $: yourSavings = currentCurrencyArr[2] * numberOfEmployees;

  $: selectedRowData = {
    id: id,
    role: role, 
    staffRequired: numberOfEmployees,
    experienceLevel: selectedExperienceLevel,
    hireWithAgility: hireWithAgility,
    hireOnshore: hireOnshore,
    yourSavings: yourSavings
  }

  $: if($dashboardSummary.every(i => i.id !== id)) {
    $dashboardSummary = [...$dashboardSummary, selectedRowData];
    console.log($dashboardSummary, `created row's summary in dashboardsummaryarr`);
  }
  let dashBoardObject = $dashboardSummary.find(object => object.id === id);
  let dashBoardSummaryIndex = $dashboardSummary.indexOf(dashBoardObject);
  $: $dashboardSummary[dashBoardSummaryIndex] = selectedRowData;

  function deleteHandler(id) {
    dispatch('delete', id)
  }

  $: countChange = (event) => {
    numberOfEmployees = event.detail.count;
  }

  let estimateObject = {id: id, estimate: 0}
  $estimateObjectArr = [...$estimateObjectArr, estimateObject];

  let rowObject = $estimateObjectArr.find(object => object.id === id);
  let rowIndex = $estimateObjectArr.indexOf(rowObject);
  $: {
    $estimateObjectArr[rowIndex]['estimate'] = hireWithAgility;
  }

  onDestroy(() => {
    $estimateObjectArr = $estimateObjectArr.filter(object => object.id !== id);
    $dashboardSummary = $dashboardSummary.filter(object => object.id !== id);
    console.log($dashboardSummary, `deleted ${role} from $dashboardSummary`);
  })
</script>

<tr>
  <td class="role"><span>{role}</span></td>
  <td class="staff-required"><Counter on:countChange={countChange} /></td>
  <td class="experience-level">
    <Menu style="position: relative">
      <MenuButton>{selectedExperienceLevel}</MenuButton>
      <MenuItems style="position: absolute">
        {#each experienceLevelOptions as option}
          <MenuItem><button on:click={() => selectedExperienceLevel = option}>{option}</button></MenuItem>
        {/each}
      </MenuItems>
    </Menu>
  </td>
  <td class="hire-with-agility"><span><sup>{$currentCurrency}</sup> {hireWithAgility}</span></td>
  <td class="hire-onshore"><span><sup>{$currentCurrency}</sup> {hireOnshore}</span></td>
  <td class="your-savings"><span><sup>{$currentCurrency}</sup> {yourSavings}</span></td>
  <td><button on:click={() => deleteHandler(id)}>delete</button></td>
</tr>

<style>
  td {
    padding-block: 1rem;
    padding-inline: 2rem;
  }
</style>