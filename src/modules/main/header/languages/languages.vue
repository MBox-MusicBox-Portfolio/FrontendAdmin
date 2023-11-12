<template>
  <pf-dropdown hide-arrow>
    <div slot="button">
      <i class="flag-icon" :class="flagIcon"></i>
    </div>
    <div slot="menu">
      <a
        class="dropdown-item"
        :class="{ active: selectedLanguage === language.key }"
        @click="changeLanguage(language.key)"
        v-for="language in languages" :key="language"
        >
        <i class="flag-icon mr-2" :class="language.flag"></i>
        {{ $t(language.label) }}
      </a>
    </div>
  </pf-dropdown>
</template>
<script src="./languages.ts" lang="ts"></script>
<style src="./languages.scss" lang="scss" scoped></style>
