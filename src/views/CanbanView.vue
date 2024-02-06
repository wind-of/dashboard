<script setup lang="ts">
import VCanban from "@/components/canban/VCanban.vue"
import ViewWrapper from "@/components/ViewWrapper.vue"
import ProjectDependentView from "@/components/ProjectDependentView.vue"
</script>

<template>
  <ViewWrapper>
    <ProjectDependentView>
      <VCanban />
    </ProjectDependentView>
  </ViewWrapper>
</template>
