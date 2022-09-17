
  <script>
  export let entryList;
  import { createEventDispatcher } from "svelte";
  import { createForm } from "svelte-forms-lib";
  const dispatch = createEventDispatcher();

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: '',
    },
    onSubmit: values => {
      let submitData = {formData: values, teamList: entryList };
      dispatch('closeModal');
    }
  });

  
  </script>

  <form on:submit={handleSubmit}>
    <label for="firstName">First Name</label>
    <input
      id="firstName"
      name="firstName"
      type="text"
      on:change={handleChange}
      bind:value={$form.firstName}
      required
    />
    
    <label for="lastName">Last Name</label>
    <input
      id="lastName"
      name="lastName"
      type="text"
      on:change={handleChange}
      bind:value={$form.lastName}
      required
    />

    <label for="email">email</label>
    <input
      id="email"
      name="email"
      type="email"
      on:change={handleChange}
      bind:value={$form.email}
      required
    />

    <label for="company">Company</label>
    <input
      id="company"
      name="company"
      type="text"
      on:change={handleChange}
      bind:value={$form.company}
    />

    <label for="phone">phone (optional)</label>
    <input
      id="phone"
      name="phone"
      type="text"
      on:change={handleChange}
      bind:value={$form.phone}
    />

    <button on:click={() => dispatch('closeModal')}>Cancel</button>
    <button type='submit'>Submit</button>
  </form>
