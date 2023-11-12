<template>
  <pf-dropdown hide-arrow>
    <div slot="button">
      <i class="far fa-bell"></i>
      <span class="badge badge-warning navbar-badge">15</span>
    </div>
    <div slot="menu">
      <span class="dropdown-item dropdown-header"
        >15 {{ $t("labels.notifications") }}</span
      >
      <div class="dropdown-divider"></div>
      <div>
        <!-- Message Notifications -->
        
      </div>
    </div>
  </pf-dropdown>
</template>
<script src="./notifications.ts" lang="ts"></script>
<style src="./notifications.scss" lang="scss"></style>
