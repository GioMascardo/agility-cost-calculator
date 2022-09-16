<script>
  export let entry;
  export let id;

  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";
  import { createEventDispatcher } from "svelte";
  import { isWorkFromHome, selectedWorkOption, currentCurrency } from '../../stores';
  import Counter from "../Counter.svelte";
  
  let experienceLevelOptions = ['Junior', 'Intermediate', 'Senior'];
  let selectedExperienceLevel = experienceLevelOptions[0]

  $: roleData = entry.find(object => object.workOption === $selectedWorkOption)
  $: selectedRole = roleData.roles.find(role => role.experienceLevel === selectedExperienceLevel)
  $: ({ role, currencies } = selectedRole);
  $: numberOfEmployees = 1;
  function countChange(event) {
    numberOfEmployees = event.detail.count;
  }
  $: currentCurrencyArr = currencies[`${$currentCurrency}`];
  $: hireWithAgility = currentCurrencyArr[0] * numberOfEmployees;
  $: hireOnshore = currentCurrencyArr[1] * numberOfEmployees;
  $: yourSavings = currentCurrencyArr[2] * numberOfEmployees;
  
  const dispatch = createEventDispatcher();
  function deleteHandler(id) {
    dispatch('delete', id)
  }
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