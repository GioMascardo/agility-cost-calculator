
  <script>
  import { createEventDispatcher } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import { dashboardSummary } from '../stores';
  import sgMail from '@sendgrid/mail'
  sgMail.setApiKey(import.meta.env.SG_API_KEY);

  const dispatch = createEventDispatcher();

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: '',
    },
    onSubmit: (values) => {
      // let msg = {
      //   to: values.email,
      //   from: 'mascardogio@gmail.com',
      //   subject: 'Agility Cost Calculator Summary',
      //   text: `Good day Mr./Ms. ${values.lastName}, here's a summary of your team using our cost calculator:
      //     ${$dashboardSummary.forEach(row => {
      //       let {role, staffRequired, experienceLevel, hireWithAgility, hireOnshore, yourSavings} = row;
      //       return `- Role: ${role}, Number of ${role}${staffRequired > 1 ? 's': ''}: ${staffRequired}, Experience Level: ${experienceLevel}, Hire With Us: ${hireWithAgility}, Hire Onshore: ${hireOnshore}, Your Savings: ${yourSavings}`
      //     })}`,
      // };
      // sgMail.send(msg).then(() => {
      //   console.log('Email sent')
      // }).catch((error) => {
      //   console.error(error)
      // })
      dispatch('isDone');
    }
  });

  
  </script>

  <form on:submit={handleSubmit}>
    <label for="firstName">First Name</label>
    <input
      id="firstName"
      name="firstName"
      type="text"
      placeholder="John"
      on:change={handleChange}
      bind:value={$form.firstName}
      required
    />
    
    <label for="lastName">Last Name</label>
    <input
      id="lastName"
      name="lastName"
      type="text"
      placeholder="Doe"
      on:change={handleChange}
      bind:value={$form.lastName}
      required
    />

    <label for="email">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      placeholder="johndoe@example.com"
      on:change={handleChange}
      bind:value={$form.email}
      required
    />

    <label for="company">Company (optional)</label>
    <input
      id="company"
      name="company"
      type="text"
      placeholder="Acme Incorporated"
      on:change={handleChange}
      bind:value={$form.company}
    />

    <label for="phone">Phone (optional)</label>
    <input
      id="phone"
      name="phone"
      type="text"
      placeholder="09XXXXXXX"
      on:change={handleChange}
      bind:value={$form.phone}
    />

    <div class="form-action-buttons">
      <button class="cancel-button" on:click={() => dispatch('closeModal')}>Cancel</button>
      <button class="primary-button submit" type='submit'>Submit</button>
    </div>
  </form>


<style>
  form {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.25rem;
    margin-bottom: .25rem;
  }

  input {
    text-transform: capitalize;
    border-radius: .5rem;
    padding: .75rem 1rem;
    border: 1px solid var(--neutral-clr-300);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    margin-bottom: .75rem;
    line-height: 1.5rem;
    font-size: 1rem;
  }

  input::placeholder {
    color: var(--neutral-clr-400);
  }

  input:focus-visible {
    outline-color: var(--primary-clr-200);
  }

  .form-action-buttons {
    margin-top: 2rem;
    display: flex;
    gap: .75rem;
    color: var(--neutral-clr-700);
  }

  .form-action-buttons > button {
    flex-grow: 1;
    padding: 10px 18px;
    border: 1px solid var(--neutral-clr-300);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: .5rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    cursor: pointer;
  }

  .cancel-button {
    background-color: white;
  }
  .cancel-button:hover {
    background-color: var(--neutral-clr-50);
  }

  .submit {
    color: var(--primary-clr-50);
  }
</style>