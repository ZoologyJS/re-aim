<template>
  <div class="message-container"><span :style="{ color: userColor }" class="username">{{ username }}: </span><span class="message">{{ message }}</span></div>
</template>

<script>

export default {
  name: 'AimMessage',
  props: [ 'username', 'message', 'userColor' ],
}
</script>

<style>
    .username {
        font-weight: bold;
    }

    .message {
        color: black;
    }

    .message-container {
        padding: 3px 5px;
    }

</style>
