<template>
  <aside
    class="control-sidebar control-sidebar-dark"
    style="padding: 16px; padding-top: 73px"
  >
    <h5>Customize AdminLTE</h5>
    <hr class="mb-2" />
    <div style="padding: 8px 0">
      <pf-checkbox @change="handleDarkModeChange"> Dark mode </pf-checkbox>
      <pf-select
        label="Light Navbar Variants"
        :value="navbarVariant"
        class="mt-3"
        :options="navbarLightVariants"
        type="custom"
        @change="onNavbarVariantChange"
      >
        Light Navbar Variants
      </pf-select>
      <pf-select
        label="Dark Navbar Variants"
        :value="navbarVariant"
        class="mt-3"
        :options="navbarDarkVariants"
        type="custom"
        @change="onNavbarVariantChange"
      >
        Dark Navbar Variants
      </pf-select>
      <pf-select
        label="Accent Color Variants"
        class="mt-3"
        :options="[]"
        type="custom"
        disabled
      >
        Accent Color Variants
      </pf-select>
      <pf-select
        label="Light Sidebar Variants"
        class="mt-3"
        :value="sidebarSkin"
        :options="lightSidebarSkins"
        type="custom"
        @change="onSidebarSkinChange"
      >
        Light Sidebar Variants
      </pf-select>
      <pf-select
        label="Dark Sidebar Variants"
        class="mt-3"
        :value="sidebarSkin"
        :options="darkSidebarSkins"
        type="custom"
        @change="onSidebarSkinChange"
      >
        Dark Sidebar Variants
      </pf-select>

      <pf-select
        label="Brand Logo Variants"
        class="mt-3"
        :options="[]"
        type="custom"
        disabled
      >
        Brand Logo Variants
      </pf-select>
    </div>
  </aside>
</template>
<script src="./control-sidebar.ts" lang="ts"></script>
<style src="./control-sidebar.scss" lang="scss"></style>
