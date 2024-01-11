<script setup lang="ts">
import VCanban from "~/canban/VCanban.vue"
import ViewWrapper from "~/ViewWrapper.vue"
import ProjectDependentView from "@/components/ProjectDependentView.vue"
</script>

<template>
  <ViewWrapper>
    <ProjectDependentView>
      <VCanban />
    </ProjectDependentView>
  </ViewWrapper>
</template>
