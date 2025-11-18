<template>
  <!-- ALERT BOX -->
  <div class="alert" :class="bgColor">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">✖</span>
    <slot>Pesan default</slot>
  </div>
</template>

<script setup>
defineProps({
  bgColor: String,
})
</script>

<style scoped>
.active {
  display: block !important;
}

.hijau {
  background-color: green;
}

.merah {
  background-color: red;
}

/* The alert message box */
.alert {
  display: none;
  padding: 20px;
  color: white;
  margin-bottom: 15px;
}

/* The close button */
.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
  color: black;
}
</style>
