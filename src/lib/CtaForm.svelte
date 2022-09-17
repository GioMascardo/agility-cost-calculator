
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
      let msg = {
        to: values.email,
        from: 'mascardogio@gmail.com',
        subject: 'Agility Cost Calculator Summary',
        text: `Good day Mr./Ms. ${values.lastName}, here's a summary of your team using our cost calculator:
          ${$dashboardSummary.forEach(row => {
            let {role, staffRequired, experienceLevel, hireWithAgility, hireOnshore, yourSavings} = row;
            return `- Role: ${role}, Number of ${role}${staffRequired > 1 ? 's': ''}: ${staffRequired}, Experience Level: ${experienceLevel}, Hire With Us: ${hireWithAgility}, Hire Onshore: ${hireOnshore}, Your Savings: ${yourSavings}`
          })}`,
      };
      sgMail.send(msg).then(() => {
        console.log('Email sent')
      }).catch((error) => {
        console.error(error)
      })
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

    <label for="company">Company (optional)</label>
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
