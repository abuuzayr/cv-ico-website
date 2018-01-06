<script>
export default {
  name: 'Status-Icon',
  props: [
    'status'
  ]
};
</script>
<template>
  <i class="fa fa-check success-back round-icon" v-if="status == 'success'" aria-hidden="true" v-b-tooltip.hover.left="'Verified'"></i>
  <i class="fa fa-ellipsis-h pending-back round-icon" v-else-if="status == 'pending'" aria-hidden="true" v-b-tooltip.hover.left="'Pending'"></i>
  <i class="fa fa-exclamation failure-back round-icon" v-else-if="status == 'failure'" aria-hidden="true" v-b-tooltip.hover.left="'Not Uploaded'"></i>
</template>
