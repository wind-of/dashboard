<script setup lang="ts">
import VTimeline from "~/timeline/VTimeline.vue"
import ViewWrapper from "~/ViewWrapper.vue"
import ProjectDependentView from "~/ProjectDependentView.vue"
</script>

<template>
  <ViewWrapper>
    <ProjectDependentView>
      <VTimeline />
    </ProjectDependentView>
  </ViewWrapper>
</template>
