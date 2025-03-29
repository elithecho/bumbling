<script lang="ts">
  import { enhance } from '$app/forms';

  let formData = {
    orgName: '',
    centerName: '',
    centerAddress: '',
    adminEmail: '',
    adminName: '',
    adminPassword: '',
    confirmPassword: ''
  };

  let errors = {
    password: ''
  };

  function validateForm() {
    errors.password = '';
    if (formData.adminPassword !== formData.confirmPassword) {
      errors.password = 'Passwords do not match';
      return false;
    }
    return true;
  }

  function handleSubmit(event: Event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  }
</script>

<div class="setup-container">
  <h1>Initial Setup</h1>
  <p class="setup-description">Create your organization, first center, and super admin account.</p>
  
  <form method="POST" use:enhance class="setup-form" on:submit={handleSubmit}>
    <fieldset>
      <legend>Organization Details</legend>
      <div class="form-group">
        <label for="orgName">Organization Name</label>
        <input
          type="text"
          id="orgName"
          name="orgName"
          bind:value={formData.orgName}
          placeholder="Enter organization name"
          required
        />
      </div>
    </fieldset>

    <fieldset>
      <legend>Center Details</legend>
      <div class="form-group">
        <label for="centerName">Center Name</label>
        <input
          type="text"
          id="centerName"
          name="centerName"
          bind:value={formData.centerName}
          placeholder="Enter center name"
          required
        />
      </div>

      <div class="form-group">
        <label for="centerAddress">Center Address</label>
        <textarea
          id="centerAddress"
          name="centerAddress"
          bind:value={formData.centerAddress}
          placeholder="Enter center address (optional)"
          rows="3"
        ></textarea>
      </div>
    </fieldset>

    <fieldset>
      <legend>Super Admin Account</legend>
      <div class="form-group">
        <label for="adminEmail">Email</label>
        <input
          type="email"
          id="adminEmail"
          name="adminEmail"
          bind:value={formData.adminEmail}
          placeholder="Enter admin email"
          required
        />
      </div>

      <div class="form-group">
        <label for="adminName">Full Name</label>
        <input
          type="text"
          id="adminName"
          name="adminName"
          bind:value={formData.adminName}
          placeholder="Enter admin name"
          required
        />
      </div>

      <div class="form-group">
        <label for="adminPassword">Password</label>
        <input
          type="password"
          id="adminPassword"
          name="adminPassword"
          bind:value={formData.adminPassword}
          placeholder="Enter password"
          required
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          bind:value={formData.confirmPassword}
          placeholder="Confirm password"
          required
        />
        {#if errors.password}
          <span class="error-message">{errors.password}</span>
        {/if}
      </div>
    </fieldset>

    <button type="submit" class="submit-btn">Complete Setup</button>
  </form>
</div>

<style>
  .setup-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: white;
  }

  h1 {
    margin-bottom: 1rem;
    color: #333;
  }

  .setup-description {
    color: #666;
    margin-bottom: 2rem;
  }

  .setup-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  fieldset {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1.5rem;
  }

  legend {
    padding: 0 0.5rem;
    font-weight: 600;
    color: #444;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .form-group:last-child {
    margin-bottom: 0;
  }

  label {
    font-weight: 500;
    color: #555;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  .error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-btn:hover {
    background-color: #45a049;
  }
</style>
