<script setup lang="ts">
import VProject from "@/components/project/VProject.vue"
import ViewWrapper from "@/components/ViewWrapper.vue"
import ProjectDependentView from "@/components/ProjectDependentView.vue"
</script>

<template>
  <ViewWrapper>
    <ProjectDependentView>
      <VProject />
    </ProjectDependentView>
  </ViewWrapper>
</template>
