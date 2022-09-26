<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import { dashboardSummary, totalEstimate, currentCurrency } from '../stores';
  import emailjs from '@emailjs/browser';

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const dispatch = createEventDispatcher();

  let recaptchaToken = undefined;
  function handleCaptchaCallback(token) {
    recaptchaToken = token;
    resetCaptcha()
  }

  const resetCaptcha = () => {
    window.grecaptcha.reset();
  };

  let error = '';
  const handleCaptchaError = () => {
    error = 'Recaptcha error. Please reload the page';
  };

  onMount(() => {
    window.handleCaptchaCallback = handleCaptchaCallback;
    window.handleCaptchaError = handleCaptchaError;
    window.resetCaptcha = resetCaptcha;
  });

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: '',
    },
    onSubmit: (values) => {
      const dashboardSummaryString = $dashboardSummary.map((entry) => {
        const {
          role,
          staffRequired,
          experienceLevel,
          hireWithAgility,
          hireOnshore,
          yourSavings,
        } = entry;

        return `
          Role: ${role},\r\n
          No. of staff: ${staffRequired},\r\n
          Experience Level: ${experienceLevel},\r\n
          Hire onshore: ${hireOnshore},\r\n
          Hire with us: ${hireWithAgility},\r\n
          Your savings: ${yourSavings}\r\n
        `;
        }).join(`\r\n
      `);

      const totalEstimateString = `${$currentCurrency === 'gbp' ? '£' : '$'}${$totalEstimate}`

      const formData = {
        ...values,
        dashboardSummary: dashboardSummaryString,
        estimatedMonthlyCost: totalEstimateString,
        'g-recaptcha-response': recaptchaToken
      };

      // reset any errors
      error = '';
      
      // tell recaptcha to process a request
      window.grecaptcha.execute();

      emailjs.send('service_acz31tj', 'template_gzvm0jk', formData, 'h4o2Zg3F3PHQtr9PC').
        then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
      
      dispatch('isDone');
    }
  });
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

  <form on:submit={handleSubmit}>
    {#if error}
      <div>
        <small>{error}</small>
      </div>
    {/if}

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

    <div
      class="g-recaptcha"
      data-sitekey={RECAPTCHA_SITE_KEY}
      data-callback="handleCaptchaCallback"
      data-expired-callback="resetCaptcha"
      data-error-callback="handleCaptchaError"
    />

    <div class="form-action-buttons">
      <button class="cancel-button" on:click={() => dispatch('closeModal')}>Cancel</button>
      <button class={recaptchaToken === undefined ? 'disabled' : 'primary-button submit'} type='submit' disabled={recaptchaToken === undefined} style={recaptchaToken === undefined ? 'cursor: default' : ''}>Submit</button>
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

  .form-action-buttons > button:focus-visible {
    outline-color: var(--primary-clr-200);
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