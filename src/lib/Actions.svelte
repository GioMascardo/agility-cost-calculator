<script lang="ts">
  import locations, { currentLocation, departmentsList } from '../stores';
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";
  import {createEventDispatcher} from 'svelte';

  let department;
  let roles;
  
  $: selectedDepartment = department;
  $: selectedRole = '';
  $: departmentRoles = roles;

  function departmentHandler(department) {
    let departmentRecord = departmentsList.find(findDepartment => findDepartment.departmentName === department.departmentName);
    selectedDepartment = departmentRecord.departmentName;
    departmentRoles = departmentRecord.departmentRoles;
    selectedRole = ''
  }

  const dispatch = createEventDispatcher();
  const addRoleHandler = () => {
      dispatch('addRole', {role: selectedRole});
      selectedDepartment = undefined;
      selectedRole = '';
  }
</script>

<div class="actions-wrapper">
  <div class="add-role-action">
    <Menu class="menu-wrapper department-dropdown" >
      <MenuButton class="menu-button">{selectedDepartment == undefined ? 'Department' : selectedDepartment } 
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </MenuButton>
        <MenuItems class="menu-items-wrapper">
          {#each departmentsList as department}
            <MenuItem class={selectedDepartment === department ? 'selectedItem' : ''}>
              <button class="menu-item-button" on:click={() => departmentHandler(department)}>{department.departmentName}</button>
            </MenuItem>
          {/each}
        </MenuItems>
    </Menu>
    <Menu class="menu-wrapper role-dropdown">
      <MenuButton class={selectedDepartment == undefined ? 'menu-button disabled' : 'menu-button'} disabled={selectedDepartment == undefined} >{selectedRole === '' ? 'Role' : selectedRole }
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </MenuButton>
      <MenuItems class="menu-items-wrapper">
        {#each departmentRoles as role}
          <MenuItem class={selectedRole === role ? 'selectedItem' : ''}>
            <button class="menu-item-button" on:click={() => selectedRole = role}>{role}</button>
          </MenuItem>
        {/each}
      </MenuItems>
    </Menu>
    <div>
      <button class={selectedRole == '' ? 'menu-button disabled' : 'menu-button primary-button'} disabled={selectedRole === ''} on:click={addRoleHandler}>+ Add Role</button>
    </div>
  </div>


  <!-- location-dropdown -->
  <Menu class="menu-wrapper location-dropdown">
    <MenuButton class="menu-button ghost-button">{$currentLocation}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>    </MenuButton>
    <MenuItems class="menu-items-wrapper">
      {#each locations as location}
        <MenuItem class={$currentLocation === location ? 'selectedItem' : ''}>
          <button class="menu-item-button" on:click={() => $currentLocation = location}>{location}</button>
        </MenuItem>
      {/each}
    </MenuItems>
  </Menu>
</div>

<style>
  :global(.actions-wrapper) {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
  }

  :global(.add-role-action) {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  :global(.menu-wrapper) {
    position: relative;
  }

  :global(.menu-button) {
    background-color: var(--neutral-clr-50);
    color: var(--neutral-clr-700);
    cursor: pointer;
    font-weight: 500;
    font-size: .875rem;
    line-height: 1.25rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding-inline: 1rem;
    padding-block: 0.5rem;
    border: 1px solid var(--neutral-clr-300);
    border-radius: 0.5rem;
  }
  
  :global(.menu-button.ghost-button) {
    background-color: transparent;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.75rem;
    color: var(--primary-clr-500);
    border: none;
  }

  :global(.disabled) {
    background-color: var(--neutral-clr-300);
    border-color: var(--neutral-clr-50);
    color: var(--neutral-clr-50);
    cursor: default;
  }
  
  :global(.menu-items-wrapper) {
    background-color: var(--neutral-clr-50);
    border: 1px solid var(--neutral-clr-100);
    border-radius: 0.5rem;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    display: flex;
    flex-direction: column;
    position: absolute;
    padding-block: 1rem;
    top: 2.5rem;
    z-index: 10;
    min-width: max-content;
  }

  :global(.menu-items-wrapper > a > button) {
    padding-block: 1em;
    padding-inline: 2em;
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: max-content;
    text-align: left;
  }

  :global(.menu-items-wrapper > a:hover) {
    background-color: var(--neutral-clr-100);
  }

  .menu-item-button {
    width: 100%;
  }

  :global(.primary-button) {
    background-color: var(--primary-clr-500);
    color: var(--primary-clr-50);
    cursor: pointer;
  }

  :global(.primary-button:hover) {
    background-color: var(--primary-clr-600);
  }
</style>