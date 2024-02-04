<script setup lang="ts">
import VProject from "~/project/VProject.vue"
import ViewWrapper from "~/ViewWrapper.vue"
import ProjectDependentView from "@/components/ProjectDependentView.vue"
</script>

<template>
  <ViewWrapper>
    <ProjectDependentView>
      <VProject />
    </ProjectDependentView>
  </ViewWrapper>
</template>
