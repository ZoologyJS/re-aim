<template>
  <div class="message-container">
    <span :style="{ color: userColor }" class="username">{{ username }}: </span>
    <span class="message">{{ message }}</span>
  </div>
</template>

<script>

export default {
  name: 'AimMessage',
  props: [ 'username', 'message', 'userColor' ],
}
</script>

<style scoped>
    * {
      font-family: "Times New Roman", Times, serif !important;
    }
    .username {
        font-weight: bold;
    }

    .message {
        color: black;
    }

    .message-container {
        padding: 2px 2px;
    }

</style>
