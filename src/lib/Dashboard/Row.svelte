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
  import { isWorkFromHome, selectedWorkOption, currentCurrency, estimateObjectArr, dashboardSummary } from '../../stores';
  import Counter from "../Counter.svelte";
  import exchangeRates from "../helper/fetchExchangeRates";
  console.log(exchangeRates);

  const dispatch = createEventDispatcher();
  
  const experienceLevelOptions = ['Junior', 'Intermediate', 'Senior'];
  $: selectedExperienceLevel = experienceLevelOptions[0]

  $: roleData = entry.find(object => object.workOption === $selectedWorkOption)
  $: selectedRole = roleData.roles.find(role => role.experienceLevel === selectedExperienceLevel)
  $: ({ role, hireAgilityusd, hireOnshoreusd, yourSavingsusd } = selectedRole);
  let numberOfEmployees = 1;
  $: ({})
  $: hireWithAgility = Math.floor((hireAgilityusd * exchangeRates[`${$currentCurrency}`]) * numberOfEmployees);
  $: hireOnshore = Math.floor((hireOnshoreusd * exchangeRates[`${$currentCurrency}`]) * numberOfEmployees);
  $: yourSavings = Math.floor((yourSavingsusd * exchangeRates[`${$currentCurrency}`]) * numberOfEmployees);

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
  <td class="role"><span class="font-medium">{role}</span></td>
  <td class="staff-required cell-center"><Counter on:countChange={countChange} /></td>
  <td class="experience-level">
    <Menu class="menu-wrapper">
      <MenuButton class="experience-level-dropdown-button">{selectedExperienceLevel}
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </MenuButton>
      <MenuItems class="menu-items-wrapper">
        {#each experienceLevelOptions as option}
          <MenuItem><button on:click={() => selectedExperienceLevel = option}>{option}</button></MenuItem>
        {/each}
      </MenuItems>
    </Menu>
  </td>
  <td class="hire-with-agility text-align-right"><span class="text-primary"><sup>{$currentCurrency}</sup> {hireWithAgility}</span></td>
  <td class="hire-onshore text-align-right"><span><sup>{$currentCurrency}</sup> {hireOnshore}</span></td>
  <td class="your-savings text-align-right"><span><sup>{$currentCurrency}</sup> {yourSavings}</span></td>
  <td><button class="delete-button" on:click={() => deleteHandler(id)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
  </button></td>
</tr>

<style>
  :global(.row > *) {
    background-color: var(--primary-clr-500);
    width: max-content;
  }

  :global(.experience-level-dropdown-button) {
    border: 1px solid var(--neutral-clr-300);
    border-radius: .5rem;
    cursor: pointer;
    padding-block: .25rem;
    padding-inline: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.25rem;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    margin-inline: auto;
  }

  .delete-button {
    background-color: transparent;
    border: none;
    padding: .5rem;
    color: var(--neutral-clr-500);
    cursor: pointer;
  }

  td {
    padding-block: 1rem;
    padding-inline: 2rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: var(--neutral-clr-700);
  }
</style>