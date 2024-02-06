<script setup lang="ts">
import VTimeline from "@/components/timeline/VTimeline.vue"
import ViewWrapper from "@/components/ViewWrapper.vue"
import ProjectDependentView from "@/components/ProjectDependentView.vue"
</script>

<template>
  <ViewWrapper>
    <ProjectDependentView>
      <VTimeline />
    </ProjectDependentView>
  </ViewWrapper>
</template>
