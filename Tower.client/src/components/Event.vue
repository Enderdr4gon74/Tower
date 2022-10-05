<template>
<div class="col-4 p-3 px-0 position-relative selectable d-flex flex-column align-items-center">
  <img src="https://thiscatdoesnotexist.com/" alt="coverImg" class="img-fluid w-spec rounded">
  <div class="body-tr position-absolute bottom-5 w-spec p-2 rounded-bottom">
    <h4 class="mb-1">Name</h4>
    <p class="m-0">location</p>
    <p class="m-0">date</p>
    <p class="text-end m-0">0 spots left</p>
  </div>
</div>
</template>


<script>
export default {
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.bg-light-dark {
  background-color: #1f2b41;
}

.body-tr {
  background-color: rgba(48, 45, 45, 0.712);
}

.w-spec {
  width: 95%;
}

.bottom-5 {
  bottom: 5%;
}
</style>