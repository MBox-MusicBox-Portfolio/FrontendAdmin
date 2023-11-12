<template>
  <div class="wrapper">
    <app-header></app-header>
    <menu-sidebar></menu-sidebar>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
    <control-sidebar></control-sidebar>
    <div
      id="sidebar-overlay"
      v-if="uiValues.screenSize === 'xs' && uiValues.menuSidebarCollapsed"
      @click="toggleMenuSidebar"
    ></div>
  </div>
</template>
<script src="./main.ts" lang="ts"></script>
<style src="./main.scss" lang="scss"></style>
