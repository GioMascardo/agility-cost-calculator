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
    <Menu class="department-dropdown">
      <MenuButton>{selectedDepartment == undefined ? 'Department' : selectedDepartment }</MenuButton>
      <MenuItems>
        {#each departmentsList as department}
          <MenuItem>
            <button on:click={() => departmentHandler(department)}>{department.departmentName}</button>
          </MenuItem>
        {/each}
      </MenuItems>
    </Menu>
    <Menu class="role-dropdown">
      <MenuButton disabled={selectedDepartment == undefined} >{selectedRole === '' ? 'Role' : selectedRole }</MenuButton>
      <MenuItems>
        {#each departmentRoles as role}
          <MenuItem>
            <button on:click={() => selectedRole = role}>{role}</button>
          </MenuItem>
        {/each}
      </MenuItems>
    </Menu>
  </div>

  <button disabled={selectedRole === ''} on:click={addRoleHandler}>+ Add Role</button>

  <!-- location-dropdown -->
  <Menu class="location-dropdown">
    <MenuButton>{$currentLocation}</MenuButton>
    <MenuItems>
      {#each locations as location}
        <MenuItem class={$currentLocation === location ? 'current' : ''}>
          <button on:click={() => $currentLocation = location}>{location}</button>
        </MenuItem>
      {/each}
    </MenuItems>
  </Menu>
</div>